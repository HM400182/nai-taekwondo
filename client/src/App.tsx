import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import About from "./pages/About";
import KidsClasses from "./pages/classes/Kids";
import AdultClasses from "./pages/classes/Adults";
import PrivateClasses from "./pages/classes/Private";
import Coaches from "./pages/Coaches";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Join from "./pages/Join";
import LoginPage from "./pages/Login";
import AdminLayout from "./pages/admin";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Index} />
      <Route path="/about" component={About} />
      <Route path="/classes/kids" component={KidsClasses} />
      <Route path="/classes/adults" component={AdultClasses} />
      <Route path="/classes/private" component={PrivateClasses} />
      <Route path="/coaches" component={Coaches} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/events" component={Events} />
      <Route path="/join" component={Join} />
      <Route path="/login" component={LoginPage} />
      <Route path="/admin/:rest*" component={AdminLayout} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="nairobi-tkd-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
