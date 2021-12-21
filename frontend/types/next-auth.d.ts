import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    /** The user's postal address. */
    address: string,
    name: string,
    foovar?: string,
    email: string
  }

  interface Session {
    user: User,
    sub: number,
  }


}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string | null,
    sub: number,
  }
}