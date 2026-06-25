import LatestRecipes from '#/components/ui/Recipes/LatestRecipes'
import { getLatestRecipesQuery } from '#/queries/recipes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getLatestRecipesQuery())
  },
  component: App,
})

function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <LatestRecipes />
    </main>
  )
}
