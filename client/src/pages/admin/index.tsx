import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { Calendar, Users, Image, Megaphone, LogOut, LayoutDashboard, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/ProtectedRoute";
import EventsManager from "@/components/admin/EventsManager";
import CoachesManager from "@/components/admin/CoachesManager";
import MediaManager from "@/components/admin/MediaManager";
import AnnouncementsManager from "@/components/admin/AnnouncementsManager";
import Dashboard from "./Dashboard";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const navLinks = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/events", label: "Events", icon: Calendar },
    { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
    { to: "/admin/coaches", label: "Coaches", icon: Users },
    { to: "/admin/media", label: "Media", icon: Image },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card border-r">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Swift Taekwondo
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full gap-2 hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 flex-shrink-0">
            <div className="flex items-center gap-4">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/events" element={<EventsManager />} />
                <Route path="/announcements" element={<AnnouncementsManager />} />
                <Route path="/coaches" element={<CoachesManager />} />
                <Route path="/media" element={<MediaManager />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
