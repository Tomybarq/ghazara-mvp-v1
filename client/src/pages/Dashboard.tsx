import DashboardLayout from "@/components/DashboardLayout";
import GitHubActivity from "@/components/dashboard/GitHubActivity";

export default function Dashboard() {
  return (
    <DashboardLayout requireAuth={false}>
      <div className="mx-auto w-full max-w-5xl py-4">
        <GitHubActivity />
      </div>
    </DashboardLayout>
  );
}
