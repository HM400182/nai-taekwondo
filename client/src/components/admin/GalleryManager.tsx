import { useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Image, Trash2, Upload } from "lucide-react";

interface Photo {
  id?: string;
  url: string;
  caption: string;
  category?: string;
  publicId?: string;
}

export default function GalleryManager() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("training");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Real-time listener
  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("caption", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const photosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Photo[];
      setPhotos(photosData);
    });

    return () => unsubscribe();
  }, []);

  // Upload new photo
  const handleUpload = async () => {
    if (!imageFile || !caption) {
      toast({
        title: "Missing Information",
        description: "Please select a photo and enter a caption",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `gallery/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const storageRef = ref(storage, fileName);
      
      await uploadBytes(storageRef, imageFile);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "gallery"), {
        url,
        caption,
        category,
        publicId: fileName,
      });

      setImageFile(null);
      setCaption("");
      setCategory("training");
      toast({
        title: "Success",
        description: "Photo uploaded successfully!",
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload photo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Delete photo
  const handleDelete = async (photo: Photo) => {
    if (!photo.id) return;
    if (confirm("Delete this photo?")) {
      try {
        await deleteDoc(doc(db, "gallery", photo.id));
        toast({
          title: "Success",
          description: "Photo deleted successfully",
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to delete photo",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-card">
      <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 rounded-lg bg-primary/10">
            <Image className="w-6 h-6 text-primary" />
          </div>
          Gallery Manager
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">Upload and manage gallery photos</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-2 gap-4 mb-6 p-6 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border">
          <div>
            <Label>Choose Photo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </div>
          <div>
            <Label>Caption</Label>
            <Input
              placeholder="Photo caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div>
            <Label>Category</Label>
            <Input
              placeholder="e.g. training, tournament"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>

        <Button 
          onClick={handleUpload} 
          disabled={uploading || !imageFile || !caption}
          className="gap-2 shadow-lg"
          size="lg"
        >
          <Upload className="w-4 h-4" />
          {uploading ? "Uploading..." : "Upload Photo"}
        </Button>

        {uploading && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20 animate-pulse">
            <p className="text-sm text-primary font-medium">Uploading your photo... Please wait.</p>
          </div>
        )}

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Gallery Photos ({photos.length})</h3>
          </div>

          {photos.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg border-2 border-dashed">
              <Image className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">No photos uploaded yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="group relative border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium truncate">{photo.caption}</p>
                    {photo.category && (
                      <p className="text-xs text-muted-foreground capitalize">{photo.category}</p>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(photo)}
                      className="mt-3 w-full gap-2"
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
