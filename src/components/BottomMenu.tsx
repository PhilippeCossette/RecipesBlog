import { IconHeart, IconHome, IconSearch } from '@tabler/icons-react'
import { Link, useMatchRoute } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

const menuItems = [
  { title: 'Home', to: '/', Icon: IconHome },
  { title: 'Explore', to: '/recipes', Icon: IconSearch },
  { title: 'Saved', to: '/saved', Icon: IconHeart },
]

export default function BottomMenu() {
  const matchRoute = useMatchRoute()
  const activeIndex = menuItems.findIndex((item) =>
    matchRoute({ to: item.to, fuzzy: item.to !== '/' }),
  )

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="relative mx-auto grid h-16 max-w-md grid-cols-3">
        {/* signature tick — sits flush on the top border, slides to the active tab */}
        {activeIndex >= 0 && (
          <span
            aria-hidden
            className="absolute top-0 h-[3px] w-8 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 ease-out"
            style={{
              left: `${(100 / menuItems.length) * (activeIndex + 0.5)}%`,
            }}
          />
        )}

        {menuItems.map(({ title, to, Icon }, index) => {
          const isActive = index === activeIndex
          return (
            <Link
              key={title}
              to={to}
              className="flex flex-col items-center justify-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors active:text-primary"
            >
              <Icon
                size={22}
                stroke={isActive ? 2 : 1.6}
                className={cn(
                  'transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground',
                )}
              />
              <span className={cn(isActive && 'text-foreground')}>{title}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
