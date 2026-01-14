import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);

  // 🔹 Initial load
  useEffect(() => {
    const loadLeaves = async () => {
      try {
        const res = await api.get("/admin/leaves");
        setLeaves(res.data);
      } catch (err) {
        console.error("Failed to load leave requests", err);
      }
    };

    loadLeaves();
  }, []);

  // 🔹 Reload after approve / reject
  const reloadLeaves = async () => {
    const res = await api.get("/admin/leaves");
    setLeaves(res.data);
  };

  const updateStatus = async (id, status) => {
    await api.patch(`/admin/leaves/${id}/status`, { status });
    reloadLeaves();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Leave Requests</h2>

        <div className="bg-white p-4 rounded shadow">
          {leaves.length === 0 ? (
            <p>No leave requests</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Employee</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Days</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaves
                  .filter((l) => l.status === "pending")
                  .map((l) => (
                    <tr key={l._id} className="border-b">
                      <td className="py-2">{l.user.name}</td>
                      <td>{l.user.email}</td>
                      <td className="capitalize">{l.leaveType}</td>
                      <td>{new Date(l.startDate).toLocaleDateString()}</td>
                      <td>{new Date(l.endDate).toLocaleDateString()}</td>
                      <td>{l.totalDays}</td>
                      <td className="capitalize">{l.status}</td>
                      <td>
                        {l.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateStatus(l._id, "approved")}
                              className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(l._id, "rejected")}
                              className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaves;
