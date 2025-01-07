"use client";

import FormButton from "@/components/form/form-btn";
import FormInput from "@/components/form/form-input";
import Link from "next/link";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

export default function Create_Account() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="ml-[20%] mr-[20%] h-[100vh] justify-center items-center gap-2 flex flex-col">
      <form
        action={dispatch}
        className="flex flex-col w-full gap-2 p-5 bg-neutral-700 rounded-xl"
      >
        <FormInput
          name="username"
          required
          type="text"
          placeholder="닉네임"
          errors={state?.fieldErrors.username}
        />
        <FormInput
          name="email"
          required
          type="email"
          placeholder="이메일"
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="password"
          required
          type="password"
          placeholder="비밀번호"
          errors={state?.fieldErrors.password}
        />
        <FormButton text="회원가입" />
      </form>
      <Link href="/login">
        <span className="text-gray-500 underline">계정이 있으신가요?</span>
      </Link>
    </div>
  );
}
