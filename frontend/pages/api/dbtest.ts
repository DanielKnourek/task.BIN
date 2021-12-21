import type { NextApiRequest, NextApiResponse } from 'next'
import client_meredith from '../../lib/db_meredith/Client_meredith'

const test = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let status = await client_meredith.cluster.health();
    res.send(JSON.stringify({
      greeting: "Hello",
      status: status,
    }, null, 10));
}

export default test;