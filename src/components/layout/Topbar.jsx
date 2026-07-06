import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex justify-between items-center">

      <div>

        <h2 className="text-3xl font-bold">
          Welcome Back 🌸
        </h2>

        <p className="text-gray-500">
          Your health journey starts here.
        </p>

      </div>

      <div className="flex gap-4 items-center">

        <div className="flex items-center bg-white rounded-xl px-4 py-3 shadow-sm">

          <Search size={18} />

          <input
            className="outline-none ml-2"
            placeholder="Search..."
          />

        </div>

        <button className="bg-white p-3 rounded-xl shadow-sm">
          <Bell />
        </button>

      </div>

    </div>
  );
}