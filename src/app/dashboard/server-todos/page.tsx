export const dynamic = 'force-dynamic'
export const revalidate = 0


import prisma from '@/app/lib/prisma';
import { auth } from '@/auth';
import { NewTodo, TodosGrid } from '@/todos';
import { redirect } from 'next/navigation';
import React from 'react'



export const metadata = {
  title: 'Server Actions',
  description: 'Server Actions',
};


export default async function ServerTodosPage () {

  const session = await auth()
  if(!session) redirect('/api/auth/signin');


  const todos = await prisma.todo.findMany({ 
    where: {userId: session?.user?.id },
    orderBy: { description: 'asc' } })

  return (
    <>
    <span className='text-3xl mb-10'> Server Actions</span>
      <div className='w-full px-3 mx-5 mb-5'>
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />

    </>
  )
}
