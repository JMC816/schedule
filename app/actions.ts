"use server";

import db from "@/lib/db";

export async function createToDos(date: string) {
  const daydId = parseInt(date);
  try {
    const todos = await db.toDo.create({
      data: {
        id: daydId,
      },
    });
    console.log(todos.id);
  } catch (error) {
    console.log(error);
  }
  return null;
}
