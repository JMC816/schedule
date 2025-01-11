"use client";

import FormButton from "@/components/form/form-btn";
import FormInput from "@/components/form/form-input";
import Link from "next/link";
import { useFormState } from "react-dom";
import { login } from "./actions";

export default function Login() {
  const [state, dispatch] = useFormState(login, null);
  return (
    <div className="ml-[20%] mr-[20%] h-[100vh] justify-center items-center gap-2 flex flex-col">
      <form
        action={dispatch}
        className="flex flex-col w-full gap-2 p-5 bg-neutral-700 rounded-xl"
      >
        <FormInput
          name="email"
          type="email"
          required
          placeholder="이메일"
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="password"
          type="password"
          required
          placeholder="비밀번호"
          errors={state?.fieldErrors.password}
        />
        <FormButton text="로그인" />
      </form>
      <Link href="/create-account">
        <span className="text-gray-500 underline">계정이 없으신가요?</span>
      </Link>
    </div>
  );
}
