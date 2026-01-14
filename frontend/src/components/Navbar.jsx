import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <img className="h-10" src="../logo1.png" alt="logo"/>

      <div className="flex items-center gap-4 text-sm font-medium">
        {role === "employee" && (
          <>
            <Link
              to="/employee"
              className="text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              to="/employee/leave"
              className="text-gray-700 hover:text-blue-600"
            >
              Leave
            </Link>
            <Link
              to="/employee/attendance"
              className="text-gray-700 hover:text-blue-600"
            >
              Attendance
            </Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link
              to="/admin"
              className="text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/users"
              className="text-gray-700 hover:text-blue-600"
            >
              Users
            </Link>
            <Link
              to="/admin/leaves"
              className="text-gray-700 hover:text-blue-600"
            >
              Leaves
            </Link>
            <Link
              to="/admin/attendance"
              className="text-gray-700 hover:text-blue-600"
            >
              Attendance
            </Link>
          </>
        )}

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
