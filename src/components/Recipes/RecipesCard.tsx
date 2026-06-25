import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Bookmark, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import type { Recipe } from '#/schema/recipes'

type RecipeCardProps = {
  recipe: Recipe
}

// Steps + time are the only signal available until a real `difficulty`
// field exists on the schema. Kept visually separate (bars, not a label
// next to real data) so it reads as "estimated," not authoritative.
function getDifficultyLevel(stepCount: number, totalMinutes: number) {
  if (stepCount <= 4 && totalMinutes <= 30) return 1
  if (stepCount <= 8 && totalMinutes <= 60) return 2
  return 3
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [saved, setSaved] = useState(false)

  const hasTime =
    recipe.prepTimeMinutes !== null || recipe.cookTimeMinutes !== null
  const totalTime =
    (recipe.prepTimeMinutes ?? 0) + (recipe.cookTimeMinutes ?? 0)
  const difficultyLevel = getDifficultyLevel(recipe.steps.length, totalTime)

  return (
    <Card className="group relative overflow-hidden rounded-xl border-border/70 py-0 shadow-none transition-shadow duration-300 hover:shadow-md">
      {/* Stretched link — the whole card is the click target.
          Empty/transparent, sits above static content via z-index,
          but below the bookmark button so that stays clickable. */}
      <Link
        to="/recipes/$slug"
        params={{ slug: recipe.slug }}
        aria-label={`Read ${recipe.title}`}
        className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />

      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <img
          src={recipe.coverImageUrl ?? '/placeholder.jpg'}
          alt={recipe.title}
          className="h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.03]"
        />

        <Button
          size="icon"
          variant="secondary"
          onClick={(e) => {
            e.preventDefault()
            setSaved((v) => !v)
          }}
          className="absolute right-3 top-3 z-20 size-8 rounded-full bg-background/85 backdrop-blur-sm hover:bg-background"
          aria-pressed={saved}
          aria-label={saved ? 'Remove from saved recipes' : 'Save recipe'}
        >
          <Bookmark
            className={cn(
              'size-3.5 transition-colors',
              saved && 'fill-primary text-primary',
            )}
          />
        </Button>
      </div>

      {/* Body */}
      <div className="px-5 pt-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {recipe.categoryId}
            </span>
          </div>

          {/* Difficulty, shown as signal bars rather than a "Hard" label
              next to real data — keeps the estimate visually distinct. */}
          <div className="flex items-end gap-0.5" aria-hidden="true">
            {[1, 2, 3].map((bar) => (
              <span
                key={bar}
                className={cn(
                  'w-1 rounded-sm',
                  bar === 1 && 'h-2',
                  bar === 2 && 'h-3',
                  bar === 3 && 'h-4',
                  bar <= difficultyLevel ? 'bg-primary' : 'bg-muted',
                )}
              />
            ))}
          </div>
        </div>

        <h3 className="text-lg font-bold leading-snug tracking-tight line-clamp-2">
          {recipe.title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-muted-foreground line-clamp-2">
          {recipe.description ?? 'No description yet.'}
        </p>
      </div>

      {/* Spec row — data, not icons */}
      <div className="mt-4 grid grid-cols-4 divide-x divide-border border-t border-border">
        <SpecCell
          label="Prep"
          value={recipe.prepTimeMinutes ? `${recipe.prepTimeMinutes}m` : '—'}
        />
        <SpecCell
          label="Cook"
          value={recipe.cookTimeMinutes ? `${recipe.cookTimeMinutes}m` : '—'}
        />
        <SpecCell label="Serves" value={recipe.servings ?? '—'} />
        <SpecCell label="Steps" value={recipe.steps.length} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
        <span>Updated dsa</span>
        <span className="flex items-center gap-1 font-medium text-foreground transition-colors group-hover:text-primary">
          Read recipe
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Card>
  )
}

function SpecCell({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-0.5 px-3 py-3 text-center first:pl-5 last:pr-5">
      <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="font-mono text-sm font-semibold tabular-nums">
        {value}
      </span>
    </div>
  )
}
