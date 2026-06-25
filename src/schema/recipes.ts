export type Recipe = {
  id: string

  title: string
  slug: string
  description: string | null

  //   Add ingredients type
  ingredients: []
  steps: string[]

  prepTimeMinutes: number | null
  cookTimeMinutes: number | null
  servings: number | null

  coverImageUrl: string | null

  createdAt: string
  updatedAt: string
}
