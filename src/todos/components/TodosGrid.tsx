'use client'
import { Todo } from '@prisma/client'
import React from 'react'
import { TodoItem } from './TodoItem'
import * as api from '@/todos/helpers/todos'
import { useRouter } from 'next/navigation'
import { toggleTodoSA } from '../actions/todo-actions'

interface Props {
    todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {

    const router = useRouter();

    const toggleTodo = async (id: string, complete: boolean) => {//!Ya no lo uso cuando tengo server actions
        await api.updateTodo(id, complete)
        router.refresh(); // Sirve para recargar la ruta en la que nos encontramos
    }

    return (
        <>
            <div className='grid grid-cols-3 sm:grid-cols-3 gap-2 my-4'>
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodoSA} />
                )
                )}
            </div>
        </>
    )
}
