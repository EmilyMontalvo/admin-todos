import { Todo } from '@prisma/client'
import React from 'react'
import { TodoItem } from './TodoItem'

interface Props {
    todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {
    return (
        <>
            <div className='grid grid-cols-3 sm:grid-cols-3 gap-2 my-4'>
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} />
                )
                )}
            </div>

        </>
    )
}
