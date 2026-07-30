import { CalendarClock } from "lucide-react";

export default function ReminderCard({ summary, lifeStage = "period" }) {
  if (lifeStage !== "period") {
    return null; // only relevant for period tracking
  }

  const { cycle_day, cycle_length } = summary || {};

  const daysUntilNext =
    cycle_day && cycle_length ? Math.max(cycle_length - cycle_day, 0) : null;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="bg-pink-100 p-3 rounded-2xl">
          <CalendarClock className="text-pink-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">Upcoming Reminder</h2>
          <p className="text-gray-500 text-sm">Stay prepared</p>
        </div>
      </div>

      <div className="mt-5 bg-pink-50 rounded-2xl p-5">
        <p className="text-pink-600 font-semibold">🌸 Next Period</p>

        {daysUntilNext !== null ? (
          <>
            <p className="text-gray-500 mt-1">Expected in</p>
            <h3 className="text-4xl font-bold text-pink-600 mt-1">
              {daysUntilNext} Day{daysUntilNext !== 1 ? "s" : ""}
            </h3>
          </>
        ) : (
          <p className="text-gray-500 mt-2 text-sm">
            Log a cycle entry in Cycle Tracker to see your prediction here.
          </p>
        )}
      </div>
    </div>
  );
}