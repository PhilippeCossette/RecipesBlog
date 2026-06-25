'use client'

import { useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { loginSchema } from '#/schema/auth'
import TextInput from '../ui/TextInput'

type LoginProps = {
  switchAuthMode: () => void
}

export const LoginForm = ({ switchAuthMode }: LoginProps) => {
  const form = useForm({
    validators: {
      onChange: loginSchema,
    },
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      console.log('Form submitted with values:', values)
    },
  })
  return (
    <Card className="max-w-162.5 mx-auto w-full">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <CardHeader className="mb-6">
          <CardTitle className="text-2xl font-extrabold">
            Welcome back
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <TextInput
            form={form}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <TextInput
            form={form}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" type="submit">
            Sign In
          </Button>
          <p className="text-center text-muted-foreground text-sm">
            Don't have an account?{' '}
            <Button
              onClick={switchAuthMode}
              type="button"
              className="underline cursor-pointer"
              variant="link"
            >
              Sign up
            </Button>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
