import { useParams } from "react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const UpdateTracking = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    trackingId: "",
    status: "",
    location: "",
    note: ""
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await axiosSecure.post("/tracking", data);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      ...formData,
      parcelId,
      updatedBy: "admin@gmail.com"
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6">

      <h2 className="text-xl font-bold mb-4">
        Update Tracking Status
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          type="text"
          placeholder="Tracking ID"
          className="input input-bordered w-full"
          onChange={(e) =>
            setFormData({ ...formData, trackingId: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Status (In Transit, Delivered...)"
          className="input input-bordered w-full"
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Location"
          className="input input-bordered w-full"
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />

        <textarea
          placeholder="Note"
          className="textarea textarea-bordered w-full"
          onChange={(e) =>
            setFormData({ ...formData, note: e.target.value })
          }
        />

        <button className="btn btn-primary w-full">
          Add Update
        </button>
      </form>

      {mutation.isSuccess && (
        <p className="text-green-600 mt-3">
          Tracking updated successfully!
        </p>
      )}
    </div>
  );
};

export default UpdateTracking;