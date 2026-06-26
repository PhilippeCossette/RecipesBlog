import { Button } from './ui/button'
import { IconMenu2 } from '@tabler/icons-react'
import { Navigation } from './Navigation'

export default function TopMenu() {
  return <Navigation />
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
