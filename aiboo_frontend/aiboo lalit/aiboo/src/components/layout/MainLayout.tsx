import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/navigation/Sidebar";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-float" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-accent rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-cyber-purple rounded-full animate-float" style={{ animationDelay: "4s" }} />
      </div>
    </div>
  );
};