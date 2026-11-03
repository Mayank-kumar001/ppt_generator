import { auth } from '#/lib/auth'
import { AUTH_LOGIN_PATH, isLoginPath, isPublicPath } from '#/lib/auth-Path'
import { redirect } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'

export const authMiddleware = createMiddleware({ type: "request" }).server(
  async ({ request, next }) => {
    const { pathname } = new URL(request.url)
    const headers = getRequestHeaders()
    const session = await auth.api.getSession({headers})

    if (isLoginPath(pathname) && session?.user) {
      throw redirect({ to: '/home' })
    }

    if (!session?.user && !isPublicPath(pathname)) {
      throw redirect({ to: AUTH_LOGIN_PATH })
    }

    if (session?.user) {
      return next({ context: { session } })
    }

    return next()
  },
)