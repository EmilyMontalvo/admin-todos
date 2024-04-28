'use client'
import { Todo } from '@prisma/client'
import React from 'react'
import { TodoItem } from './TodoItem'
import * as api from '@/todos/helpers/todos'
import { updateTodo } from '../helpers/todos';
import { useRouter } from 'next/navigation'

interface Props {
    todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {

    const router = useRouter();

    const toggleTodo = async (id:string, complete:boolean) => {
        const updateTodo = await api.updateTodo(id,complete)
        router.refresh(); // Sirve para recargar la ruta en la que nos encontramos
    }

    return (
        <>
            <div className='grid grid-cols-3 sm:grid-cols-3 gap-2 my-4'>
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
                )
                )}
            </div>
        </>
    )
}
