import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";

interface PhotoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  media: Array<{
    id: string;
    type: "image" | "video";
    url: string;
    title: string;
    category: string;
  }>;
  currentIndex: number;
  onNavigate: (direction: "prev" | "next") => void;
}

export default function PhotoLightbox({
  isOpen,
  onClose,
  media,
  currentIndex,
  onNavigate,
}: PhotoLightboxProps) {
  if (!media[currentIndex]) return null;

  const current = media[currentIndex];

  const handleDownload = () => {
    window.open(current.url, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-0">
        <DialogTitle className="sr-only">{current.title}</DialogTitle>
        
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Navigation Buttons */}
        {media.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full"
              onClick={() => onNavigate("prev")}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full"
              onClick={() => onNavigate("next")}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </>
        )}

        {/* Media Content */}
        <div className="flex items-center justify-center w-full h-full p-8">
          {current.type === "image" ? (
            <img
              src={current.url}
              alt={current.title}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
            />
          ) : (
            <video
              src={current.url}
              controls
              autoPlay
              className="max-w-full max-h-full"
            />
          )}
        </div>

        {/* Media Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-1">{current.title}</h3>
              <p className="text-sm text-white/70 capitalize">
                {current.category} • {currentIndex + 1} of {media.length}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={handleDownload}
            >
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
