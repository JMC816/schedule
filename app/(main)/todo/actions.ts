"use server";

import { CheckedProps } from "@/components/todo/todo";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function createToDo(date: string) {
  const dayId = parseInt(date);
  if (isNaN(dayId)) {
    return;
  }
  try {
    const existTodo = await db.toDo.findMany({
      where: {
        id: dayId,
      },
    });
    if (existTodo.length === 0) {
      await db.toDo.create({
        data: {
          id: dayId,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function uploadTodos(formdata: FormData, data: string) {
  const text = formdata.get("todo") as string;
  const session = await getSession();
  await db.toDos.create({
    data: {
      text,
      toDoId: parseInt(data),
      userId: session.id!,
    },
  });
  revalidatePath("/");
}

export async function getTodos() {
  const todos = await db.toDos.findMany();
  return todos;
}

export async function deleteTodos(id: number) {
  const session = await getSession();
  if (!id) {
    return;
  }
  await db.toDos.deleteMany({
    where: {
      id,
      userId: session.id!,
    },
  });
  revalidatePath("/");
}

export async function checkedTodos(todo: CheckedProps) {
  const session = await getSession();
  try {
    await db.toDos.deleteMany({
      where: {
        id: todo.id,
        userId: session.id,
      },
    });
    const existCompletedTodos = await db.completedTodos.findMany({
      where: {
        id: todo.id,
        userId: session.id,
      },
    });
    if (existCompletedTodos.length === 0) {
      await db.completedTodos.create({
        data: {
          id: todo.id,
          text: todo.text,
          toDoId: todo.toDoId,
          userId: session.id!,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
  revalidatePath("/");
}

export async function getCompletedTodos() {
  const completedTodos = await db.completedTodos.findMany();
  return completedTodos;
}

export async function deleteCompletedTodos(id: number) {
  const session = await getSession();
  if (!id) {
    return;
  }
  await db.completedTodos.deleteMany({
    where: {
      id,
      userId: session.id!,
    },
  });
  revalidatePath("/");
}
