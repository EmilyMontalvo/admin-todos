import { Todo } from "@prisma/client";
import { todo } from "node:test";

export const updateTodo = async (id: string, complete: boolean) : Promise<Todo> => {
    const body ={complete}
    const dbTodo = await fetch(`/api/todos/${id}`,
        {
            method: 'PUT',
            body: JSON.stringify(body),
            headers:{
                'Content-Type': 'application/json'
            }
        }
    ).then(res => res.json())

    return dbTodo;

}