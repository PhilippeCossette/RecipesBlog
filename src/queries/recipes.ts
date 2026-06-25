import { getLatestRecipesFN } from '#/db/recipes'
import type { Recipe } from '#/schema/recipes'
import { queryOptions } from '@tanstack/react-query'

export const getLatestRecipesQuery = () =>
  queryOptions<Recipe[]>({
    queryKey: ['latestRecipes'],
    queryFn: () => getLatestRecipesFN(),
  })
