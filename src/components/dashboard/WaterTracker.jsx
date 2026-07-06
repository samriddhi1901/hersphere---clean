import { useState } from "react";
import { Droplets } from "lucide-react";

export default function WaterTracker() {
  const [water, setWater] = useState(6);

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-xl font-bold">
            Water Intake
          </h2>

          <p className="text-gray-500">
            Stay hydrated today
          </p>

        </div>

        <Droplets className="text-cyan-500" />
      </div>

      <h1 className="text-5xl font-bold text-cyan-600 mt-6">
        {water}/8
      </h1>

      <div className="w-full bg-gray-200 rounded-full h-3 mt-6">

        <div
          className="bg-cyan-500 h-3 rounded-full transition-all"
          style={{ width: `${(water / 8) * 100}%` }}
        />

      </div>

      <button
        onClick={() => water < 8 && setWater(water + 1)}
        className="mt-6 w-full bg-cyan-500 text-white py-3 rounded-xl hover:bg-cyan-600"
      >
        + Add Glass
      </button>
    </div>
  );
}