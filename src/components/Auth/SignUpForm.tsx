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

import { signUpSchema } from '#/schema/auth'
import TextInput from '../ui/TextInput'
import { signUpFN } from '#/db/auth'

type SignUpProps = {
  switchAuthMode: () => void
}

export const SignUpForm = ({ switchAuthMode }: SignUpProps) => {
  const form = useForm({
    validators: {
      onChange: signUpSchema,
    },
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
    onSubmit: async (values) => {
      try {
        await signUpFN({ data: values })
      } catch (error) {
        console.error('Error signing up:', error)
      }
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
            name="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
          />
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
            Sign Up
          </Button>
          <p className="text-center text-muted-foreground text-sm">
            Aleready have an account?{' '}
            <Button
              type="button"
              className="underline cursor-pointer"
              variant="link"
              onClick={switchAuthMode}
            >
              Sign in
            </Button>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
