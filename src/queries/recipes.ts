import { getRecipesFN } from '#/db/recipes'
import type { GetRecipesOptions, Recipe } from '#/schema/recipes'
import { queryOptions } from '@tanstack/react-query'

export const getRecipesQuery = (options: GetRecipesOptions = {}) =>
  queryOptions<Recipe[]>({
    queryKey: ['recipes', options],
    queryFn: () => getRecipesFN({ data: options }),
  })
