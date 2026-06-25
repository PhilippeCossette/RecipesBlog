export type Recipe = {
  id: string

  title: string
  slug: string
  description: string | null

  //   Add ingredients type
  ingredients: string[]
  steps: string[]
  categoryId: string

  prepTimeMinutes: number | null
  cookTimeMinutes: number | null
  servings: number | null

  coverImageUrl: string | null

  createdAt: string
  updatedAt: string
}
