import prisma from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

    await prisma.todo.deleteMany(); //! delete * from todo
    await prisma.todo.createMany({
        data:[
            { description: 'Piedra del alma', complete: true },
            { description: 'Piedra del alma' },
            { description: 'Piedra del alma' },
            { description: 'Piedra del alma' },
            { description: 'Piedra del alma' },
            { description: 'Piedra del alma' },

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