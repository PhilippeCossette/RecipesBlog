import { Link, useRouteContext } from '@tanstack/react-router'
import LogOut from './Button/LogOut'
import { Button } from './ui/button'

export default function Header() {
  const { user } = useRouteContext({
    from: '__root__',
  })
  return (
    <header className="sticky top-0 z-50 border-b">
      <nav className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">My App</h1>
        {user ? (
          <div className="flex items-center gap-4">
            <p className="text-xs">{user.username}</p>
            <LogOut />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <p>dsada</p>
            <p>dsada</p>
            <p>dsada</p>
            <Button size="sm" asChild>
              <Link to="/auth">Log In</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
}
