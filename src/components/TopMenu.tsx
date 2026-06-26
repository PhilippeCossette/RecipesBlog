import { Link, useRouteContext } from '@tanstack/react-router'
import LogOut from './Button/LogOut'
import { Button } from './ui/button'
import { IconMenu2 } from '@tabler/icons-react'
import { Navbar1 } from './navbar1'

export default function TopMenu() {
  const { user } = useRouteContext({
    from: '__root__',
  })
  return <Navbar1 />
}

export function MobileTopMenu() {
  return (
    <nav>
      <Button variant="ghost" className="">
        <IconMenu2 stroke={2} size={32} />
      </Button>
    </nav>
  )
}

export function DesktopTopMenu() {}
