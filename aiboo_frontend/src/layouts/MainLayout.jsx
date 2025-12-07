import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "200px", background: "#eee" }}>Sidebar</aside>

      <div style={{ flex: 1 }}>
        <header style={{ padding: "10px", background: "#ddd" }}>Navbar</header>

        <main style={{ padding: "20px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
