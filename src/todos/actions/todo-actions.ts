'use server'// para que se ejecute del lado del servidor //Para que sea un server action
//Se ejecuta del lado del servidor pero el cliente puede mandarlo a llamar
//necesario especificar, si no, no vale
import prisma from "@/app/lib/prisma"
import { auth } from "@/auth";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { resolve } from "path";


export const sleep = async(seconds: number = 0) => {

    return new Promise(resolve => {
        setTimeout(()=>{resolve(true)}, seconds*1000);

    })

}


export const toggleTodoSA = async (id: string, complete: boolean): Promise<Todo> => {

    await sleep(3) //!Ralenticé a propósito la app para poder utilizar useOPTIMISTIC hook

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
        const session = await auth()
        const todo = await prisma.todo.create({ data: { description, userId:session?.user?.id as string } })
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