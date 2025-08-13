import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Superlogin from "./components/login/superlogin.jsx";
import Superpanel from "./components/superpanel.jsx";
import { FaHome } from "react-icons/fa";
import StudentManagement from "./components/student/StudentManagement.jsx";
import StudentCreate from "./components/student/StudentCreate.jsx";
import StudentEdit from "./components/student/StudentEdit.jsx";
import GroupCreate from "./components/group/GroupCreate.jsx";
import GroupManagement from "./components/group/GroupManagement.jsx";
import GroupEdit from "./components/group/GroupEdit.jsx";
//import AppRouter from "./AppRouter.js";
// import Home_V1 from "./components/homev4.js";
// const ProtectedRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   return isLoggedIn ? children : <Navigate to="/" />;
// };
const ProtectedRoute1 = ({ children }) => {
  const isLogged = localStorage.getItem("isLoggedin") === "true";
  return isLogged ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Superlogin />} />
      <Route path="/dashboard" element={<ProtectedRoute1><Superpanel /></ProtectedRoute1>} />
      <Route path="/student" element={<ProtectedRoute1><StudentManagement /></ProtectedRoute1>} />
      <Route path="/student/create" element={<ProtectedRoute1><StudentCreate /></ProtectedRoute1>} />
      <Route path="/student/edit/:id" element={<ProtectedRoute1><StudentEdit /></ProtectedRoute1>} />
      <Route path="/group" element={<ProtectedRoute1><GroupManagement /></ProtectedRoute1>} />
      <Route path="/group/create" element={<ProtectedRoute1><GroupCreate /></ProtectedRoute1>} />
      <Route path="/group/edit/:id" element={<ProtectedRoute1><GroupEdit /></ProtectedRoute1>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />

    </Routes>
  );
}
