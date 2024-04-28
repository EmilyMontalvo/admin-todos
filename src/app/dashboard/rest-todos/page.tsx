import prisma from '@/app/lib/prisma';
import { TodosGrid } from '@/todos';
import React from 'react'


export const metadata = {
  title: 'Listado de TODOS',
  description: 'Listado de TODOS',
};

export default async function RestTodosPage() {


  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })

  return (
    <>
      <TodosGrid todos={todos} />

    </>
  )
}


