"use server";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constans";
import db from "@/lib/db";
import { z } from "zod";

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    return false;
  } else {
    return true;
  }
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  if (user) {
    return false;
  } else {
    return true;
  }
};

const formScheam = z.object({
  username: z
    .string({
      invalid_type_error: "닉네임는 문자형태 입니다.",
      required_error: "닉네임은 필수 입니다.",
    })
    .min(3, "너무 짧습니다.")
    .toLowerCase()
    .trim()
    .max(10, "너무 깁니다.")
    .refine(checkUniqueUsername, "이미 닉네임이 존재합니다."),
  email: z
    .string()
    .email()
    .trim()
    .toLowerCase()
    .refine(checkUniqueEmail, "이미 메일이 존재합니다."),
  password: z.string().min(10).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formScheam.safeParseAsync(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
