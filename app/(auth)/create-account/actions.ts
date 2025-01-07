"use server";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constans";
import { z } from "zod";

const formScheam = z.object({
  username: z
    .string({
      invalid_type_error: "닉네임는 문자형태 입니다.",
      required_error: "닉네임은 필수 입니다.",
    })
    .min(3, "너무 짧습니다.")
    .toLowerCase()
    .trim()
    .max(10, "너무 깁니다."),
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(10).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = formScheam.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
