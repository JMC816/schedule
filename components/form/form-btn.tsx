"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return <Button disabled={pending}>{pending ? "로딩중" : text}</Button>;
}
