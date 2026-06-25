import { getSupabaseServerClient } from '#/lib/supabase'
import type { Recipe } from '#/schema/recipes'
import { createServerFn } from '@tanstack/react-start'

export const getLatestRecipesFN = createServerFn().handler(
  async (): Promise<Recipe[]> => {
    const supabase = getSupabaseServerClient()
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      throw new Error(error.message)
    }

    return recipes
  },
)
