import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Droplet, Baby, Moon, Sparkles } from "lucide-react";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import API from "../services/apiClient";

const stages = [
  {
    id: "period",
    title: "Menstrual Cycle",
    desc: "Track periods, symptoms, and hormonal patterns.",
    icon: Droplet,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "pregnancy",
    title: "Pregnancy",
    desc: "Track your pregnancy journey week by week.",
    icon: Baby,
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "menopause",
    title: "Menopause",
    desc: "Navigate perimenopause and menopause symptoms.",
    icon: Moon,
    color: "from-indigo-500 to-blue-500",
  },
];

export default function ProfileSetup() {
  const navigate = useNavigate();

  const [lifeStage, setLifeStage] = useState("period");
  const [goal, setGoal] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [nutrition, setNutrition] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function saveProfile() {
    if (!goal.trim()) {
      setError("Please tell us your wellness goal.");
      return;
    }
    setError("");
    setSaving(true);

    try {
      const user_id = localStorage.getItem("user_id");

      await API.post("/profile/setup", {
        user_id,
        wellness_goal: goal,
        life_stage: lifeStage,
        cycle_length: lifeStage === "period" ? Number(cycleLength) : null,
        track_nutrition: nutrition,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Profile save failed:", err);
      setError("Something went wrong saving your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AuthenticatedLayout>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto bg-white p-10 rounded-[30px] shadow-xl border border-pink-100"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome to HerSphere</h1>
            <p className="text-gray-500 text-sm">Let's personalize your wellness journey.</p>
          </div>
        </div>

        {/* Life stage selector */}
        <div className="mt-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            What would you like to focus on?
          </label>
          <div className="grid sm:grid-cols-3 gap-4">
            {stages.map((stage) => {
              const isActive = lifeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setLifeStage(stage.id)}
                  className={`text-left p-4 rounded-2xl border-2 transition ${
                    isActive
                      ? "border-pink-400 bg-pink-50 shadow-md"
                      : "border-gray-100 hover:border-pink-200"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stage.color} flex items-center justify-center mb-3`}
                  >
                    <stage.icon className="text-white w-5 h-5" />
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{stage.title}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-4">{stage.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Wellness goal */}
        <div className="mt-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your wellness goal
          </label>
          <input
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="e.g. Manage symptoms, build healthy habits..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>

        {/* Cycle length, only relevant for period tracking */}
        {lifeStage === "period" && (
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Average cycle length (days)
            </label>
            <input
              type="number"
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
            />
          </div>
        )}

        {/* Nutrition toggle */}
        <label className="mt-6 flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={nutrition}
            onChange={(e) => setNutrition(e.target.checked)}
            className="w-4 h-4 accent-pink-500"
          />
          <span className="text-sm text-gray-700">
            Track nutrition alongside {lifeStage === "period" ? "my cycle" : lifeStage}
          </span>
        </label>

        {error && (
          <p className="mt-4 text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">{error}</p>
        )}

        <button
          onClick={saveProfile}
          disabled={saving}
          className="mt-8 w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white p-3.5 rounded-xl font-semibold disabled:opacity-60 hover:shadow-lg transition"
        >
          {saving ? "Saving..." : "Start My Journey 🌸"}
        </button>
      </motion.div>
    </AuthenticatedLayout>
  );
}