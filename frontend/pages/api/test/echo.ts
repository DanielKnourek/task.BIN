import type { NextApiRequest, NextApiResponse } from 'next'

const test = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    res.send(JSON.stringify({request: {body: req.body, query: req.query, headers: req.headers}}, null, 2));
}

export default test;