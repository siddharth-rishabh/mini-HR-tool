import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import EmployeeDashboard from "./pages/employee/Dashboard";
import Attendance from "./pages/employee/Attendance";
import Leave from "./pages/employee/Leave";

import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Leaves from "./pages/admin/Leaves";
import AdminAttendance from "./pages/admin/Attendance";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/employee"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/attendance"
          element={
            <ProtectedRoute role="employee">
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/leave"
          element={
            <ProtectedRoute role="employee">
              <Leave />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/leaves"
          element={
            <ProtectedRoute role="admin">
              <Leaves />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute role="admin">
              <AdminAttendance />
            </ProtectedRoute>
          }
        />
      </Routes>
  );
}

export default App;
