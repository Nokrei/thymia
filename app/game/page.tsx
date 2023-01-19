"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppContext from "@/context/AppContext";

export default function Game() {
  const router = useRouter();
  const { user, successCount, setSuccessCount } = useContext(AppContext);
  const [gameArr, setGameArr] = useState([]);

  const alphabetArr = [...Array(26)].map((_, i) => {
    return String.fromCharCode(i + 97);
  });
  const max = 10;

  const setLetter = () => {
    setGameArr((current) => [
      ...current,
      alphabetArr.slice(0, max)[Math.floor(Math.random() * max)],
    ]);
  };

  let startGame: any;
  const handleGameStart = () => {
    startGame = setInterval(setLetter, 500);
  };

  const handleLetterClick = () => {
    if (gameArr[gameArr.length - 1] === gameArr[gameArr.length - 3]) {
      setSuccessCount(successCount + 1);
    }
  };

  useEffect(() => {
    if (gameArr.length >= 12) {
      clearInterval(startGame);
      router.push("/score");
    }
  }, [gameArr.length, router, startGame]);

  return (
    <main className="text-center text-white">
      <h1 className=" text-3xl font-bold py-5">Welcome {user}</h1>
      <p>
        You will be presented with multiple sets of random letters, your goal is
        to decide whether the current letter being displayed already appeared
        two letters ago.
      </p>
      <p className="py-5 text-xl">
        Press
        <button
          onClick={handleGameStart}
          className=" bg-slate-500 mx-2 py-1 px-2 rounded hover:bg-slate-600 duration-100"
        >
          start
        </button>
        when ready
      </p>
      <button
        className=" bg-slate-500 py-1 px-2 text-3xl"
        onClick={handleLetterClick}
      >
        {gameArr[gameArr.length - 1]}
      </button>
    </main>
  );
}
