import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Sparkles } from "lucide-react";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import API from "../services/apiClient";
import useLifeStage from "../hooks/useLifeStage";

const fields = [
  { key: "hemoglobin", label: "Hemoglobin (g/dL)" },
  { key: "vitamin_d", label: "Vitamin D (ng/mL)" },
  { key: "vitamin_b12", label: "Vitamin B12 (pg/mL)" },
  { key: "folate", label: "Folate (ng/mL)" },
  { key: "iron", label: "Iron / Ferritin (ug/dL)" },
  { key: "calcium", label: "Calcium (mg/dL)" },
  { key: "tsh", label: "TSH / Thyroid (mIU/L)" },
];

export default function NutrientReport() {
  const userId = localStorage.getItem("user_id");
  const { lifeStage } = useLifeStage();

  const [values, setValues] = useState({});
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [latestResult, setLatestResult] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await API.get(`/nutrient-report/${userId}`);
        setReports(res.data.reports || []);
      } catch (err) {
        console.error("Failed to load nutrient reports:", err);
      } finally {
        setLoadingHistory(false);
      }
    }
    if (userId) load();
  }, [userId]);

  function updateField(key, val) {
    setValues({ ...values, [key]: val === "" ? null : Number(val) });
  }

  async function analyze() {
    const hasAnyValue = Object.values(values).some((v) => v !== null && v !== undefined);
    if (!hasAnyValue) return;

    setLoading(true);
    try {
      const res = await API.post("/nutrient-report", {
        user_id: userId,
        life_stage: lifeStage || "period",
        ...values,
      });
      setLatestResult(res.data);
      setReports([res.data, ...reports]);
    } catch (err) {
      console.error("Failed to analyze report:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthenticatedLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-pink-600 flex items-center gap-2">
            <FlaskConical /> Nutrient Report Analysis
          </h1>
          <p className="text-gray-500 mt-2">
            Enter values from your latest lab report — we'll spot deficiencies and build a meal plan around them.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-xl font-semibold mb-5">Enter Your Values</h2>
          <p className="text-xs text-gray-400 mb-5">
            Fill in whatever you have — you don't need every field.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="block text-sm text-gray-600 mb-1">{f.label}</label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full p-3 border rounded-xl"
                  value={values[f.key] ?? ""}
                  onChange={(e) => updateField(f.key, e.target.value)}
                />
              </div>
            ))}
          </div>

          <button
            onClick={analyze}
            disabled={loading}
            className="mt-6 w-full bg-pink-500 text-white p-3 rounded-xl hover:bg-pink-600 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-pulse" /> Analyzing with AI...
              </>
            ) : (
              "Analyze My Report"
            )}
          </button>
        </div>

        {latestResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-purple-50 rounded-3xl p-8"
          >
            <h2 className="text-xl font-semibold text-purple-700 mb-3">💡 Your Analysis</h2>
            <p className="text-purple-800 leading-7">{latestResult.deficiency_summary}</p>

            {latestResult.meal_plan && Object.keys(latestResult.meal_plan).length > 0 && (
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {Object.entries(latestResult.meal_plan).map(([meal, suggestion]) => (
                  <div key={meal} className="bg-white rounded-xl p-4">
                    <p className="font-semibold text-pink-600 capitalize">{meal}</p>
                    <p className="text-gray-600 text-sm mt-1">{suggestion}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-xl font-semibold mb-4">Report History</h2>

          {loadingHistory ? (
            <p className="text-gray-500">Loading...</p>
          ) : reports.length === 0 ? (
            <p className="text-gray-400 text-sm">No reports analyzed yet.</p>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {reports.map((r) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-xl p-4"
                  >
                    <p className="text-xs text-gray-400 mb-2">
                      {new Date(r.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 text-sm">{r.deficiency_summary}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400">
          This is general educational guidance, not a medical diagnosis. Please consult a doctor about your lab results.
        </p>
      </div>
    </AuthenticatedLayout>
  );
}