import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';

import deleteTask from '../../../../lib/task/deleteTask';
import { getUserID } from '../../../../lib/user';

const APIdelete = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    let responseMessage;

    try {
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({ message: "Not autheticated, please log in." });
        }

        const results = await deleteTask({
            userID: getUserID(session),
            taskID: String(req.query.taskid),
        });
        
        return res.json(results);

    } catch (error: any) {
        responseMessage = error?.message;
    }

    //TODO remove print error ?
    return res.status(400).json({ message: "An error has occured", error: responseMessage });
}


export default APIdelete;