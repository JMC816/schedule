"use server";

import { CheckedProps } from "@/components/todoList";

import db from "@/lib/db";
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
  await db.toDos.create({
    data: {
      text,
      toDoId: parseInt(data),
    },
  });
  revalidatePath("/");
}

export async function getTodos() {
  const todos = await db.toDos.findMany();
  return todos;
}

export async function initializeTodaysTodo(today: string) {
  await createToDo(today);
}

export async function deleteTodos(id: number) {
  if (!id) {
    return;
  }
  await db.toDos.deleteMany({
    where: {
      id,
    },
  });
  revalidatePath("/");
}

export async function checkedTodos(todo: CheckedProps) {
  try {
    const existCompletedTodos = await db.checkedTodos.findMany({
      where: {
        id: todo.id,
      },
    });
    if (existCompletedTodos.length === 0) {
      await db.checkedTodos.create({
        data: {
          id: todo.id,
          text: todo.text,
          toDoId: todo.toDoId,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
  revalidatePath("/");
}

export async function getCompletedTodos() {
  const completedTodos = await db.checkedTodos.findMany();
  return completedTodos;
}
