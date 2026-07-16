import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import API from "../services/apiClient";


export default function ProfileSetup(){

  const navigate = useNavigate();

  const [goal,setGoal] = useState("");
  const [cycleLength,setCycleLength] = useState(28);
  const [nutrition,setNutrition] = useState(false);


  async function saveProfile(){

    const user_id = localStorage.getItem("user_id");


    await API.post("/profile/setup",{

      user_id,
      wellness_goal: goal,
      cycle_length: cycleLength,
      track_nutrition: nutrition

    });


    navigate("/dashboard");

  }


  return(

    <AuthenticatedLayout>

      <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow">


        <h1 className="text-3xl font-bold text-pink-600">
          Welcome to HerSphere 🌸
        </h1>


        <p className="mt-2 text-gray-600">
          Let's personalize your wellness journey.
        </p>



        <div className="mt-6 space-y-4">


          <input
          className="w-full p-3 border rounded-xl"
          placeholder="Your wellness goal"
          value={goal}
          onChange={(e)=>setGoal(e.target.value)}
          />



          <input
          type="number"
          className="w-full p-3 border rounded-xl"
          placeholder="Cycle length"
          value={cycleLength}
          onChange={(e)=>setCycleLength(e.target.value)}
          />



          <label>

          <input
          type="checkbox"
          checked={nutrition}
          onChange={(e)=>setNutrition(e.target.checked)}
          />

          {" "} Track Nutrition

          </label>



          <button
          onClick={saveProfile}
          className="w-full bg-pink-500 text-white p-3 rounded-xl"
          >

          Start My Journey 🌸

          </button>


        </div>


      </div>


    </AuthenticatedLayout>

  )

}