import { Layout } from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Clock, Users, Zap, Shield, Heart, Flame, Target, Trophy } from "lucide-react"
// --- RESOLVED CONFLICT: Keeping your high-quality image ---
import adultsImage from "@/assets/5 side compe.jpeg" 
// --- END RESOLVED CONFLICT ---

const AdultClasses = () => {
  const programs = [
    {
      name: "Beginner Adult",
      description: "Perfect for complete beginners. Learn basic techniques, forms, and philosophy.",
      level: "White - Yellow Belt",
      focus: "Foundation & Form"
    },
    {
      name: "Intermediate",
      description: "Build on fundamentals with sparring, advanced techniques, and board breaking.",
      level: "Green - Blue Belt", 
      focus: "Combat & Technique"
    },
    {
      name: "Advanced/Black Belt",
      description: "Master level training, competition prep, and leadership development.",
      level: "Red - Black Belt",
      focus: "Mastery & Leadership"
    }
  ]

  const benefits = [
    { icon: Shield, title: "Self-Defense", description: "Learn practical techniques to protect yourself and others" },
    { icon: Heart, title: "Physical Fitness", description: "Full-body workout improving strength, flexibility, and endurance" },
    { icon: Target, title: "Mental Discipline", description: "Develop focus, confidence, and stress management skills" },
    { icon: Flame, title: "Stress Relief", description: "Channel energy positively and reduce daily stress" },
    { icon: Trophy, title: "Competition", description: "Compete at local, national, and international tournaments" },
    { icon: Users, title: "Community", description: "Join a supportive network of like-minded individuals" }
  ]

  const schedule = [
    { day: "Tuesday", time: "6:30 PM - 7:30 PM", level: "Beginner Adult", type: "Fundamentals" },
    { day: "Tuesday", time: "7:45 PM - 8:45 PM", level: "Intermediate/Advanced", type: "Sparring" },
    { day: "Thursday", time: "6:30 PM - 7:30 PM", level: "All Levels", type: "Forms & Technique" },
    { day: "Thursday", time: "7:45 PM - 8:45 PM", level: "Advanced", type: "Competition Training" },
    { day: "Saturday", time: "11:30 AM - 12:30 PM", level: "Beginner Adult", type: "Basics" },
    { day: "Saturday", time: "12:45 PM - 1:45 PM", level: "All Levels", type: "Open Training" },
    { day: "Sunday", time: "4:00 PM - 5:30 PM", level: "Black Belt", type: "Master Class" }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
                🥋 Ages 13+
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Adult Taekwondo Program</h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Transform your body and mind through the ancient art of Taekwondo. Whether you're seeking fitness, 
                self-defense, or personal growth, our adult program offers a comprehensive path to excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/join">Start Your Journey</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/classes/private">Personal Training</Link>
                </Button>
              </div>
            </div>
            
            <div>
              <div className="relative">
                <img 
                  src={adultsImage} 
                  alt="Adult students preparing for a competition"
                  className="rounded-lg shadow-elegant w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs by Level */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Programs by Level</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Progress through structured programs designed to challenge and develop your skills at every stage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="border-0 shadow-elegant hover-lift">
                <div className={`h-2 ${index === 0 ? 'bg-primary' : index === 1 ? 'bg-accent' : 'bg-secondary'}`} />
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{program.name}</CardTitle>
                  <Badge variant="outline" className="mx-auto">{program.level}</Badge>
                  <div className="text-sm font-medium text-primary mt-2">{program.focus}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {program.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Adults Choose Taekwondo</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              More than just martial arts - it's a complete system for physical fitness, mental wellness, 
              and personal development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-elegant hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Components */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">What You'll Learn</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Poomsae (Forms)", description: "Traditional patterns that teach proper technique, balance, and flow", icon: "🥋" },
              { title: "Kyorugi (Sparring)", description: "Controlled combat training to develop timing, distance, and strategy", icon: "⚔️" },
              { title: "Self-Defense", description: "Practical techniques for real-world situations and personal protection", icon: "🛡️" },
              { title: "Breaking", description: "Board and brick breaking to test power, accuracy, and mental focus", icon: "💥" }
            ].map((component, index) => (
              <Card key={index} className="text-center border-0 shadow-elegant hover-lift">
                <CardHeader>
                  <div className="text-4xl mb-4">{component.icon}</div>
                  <CardTitle className="text-lg">{component.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {component.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Training Schedule</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible evening and weekend classes designed for working professionals and busy schedules.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  Weekly Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {schedule.map((session, index) => (
                  <div key={index} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
                    <div className="flex items-center gap-4 mb-2 lg:mb-0">
                      <Badge className="bg-accent text-accent-foreground">{session.day}</Badge>
                      <span className="font-medium">{session.time}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 lg:gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{session.level}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{session.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 accent-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-6">
              Discover Your Inner Warrior
            </h2>
            <p className="text-xl text-accent-foreground/90 mb-8">
              Join Kenya's most respected adult martial arts program. Your first class is free - 
              experience the difference quality instruction makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                <Link to="/join">Book Free Class</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-accent-foreground hover:bg-accent-foreground/10">
                <Link to="/coaches">Meet Our Masters</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default AdultClasses