"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export async function logOut() {
  const session = await getSession();
  if (session) {
    await session.destroy();
    redirect("/login");
  }
}
