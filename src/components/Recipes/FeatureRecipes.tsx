import { Suspense, useState } from 'react'
import HomeRecipesSlider from './HomeRecipesSlider'
import { RecipeGallerySkeleton } from './RecipeGallerySkeleton'
import CategoryFilterIcon from '../Category/CategoryFilterIcon'

export default function FeatureRecipes() {
  return (
    <section>
      <Suspense fallback={<RecipeGallerySkeleton />}>
        <HomeRecipesSlider />
      </Suspense>
    </section>
  )
}
