import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const prisma = new PrismaClient()
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub, 
    Google
  ],
  session: {
    strategy:'jwt'
  }, 
  callbacks:{
    async signIn({user, account, profile, email, credentials}){
      return true

    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    },

    async session({ session, user, token }) {
      return session
    }

  }
})