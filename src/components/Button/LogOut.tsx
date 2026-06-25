import { Button } from '../ui/button'
import { logOutFN } from '#/db/auth'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'

export default function LogOut() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const handleLogOut = async () => {
    await logOutFN()
    await queryClient.invalidateQueries({
      queryKey: ['currentUser'],
    })
    await router.invalidate()
  }
  return <Button onClick={handleLogOut}>Logout</Button>
}
