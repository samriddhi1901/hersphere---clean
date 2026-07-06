import { Bot } from "lucide-react";

export default function AIRecommendation() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 mt-6 hover:shadow-md transition">
      
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
          <Bot />
        </div>

        <h2 className="text-xl font-bold">
          AI Health Insight
        </h2>
      </div>

      <p className="text-gray-500 mt-4">
        You're currently in a high-energy phase of your cycle.
      </p>

      <div className="mt-4 space-y-2 text-gray-700">
        <p>💡 Increase iron-rich foods</p>
        <p>💧 Drink more water today</p>
        <p>😴 Maintain 7–8 hours sleep</p>
      </div>

      <button className="mt-5 px-5 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
        Open AI Assistant
      </button>
    </div>
  );
}