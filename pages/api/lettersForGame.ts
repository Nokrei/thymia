import { NextApiRequest, NextApiResponse } from "next";

const lettersForGame = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.status(200).json({
      sequence: "arertuiupleuei",
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Methd ${req.method} not allowed` });
  }
};

export default lettersForGame;
