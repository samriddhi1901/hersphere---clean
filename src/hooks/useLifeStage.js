import { useState, useEffect } from "react";
import API from "../services/apiClient";

// Shared hook: any component can call this to know the user's
// current life stage (period / pregnancy / menopause) without
// duplicating the profile fetch everywhere.
export default function useLifeStage() {
  const [lifeStage, setLifeStage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const res = await API.get(`/profile/${userId}`);
        if (res.data.exists) {
          setLifeStage(res.data.profile.life_stage || "period");
        }
      } catch (err) {
        console.error("useLifeStage: failed to load profile", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { lifeStage, loading };
}