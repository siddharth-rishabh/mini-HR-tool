import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";

const Attendance = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get("/admin/attendance");
        setRecords(res.data);
      } catch (error) {
        console.error("Failed to load attendance records", error);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Employee Attendance</h2>

        <div className="bg-white p-4 rounded shadow">
          {records.length === 0 ? (
            <p>No attendance records</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Employee</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record._id} className="border-b">
                    <td className="py-2">{record.user.name}</td>
                    <td>{record.user.email}</td>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td className="capitalize">{record.status}</td>
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
