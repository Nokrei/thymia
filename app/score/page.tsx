"use client";
import { useContext } from "react";
import AppContext from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function Score() {
  const { user, successCount } = useContext(AppContext);
  const router = useRouter();
  if (!user) {
    router.push("/");
    return;
  }
  return (
    <main className=" text-white text-center">
      <h1 className=" text-3xl font-bold py-5">
        {successCount > 0 ? "Congrats" : "Better luck next time"} {user}!
      </h1>
      <p>You were correct {successCount} times</p>
    </main>
  );
}
