import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

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


  useEffect(() => {

    const syncUser = async () => {

      try {

        const response = await API.post("/user/sync", {

          clerk_user_id: user.id,

          email: user.emailAddresses[0].emailAddress,

          name: user.firstName || user.username

        });


        console.log(
          "User synced:",
          response.data
        );


        // Save database user id
        localStorage.setItem(
          "user_id",
          response.data.user_id
        );


      } catch(error) {

        console.error(
          "User sync failed:",
          error
        );

      }

    };


    if(user){
      syncUser();
    }


  }, [user]);


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