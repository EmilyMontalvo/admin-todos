import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/app/lib/prisma'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

interface Segments {
    params: { id: String }
}

export async function GET(request: Request, { params }: Segments) {

    const { id } = params

    const todo = await prisma.todo.findFirst({
        where: {
            id: {
                contains: params.id.toString()
            }
        }
    });

    if (!todo) return NextResponse.json(
        { message: `Todo with id:  ${id} not found` },
        { status: 404 })

    return NextResponse.json(todo)
}



