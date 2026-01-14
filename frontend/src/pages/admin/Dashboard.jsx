import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Admin Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/users"
            className="bg-white p-6 rounded shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold mb-2">
              Employees
            </h3>
            <p className="text-sm text-gray-500">
              View all employees
            </p>
          </Link>

          <Link
            to="/admin/leaves"
            className="bg-white p-6 rounded shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold mb-2">
              Leave Requests
            </h3>
            <p className="text-sm text-gray-500">
              Approve or reject leaves
            </p>
          </Link>

          <Link
            to="/admin/attendance"
            className="bg-white p-6 rounded shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold mb-2">
              Attendance
            </h3>
            <p className="text-sm text-gray-500">
              View attendance records
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
