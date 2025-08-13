import React, { useState } from "react";
import {
  LayoutDashboard,
  UserPlus,
  Building2,
  BookOpen,
} from "lucide-react";

import StudentManagement from "./student/StudentManagement";
import GroupManagement from "./group/GroupManagement";

const Superpanel = () => {
  const [activeModule, setActiveModule] = useState("dashboard");

  // Single array for modules
  const modules = [
    {
      key: "student",
      title: "Students",
      icon: <UserPlus className="w-5 h-5 mr-2" />,
      component: <StudentManagement />,
      card: {
        description: "Manage All Students in the system.",
        icon: <UserPlus className="w-10 h-10 text-blue-600" />,
        bgColor: "bg-blue-100",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
      },
    },
    {
      key: "group",
      title: "Groups",
      icon: <Building2 className="w-5 h-5 mr-2" />,
      component: <GroupManagement />,
      card: {
        description: "Manage all groups in your institution.",
        icon: <Building2 className="w-10 h-10 text-green-600" />,
        bgColor: "bg-green-100",
        buttonColor: "bg-green-600 hover:bg-green-700",
      },
    },
  ];

  const renderDashboard = () => (
    <>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod) => (
          <div
            key={mod.key}
            className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-all duration-300 group"
          >
            <div className={`${mod.card.bgColor} p-4 rounded-full mb-5`}>
              {mod.card.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Manage {mod.title}
            </h2>
            <p className="text-center text-gray-600 mb-6">
              {mod.card.description}
            </p>
            <button
              onClick={() => setActiveModule(mod.key)}
              className={`${mod.card.buttonColor} text-white px-6 py-2 rounded-lg w-full font-semibold transition`}
            >
              Go to {mod.title}
            </button>
          </div>
        ))}
      </div>
    </>
  );

  const renderModule = () => {
    if (activeModule === "dashboard") return renderDashboard();
    const mod = modules.find((m) => m.key === activeModule);
    return mod?.component || null;
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md p-5 space-y-6">
        <h1 className="text-2xl font-bold text-blue-700">Admin Panel</h1>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveModule("dashboard")}
            className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${
              activeModule === "dashboard"
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Dashboard
          </button>

          {modules.map((mod) => (
            <button
              key={mod.key}
              onClick={() => setActiveModule(mod.key)}
              className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${
                activeModule === mod.key
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              {mod.icon}
              {mod.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-10">{renderModule()}</main>
    </div>
  );
};

export default Superpanel;
