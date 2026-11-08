import {
  AdminHeader,
  StatsCards,
  RecentNews,
  QuickActions,
  WelcomeSection,
} from "./components/export";
import { mockArticles } from "./data/mock-data";
import { getDashboardStats } from "./actions/stats";

export default async function AdminDashboard() {
  // Fetch stats from database
  const stats = await getDashboardStats();

  return (
    <>
      <AdminHeader title="Dashboard" />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Welcome Section */}
          <WelcomeSection />

          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            <RecentNews articles={mockArticles.slice(0, 5)} />
            <QuickActions />
          </div>
        </div>
      </main>
    </>
  );
}
