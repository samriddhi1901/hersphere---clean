import { useState } from "react";
import { motion } from "framer-motion";
import { Droplet, Moon, Salad, Brain, Flower2, Activity } from "lucide-react";

const topics = [
  { icon: Droplet, title: "Menstrual Health", desc: "Cycles, symptoms, and what's normal vs. what's not.", color: "from-pink-500 to-rose-500" },
  { icon: Flower2, title: "PCOS & Hormones", desc: "Understanding hormonal balance and common conditions.", color: "from-purple-500 to-indigo-500" },
  { icon: Moon, title: "Menopause", desc: "Navigating perimenopause and menopause with confidence.", color: "from-indigo-500 to-blue-500" },
  { icon: Brain, title: "Mental Wellness", desc: "Mood, stress, and emotional health across life stages.", color: "from-teal-500 to-cyan-500" },
  { icon: Salad, title: "Nutrition", desc: "Eating for hormonal health at every stage of life.", color: "from-green-500 to-emerald-500" },
  { icon: Activity, title: "Fitness & Energy", desc: "Movement and energy patterns tailored to your cycle.", color: "from-orange-500 to-amber-500" },
];

export default function HealthTopics() {
  const [active, setActive] = useState(0);

  return (
    <section id="topics" className="py-28 bg-[#FFF8FA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Explore <span className="text-pink-600">health topics</span>
          </h2>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Tap a topic to see what HerSphere helps you understand.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Topic buttons */}
          <div className="lg:col-span-1 space-y-3">
            {topics.map((topic, i) => (
              <button
                key={topic.title}
                onClick={() => setActive(i)}
                className={`w-full text-left px-5 py-4 rounded-2xl border transition flex items-center gap-4 ${
                  active === i
                    ? "bg-white border-pink-300 shadow-md"
                    : "bg-transparent border-transparent hover:bg-white/60"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${topic.color} flex items-center justify-center shrink-0`}>
                  <topic.icon className="text-white w-5 h-5" />
                </div>
                <span className="font-semibold text-gray-900">{topic.title}</span>
              </button>
            ))}
          </div>

          {/* Active topic detail */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-pink-100 p-10 min-h-[260px] flex flex-col justify-center"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${topics[active].color} flex items-center justify-center mb-6`}>
              {(() => {
                const Icon = topics[active].icon;
                return <Icon className="text-white w-8 h-8" />;
              })()}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{topics[active].title}</h3>
            <p className="text-gray-600 leading-7 text-lg">{topics[active].desc}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}