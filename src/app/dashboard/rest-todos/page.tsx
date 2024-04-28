import prisma from '@/app/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';
import React from 'react'


export const metadata = {
  title: 'Listado de TODOS',
  description: 'Listado de TODOS',
};

export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })

  return (
    <>
      <div className='w-full px-3 mx-5 mb-5'>
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />

    </>
  )
}


