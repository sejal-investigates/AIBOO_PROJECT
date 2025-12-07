import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/dashboard.jsx";
import Login from "../pages/login.jsx";
import Settings from "../pages/settings.jsx";
import Logs from "../pages/logs.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logs" element={<Logs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}