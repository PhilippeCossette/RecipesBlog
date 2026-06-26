import { useSuspenseQuery } from '@tanstack/react-query'
import { getRecipesQuery } from '#/queries/recipes'
import { Gallery } from '#/components/Gallery'
import { useState } from 'react'

type HomeRecipesSliderProps = {
  category?: string
}

export default function HomeRecipesSlider({
  category,
}: HomeRecipesSliderProps) {
  const { data: recipes } = useSuspenseQuery(
    getRecipesQuery({
      limit: 5,
      category: category,
    }),
  )
  return <Gallery items={recipes} />
}
