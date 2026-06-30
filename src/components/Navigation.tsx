import { Book, Sunset, Trees, Zap } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { IconUser } from '@tabler/icons-react'
import { IconSettings } from '@tabler/icons-react'
import { IconLogout } from '@tabler/icons-react'

import { Button } from '#/components/ui/button.tsx'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '#/components/ui/navigation-menu.tsx'

import { cn } from '#/lib/utils.ts'
import { Link, useRouter } from '@tanstack/react-router'
import { logOutFN } from '#/db/auth'
import { currentUserQuery } from '#/queries/user'

interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

interface NavigationProps {
  className?: string
  logo?: {
    url: string
    src: string
    alt: string
    title: string
    className?: string
  }
  menu?: MenuItem[]
  auth?: {
    login: {
      title: string
      url: string
    }
    signup: {
      title: string
      url: string
    }
  }
}

const Navigation = ({
  logo = {
    url: 'https://www.shadcnblocks.com',
    src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg',
    alt: 'logo',
    title: 'Shadcnblocks.com',
  },
  menu = [
    { title: 'Home', url: '/' },
    {
      title: 'Categories',
      url: '#',
      items: [
        {
          title: 'Latest Recipes',
          description: 'The latest industry news, updates, and info',
          icon: <Book className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: 'Popular Recipes',
          description: 'Our mission is to innovate and empower the world',
          icon: <Trees className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: 'Quick & Easy',
          description: 'Browse job listing and discover our workspace',
          icon: <Sunset className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: 'Healthy',
          description:
            'Get in touch with our support team or visit our community forums',
          icon: <Zap className="size-5 shrink-0" />,
          url: '#',
        },
      ],
    },

    {
      title: 'Recipes',
      url: '/recipes',
    },
  ],

  className,
}: NavigationProps) => {
  return (
    <section className={cn('p-4', className)}>
      <div className="  ">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between md:flex grow">
          <div className="flex items-center gap-6">
            {/* Here goes logo */}
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <UserMenu />
        </nav>

        {/* Mobile Menu */}
        <div className="block md:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </Link>
            <UserMenu />
          </div>
        </div>
      </div>
    </section>
  )
}

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <Link to={item.url} key={item.title} className="w-max">
      <NavigationMenuItem key={item.title}>
        <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground">
          {item.title}
        </NavigationMenuLink>
      </NavigationMenuItem>
    </Link>
  )
}

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      to={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  )
}

export function UserMenu() {
  const { data: user } = useQuery(currentUserQuery())

  const client = useQueryClient()
  const router = useRouter()

  const handleLogOut = async () => {
    const result = await logOutFN()
    if (!result.success) {
      console.error('Sign up failed')
      return
    }
    await client.invalidateQueries({
      queryKey: ['currentUser'],
    })
    await router.invalidate()
  }

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button asChild variant="outline" size="sm">
          <Link to={'/auth'}>Login</Link>
        </Button>
        <Button asChild size="sm">
          <Link to={'/auth'}>Sign up</Link>
        </Button>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-3">
      <div>
        <p className="text-xs text-muted-foreground">Welcome back,</p>{' '}
        <p className="text-sm">{user.username}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <IconUser stroke={2} className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <IconUser stroke={2} />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconSettings stroke={2} />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogOut} variant="destructive">
            <IconLogout stroke={2} />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export { Navigation }
