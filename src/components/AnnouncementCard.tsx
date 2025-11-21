import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Megaphone, Trophy, Info } from "lucide-react"
import { motion } from "framer-motion"

interface AnnouncementCardProps {
  title: string
  date: string
  description: string
  category?: "Update" | "Promotion" | "Schedule" | "General"
}

const categoryIcons = {
  Update: Info,
  Promotion: Trophy,
  Schedule: Calendar,
  General: Megaphone
}

const categoryColors = {
  Update: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  Promotion: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Schedule: "bg-green-500/10 text-green-700 dark:text-green-300",
  General: "bg-purple-500/10 text-purple-700 dark:text-purple-300"
}

export const AnnouncementCard = ({ 
  title, 
  date, 
  description, 
  category = "General" 
}: AnnouncementCardProps) => {
  const Icon = categoryIcons[category]
  
  return (
    <motion.div
      whileHover={{ x: 4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover-lift border-0 shadow-elegant transition-all bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <motion.div
                className="flex items-center gap-2 mb-2"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Badge className={`${categoryColors[category]} border-0`}>
                  <Icon className="w-3 h-3 mr-1" />
                  {category}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {date}
                </span>
              </motion.div>
              <CardTitle className="text-lg font-bold">{title}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="leading-relaxed">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}
