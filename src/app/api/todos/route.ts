import prisma from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

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

export async function POST(request: Request) { 
    const body = await request.json()

  return NextResponse.json(body)
}