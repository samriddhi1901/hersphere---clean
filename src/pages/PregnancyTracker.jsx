import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Baby, Sparkles } from "lucide-react";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import API from "../services/apiClient";

const trimesterTips = {
  1: "Focus on folate-rich foods and gentle rest — early weeks can be tiring.",
  2: "Energy often improves now. Light walks and balanced meals help a lot.",
  3: "Rest when you can and keep up with your prenatal checkups.",
};

export default function PregnancyTracker() {
  const userId = localStorage.getItem("user_id");

  const [dueDate, setDueDate] = useState("");
  const [info, setInfo] = useState(null);
  const [symptom, setSymptom] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await API.get(`/pregnancy/${userId}`);
        if (res.data.exists) {
          setInfo(res.data);
          setDueDate(res.data.due_date);
        }
        const symptomRes = await API.get(`/pregnancy/symptoms/${userId}`);
        setSymptoms(symptomRes.data.symptoms || []);
      } catch (err) {
        console.error("Failed to load pregnancy data:", err);
      } finally {
        setLoading(false);
      }
    }
    if (userId) load();
  }, [userId]);

  async function saveDueDate() {
    if (!dueDate) return;
    setSaving(true);
    try {
      const res = await API.post("/pregnancy", { user_id: userId, due_date: dueDate });
      setInfo({ ...res.data, due_date: dueDate, exists: true });
    } catch (err) {
      console.error("Failed to save due date:", err);
    } finally {
      setSaving(false);
    }
  }

  async function addSymptom() {
    if (!symptom.trim()) return;
    try {
      await API.post("/pregnancy/symptom", { user_id: userId, symptom });
      setSymptoms([{ id: Date.now(), symptom, created_at: new Date().toISOString() }, ...symptoms]);
      setSymptom("");
    } catch (err) {
      console.error("Failed to log symptom:", err);
    }
  }

  if (loading) {
    return (
      <AuthenticatedLayout>
        <p className="text-gray-500">Loading your pregnancy tracker...</p>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
            <Baby /> Pregnancy Tracker
          </h1>
          <p className="text-gray-500 mt-2">Follow your journey week by week.</p>
        </div>

        {/* Due date + week display */}
        <div className="bg-white rounded-3xl shadow p-8">
          {!info?.exists ? (
            <>
              <h2 className="text-xl font-semibold mb-4">When is your due date?</h2>
              <input
                type="date"
                className="w-full p-3 border rounded-xl mb-4"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <button
                onClick={saveDueDate}
                disabled={saving}
                className="w-full bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Due Date"}
              </button>
            </>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-gray-500">You're currently in</p>
              <h2 className="text-4xl font-bold text-purple-600 mt-1">
                Week {info.current_week}
              </h2>
              <p className="text-gray-500 mt-2">
                Trimester {info.trimester} &middot; {info.days_left} days until due date
              </p>

              <div className="mt-5 bg-purple-50 rounded-xl px-5 py-4 flex items-start gap-3">
                <Sparkles className="text-purple-500 mt-0.5" size={18} />
                <p className="text-purple-700 text-sm">
                  {trimesterTips[info.trimester]}
                </p>
              </div>

              <button
                onClick={() => setInfo({ ...info, exists: false })}
                className="mt-4 text-sm text-gray-400 hover:text-purple-600"
              >
                Update due date
              </button>
            </motion.div>
          )}
        </div>

        {/* Symptom logging */}
        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-xl font-semibold mb-4">Log a Symptom</h2>
          <div className="flex gap-3">
            <input
              className="flex-1 p-3 border rounded-xl"
              placeholder="e.g. Morning sickness, back pain..."
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
            />
            <button
              onClick={addSymptom}
              className="px-6 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
            >
              Add
            </button>
          </div>

          <div className="mt-5 space-y-2">
            <AnimatePresence>
              {symptoms.map((s) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-xl px-4 py-3 flex justify-between items-center"
                >
                  <span>{s.symptom}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(s.created_at).toLocaleDateString()}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {symptoms.length === 0 && (
              <p className="text-gray-400 text-sm">No symptoms logged yet.</p>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}