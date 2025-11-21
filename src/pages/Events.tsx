import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Layout } from "@/components/Layout";
import { EventCard } from "@/components/EventCard";
import { AnnouncementCard } from "@/components/AnnouncementCard";
import { PastEventGallery } from "@/components/PastEventGallery";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Megaphone, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
}

interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  category?: "Update" | "Promotion" | "Schedule" | "General";
}

const EventsPage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<EventData[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Real-time listener for events
    const eventsQuery = query(collection(db, "events"), orderBy("date", "asc"));
    const unsubscribeEvents = onSnapshot(eventsQuery, (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as EventData[];
      setUpcomingEvents(eventsData);
      setLoading(false);
    });

    // Real-time listener for announcements
    const announcementsQuery = query(collection(db, "announcements"), orderBy("date", "desc"));
    const unsubscribeAnnouncements = onSnapshot(announcementsQuery, (snapshot) => {
      const announcementsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Announcement[];
      setAnnouncements(announcementsData);
    });

    return () => {
      unsubscribeEvents();
      unsubscribeAnnouncements();
    };
  }, []);

  return (
    <Layout>
      {/* hero — keep your existing hero markup */}
      <section className="relative py-20 md:py-32 hero-gradient overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Stay Updated</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Events & Announcements</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">Stay updated with the latest Taekwondo news, events, and updates.</p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
            <Link to="/join">Join Our Next Event</Link>
          </Button>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Upcoming Events</h2>
              <p className="text-muted-foreground">Mark your calendars</p>
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[1, 2, 3].map((n) => (
                <Card key={n} className="p-6">
                  <Skeleton className="h-48 w-full mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </Card>
              ))}
            </div>
          ) : upcomingEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed"
            >
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground text-lg">No events yet — check back soon!</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {upcomingEvents.map((event, idx) => {
                const isUpcoming = new Date(event.date) > new Date();
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="relative"
                  >
                    {isUpcoming && (
                      <div className="absolute -top-3 -right-3 z-10">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-primary to-accent text-white shadow-lg animate-glow-pulse">
                          🔥 Upcoming
                        </span>
                      </div>
                    )}
                    <EventCard {...event} />
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* announcements section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Announcements</h2>
              <p className="text-muted-foreground">Important updates</p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {announcements.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-muted/20 rounded-lg"
              >
                <Megaphone className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No announcements at this time.</p>
              </motion.div>
            ) : (
              announcements.map((a, idx) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <AnnouncementCard {...a} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <PastEventGallery />
        </div>
      </section>
    </Layout>
  );
};

export default EventsPage;
