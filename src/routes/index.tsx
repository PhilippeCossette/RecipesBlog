import Hero from '#/components/Hero'
import FeatureRecipes from '#/components/Recipes/FeatureRecipes'
import PreviewRecipes from '#/components/Recipes/HomeRecipesSlider'
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
    <main className="page-wrap px-4 pb-8 pt-14">
      <Hero />
      <FeatureRecipes />
    </main>
  )
}
