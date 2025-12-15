import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ServerCenter from "./pages/ServerCenter";
import Surveillance from "./pages/Surveillance";
import PenTest from "./pages/PenTest";
import Security from "./pages/Security";
import Assistant from "./pages/Assistant";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/*" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="servers" element={<ServerCenter />} />
            <Route path="surveillance" element={<Surveillance />} />
            <Route path="pentest" element={<PenTest />} />
            <Route path="security" element={<Security />} />
            <Route path="assistant" element={<Assistant />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
