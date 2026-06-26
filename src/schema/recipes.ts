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
