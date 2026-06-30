import { getRecipesQuery } from '#/queries/recipes'
import { RecipesSearchParams } from '#/schema/recipes'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recipes/')({
  component: RouteComponent,
  validateSearch: RecipesSearchParams,
  loader: ({ context, location }) => {
    return context.queryClient.ensureQueryData(getRecipesQuery(location.search))
  },
})

function RouteComponent() {
  const search = Route.useSearch()
  const { data: recipes } = useSuspenseQuery(getRecipesQuery(search))

  return (
    <main className="space-y-6">
      {/* <RecipesFilters /> */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div key={recipe.id}>{recipe.title}</div>
        ))}
      </div>
    </main>
  )
}
