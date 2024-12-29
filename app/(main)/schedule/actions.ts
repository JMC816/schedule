"use server";

import db from "@/lib/db";
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
    await db.scheduleList.create({
      data: {
        timeStart: hourStart + minuteStart,
        timeEnd: hourtEnd + minuteEnd,
        dayStart,
        dayEnd,
        text,
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
  try {
    await db.scheduleList.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    console.log(e);
  }
  revalidatePath("/schedule");
}
