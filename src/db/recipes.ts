import { getSupabaseServerClient } from '#/lib/supabase'
import type { GetRecipesOptions, Recipe } from '#/schema/recipes'
import { createServerFn } from '@tanstack/react-start'

type RecipesResponse = {
  recipes: Recipe[]
  count: number
  page: number
  limit: number
  totalPages: number
}

export const getRecipesFN = createServerFn()
  .validator((data: GetRecipesOptions) => data)
  .handler(async ({ data }): Promise<RecipesResponse> => {
    const supabase = getSupabaseServerClient()

    const page = data.page ?? 1
    const limit = data.limit ?? 10

    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabase.from('recipes').select(
      `
          *,
          categories!inner (
            id,
            name,
            slug
          )
        `,
      { count: 'exact' },
    )

    switch (data.sort) {
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      case 'oldest':
        query = query.order('created_at', { ascending: true })
        break
      case 'title-asc':
        query = query.order('title', { ascending: true })
        break
      case 'title-desc':
        query = query.order('title', { ascending: false })
        break
    }

    if (data.category) {
      query = query.eq('categories.slug', data.category)
    }

    if (data.q) {
      query = query.or(
        `title.ilike.%${data.q}%,description.ilike.%${data.q}%,ingredients_search.ilike.%${data.q}%`,
      )
    }

    query = query.range(from, to)

    const { data: recipes, error, count } = await query

    if (error) {
      throw new Error(error.message)
    }
    console.log('recipes', recipes)
    return {
      recipes,
      count: count ?? 0,
      page: data.page ?? 1,
      limit: data.limit ?? 10,
      totalPages: Math.ceil((count || 0) / (data.limit ?? 10)),
    }
  })
