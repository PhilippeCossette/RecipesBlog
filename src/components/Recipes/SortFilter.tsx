import { IconFilter2 } from '@tabler/icons-react'
import { IconSortAscending2 } from '@tabler/icons-react'
import { IconSortDescending2 } from '@tabler/icons-react'
import { IconSortAZ } from '@tabler/icons-react'
import { IconSortZA } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { GetRecipesOptions } from '#/schema/recipes'
import { Separator } from '../ui/separator'

type SortFilterProps = {
  onSortChange?: (sortOption: GetRecipesOptions['sort']) => void
  current?: GetRecipesOptions['sort']
}

const sortOptions: {
  value: NonNullable<GetRecipesOptions['sort']>
  label: string
  icon: typeof IconSortAscending2
}[] = [
  { value: 'newest', label: 'Newest', icon: IconSortDescending2 },
  { value: 'oldest', label: 'Oldest', icon: IconSortAscending2 },
  { value: 'title-asc', label: 'Title (A-Z)', icon: IconSortAZ },
  { value: 'title-desc', label: 'Title (Z-A)', icon: IconSortZA },
]

export function SortFilter({ onSortChange, current }: SortFilterProps) {
  const sortOption = current ?? 'newest'
  const currentOption = sortOptions.find((o) => o.value === sortOption)
  const CurrentIcon = currentOption?.icon ?? IconFilter2

  return (
    <>
      {/* Mobile: horizontal scrollable pill list, no dropdown */}
      <div className=" md:hidden">
        <div className="space-y-3 py-3">
          <Separator />
          <h4 className="text-sm">Select Sort Option</h4>
          <div className="flex-wrap flex gap-2 4 pb-1">
            {sortOptions.map((option) => {
              const isSelected = sortOption === option.value
              const Icon = option.icon
              return (
                <Button
                  key={option.value}
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  className="shrink-0 rounded-full"
                  onClick={() => onSortChange?.(option.value)}
                >
                  <Icon stroke={2} className="size-3.5" />
                  {option.label}
                </Button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Desktop: dropdown */}
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <CurrentIcon stroke={2} />
              {currentOption?.label ?? 'Sort'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Select Sort Option</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={sortOption ?? 'newest'}
                onValueChange={(value) => {
                  const sortValue = value as GetRecipesOptions['sort']
                  onSortChange?.(sortValue)
                }}
              >
                {sortOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <DropdownMenuRadioItem
                      key={option.value}
                      value={option.value}
                      className="gap-2"
                    >
                      <Icon stroke={2} className="size-4" />
                      {option.label}
                    </DropdownMenuRadioItem>
                  )
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
