import { useSuspenseQuery } from '@tanstack/react-query'
import { getRecipesQuery } from '#/queries/recipes'
import { GalleryWithFilter } from '#/components/GalleryWithFilter'
import { useState } from 'react'

export default function HomeRecipesSlider() {
  const [category, setCategory] = useState<string>('')
  const { data, isLoading } = useSuspenseQuery(
    getRecipesQuery({
      limit: 5,
      category: category,
    }),
  )

  return (
    <>
      <GalleryWithFilter
        items={data.recipes}
        isLoading={isLoading}
        onCategorySelect={setCategory}
        currentCategory={category}
      />
    </>
  )
}
