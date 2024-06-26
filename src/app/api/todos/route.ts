import prisma from '@/app/lib/prisma'
import { auth } from '@/auth';
import { NextResponse } from 'next/server'
import * as yup from 'yup';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit') ?? '10');
    const offset = Number(searchParams.get('offset') ?? '0');

    if (isNaN(limit)) {
        return NextResponse.json(
            { message: 'limit tiene que ser un número' },
            { status: 400 })
    }
    if (isNaN(offset)) {
        return NextResponse.json(
            { message: 'offset tiene que ser un número' },
            { status: 400 })
    }

    const todos = await prisma.todo.findMany({ take: limit, skip: offset });

    return NextResponse.json(todos)
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false)

})

export async function POST(request: Request) {
    const session = await auth()
    if(!session) return NextResponse.json('No autorizado', {status: 401});

    try {
        const {complete, description} = await postSchema.validate(await request.json()) ;  
        const todo = await prisma.todo.create({ data: {complete, description, userId: session.user?.id as string} })
        return NextResponse.json(todo)
    } catch (error) {
        return NextResponse.json(error, {status: 400})
    }
}

export async function DELETE() {

    try {  
         await prisma.todo.deleteMany({
            where: {
              complete: true
            },
          })
        return NextResponse.json({status:200, message: 'Objetos borrados con exito'})
    } catch (error) {
        return NextResponse.json(error, {status: 400})
    }
}