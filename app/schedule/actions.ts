"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createSchedule(
  hourStart: string,
  hourtEnd: string,
  minuteStart: string,
  minuteEnd: string,
  formdata: FormData
) {
  try {
    const text = formdata.get("schedule") as string;
    await db.scheduleList.create({
      data: {
        timeStart: hourStart + minuteStart,
        timeEnd: hourtEnd + minuteEnd,
        text,
      },
    });
  } catch (e) {
    console.log(e);
  }
  revalidatePath("/schedule");
}
