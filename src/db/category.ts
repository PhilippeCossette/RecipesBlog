import { getSupabaseServerClient } from '#/lib/supabase'
import type { Category } from '#/schema/category'
import { createServerFn } from '@tanstack/react-start'

export const getCategoriesFN = createServerFn().handler(
  async (): Promise<Category[]> => {
    const supabase = getSupabaseServerClient()

    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return categories
  },
)

// export const getRecipesFN = createServerFn()
//   .validator((data: GetRecipesOptions) => data)
//   .handler(async ({ data }): Promise<Recipe[]> => {
//     const supabase = getSupabaseServerClient()
//     let query = supabase
//       .from('recipes')
//       .select(
//         `
//           *,
//           categories (
//             id,
//             name
//           )
//         `,
//       )
//       .order('created_at', { ascending: false })

//     if (data.category) {
//       query = query.eq('category_id', data.category)
//     }

//     if (data.limit) {
//       query = query.limit(data.limit)
//     }

//     const { data: recipes, error } = await query

//     if (error) {
//       throw new Error(error.message)
//     }
//     console.log('recipes', recipes)
//     return recipes
//   })
