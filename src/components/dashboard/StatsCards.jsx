import {
  Heart,
  Droplets,
  Smile,
  CalendarDays,
} from "lucide-react";

const stats = [
  {
    title: "Wellness Score",
    value: "84%",
    icon: Heart,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Cycle",
    value: "Day 12",
    icon: CalendarDays,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Mood",
    value: "Happy",
    icon: Smile,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Water",
    value: "6 / 8",
    icon: Droplets,
    color: "bg-cyan-100 text-cyan-600",
  },
];

export default function StatsCards() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      {stats.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-3xl shadow-sm p-6 hover:shadow-xl transition"
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
          </div>
        );
      })}
    </div>
  );
}