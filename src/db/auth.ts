import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from '../lib/supabase'
import { signUpSchema } from '#/schema/auth'

export const getUserFN = createServerFn().handler(async () => {
  const supabase = getSupabaseServerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) {
    return null
  }
  return user
})

export const signUpFN = createServerFn({ method: 'POST' })
  .validator((data) => {
    return signUpSchema.parse(data)
  })
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient()
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
        },
      },
    })

    if (error) {
      throw new Error(error.message)
    }

    return signUpData
  })
