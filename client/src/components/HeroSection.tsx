import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import heroImage from "@/assets/new-taekwondo-hero.jpg"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-grid-small-white/[0.02]" />

      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Badge */}
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover-glow">
            🥋 Nairobi Taekwondo Association
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            Strength • Discipline • Respect
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Join Nairobi's most respected Taekwondo association. Master the art of self-defense,
            build unshakeable discipline, and become part of a community dedicated to excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* 📰 Replaced Register Button */}
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-red hover-glow animate-bounce-in"
            >
              <Link to="/events" className="no-underline">
                📰 Events & Announcements
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold transition-smooth"
            >
              <Link to="/classes/kids" className="no-underline">
                See Classes
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-white hover:text-primary hover:bg-white/10 px-8 py-6 text-lg font-semibold transition-smooth border-white/20"
            >
              <Link to="/coaches" className="no-underline">
                Meet Coaches
              </Link>
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
            <div className="text-center animate-slide-up">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="text-3xl font-bold text-accent mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Expert Coaches</div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
