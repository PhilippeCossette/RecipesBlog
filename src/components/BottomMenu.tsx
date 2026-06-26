import { IconHome } from '@tabler/icons-react'
import { IconHeart } from '@tabler/icons-react'
import { IconSearch } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'

const menuItems: menuItem[] = [
  {
    title: 'Home',
    to: '/',
    Icon: <IconHome />,
  },
  {
    title: 'Explore',
    to: '/recipes',
    Icon: <IconSearch />,
  },
  {
    title: 'Saved',
    to: '/saved',
    Icon: <IconHeart />,
  },
]

type menuItem = {
  title: string
  to: string
  Icon: React.ReactNode
}

export default function BottomMenu() {
  return (
    <div className="d-flex z-50 fixed bottom-0 bg-white  w-full left-0 md:hidden px-2">
      <nav className="flex h-full w-full items-center justify-between">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.to}
            className="flex py-4 hover:bg-neutral-100 grow flex-col items-center text-xs font-medium text-black"
          >
            {item.Icon}
            <span className="mt-1">{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
