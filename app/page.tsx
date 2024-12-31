import Image from "next/image";
import Link from "next/link";

export default function StartPage() {
  return (
    <div className="ml-[20%] mr-[20%] flex flex-col justify-around items-center h-[100vh]">
      <Image src="/icons/512.png" alt="이미지" width={200} height={200} />
      <Link
        href="/login"
        className="flex justify-center w-full py-2 rounded-full bg-neutral-500"
      >
        <span>시작하기</span>
      </Link>
    </div>
  );
}
