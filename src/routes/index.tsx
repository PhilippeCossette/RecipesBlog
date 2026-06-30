import Hero from '#/components/Hero'
import FeatureRecipes from '#/components/Recipes/FeatureRecipes'
import { getRecipesQuery } from '#/queries/recipes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getRecipesQuery())
  },
  component: App,
})

function App() {
  return (
    <main className="page-wrap pageLayout">
      <Hero />
      <FeatureRecipes />
    </main>
  )
}
