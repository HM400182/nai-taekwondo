// src/components/admin/AdminSidebar.tsx
import { NavLink } from "react-router-dom";
import { Calendar, Users, Image, Megaphone, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function AdminSidebar() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const links = [
    { to: "/admin/events", label: "Events", icon: <Calendar className="w-4 h-4" /> },
    { to: "/admin/coaches", label: "Coaches", icon: <Users className="w-4 h-4" /> },
    { to: "/admin/photos", label: "Photos", icon: <Image className="w-4 h-4" /> },
    { to: "/admin/announcements", label: "Announcements", icon: <Megaphone className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-primary text-white flex flex-col">
      <div className="p-4 border-b border-white/20">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition 
               ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/20">
        <Button
          onClick={handleLogout}
          variant="secondary"
          className="w-full bg-white text-primary hover:bg-white/90"
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </div>
    </aside>
  );
}
