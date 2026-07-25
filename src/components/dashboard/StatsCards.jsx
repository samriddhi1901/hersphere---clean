import {
  Heart,
  Droplets,
  Smile,
  CalendarDays,
  Baby,
  Moon,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

export default function StatsCards({ lifeStage = "period", summary }) {
  if (!summary) return null;

  const {
    wellness_score,
    cycle_day,
    mood,
    water_glasses,
    water_goal,
  } = summary;

  const secondCard =
    lifeStage === "pregnancy"
      ? { title: "Cycle Day", value: cycle_day ? `Day ${cycle_day}` : "No data yet", icon: Baby, color: "bg-purple-100 text-purple-600" }
      : lifeStage === "menopause"
      ? { title: "Tracked Symptoms", value: "View in Cycle Tracker", icon: Activity, color: "bg-indigo-100 text-indigo-600" }
      : { title: "Cycle", value: cycle_day ? `Day ${cycle_day}` : "No data yet", icon: CalendarDays, color: "bg-purple-100 text-purple-600" };

  const stats = [
    {
      title: "Wellness Score",
      value: `${wellness_score}%`,
      icon: Heart,
      color: "bg-pink-100 text-pink-600",
    },
    secondCard,
    {
      title: "Mood",
      value: mood || "Not logged yet",
      icon: lifeStage === "menopause" ? Moon : Smile,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Water",
      value: `${water_glasses} / ${water_goal}`,
      icon: Droplets,
      color: "bg-cyan-100 text-cyan-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      {stats.map((card, i) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition-shadow cursor-default"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.color}`}
            >
              <Icon />
            </div>

            <p className="text-gray-500 mt-5">{card.title}</p>

            <h2 className="text-3xl font-bold mt-2">
              {card.value}
            </h2>
          </motion.div>
        );
      })}
    </div>
  );
}