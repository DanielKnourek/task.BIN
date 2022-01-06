import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';

import getTasks from '../../../../lib/task/getTasks'
import { getUserID } from '../../../../lib/user';

const APIget = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    // console.log(JSON.stringify(req.query));
    // return res.json({...req.query, message: "All yours tasks"});
    let responseMessage;
    try {
        // if taskID
        // public | all | global
        if (req.query.taskid == 'public' || req.query.taskid == 'all' || req.query.taskid == 'global') {
            const results = await getTasks({ querryType: 'public' });
            return res.json(results);
        }

        // console.log(results);

        // else authenticate
        // private | my | --UIID--
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({ message: "Not autheticated, please log in or get public tasks via api/task/public" });
        }

        if (req.query.taskid == 'private' || req.query.taskid == 'my' || req.query.taskid == getUserID(session)) {
            const results = await getTasks({ querryType: 'private', ownerID: getUserID(session) });
            return res.json(results);
        }

    } catch (error: any) {
        responseMessage = error?.message;
    }

    //TODO remove print error
    return res.status(400).json({ message: "An error has occured", error: responseMessage });
}

export default APIget;