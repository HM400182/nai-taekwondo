import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Plus, Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id?: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
}

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState<Event>({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    category: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  // 🔥 Live sync with Supabase
  useEffect(() => {
    fetchEvents();

    const channel = supabase
      .channel("events-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "events" }, () => {
        fetchEvents();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (!error && data) {
      setEvents(data);
    }
  };

  // 🧾 Handle input changes
  const handleChange = (key: keyof Event, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // ➕ Add or Update Event
  const handleSubmit = async () => {
    if (!formData.title || !formData.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in the title and date",
        variant: "destructive",
      });
      return;
    }

    try {
      const { id, ...dataToSave } = formData;
      
      if (editingId) {
        // Update existing event
        const { error } = await supabase
          .from("events")
          .update(dataToSave)
          .eq("id", editingId);

        if (error) throw error;
        setEditingId(null);
        toast({
          title: "Success",
          description: "Event updated successfully",
        });
      } else {
        // Add new event
        const { error } = await supabase
          .from("events")
          .insert([dataToSave]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Event created successfully",
        });
      }

      // Reset form
      setFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        category: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save event",
        variant: "destructive",
      });
    }
  };

  // ✏️ Edit existing event
  const handleEdit = (event: Event) => {
    setFormData(event);
    setEditingId(event.id!);
  };

  // ❌ Delete event
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const { error } = await supabase
          .from("events")
          .delete()
          .eq("id", id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Event deleted successfully",
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to delete event",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-card">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Calendar className="w-6 h-6 text-primary" />
          {editingId ? "Edit Event" : "Manage Events"}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        {/* Add/Edit Event Form */}
        <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
          <div>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </div>
          <div>
            <Label>Time</Label>
            <Input
              type="time"
              value={formData.time}
              onChange={(e) => handleChange("time", e.target.value)}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div>
            <Label>Category</Label>
            <Input
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          <Button onClick={handleSubmit} className="gap-2">
            <Plus className="w-4 h-4" />
            {editingId ? "Update Event" : "Add Event"}
          </Button>
          {editingId && (
            <Button
              variant="outline"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  title: "",
                  date: "",
                  time: "",
                  location: "",
                  description: "",
                  category: "",
                });
              }}
            >
              Cancel
            </Button>
          )}
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No events found.</p>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      📅 {event.date} {event.time && `• ⏰ ${event.time}`}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      📍 {event.location}
                    </p>
                    <p className="text-sm">{event.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(event)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(event.id!)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
