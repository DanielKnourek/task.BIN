import NextAuth, { Session, User } from 'next-auth'

import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Discord from 'next-auth/providers/discord'

const nextAuth = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
    }),
    Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials property is used to generate a suitable form on the sign in page.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Guest" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        
        const user_info: User = {
          id: "101",
          name: "Guest", 
          email: "host@task.bin.com",
          address: "Na Slené",
          image: "https://t4.ftcdn.net/jpg/03/73/50/09/360_F_373500999_wAWkzJZRb2XHm9KeHEDcCJBkx4wR67us.jpg",
        }
        return user_info;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  jwt: {
    // A secret to use for key generation
    // https://generate-secret.now.sh/32
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, account }) {
      return token
    },
    async session({ session, token, user }) {
      session.sub = token.sub;

      return session // The return type will match the one returned in `useSession()`
    },
  },
})

export default nextAuth;