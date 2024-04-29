'use server'// para que se ejecute del lado del servidor //Para que sea un server action
//Se ejecuta del lado del servidor pero el cliente puede mandarlo a llamar
//necesario especificar, si no, no vale
import prisma from "@/app/lib/prisma"
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodoSA = async (id: string, complete: boolean): Promise<Todo> => {

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
        throw `Todo con el id: ${id}, no existe `
    }

    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { complete }
    })

    revalidatePath('/dashboard/server-todos')// hace el refresh

    return updatedTodo

}

export const addTodoSA = async (description: string) => {

    try {

        const todo = await prisma.todo.create({ data: { description } })
        revalidatePath('/dashboard/server-todos')// hace el refresh
        return todo
    } catch (error) {
        return { message: 'Error creando todo' }
    }

}

export const deleteCompletedSA = async () => {

    try {
        await prisma.todo.deleteMany({
            where: {
                complete: true
            },
        })
        revalidatePath('/dashboard/server-todos')// hace el refresh
        return { status: 200, message: 'Objetos borrados con exito' }
    } catch (error) {
        return { message: 'Error con el borrado' }
    }

}