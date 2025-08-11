"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface SignInButtonProps {
  className?: string;
}
export function SignInButton({ className }: SignInButtonProps) {
  return (
    <Button asChild className={className}>
      <Link href="/login">Sign In</Link>
    </Button>
  );
}
