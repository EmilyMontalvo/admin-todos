import prisma from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

    await prisma.todo.deleteMany(); //! delete * from todo
    await prisma.todo.createMany({
        data:[
            { description: 'Piedra del alma', complete: true },
            { description: 'Caminar' },
            { description: 'Terminar de hacer' },
            { description: 'Algebra lineal' },
            { description: 'Mila, cata, sofi y gordo' },
            { description: 'Hola' },

        ]
    })


    // const todo = await prisma.todo.create({
    //     data: { 
    //         description: 'Piedra del alma',
    //         complete: true
    //     }
    // })

  return NextResponse.json({
    message: 'seed executed'
  })
}