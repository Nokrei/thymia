"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppContext from "@/context/AppContext";

export default function Game() {
  const router = useRouter();
  const { user, successCount, setSuccessCount } = useContext(AppContext);

  const alphabetArr = [...Array(26)].map((_, i) => {
    return String.fromCharCode(i + 97);
  });

  const [currentLetter, setCurrentLetter] = useState("");
  // const sessionArr = alphabetArr.sort(() => Math.random() - 0.5).slice(0, 10);
  const sessionArr = alphabetArr.slice(0, 10);
  const [referenceArr, setReferenceArr] = useState([]);
  const setLetter = () => {
    let min = Math.ceil(0);
    let max = Math.floor(9);
    const foo = sessionArr[Math.floor(Math.random() * (max - min + 1) + min)];
    setCurrentLetter(foo);
    referenceArr.push(foo);
  };

  const handleGameStart = () => {
    setInterval(setLetter, 3000);
  };

  const handleLetterClick = () => {
    if (currentLetter === referenceArr[referenceArr.length - 3]) {
      console.log("Success!");
      setSuccessCount(successCount + 1);
    } else {
      console.log("fail");
    }
    console.log(referenceArr);
  };

  useEffect(() => {
    if (referenceArr.length >= 12) {
      router.push("/score");
    }
  }, [referenceArr, router]);

  return (
    <main className="text-center text-white">
      <h1 className=" text-3xl font-bold py-5">Welcome {user}</h1>
      <p>
        You will be presented with multiple sets of random letters, your goal is
        to decide whether the current letter being displayed already appeared
        two letters ago.
      </p>
      <div>
        The letters used in this session are: <br />
        {sessionArr.map((letter) => (
          <span className="px-2" key={letter}>
            {letter}
          </span>
        ))}
      </div>
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
      <div onClick={handleLetterClick}>{currentLetter}</div>
    </main>
  );
}
