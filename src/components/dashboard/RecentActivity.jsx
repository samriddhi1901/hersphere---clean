import { useState, useEffect } from "react";
import { Bot, Smile, Droplets, Apple, FileText } from "lucide-react";
import API from "../../services/apiClient";

const iconByType = {
  mood: { icon: Smile, color: "bg-yellow-100 text-yellow-600" },
  nutrition: { icon: Apple, color: "bg-green-100 text-green-600" },
  water: { icon: Droplets, color: "bg-cyan-100 text-cyan-600" },
};

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const userId = localStorage.getItem("user_id");
      try {
        const res = await API.get(`/dashboard/recent-activity/${userId}`);
        setActivities(res.data.activities || []);
      } catch (err) {
        console.error("Failed to load recent activity:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-orange-500" size={20} />
        <h2 className="text-xl font-bold">Recent Activity</h2>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : activities.length === 0 ? (
        <p className="text-gray-400 text-sm">
          No activity yet — log a mood, meal, or water intake to see it here.
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map((a, i) => {
            const config = iconByType[a.type] || { icon: Bot, color: "bg-purple-100 text-purple-600" };
            const Icon = config.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${config.color}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-medium">{a.title}</p>
                  <p className="text-gray-400 text-sm">{timeAgo(a.created_at)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}