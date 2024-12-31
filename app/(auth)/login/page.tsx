import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
  return (
    <div className="ml-[20%] mr-[20%] h-[100vh] justify-center items-center gap-2 flex flex-col">
      <form className="flex flex-col w-full gap-2 p-5 bg-neutral-700 rounded-xl">
        <input
          placeholder="아이디를 입력하세요"
          type="text"
          className="p-1 text-black rounded-sm"
        />
        <input
          placeholder="비밀번호를 입력하세요"
          type="password"
          className="p-1 text-black rounded-sm"
        />

        <Button>
          <Link href="/todo" className="w-full">
            로그인
          </Link>
        </Button>
      </form>
      <Link href="/create-account">
        <span className="text-gray-500 underline">계정이 없으신가요?</span>
      </Link>
    </div>
  );
}
