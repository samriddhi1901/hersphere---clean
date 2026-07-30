import { useState } from "react";
import { Check } from "lucide-react";

export default function HealthChecklist({ summary }) {
  // Manual-only items (nothing tracks these elsewhere yet)
  const [manualTasks, setManualTasks] = useState([
    { id: "exercise", text: "Exercise for 30 minutes", done: false },
    { id: "sleep", text: "Sleep at least 7 hours", done: false },
  ]);

  const toggleTask = (id) => {
    setManualTasks(
      manualTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const waterDone = (summary?.water_glasses ?? 0) >= (summary?.water_goal ?? 8);
  const mealDone = (summary?.meals_logged_today ?? 0) > 0;

  const autoTasks = [
    { id: "water", text: "Drink 8 glasses of water", done: waterDone },
    { id: "meal", text: "Log a meal today", done: mealDone },
  ];

  const allTasks = [...autoTasks, ...manualTasks];

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-green-100 p-2 rounded-xl">
          <Check className="text-green-600" size={18} />
        </div>
        <h2 className="text-xl font-bold">Today's Checklist</h2>
      </div>

      <div className="space-y-3">
        {allTasks.map((task) => {
          const isManual = manualTasks.some((t) => t.id === task.id);
          return (
            <label
              key={task.id}
              className={`flex items-center gap-3 ${isManual ? "cursor-pointer" : "cursor-default"}`}
            >
              <input
                type="checkbox"
                checked={task.done}
                disabled={!isManual}
                onChange={() => isManual && toggleTask(task.id)}
                className="w-4 h-4 accent-pink-500"
              />
              <span className={task.done ? "line-through text-gray-400" : "text-gray-700"}>
                {task.text}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}