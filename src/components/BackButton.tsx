"use client";
import React, { ButtonHTMLAttributes } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type Props = {
  className?: string;
  title: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BackButton = ({ title, className, variant, ...props }: Props) => {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      className={className}
      title={title}
      onClick={() => router.back()}
    >
      {title}
    </Button>
  );
};

export default BackButton;
