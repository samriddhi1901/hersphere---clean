import { Droplets } from "lucide-react";
import API from "../../services/apiClient";

export default function WaterTracker({ summary, onWaterUpdate }) {
  const glasses = summary?.water_glasses ?? 0;
  const goal = summary?.water_goal ?? 8;
  const userId = localStorage.getItem("user_id");

  async function addGlass() {
    const newValue = glasses + 1;
    try {
      await API.post("/water", { user_id: userId, glasses: newValue });
      onWaterUpdate?.(newValue);
    } catch (err) {
      console.error("Failed to update water intake:", err);
    }
  }

  const percent = Math.min((glasses / goal) * 100, 100);

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Water Intake</h2>
          <p className="text-gray-500">Stay hydrated today</p>
        </div>
        <Droplets className="text-cyan-500" />
      </div>

      <h3 className="text-4xl font-bold text-cyan-600 mt-5">
        {glasses} / {goal}
      </h3>

      <div className="w-full bg-gray-100 rounded-full h-2.5 mt-4">
        <div
          className="bg-cyan-500 h-2.5 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <button
        onClick={addGlass}
        className="mt-5 w-full bg-cyan-500 text-white p-3 rounded-xl hover:bg-cyan-600 transition"
      >
        + Add Glass
      </button>
    </div>
  );
}