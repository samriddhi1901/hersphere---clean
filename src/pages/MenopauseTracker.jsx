import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Flame } from "lucide-react";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import API from "../services/apiClient";

export default function MenopauseTracker() {
  const userId = localStorage.getItem("user_id");

  const [hotFlashes, setHotFlashes] = useState(0);
  const [mood, setMood] = useState("Okay");
  const [sleepQuality, setSleepQuality] = useState("Fair");
  const [notes, setNotes] = useState("");
  const [logs, setLogs] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await API.get(`/menopause/${userId}`);
        setLogs(res.data.logs || []);
      } catch (err) {
        console.error("Failed to load menopause logs:", err);
      } finally {
        setLoading(false);
      }
    }
    if (userId) load();
  }, [userId]);

  async function saveCheckIn() {
    setSaving(true);
    try {
      const res = await API.post("/menopause", {
        user_id: userId,
        hot_flashes: hotFlashes,
        mood,
        sleep_quality: sleepQuality,
        notes,
      });
      setLogs([
        { id: Date.now(), hot_flashes: hotFlashes, mood, sleep_quality: sleepQuality, notes, created_at: new Date().toISOString() },
        ...logs,
      ]);
      setNotes("");
    } catch (err) {
      console.error("Failed to save check-in:", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <AuthenticatedLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-indigo-600 flex items-center gap-2">
            <Moon /> Menopause Tracker
          </h1>
          <p className="text-gray-500 mt-2">Log how you're feeling today.</p>
        </div>

        <div className="bg-white rounded-3xl shadow p-8 space-y-5">
          <div>
            <label className="block font-semibold mb-2 flex items-center gap-2">
              <Flame size={18} className="text-orange-500" /> Hot flashes today
            </label>
            <div className="flex items-center gap-4">
              <button onClick={() => setHotFlashes(Math.max(0, hotFlashes - 1))} className="px-4 py-2 bg-gray-200 rounded-xl">-</button>
              <span className="text-2xl font-bold text-indigo-600">{hotFlashes}</span>
              <button onClick={() => setHotFlashes(hotFlashes + 1)} className="px-4 py-2 bg-indigo-500 text-white rounded-xl">+</button>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">Mood</label>
            <select className="w-full p-3 border rounded-xl" value={mood} onChange={(e) => setMood(e.target.value)}>
              <option>Great</option>
              <option>Okay</option>
              <option>Low</option>
              <option>Irritable</option>
              <option>Anxious</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Sleep quality</label>
            <select className="w-full p-3 border rounded-xl" value={sleepQuality} onChange={(e) => setSleepQuality(e.target.value)}>
              <option>Great</option>
              <option>Fair</option>
              <option>Poor</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Notes (optional)</label>
            <input
              className="w-full p-3 border rounded-xl"
              placeholder="Anything else you noticed today..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button
            onClick={saveCheckIn}
            disabled={saving}
            className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Today's Check-in"}
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-xl font-semibold mb-4">History</h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : logs.length === 0 ? (
            <p className="text-gray-400 text-sm">No check-ins yet.</p>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-xl p-4"
                  >
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>{new Date(log.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-5 text-sm">
                      <span>🔥 {log.hot_flashes} hot flashes</span>
                      <span>😊 {log.mood}</span>
                      <span>😴 {log.sleep_quality} sleep</span>
                    </div>
                    {log.notes && <p className="text-gray-600 text-sm mt-2">{log.notes}</p>}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}