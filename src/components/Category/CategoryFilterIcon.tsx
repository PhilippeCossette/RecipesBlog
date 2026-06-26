import { getCategoriesQuery } from '#/queries/category'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

import { IconX } from '@tabler/icons-react'
import { IconFilter2 } from '@tabler/icons-react'

type CategoryFilterIconProps = {
  onCategorySelect?: (categoryId: string) => void
  current?: string
}

export default function CategoryFilterIcon({
  onCategorySelect,
  current,
}: CategoryFilterIconProps) {
  const { data: categories } = useSuspenseQuery(getCategoriesQuery())

  const handleCategorySelect = (categoryId: string) => {
    if (current === categoryId) {
      onCategorySelect?.('')
      return
    }
    onCategorySelect?.(categoryId)
  }
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <IconFilter2 stroke={2} />
            Filter by Category
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuGroup>
            {categories.map((category) => (
              <DropdownMenuItem
                className={`${
                  current === category.id
                    ? 'bg-accent text-accent-foreground'
                    : ''
                } group flex justify-between`}
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.name}
                {current === category.id && (
                  <IconX stroke={2} className="hidden group-hover:block" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {current && (
        <Button
          className="hover:text-destructive"
          variant="ghost"
          onClick={() => handleCategorySelect('')}
        >
          <IconX stroke={2} />
          {categories.find((c) => c.id === current)?.name}
        </Button>
      )}
    </div>
  )
}
