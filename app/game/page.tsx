"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useInterval } from "usehooks-ts";
import AppContext from "@/context/AppContext";

export default function Game() {
  const router = useRouter();
  const { user, successCount, setSuccessCount } = useContext(AppContext);
  const [displayedLetter, setDisplayedLetter] = useState("");
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1500); // if not being used, then const
  const [isPlaying, setPlaying] = useState(false);

  // const { isLoading, data, error } = useQuery(["lettersFromServer"], () =>
  //   axios.get("/api/lettersForGame")
  // );

  const { isLoading, error, data } = useQuery(["check works"], () =>
    fetch("/api/lettersForGame").then((res) => res.json())
  );

  useInterval(
    () => {
      setCount(count + 1);
      setDisplayedLetter(data.charAt(count));
    },
    isPlaying ? delay : null
  );

  const handleLetterClick = (displayedLetter: string) => {
    if (displayedLetter === data.charAt(count - 3)) {
      setSuccessCount(successCount + 1);
    }
  };

  useEffect(() => {
    if (count >= data?.length) {
      router.push("/score");
    }
  }, [count, data, router]);

  if (!user) {
    router.push("/");
    return;
  }

  if (isLoading) return "Loading...";
  if (error) return "Oh shit!";

  return (
    <main className="text-center text-white">
      <h1 className=" text-3xl font-bold py-5">Welcome {user}</h1>
      <p>
        You will be presented with a set of random letters, your goal is to
        decide whether the current letter being displayed already appeared two
        letters ago.
      </p>

      <p className="py-5 text-xl">
        Press
        <button
          onClick={() => setPlaying(!isPlaying)}
          className=" bg-slate-500 mx-2 py-1 px-2 rounded hover:bg-slate-600 duration-100"
        >
          start
        </button>
        when ready
      </p>
      <div>
        <button
          onClick={() => handleLetterClick(displayedLetter)}
          className=" bg-slate-500 py-1 px-2 text-3xl"
        >
          {displayedLetter}
        </button>
      </div>
    </main>
  );
}
