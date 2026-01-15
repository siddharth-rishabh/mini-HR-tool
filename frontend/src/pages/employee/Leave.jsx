import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const loadLeaves = async () => {
      try {
        const res = await api.get("/leave/me");
        setLeaves(res.data);
      } catch (err) {
        console.error("Failed to load leaves", err);
      }
    };

    loadLeaves();
  }, []);

  const reloadLeaves = async () => {
    const res = await api.get("/leave/me");
    setLeaves(res.data);
  };

  const applyLeave = async () => {
    if (!leaveType || !startDate || !endDate) {
      alert("Fill all fields");
      return;
    }

    await api.post("/leave", { leaveType, startDate, endDate });

    setLeaveType("");
    setStartDate("");
    setEndDate("");

    reloadLeaves();
  };

  const cancelLeave = async (id) => {
    await api.delete(`/leave/${id}`);
    reloadLeaves();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Leave Management
        </h2>

        <div className="bg-white p-4 rounded shadow mb-6 flex gap-3">
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Type</option>
            <option value="casual">Casual</option>
            <option value="sick">Sick</option>
            <option value="paid">Paid</option>
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={applyLeave}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Apply
          </button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Leave History</h3>

          {leaves.length === 0 ? (
            <p>No leave records</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Days</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((l) => (
                  <tr key={l._id}>
                    <td className="capitalize">{l.leaveType}</td>
                    <td>{new Date(l.startDate).toLocaleDateString()}</td>
                    <td>{new Date(l.endDate).toLocaleDateString()}</td>
                    <td>{l.totalDays}</td>
                    <td className="capitalize">{l.status}</td>
                    <td>
                      {l.status === "pending" && (
                        <button
                          onClick={() => cancelLeave(l._id)}
                          className="text-red-500"
                        >
                          Cancel
                        </button>
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

export default Leave;
