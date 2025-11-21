import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import nationalOlympic from "@/assets/national-olympic-real.jpg"
import intTournament from "@/assets/international-tournament-real.jpg"
import swiftTeam from "@/assets/swift-team-real.jpg"
import tournamentImg from "@/assets/tournament-real.jpg"

interface PastEvent {
  image: string
  title: string
  description: string
}

const pastEvents: PastEvent[] = [
  {
    image: nationalOlympic,
    title: "National Olympic Team",
    description: "Nairobi Taekwondo at National Olympics"
  },
  {
    image: intTournament,
    title: "International Tournament 2024",
    description: "Our team competed at the international level"
  },
  {
    image: swiftTeam,
    title: "Swift Taekwondo Team",
    description: "Our championship team in action"
  },
  {
    image: tournamentImg,
    title: "Regional Championship",
    description: "Multiple medals at regional competition"
  }
]

export const PastEventGallery = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pastEvents.map((event, index) => (
          <div 
            key={index}
            className="group relative overflow-hidden rounded-lg shadow-elegant hover-lift"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-semibold text-sm mb-1">
                {event.title}
              </h3>
              <p className="text-white/80 text-xs">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <Button asChild variant="outline" size="lg">
          <Link to="/gallery">View Full Gallery</Link>
        </Button>
      </div>
    </div>
  )
}
