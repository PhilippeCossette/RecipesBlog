import { useSuspenseQuery } from '@tanstack/react-query'
import { getLatestRecipesQuery } from '#/queries/recipes'
import { RecipeCard } from '#/components/Recipes/RecipesCard'

export default function LatestRecipes() {
  const { data: recipes } = useSuspenseQuery(getLatestRecipesQuery())
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Latest Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.slice(0, 6).map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  )
}
