import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import email from "next-auth/providers/email";

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
    async jwt({ token, user, account, profile}) {
      
      const dbuser = await prisma.user.findUnique({where:{email:token.email?? 'no email'}})
      token.roles = dbuser?.roles ?? ['no-roles'];
      token.id = dbuser?.id ?? 'no-uuid';
      console.log(token)

      return token
    },

    async session({ session, user, token }) {
      
      if(session && session.user){
        session.user.roles = token.roles;
        session.user.id = token.id;
      }
      return session
    }

  }
})