"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function createSchedule(
  hourStart: string,
  hourtEnd: string,
  minuteStart: string,
  minuteEnd: string,
  dayStart: string,
  dayEnd: string,
  formdata: FormData
) {
  try {
    const text = formdata.get("schedule") as string;
    const session = await getSession();
    await db.scheduleList.create({
      data: {
        timeStart: hourStart + minuteStart,
        timeEnd: hourtEnd + minuteEnd,
        dayStart,
        dayEnd,
        text,
        userId: session.id!,
      },
    });
  } catch (e) {
    console.log(e);
  }
  revalidatePath("/schedule");
}

export async function getScheduleList() {
  const scheduleList = await db.scheduleList.findMany();
  return scheduleList;
}

export async function deleteScheduleList(id: number) {
  const session = await getSession();
  try {
    await db.scheduleList.delete({
      where: {
        id,
        userId: session.id!,
      },
    });
  } catch (e) {
    console.log(e);
  }
  revalidatePath("/schedule");
}
