import { Bell, Search } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

export default function Topbar() {
  return (
    <header className="flex justify-between items-center bg-white rounded-2xl shadow-sm p-5">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome back 🌸
        </h2>

        <p className="text-gray-500 mt-1">
          Here's your health overview for today.
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center bg-pink-50 px-4 py-2 rounded-full">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2"
          />
        </div>

        <button className="relative p-3 rounded-full bg-pink-100 hover:bg-pink-200">
          <Bell className="text-pink-600" />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}