import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IconClock, IconUsers } from '@tabler/icons-react'
import type { Recipe } from '#/schema/recipes'

type RecipeCardProps = {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime =
    (recipe.prep_time_minutes ?? 0) + (recipe.cook_time_minutes ?? 0)

  return (
    <Card className=" overflow-hidden rounded-3xl  p-2 shadow-sm">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
        {recipe.cover_image_url ? (
          <img
            src="https://www.escoffier.edu/wp-content/uploads/2024/12/A-heaping-amount-of-spaghetti-is-topped-with-meatballs-and-a-red-sauce-on-a-brown-plate-with-a-knife-and-fork-to-the-right-of-the-plate.-768.jpg"
            alt={recipe.title}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}

        {totalTime > 0 && (
          <Badge className="absolute top-3 right-3 rounded-full bg-background/90 text-foreground">
            <IconClock stroke={2} className="size-3.5" />
            {totalTime} min
          </Badge>
        )}
      </div>

      <CardContent className="space-y-2 px-2 pt-3">
        <h3 className="text-lg font-semibold leading-tight">{recipe.title}</h3>

        {recipe.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {recipe.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          {recipe.categories && (
            <Badge variant="secondary" className="rounded-full">
              {recipe.categories.name}
            </Badge>
          )}
          {recipe.servings && (
            <Badge variant="secondary" className="rounded-full">
              <IconUsers stroke={2} className="size-3.5" />
              {recipe.servings} servings
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-2 pb-1">
        <Button asChild className="w-full rounded-full" size="lg">
          <Link to={'/'}>View Recipe</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
