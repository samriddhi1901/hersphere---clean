import { CalendarClock } from "lucide-react";

export default function ReminderCard() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="bg-pink-100 p-3 rounded-2xl">
          <CalendarClock className="text-pink-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Upcoming Reminder
          </h2>

          <p className="text-gray-500 text-sm">
            Stay prepared
          </p>
        </div>
      </div>

      <div className="mt-6 bg-pink-50 rounded-2xl p-5">

        <h3 className="font-semibold text-lg">
          🌸 Next Period
        </h3>

        <p className="text-gray-600 mt-2">
          Expected in
        </p>

        <h1 className="text-5xl font-bold text-pink-600 mt-2">
          5 Days
        </h1>

      </div>

      <div className="mt-5 space-y-3">

        <div className="flex justify-between">
          <span>Hydration</span>
          <span>💧</span>
        </div>

        <div className="flex justify-between">
          <span>Exercise</span>
          <span>🏃‍♀️</span>
        </div>

        <div className="flex justify-between">
          <span>Iron-rich Foods</span>
          <span>🥗</span>
        </div>

      </div>
    </div>
  );
}