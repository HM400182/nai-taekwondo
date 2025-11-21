import { Badge } from "@/components/ui/badge"
import { Play } from "lucide-react"

interface Photo {
  id: number
  title: string
  description: string
  image: string
  category: string
  year: string
  type: "image" | "video"
}

interface PhotoGridProps {
  photos: Photo[]
  onPhotoClick: (index: number) => void
}

export const PhotoGrid = ({ photos, onPhotoClick }: PhotoGridProps) => {
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <div className="w-8 h-8 bg-muted-foreground/30 rounded"></div>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-muted-foreground">No photos in this category</h3>
        <p className="text-muted-foreground">Check back soon for more content!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 sm:gap-2">
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          className="relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer group hover:scale-[1.02] transition-transform duration-200"
          onClick={() => onPhotoClick(index)}
        >
          {/* Image */}
          <img
            src={photo.image}
            alt={photo.description}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Video indicator */}
          {photo.type === "video" && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Play className="w-6 h-6 text-white drop-shadow-lg" />
            </div>
          )}
          
          {/* Year badge */}
          <Badge 
            className="absolute top-1 right-1 text-xs bg-black/60 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity"
            variant="secondary"
          >
            {photo.year}
          </Badge>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
          
          {/* Selection indicator (iOS style) */}
          <div className="absolute top-2 left-2 w-5 h-5 rounded-full border-2 border-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-full h-full rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-200" />
          </div>
        </div>
      ))}
    </div>
  )
}