import { NextApiRequest, NextApiResponse } from "next";

const lettersForGame = (req: NextApiRequest, res: NextApiResponse) => {
  const alphabet = [...Array(26)].map((_, i) => {
    return String.fromCharCode(i + 97).toUpperCase();
  });
  const shuffledAlphabetSliced = [
    ...alphabet
      .sort(() => {
        return Math.random() - 0.5;
      })
      .slice(0, 12),
  ];
  if (req.method === "GET") {
    res.status(200).json({
      shuffledAlphabetSliced,
      sequenceLength: shuffledAlphabetSliced.length,
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Methd ${req.method} not allowed` });
  }
};

export default lettersForGame;
