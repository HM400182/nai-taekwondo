import { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users, Plus, Edit2, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CoachesManager() {
  const [coaches, setCoaches] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "coaches"), orderBy("name", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const coachesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCoaches(coachesData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!name || !role || !bio) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      let photoUrl = "";
      
      // Upload to Firebase Storage if file selected
      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `coaches/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const storageRef = ref(storage, fileName);
        
        await uploadBytes(storageRef, file);
        photoUrl = await getDownloadURL(storageRef);
      }

      const coachData = { name, role, bio, photoUrl };

      if (editingId) {
        await updateDoc(doc(db, "coaches", editingId), coachData);
        setEditingId(null);
        toast({
          title: "Success",
          description: "Coach updated successfully!",
        });
      } else {
        await addDoc(collection(db, "coaches"), coachData);
        toast({
          title: "Success",
          description: "Coach added successfully!",
        });
      }

      setName("");
      setRole("");
      setBio("");
      setFile(null);
    } catch (error: any) {
      console.error("Submit error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save coach",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (coach: any) => {
    setName(coach.name);
    setRole(coach.role);
    setBio(coach.bio);
    setEditingId(coach.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coach?")) return;
    try {
      await deleteDoc(doc(db, "coaches", id));
      toast({
        title: "Success",
        description: "Coach deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete coach",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-card">
      <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="w-6 h-6 text-primary" />
          </div>
          {editingId ? "Edit Coach" : "Manage Coaches"}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">Add and manage coach profiles</p>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Add / Edit Form */}
        <div className="grid md:grid-cols-2 gap-4 mb-6 p-6 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border">
          <div>
            <Label>Coach Name</Label>
            <Input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label>Role</Label>
            <Input
              placeholder="e.g., Head Instructor"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Bio</Label>
            <Textarea
              placeholder="Short biography"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Profile Photo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          <Button 
            onClick={handleSubmit} 
            disabled={uploading} 
            className="gap-2 shadow-lg"
            size="lg"
          >
            <Plus className="w-4 h-4" />
            {uploading
              ? "Saving..."
              : editingId
              ? "Update Coach"
              : "Add Coach"}
          </Button>
          {editingId && (
            <Button
              variant="outline"
              onClick={() => {
                setEditingId(null);
                setName("");
                setRole("");
                setBio("");
                setFile(null);
              }}
            >
              Cancel
            </Button>
          )}
        </div>

        {uploading && (
          <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20 animate-pulse">
            <p className="text-sm text-primary font-medium">Saving coach profile... Please wait.</p>
          </div>
        )}

        {/* List of Coaches */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Current Coaches ({coaches.length})</h3>
          </div>

          {coaches.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg border-2 border-dashed">
              <Users className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">No coaches added yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coaches.map((coach) => (
                <div
                  key={coach.id}
                  className="group p-6 border rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col items-center bg-card"
                >
                  <div className="relative mb-4">
                    <img
                      src={coach.photo_url || "/placeholder.svg"}
                      alt={coach.name}
                      className="w-32 h-32 object-cover rounded-full border-4 border-primary/10"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center">{coach.name}</h3>
                  <p className="text-sm text-primary font-medium">{coach.role}</p>
                  <p className="text-sm mt-3 text-center text-muted-foreground line-clamp-3">
                    {coach.bio}
                  </p>
                  <div className="flex gap-2 mt-4 w-full">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(coach)}
                      className="flex-1 gap-2"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(coach.id)}
                      className="flex-1 gap-2"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
