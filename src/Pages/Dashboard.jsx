import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsCards from "../components/dashboard/StatsCards";
import AIRecommendation from "../components/dashboard/AIRecommendation";
import HealthChecklist from "../components/dashboard/HealthChecklist";
import WaterTracker from "../components/dashboard/WaterTracker";
import ReminderCard from "../components/dashboard/ReminderCard";
import RecentActivity from "../components/dashboard/RecentActivity";

export default function Dashboard() {
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