import {
  LayoutDashboard,
  Bot,
  Calendar,
  Smile,
  Apple,
  BarChart3,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const menu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "AI Assistant",
    path: "/chat",
    icon: Bot,
  },
  {
    name: "Cycle Tracker",
    path: "/cycle",
    icon: Calendar,
  },
  {
    name: "Mood Tracker",
    path: "/mood",
    icon: Smile,
  },
  {
    name: "Nutrition",
    path: "/nutrition",
    icon: Apple,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r shadow-lg flex flex-col z-50">

      {/* ================= Logo ================= */}

      <div className="p-8 border-b">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white text-2xl shadow-md">
            🌸
          </div>

          <div>

            <h1 className="text-2xl font-bold text-pink-600">
              HerSphere
            </h1>

            <p className="text-sm text-gray-500">
              AI Women's Health
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Version 1.0
            </p>

          </div>

        </div>

      </div>

      {/* ================= Navigation ================= */}

      <nav className="flex-1 p-5 overflow-y-auto">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-2xl mb-3 transition-all duration-300 font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                }`
              }
            >
              <Icon size={22} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

      {/* ================= Bottom ================= */}

      <div className="border-t p-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm font-semibold">
              Logged In
            </p>

            <p className="text-xs text-gray-500">
              Welcome back 🌸
            </p>

          </div>

          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-11 h-11",
              },
            }}
            afterSignOutUrl="/"
          />

        </div>

      </div>

    </aside>
  );
}