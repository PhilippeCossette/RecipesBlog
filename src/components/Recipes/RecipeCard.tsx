import { Link } from '@tanstack/react-router'
import { formatTime } from '@/lib/utils'
import { useMemo } from 'react'
import type { Recipe } from '#/schema/recipes'
import { Separator } from '@/components/ui/separator'

import { IconClock } from '@tabler/icons-react'
import { IconCarrot } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'

type RecipeCardProps = {
  recipe: Recipe
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const totalTime = useMemo(() => {
    const prepTime = recipe.prep_time_minutes
    const cookTime = recipe.cook_time_minutes
    const totalTime = (prepTime || 0) + (cookTime || 0)
    const formattedTime = formatTime(totalTime)
    return formattedTime
  }, [recipe])

  const totalIngredients = useMemo(() => {
    return recipe.ingredients?.length || 0
  }, [recipe])

  return (
    <Link to={`/`} className="group rounded-xl">
      <div className="group relative h-full min-h-108 max-w-full overflow-hidden rounded-xl md:aspect-5/4 lg:aspect-video">
        <Badge variant="secondary" className="absolute top-4 left-4 z-20 ">
          {recipe.categories?.name}
        </Badge>
        <img
          src="https://www.denkinesiskekoebmand.dk/img/cookbook/15.jpg"
          alt={recipe.title}
          className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 h-full bg-[linear-gradient(transparent_20%,black_100%)] mix-blend-multiply" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-4 text-white">
          <h3 className="mb-1 pt-4 text-md md:text-lg font-semibold md:mb-3 md:pt-4 lg:pt-4">
            {recipe.title}
          </h3>
          <p className="mb-4 text-sm line-clamp-2">{recipe.description}</p>
          <Separator className="bg-white/30" />
          <div className="flex gap-5 items-center text-sm mt-2">
            <Badge variant="ghost">
              <IconClock size={16} className="mr-1" />
              <p>{totalTime}</p>
            </Badge>

            <Badge variant="ghost">
              <IconCarrot size={16} className="mr-1" />
              <p>{totalIngredients} ingredients</p>
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  )
}
