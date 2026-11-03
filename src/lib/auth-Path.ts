export const AUTH_LOGIN_PATH = '/login'

const PUBLIC_PATHS = [AUTH_LOGIN_PATH]

export function isPublicPath(path: string): boolean {
  return PUBLIC_PATHS.includes(path);
}

export function isLoginPath(path: string): boolean {
    return PUBLIC_PATHS.includes(path);
}