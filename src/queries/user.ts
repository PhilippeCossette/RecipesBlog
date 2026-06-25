import { getUserFN } from '#/db/auth'
import type { CurrentUser } from '#/schema/auth'
import { queryOptions } from '@tanstack/react-query'

export const currentUserQuery = () =>
  queryOptions<CurrentUser>({
    queryKey: ['currentUser'],
    queryFn: async () => getUserFN(),
  })
