import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {

  await prisma.todo.deleteMany(); //! delete * from todo
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: 'test@google.com',
      password: bcrypt.hashSync('12345'),
      roles: ['admin', 'client', 'super-user'],
      todos: {
        create: [
          { description: 'Piedra del alma', complete: true },
          { description: 'Caminar' },
          { description: 'Terminar de hacer' },
          { description: 'Algebra lineal', complete: true },
          { description: 'Mila, cata, sofi y gordo' },
          { description: 'Hola' },

        ]
      }

    }
  })

  return NextResponse.json({
    message: 'seed executed'
  })
}