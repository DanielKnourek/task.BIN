import type { NextApiRequest, NextApiResponse } from 'next'
import Client_meredith from '../../../lib/db/Client_meredith'
import { Task } from '../../../types/interfaces/Task'

const test = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let status = await Client_meredith.cluster.health();
  let response = {
    greeting: "Hello",
    status: status,
  };
  res.send(JSON.stringify(response, null, 2));
}

export default test;