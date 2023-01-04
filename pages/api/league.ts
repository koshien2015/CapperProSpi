import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const responseA = await fetch(
    "https://the-tournament.net/_next/data/9n8vnpYlyQ87sb9Rdtr8M/ja/leagues/7jX0nl1ebAJA4hEqQGoc.json?id=7jX0nl1ebAJA4hEqQGoc"
  );
  const dataA = await responseA.json();
  const responseB = await fetch(
    "https://the-tournament.net/_next/data/9n8vnpYlyQ87sb9Rdtr8M/ja/leagues/vRCpUcyskgKDtKbr4CHT.json?id=vRCpUcyskgKDtKbr4CHT"
  );
  const dataB = await responseB.json();
  const responseC = await fetch(
    "https://the-tournament.net/_next/data/9n8vnpYlyQ87sb9Rdtr8M/ja/leagues/gjzpb571WZX6Kng2pSz3.json?id=gjzpb571WZX6Kng2pSz3"
  );
  const dataC = await responseC.json();
  res.status(200).json({ dataA, dataB, dataC })
}
