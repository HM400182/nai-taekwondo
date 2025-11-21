import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"

interface Category {
  id: string
  name: string
  icon: LucideIcon
  count: number
}

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
}

export const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="bg-background/80 backdrop-blur-sm border-b sticky top-16 z-40">
      <div className="container mx-auto px-4 py-4">
        {/* Mobile: Horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              className={`flex-shrink-0 transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-muted"
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <category.icon className="w-4 h-4 mr-2" />
              <span className="whitespace-nowrap">{category.name}</span>
              {category.count > 0 && (
                <Badge 
                  variant="secondary" 
                  className={`ml-2 ${
                    selectedCategory === category.id
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {category.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}