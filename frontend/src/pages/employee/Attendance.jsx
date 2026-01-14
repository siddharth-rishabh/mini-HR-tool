import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    try {
      const res = await api.get("/attendance/me");
      setRecords(res.data);
    } catch (error) {
      alert("Failed to load attendance", error);
    }
  };

  const markAttendance = async () => {
    if (!status) return alert("Select attendance status");

    try {
      setLoading(true);
      await api.post("/attendance", { status });
      setStatus("");
      fetchAttendance();
    } catch (error) {
      alert(error.response?.data?.message || "Attendance already marked");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold mb-6">
          Attendance
        </h2>

        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h3 className="text-lg font-semibold mb-4">
            Mark Today’s Attendance
          </h3>

          <div className="flex gap-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border px-4 py-2 rounded-md"
            >
              <option value="">Select</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>

            <button
              onClick={markAttendance}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Marking..." : "Submit"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            Attendance History
          </h3>

          {records.length === 0 ? (
            <p className="text-gray-500">No attendance records</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record._id} className="border-b">
                    <td className="py-2">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="capitalize">
                      {record.status}
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

export default Attendance;