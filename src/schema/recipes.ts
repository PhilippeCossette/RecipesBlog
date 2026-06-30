import z from 'zod'
import type { Category } from './category'

export type Recipe = {
  id: string

  title: string
  slug: string
  description: string | null

  //   Add ingredients type
  ingredients: string[]
  steps: string[]
  category_id: string
  categories: Category | null

  prep_time_minutes: number | null
  cook_time_minutes: number | null
  servings: number | null

  cover_image_url: string | null

  created_at: string
  updated_at: string
}

export const RecipesSearchParams = z.object({
  q: z.string().catch(''),
  category: z.string().catch(''),
  sort: z.enum(['newest', 'oldest', 'title-asc', 'title-desc']).catch('newest'),
  page: z.number().catch(1),
  limit: z.number().catch(10),
})

export type GetRecipesOptions = {
  q?: string
  category?: string
  sort?: 'newest' | 'oldest' | 'title-asc' | 'title-desc'
  page?: number
  limit?: number
}
