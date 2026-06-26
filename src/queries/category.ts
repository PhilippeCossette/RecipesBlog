import { getCategoriesFN } from '#/db/category'
import type { Category } from '#/schema/category'
import { queryOptions } from '@tanstack/react-query'

export const getCategoriesQuery = () =>
  queryOptions<Category[]>({
    queryKey: ['categories'],
    queryFn: () => getCategoriesFN(),
  })
