import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category?: string;
}

export const EventCard = ({
  title,
  date,
  time,
  location,
  description,
  category,
}: EventCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Card className="border border-border/40 bg-card/60 backdrop-blur-md hover:shadow-lg transition-all rounded-2xl overflow-hidden">
        <CardHeader>
          {category && (
            <Badge className="w-fit mb-2 uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              {category}
            </Badge>
          )}
          <CardTitle className="text-xl font-semibold text-foreground">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col justify-between flex-1">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              <span>{date}</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              <span>{time}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              <span>{location}</span>
            </div>
          </div>

          <CardDescription className="mt-4 leading-relaxed text-muted-foreground text-sm">
            {description.length > 120
              ? description.slice(0, 120) + "..."
              : description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};
