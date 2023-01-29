"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AppContext from "@/context/AppContext";

export default function Game() {
  const router = useRouter();
  const { user, successCount, setSuccessCount } = useContext(AppContext);
  const [shuffledLettersFromServer, setShuffledLettersFromServer] = useState<
    string[]
  >([]);
  const [shuffledLettersWithDuplicates, setShuffledLettersWithDuplicates] =
    useState<string[]>([]);
  const [sequenceLength, setSequenceLength] = useState(0);
  const startGameIntervalRef = useRef<null | NodeJS.Timeout>(null);

  const handleGameStart = () => {
    startGameIntervalRef.current = setInterval(
      () =>
        setShuffledLettersWithDuplicates((currentLetters) => [
          ...currentLetters,
          shuffledLettersFromServer[Math.floor(Math.random() * sequenceLength)],
        ]),
      500
    );
  };

  const handleLetterClick = () => {
    if (
      shuffledLettersWithDuplicates[
        shuffledLettersWithDuplicates.length - 1
      ] ===
      shuffledLettersWithDuplicates[shuffledLettersWithDuplicates.length - 3]
    ) {
      setSuccessCount(successCount + 1);
    }
  };

  useQuery({
    queryFn: async () => {
      try {
        const res = await axios.get("/api/lettersForGame");
        setShuffledLettersFromServer(res.data.shuffledAlphabetSliced);
        setSequenceLength(res.data.sequenceLength);
      } catch (e: any) {
        console.log(e);
      }
    },
  });

  useEffect(() => {
    if (shuffledLettersWithDuplicates.length >= sequenceLength + 4) {
      clearInterval(startGameIntervalRef.current as NodeJS.Timeout);
      router.push("/score");
    }
  }, [
    shuffledLettersWithDuplicates.length,
    router,
    startGameIntervalRef,
    sequenceLength,
  ]);

  if (!user) {
    router.push("/");
    return;
  }

  return (
    <main className="text-center text-white">
      <h1 className=" text-3xl font-bold py-5">Welcome {user}</h1>
      <p>
        You will be presented with a set of random letters, your goal is to
        decide whether the current letter being displayed already appeared two
        letters ago.
      </p>
      <p className="text-white">The letters used in this session are:</p>
      {shuffledLettersFromServer.map((letter) => {
        return (
          <span key={letter} className="text-white px-1">
            {letter}
          </span>
        );
      })}
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
      <div>
        <button
          className=" bg-slate-500 py-1 px-2 text-3xl"
          onClick={handleLetterClick}
        >
          {
            shuffledLettersWithDuplicates[
              shuffledLettersWithDuplicates.length - 1
            ]
          }
        </button>
      </div>
    </main>
  );
}
