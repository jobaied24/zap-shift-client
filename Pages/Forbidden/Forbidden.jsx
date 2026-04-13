import { Link } from "react-router";


const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      
      <div className="text-center max-w-md">
        
        <h1 className="text-6xl font-bold text-error mb-4">403</h1>
        
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">
          Access Forbidden
        </h2>
        
        <p className="text-gray-500 mb-6">
          You do not have permission to access this page. 
          Please contact admin if you think this is a mistake.
        </p>

        <div className="flex justify-center gap-3">
          <Link to="/" className="btn text-white btn-primary">
            Go Home
          </Link>

          <Link to="/dashboard" className="btn btn-error btn-outline">
            Dashboard
          </Link>
        </div>

      </div>
      
    </div>
  );
};

export default Forbidden;