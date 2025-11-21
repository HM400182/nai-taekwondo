import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Trash2, Edit2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Announcement {
  id?: string;
  title: string;
  description: string;
  category: "Update" | "Promotion" | "Schedule" | "General";
  date: string;
  createdAt?: any;
}

export default function AnnouncementsManager() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [formData, setFormData] = useState<Announcement>({
    title: "",
    description: "",
    category: "General",
    date: new Date().toISOString().split("T")[0],
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnnouncements();

    const channel = supabase
      .channel("announcements-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "announcements" }, () => {
        fetchAnnouncements();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAnnouncements = async () => {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("date", { ascending: false });

    if (!error && data) {
      setAnnouncements(data);
    }
  };

  const handleChange = (key: keyof Announcement, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and description",
        variant: "destructive",
      });
      return;
    }

    try {
      const { id, createdAt, ...dataToSave } = formData;
      
      if (editingId) {
        const { error } = await supabase
          .from("announcements")
          .update(dataToSave)
          .eq("id", editingId);

        if (error) throw error;
        setEditingId(null);
        toast({
          title: "Success",
          description: "Announcement updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("announcements")
          .insert([dataToSave]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Announcement created successfully",
        });
      }

      setFormData({
        title: "",
        description: "",
        category: "General",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save announcement",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setFormData(announcement);
    setEditingId(announcement.id!);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      try {
        const { error } = await supabase
          .from("announcements")
          .delete()
          .eq("id", id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Announcement deleted successfully",
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to delete announcement",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-card">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Megaphone className="w-6 h-6 text-primary" />
          {editingId ? "Edit Announcement" : "Manage Announcements"}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        {/* Form */}
        <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
          <div className="md:col-span-2">
            <Label>Title</Label>
            <Input
              placeholder="Announcement title..."
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Announcement details..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <Label>Category</Label>
            <select
              className="w-full p-2 border rounded-md bg-background"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value as any)}
            >
              <option value="General">General</option>
              <option value="Update">Update</option>
              <option value="Promotion">Promotion</option>
              <option value="Schedule">Schedule</option>
            </select>
          </div>
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          <Button onClick={handleSubmit} className="gap-2">
            <Plus className="w-4 h-4" />
            {editingId ? "Update Announcement" : "Add Announcement"}
          </Button>
          {editingId && (
            <Button
              variant="outline"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  title: "",
                  description: "",
                  category: "General",
                  date: new Date().toISOString().split("T")[0],
                });
              }}
            >
              Cancel
            </Button>
          )}
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Megaphone className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No announcements yet.</p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{announcement.title}</h3>
                      <Badge variant="secondary" className="capitalize">
                        {announcement.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {announcement.date}
                    </p>
                    <p className="text-sm">{announcement.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(announcement)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(announcement.id!)}
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
