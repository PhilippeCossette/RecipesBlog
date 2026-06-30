import { getSupabaseServerClient } from '#/lib/supabase'
import type { GetRecipesOptions, Recipe } from '#/schema/recipes'
import { createServerFn } from '@tanstack/react-start'

export const getRecipesFN = createServerFn()
  .validator((data: GetRecipesOptions) => data)
  .handler(async ({ data }): Promise<Recipe[]> => {
    const supabase = getSupabaseServerClient()
    let query = supabase
      .from('recipes')
      .select(
        `
          *,
          categories (
            id,
            name
          )
        `,
      )
      .order('created_at', { ascending: false })

    if (data.category) {
      query = query.eq('category_id', data.category)
    }

    if (data.limit) {
      query = query.limit(data.limit)
    }

    if (data.q) {
      query = query.ilike('title', `%${data.q}%`)
    }

    const { data: recipes, error } = await query

    if (error) {
      throw new Error(error.message)
    }
    console.log('recipes', recipes)
    return recipes
  })
