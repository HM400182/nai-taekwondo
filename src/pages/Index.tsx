import { Layout } from "@/components/Layout"
import { HeroSection } from "@/components/HeroSection"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Users, Award, Target, Shield } from "lucide-react"

const Index = () => {
  const classes = [
    {
      title: "TKD Kids",
      description: "Ages 4-12. Building confidence, discipline, and coordination through fun martial arts training.",
      features: ["Character Development", "Anti-Bullying Skills", "Physical Fitness", "Fun & Games"],
      path: "/classes/kids",
      color: "bg-primary"
    },
    {
      title: "TKD Adults", 
      description: "Self-defense, fitness, and mental discipline for teenagers and adults.",
      features: ["Self Defense", "Sparring Training", "Fitness & Health", "Mental Discipline"],
      path: "/classes/adults",
      color: "bg-accent"
    },
    {
      title: "TKD Private",
      description: "One-on-one personalized coaching tailored to your specific goals and pace.",
      features: ["Individual Attention", "Custom Training", "Flexible Schedule", "Rapid Progress"],
      path: "/classes/private", 
      color: "bg-secondary"
    }
  ]

  const features = [
    {
      icon: Users,
      title: "Community",
      description: "Join a supportive family of martial artists committed to growth and excellence."
    },
    {
      icon: Award,
      title: "Championships",
      description: "Train with champions and compete at local, national, and international levels."
    },
    {
      icon: Target,
      title: "Discipline", 
      description: "Develop mental toughness, focus, and the discipline to achieve any goal."
    },
    {
      icon: Shield,
      title: "Self Defense",
      description: "Master practical self-defense skills while building confidence and awareness."
    }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* About Preview Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Nairobi Taekwondo Association</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              For over 15 years, we have been Nairobi's premier Taekwondo academy, dedicated to developing 
              champions both on and off the mat. Our mission extends beyond martial arts—we build character, 
              instill discipline, and create leaders who make a positive impact in their communities.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">Learn Our Story</Link>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover-lift border-0 shadow-elegant">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Classes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect program for your age, skill level, and goals. Every class is designed 
              to challenge, inspire, and transform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {classes.map((classItem, index) => (
              <Card key={index} className="hover-lift border-0 shadow-elegant overflow-hidden">
                <div className={`h-2 ${classItem.color}`} />
                <CardHeader>
                  <CardTitle className="text-2xl">{classItem.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {classItem.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {classItem.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full" variant="outline">
                    <Link to={classItem.path}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join hundreds of students who have transformed their lives through Taekwondo. 
              Your first class is always free!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Link to="/events">Announcements and Events</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10">
                <Link to="/gallery">See Our Gallery</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
