"use client";
import { useContext } from "react";
import AppContext from "@/context/AppContext";
import { useRouter } from "next/navigation";

/** Add try again feature
 * Can you add a button to allow the user to play again
 * how are you going to reset state
 */

export default function Score() {
  const { user, successCount } = useContext(AppContext);
  const router = useRouter();

  if (!user) {
    router.push("/");
    return; // TODO: is this needed?
  }

  // install the tailwind prettier extension
  // https://tailwindcss.com/blog/automatic-class-sorting-with-prettier
  return (
    <main className="text-white text-center">
      <h1 className="text-3xl font-bold py-5">
        {successCount > 0 ? "Congrats" : "Better luck next time"} {user}!
      </h1>
      <p>You were correct {successCount} times</p>
    </main>
  );
}
