import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials"
import { NextRequest } from 'next/server';
import { signInEmailPasswor } from "./auth/actions/auth-actions";


const prisma = new PrismaClient()



export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Correo Electrónico", type: "email", placeholder: "usuario@google.com" },
        password: { label: "Contraseña", type: "password", placeholder: "*********" },
      },
      async authorize(credentials)   {
        //! Para login por API
        // const response = await fetch(request) 
        // if (!response.ok) return null
        // return (await response.json()) ?? null
        //!Para login manual
        if (!('email' in credentials) || !('password' in credentials)) {
          return null; // Si las credenciales no tienen email o password, retorna null
        }

        const user = await signInEmailPasswor(credentials!.email as string , credentials!.password as string);

        if (!user) {
        return null;
        } 
        
        return user
      },
    }),
    GitHub,
    Google,
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true

    },
    async jwt({ token, user, account, profile }) {

      const dbuser = await prisma.user.findUnique({ where: { email: token.email ?? 'no email' } })

      if (dbuser?.isActive == false) throw Error('Usuario no activo')



      token.roles = dbuser?.roles ?? ['no-roles'];
      token.id = dbuser?.id ?? 'no-uuid';

      return token
    },

    async session({ session, user, token }) {

      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }
      return session
    }

  }
})