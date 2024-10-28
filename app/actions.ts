"use server";

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
