import { useState } from "react";
import { motion } from "framer-motion";
import { HeartPulse, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";

const conditions = [
  {
    id: "pcos",
    title: "PCOS",
    desc: "Polycystic Ovary Syndrome — a hormonal condition affecting ovulation, often linked to irregular periods, weight changes, and acne.",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "pcod",
    title: "PCOD",
    desc: "Polycystic Ovarian Disease — related to PCOS, involving the ovaries releasing immature or partially mature eggs.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "endometriosis",
    title: "Endometriosis",
    desc: "A condition where tissue similar to the uterine lining grows outside the uterus, often causing pain.",
    color: "from-red-500 to-pink-500",
  },
  {
    id: "thyroid",
    title: "Thyroid Health",
    desc: "Thyroid imbalances can affect cycles, weight, energy, and mood — worth understanding at any life stage.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "fertility",
    title: "Fertility Basics",
    desc: "General information on ovulation tracking and factors that can affect fertility.",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "mental-health",
    title: "Hormonal Mental Health",
    desc: "How hormonal shifts across life stages can affect mood, anxiety, and emotional wellbeing.",
    color: "from-indigo-500 to-blue-500",
  },
];

export default function ConditionsHub() {
  const navigate = useNavigate();
  const [active, setActive] = useState(conditions[0]);

  function chatAboutThis(title) {
    localStorage.setItem("chat_prefill", `Can you tell me more about ${title}?`);
    navigate("/chat");
  }

  return (
    <AuthenticatedLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-pink-600 flex items-center gap-2">
            <HeartPulse /> Conditions Hub
          </h1>
          <p className="text-gray-500 mt-2">
            Learn about conditions that can affect women at any life stage.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-3">
            {conditions.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition ${
                  active.id === c.id
                    ? "border-pink-300 bg-pink-50 shadow-md"
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                <span className="font-semibold text-gray-900">{c.title}</span>
              </button>
            ))}
          </div>

          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-10"
          >
            <div className={`inline-block px-4 py-1 rounded-full text-white text-sm bg-gradient-to-r ${active.color} mb-4`}>
              {active.title}
            </div>
            <p className="text-gray-600 leading-7 text-lg">{active.desc}</p>

            <button
              onClick={() => chatAboutThis(active.title)}
              className="mt-6 flex items-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
            >
              <MessageCircle size={18} /> Chat about this with AI
            </button>

            <p className="text-xs text-gray-400 mt-4">
              This is general educational information, not a medical diagnosis. Please consult a doctor for personal concerns.
            </p>
          </motion.div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}