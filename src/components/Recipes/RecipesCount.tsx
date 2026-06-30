import { Route } from '#/routes/recipes'
import { getRecipesQuery } from '#/queries/recipes'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '../ui/spinner'

export function RecipesCount() {
  const search = Route.useSearch()
  const { data, isLoading } = useQuery(getRecipesQuery(search))

  if (isLoading) {
    return <Spinner />
  }

  if (data?.count === 0) {
    return <p className="text-sm text-muted-foreground">No recipes found</p>
  }

  if (data?.count === 1) {
    return <p className="text-sm text-muted-foreground">1 recipe found</p>
  }

  return (
    <p className="text-sm text-muted-foreground">{data?.count} recipes found</p>
  )
}
