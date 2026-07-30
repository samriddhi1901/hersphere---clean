import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

import API from "../services/apiClient";

import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsCards from "../components/dashboard/StatsCards";
import AIRecommendation from "../components/dashboard/AIRecommendation";
import HealthChecklist from "../components/dashboard/HealthChecklist";
import WaterTracker from "../components/dashboard/WaterTracker";
import ReminderCard from "../components/dashboard/ReminderCard";
import RecentActivity from "../components/dashboard/RecentActivity";


export default function Dashboard() {


  const { user, isLoaded } = useUser();

  const navigate = useNavigate();


  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState(null);

  const [summary, setSummary] = useState(null);

  const hasProfile = !!profile;



  // Check whether user has completed wellness profile

  const checkProfile = async (user_id) => {

    try {

      const response = await API.get(
        `/profile/${user_id}`
      );


      if(response.data.exists){

        setProfile(response.data.profile);

        // fetch real dashboard numbers once we know the profile exists
        try {
          const summaryRes = await API.get(`/dashboard/summary/${user_id}`);
          setSummary(summaryRes.data);
        } catch (summaryError) {
          console.error("Failed to load dashboard summary:", summaryError);
        }

      }
      else{

        navigate("/profile-setup");

      }


    } catch(error){

      console.error(
        "Profile check failed:",
        error
      );

    }

  };





  // Sync Clerk user with database

  useEffect(() => {


    const syncUser = async () => {


      try {


        const response = await API.post(
          "/user/sync",
          {

            clerk_user_id:user.id,

            email:
            user.emailAddresses[0].emailAddress,

            name:
            user.firstName || user.username

          }
        );



        console.log(
          "User synced:",
          response.data
        );



        const user_id =
        response.data.user_id;



        localStorage.setItem(
          "user_id",
          user_id
        );



        await checkProfile(user_id);



      }
      catch(error){


        console.error(
          "User sync failed:",
          error
        );


      }
      finally{


        setLoading(false);


      }


    };



    if(!isLoaded){
      return; // Clerk hasn't determined auth state yet, keep waiting
    }

    if(user){

      syncUser();

    } else {

      setLoading(false);
      navigate("/");

    }


  },[isLoaded, user]);





  if(loading){

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h2 className="text-xl font-semibold text-pink-600">

          Loading HerSphere 🌸

        </h2>

      </div>

    );

  }





  if(!hasProfile){

    return null;

  }





  return (

    <AuthenticatedLayout>


      <WelcomeBanner
        name={user?.firstName || user?.username || "there"}
        lifeStage={profile?.life_stage || "period"}
        goal={profile?.wellness_goal}
      />


      <StatsCards lifeStage={profile?.life_stage || "period"} summary={summary} />


      <AIRecommendation lifeStage={profile?.life_stage || "period"} />



      <div className="grid lg:grid-cols-2 gap-6">


        <HealthChecklist summary={summary} />


        <WaterTracker
          summary={summary}
          onWaterUpdate={(newGlasses) =>
            setSummary((prev) => ({ ...prev, water_glasses: newGlasses }))
          }
        />


      </div>




      <div className="grid lg:grid-cols-2 gap-6">


        <ReminderCard summary={summary} lifeStage={profile?.life_stage || "period"} />


        <RecentActivity />


      </div>

    </AuthenticatedLayout>

  );

}