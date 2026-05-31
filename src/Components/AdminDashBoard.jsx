import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid} from "recharts";

// const fetchParcelStats = async () => {
//   const res = await axios.get("/parcel-status-count");
//   return res.data;
// };

// UI config for each status
const statusConfig = {
  in_transit: {
    label: "In Transit",
    color: "bg-blue-500",
    icon: "🚚",
  },
  pending: {
    label: "Pending",
    color: "bg-yellow-500",
    icon: "⏳",
  },
  not_collected: {
    label: "Not Collected",
    color: "bg-red-500",
    icon: "📦",
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-500",
    icon: "✅",
  },
};


// color
const COLORS = {
  "In Transit":"#3b82f6",
  "Pending":"#facc15",
 "Not Collected":"#ef4444",
   "Delivered":"#22c55e"
  };


const AdminDashboard = () => {
    const axiosSecure=useAxiosSecure();
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["parcel-status"],
    queryFn:async()=>{
          const res = await axiosSecure.get("/parcel-status-count");
          return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Error loading data</p>;
  }

  // total count (good for dashboard header)
  const total = data.reduce((acc, item) => acc + item.count, 0);


const chartData = data.map((item) =>({
  ...item,
  statusLabel: statusConfig[item.status]?.label ||  item.status
}))


  return (
    <div className="p-4 bg-base-200 min-h-screen">
      {/* HEADER */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">
          Total Parcels: <span className="font-semibold">{total}</span>
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item, i) => {
          const config = statusConfig[item.status];

          return (
            <div
              key={i}
              className={`p-3 rounded shadow-lg text-white ${config.color}`}
            >
              <div className=" flex flex-col justify-between items-center">    

                {/* LEFT */}
                <div>
                  <h2 className="text-lg">{config.label}</h2>
                  <p className="text-3xl text-center mt-1 font-bold">{item.count}</p>
                </div>

              </div>
            </div>
          );
        })}
      </div>


      {/* pie chart */}
      <div className="mt-10">
  <div>
  <div className="p-2 rounded bg-base-100 shadow">
    <div className="">
      <h2 className="p-2 text-xl font-semibold">Delivery Distribution</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="statusLabel"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({name,percent})=>`${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[entry.statusLabel]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>

</div>

      </div>
    </div>
  );
};

export default AdminDashboard;