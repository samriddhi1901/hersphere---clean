import {
  Bot,
  Smile,
  Droplets,
  Apple,
} from "lucide-react";

const activities = [
  {
    icon: Bot,
    title: "Asked AI about PCOS",
    time: "10 min ago",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Smile,
    title: "Mood updated to Happy",
    time: "2 hrs ago",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: Droplets,
    title: "Logged Water Intake",
    time: "Today",
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    icon: Apple,
    title: "Nutrition Tip Viewed",
    time: "Yesterday",
    color: "bg-green-100 text-green-600",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">
        📋 Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}
              >
                <Icon size={20} />
              </div>

              <div className="flex-1">
                <h4 className="font-semibold">
                  {item.title}
                </h4>

                <p className="text-gray-500 text-sm">
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}