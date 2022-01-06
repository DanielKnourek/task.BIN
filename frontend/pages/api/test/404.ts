// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(404).json({ message: 'not found' })
  // res.status(401).send(JSON.stringify({ message: "No session created, please login." }, null, 2));
}
