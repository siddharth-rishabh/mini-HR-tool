import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const EmployeeDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold mb-6">
          Welcome, {user?.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Leave Balance</p>
            <p className="text-3xl font-bold text-blue-600">
              {user?.leaveBalance} Days
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Role</p>
            <p className="text-xl font-semibold">{user?.role}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Status</p>
            <p className="text-xl font-semibold text-green-600">
              Active
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/employee/leave"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">Leave Management</h3>
            <p className="text-sm text-gray-500 mt-2">
              Apply for leave and view history
            </p>
          </Link>

          <Link
            to="/employee/attendance"
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">Attendance</h3>
            <p className="text-sm text-gray-500 mt-2">
              Mark and view attendance
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
