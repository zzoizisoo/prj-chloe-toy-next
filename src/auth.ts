import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs' 
import {getUserByEmail} from '@/src/db/methods/users'
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig, 
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log('[auth.ts/credentials]', credentials)
        const user = await getUserByEmail(credentials.email)
        console.log('[auth.ts/user]', user)
        if(!user) return null;
        const passwordMatch = bcrypt.compare(user.password, credentials.password)
        if(passwordMatch) return user;
      },
    }),
  ],
})