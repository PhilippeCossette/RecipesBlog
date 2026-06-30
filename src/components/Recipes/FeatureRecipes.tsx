import { Suspense, useState } from 'react'
import HomeRecipesSlider from './HomeRecipesSlider'
import { RecipeGallerySkeleton } from './RecipeGallerySkeleton'
import CategoryFilterIcon from '../Category/CategoryFilterIcon'

export default function FeatureRecipes() {
  const [category, setCategory] = useState<string>('')
  return (
    <section>
      <CategoryFilterIcon onCategorySelect={setCategory} current={category} />

      <Suspense fallback={<RecipeGallerySkeleton />}>
        <HomeRecipesSlider category={category} />
      </Suspense>
    </section>
  )
}
