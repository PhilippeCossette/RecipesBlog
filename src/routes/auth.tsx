import { LoginForm } from '#/components/Auth/LoginForm'
import { SignUpForm } from '#/components/Auth/SignUpForm'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

  if (authMode === 'signup') {
    return <SignUpForm switchAuthMode={() => setAuthMode('login')} />
  }

  if (authMode === 'login') {
    return <LoginForm switchAuthMode={() => setAuthMode('signup')} />
  }
}
