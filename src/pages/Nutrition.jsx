import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Droplets } from "lucide-react";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import API from "../services/apiClient";

export default function Nutrition() {
  const [mealType, setMealType] = useState("Breakfast");
  const [foodDescription, setFoodDescription] = useState("");
  const [water, setWater] = useState(0);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await API.get(`/nutrition/${userId}`);
        setMeals(res.data.nutrition || []);
      } catch (err) {
        console.error("Failed to load nutrition history:", err);
      } finally {
        setLoadingHistory(false);
      }
    }
    async function loadWater() {
      try {
        const res = await API.get(`/water/${userId}`);
        setWater(res.data.glasses || 0);
      } catch (err) {
        console.error("Failed to load water intake:", err);
      }
    }
    if (userId) {
      loadHistory();
      loadWater();
    }
  }, [userId]);

  async function updateWater(newValue) {
    setWater(newValue);
    try {
      await API.post("/water", { user_id: userId, glasses: newValue });
    } catch (err) {
      console.error("Failed to save water intake:", err);
    }
  }

  async function addMeal() {
    if (!foodDescription.trim()) {
      setError("Tell us what you ate, e.g. '2 rotis and dal'");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/nutrition", {
        user_id: userId,
        meal_type: mealType,
        food_description: foodDescription,
      });

      setMeals([res.data.log, ...meals]);
      setFoodDescription("");
    } catch (err) {
      console.error("Failed to add meal:", err);
      setError("Something went wrong estimating your meal. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const totalCalories = meals.reduce(
    (sum, item) => sum + Number(item.calories || 0),
    0
  );

  return (
    <AuthenticatedLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-pink-600">
            🥗 Nutrition Tracker
          </h1>
          <p className="text-gray-500 mt-2">
            Just tell us what you ate — our AI estimates the rest.
          </p>
        </div>

        {/* Add Meal */}
        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-xl font-semibold mb-5">Add Today's Meal</h2>

          <select
            className="w-full p-3 border rounded-xl mb-4"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>

          <input
            className="w-full p-3 border rounded-xl mb-2"
            placeholder="Example: 2 rotis, dal, and a bowl of curd"
            value={foodDescription}
            onChange={(e) => setFoodDescription(e.target.value)}
          />
          <p className="text-xs text-gray-400 mb-4">
            Describe it naturally — no need to know calorie counts.
          </p>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl mb-4">
              {error}
            </p>
          )}

          <button
            onClick={addMeal}
            disabled={loading}
            className="w-full bg-pink-500 text-white p-3 rounded-xl hover:bg-pink-600 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-pulse" />
                Estimating with AI...
              </>
            ) : (
              "Add Meal 🍽️"
            )}
          </button>
        </div>

        {/* Water */}
        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Droplets className="text-cyan-500" /> Water Intake
          </h2>
          <p className="text-gray-500 mt-2">Glasses consumed today</p>

          <div className="flex items-center gap-5 mt-5">
            <button
              onClick={() => updateWater(Math.max(0, water - 1))}
              className="px-5 py-2 bg-gray-200 rounded-xl"
            >
              -
            </button>
            <span className="text-3xl font-bold text-pink-600">{water}</span>
            <button
              onClick={() => updateWater(water + 1)}
              className="px-5 py-2 bg-pink-500 text-white rounded-xl"
            >
              +
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-xl font-semibold mb-5">📊 Today's Summary</h2>
          <p><b>Total Calories:</b> {totalCalories} kcal</p>
          <p className="mt-2"><b>Water:</b> {water} glasses</p>
        </div>

        {/* Meal History */}
        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-xl font-semibold mb-5">🍴 Your Meals</h2>

          {loadingHistory ? (
            <p className="text-gray-500">Loading your meal history...</p>
          ) : meals.length === 0 ? (
            <p className="text-gray-500">No meals added yet.</p>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {meals.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-xl p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{item.meal_type}</p>
                        <p>{item.food_description}</p>
                      </div>
                      <p className="text-pink-600 font-bold whitespace-nowrap">
                        {item.calories} kcal
                      </p>
                    </div>

                    <div className="flex gap-4 text-xs text-gray-500 mt-2">
                      <span>Protein: {item.protein_g}g</span>
                      <span>Carbs: {item.carbs_g}g</span>
                      <span>Fat: {item.fat_g}g</span>
                    </div>

                    {item.suggestion && (
                      <p className="text-sm text-purple-600 bg-purple-50 rounded-lg px-3 py-2 mt-3">
                        💡 {item.suggestion}
                      </p>
                    )}
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