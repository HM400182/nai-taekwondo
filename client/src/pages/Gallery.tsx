import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, Play } from "lucide-react";
import PhotoLightbox from "@/components/PhotoLightbox";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface MediaItem {
  id: string;
  type: "image" | "video";
  title: string;
  url: string;
  category: string;
}

export default function Gallery() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("caption", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          type: (data.url.includes("video") || data.url.includes(".mp4") || data.url.includes(".webm")) ? "video" as const : "image" as const,
          title: data.caption,
          url: data.url,
          category: data.category || "general",
        };
      });
      setMedia(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const categories = ["all", ...Array.from(new Set(media.map(m => m.category)))];
  const filteredMedia = selectedCategory === "all" 
    ? media 
    : media.filter(m => m.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentMediaIndex(index);
    setLightboxOpen(true);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentMediaIndex((prev) => (prev > 0 ? prev - 1 : filteredMedia.length - 1));
    } else {
      setCurrentMediaIndex((prev) => (prev < filteredMedia.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <Layout>
      <section className="py-16 text-center bg-muted/30">
        <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
          <Camera className="w-4 h-4 mr-2" /> Media Gallery
        </Badge>
        <h1 className="text-4xl font-bold mb-4">Academy Media Gallery</h1>
        <p className="text-muted-foreground mb-6">Browse our photos and videos from training, events, and tournaments.</p>
        
        {/* Category Filter */}
        <div className="flex justify-center gap-2 flex-wrap mt-6">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className="capitalize"
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredMedia.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed"
          >
            <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground text-lg">No media found. Check back soon!</p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square relative overflow-hidden bg-muted">
                  {item.type === "image" ? (
                    <motion.img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.4 }}
                    />
                  ) : (
                    <>
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                      />
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/40"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                      >
                        <motion.div
                          className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                        </motion.div>
                      </motion.div>
                    </>
                  )}
                </div>
                <motion.div
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4"
                >
                  <h3 className="font-semibold text-white truncate">{item.title}</h3>
                  <p className="text-sm text-white/80 capitalize">{item.category}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="text-center py-10">
        <Button asChild size="lg">
          <Link to="/join">Join Our Story</Link>
        </Button>
      </div>

      {/* Lightbox */}
      <PhotoLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        media={filteredMedia}
        currentIndex={currentMediaIndex}
        onNavigate={navigateLightbox}
      />
    </Layout>
  );
}
