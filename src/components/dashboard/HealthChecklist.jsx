import { useState } from "react";

export default function HealthChecklist() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Drink 8 glasses of water", done: false },
    { id: 2, text: "Exercise for 30 minutes", done: false },
    { id: 3, text: "Take supplements", done: true },
    { id: 4, text: "Sleep at least 7 hours", done: false },
  ]);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-5">
        ✅ Today's Checklist
      </h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <label
            key={task.id}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="w-5 h-5 accent-pink-500"
            />

            <span
              className={
                task.done
                  ? "line-through text-gray-400"
                  : "text-gray-700"
              }
            >
              {task.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}