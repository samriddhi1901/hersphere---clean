import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AuthenticatedLayout({ children }) {
  return (
    <div className="min-h-screen bg-pink-50">

      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-72 min-h-screen">

        {/* Sticky Topbar */}
        <div className="sticky top-0 z-30 bg-pink-50/90 backdrop-blur-md border-b border-pink-100">
          <Topbar />
        </div>

        {/* Page Content */}
        <div className="p-8 space-y-6">
          {children}
        </div>

      </main>

    </div>
  );
}