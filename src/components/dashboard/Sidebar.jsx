import {
  LayoutDashboard,
  Bot,
  CalendarDays,
  Stethoscope,
  Smile,
  Apple,
  BarChart3,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Bot, label: "AI Assistant" },
  { icon: CalendarDays, label: "Cycle Tracker" },
  { icon: Stethoscope, label: "Symptom Checker" },
  { icon: Smile, label: "Mood Tracker" },
  { icon: Apple, label: "Nutrition" },
  { icon: BarChart3, label: "Reports" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-white border-r border-pink-100 shadow-sm flex flex-col">
      {/* Logo */}
      <div className="p-8 border-b border-pink-100">
        <h1 className="text-3xl font-bold">
          <span className="text-pink-600">Her</span>
          <span className="text-purple-600">Sphere</span>
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Your AI Women's Health Companion
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-5 py-8 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={index}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all
              ${
                index === 0
                  ? "bg-pink-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-pink-100">
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 hover:bg-red-100 hover:text-red-500 transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}