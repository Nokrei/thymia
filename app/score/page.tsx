"use client";
import { useContext } from "react";

import AppContext from "@/context/AppContext";

export default function Score() {
  const { user, successCount } = useContext(AppContext);
  return (
    <main>
      <h1 className=" text-3xl font-bold py-5">Congrats {user}!</h1>
      <p>You were correct {successCount} times!</p>
    </main>
  );
}
