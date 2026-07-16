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


  const { user } = useUser();

  const navigate = useNavigate();


  const [loading, setLoading] = useState(true);

  const [hasProfile, setHasProfile] = useState(false);



  // Check whether user has completed wellness profile

  const checkProfile = async (user_id) => {

    try {

      const response = await API.get(
        `/profile/${user_id}`
      );


      if(response.data.exists){

        setHasProfile(true);

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



    if(user){

      syncUser();

    }


  },[user]);





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


      <WelcomeBanner />


      <StatsCards />


      <AIRecommendation />



      <div className="grid lg:grid-cols-2 gap-6">


        <HealthChecklist />


        <WaterTracker />


      </div>




      <div className="grid lg:grid-cols-2 gap-6">


        <ReminderCard />


        <RecentActivity />


      </div>



    </AuthenticatedLayout>

  );

}