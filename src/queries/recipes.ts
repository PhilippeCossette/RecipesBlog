import { getRecipesFN } from '#/db/recipes'
import type { Recipe } from '#/schema/recipes'
import { queryOptions } from '@tanstack/react-query'

type GetRecipesOptions = {
  category?: string
  limit?: number
}

export const getRecipesQuery = (options: GetRecipesOptions = {}) =>
  queryOptions<Recipe[]>({
    queryKey: ['recipes', options],
    queryFn: () => getRecipesFN({ data: options }),
  })
