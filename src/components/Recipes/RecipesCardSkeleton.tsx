import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export const RecipeCardSkeleton = () => {
  return (
    <div className="group rounded-xl">
      <div className="relative h-full min-h-108 max-w-full overflow-hidden rounded-xl bg-muted md:aspect-5/4 lg:aspect-video">
        <Skeleton className="absolute inset-0 h-full w-full rounded-xl" />

        <Skeleton className="absolute top-4 left-4 z-20 h-6 w-24 rounded-full" />

        <div className="absolute inset-0 bg-[linear-gradient(transparent_20%,black_100%)] opacity-30" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-4">
          <Skeleton className="mb-3 h-6 w-2/3 bg-white/30" />

          <div className="mb-4 w-full space-y-2">
            <Skeleton className="h-4 w-full bg-white/25" />
            <Skeleton className="h-4 w-3/4 bg-white/25" />
          </div>

          <Separator className="bg-white/30" />

          <div className="mt-2 flex items-center gap-5">
            <Skeleton className="h-6 w-20 rounded-full bg-white/25" />
            <Skeleton className="h-6 w-32 rounded-full bg-white/25" />
          </div>
        </div>
      </div>
    </div>
  )
}
