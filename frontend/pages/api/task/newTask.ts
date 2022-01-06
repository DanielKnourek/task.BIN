import type { NextApiRequest, NextApiResponse } from 'next'
import { IDlessTask, NewTask } from '../../../types/interfaces/Task'
import postTask from '../../../lib/task/postTask'
import { getSession } from "next-auth/react"
import { getUserID } from '../../../lib/user'
import DOMPurify from 'isomorphic-dompurify';


const newTask = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    // res.status(404).send("Disabled API");
    // TODO authenticate
    const session = await getSession({ req });

    // console.log(session);

    if (!session) {
        res.status(401).json({ message: "No session created, please login." });
        // res.status(401).send(JSON.stringify({ message: "No session created, please login." }, null, 2));
        return;
    }

    // TODO getUserID
    // session.sub
    // TODO TaskfromReq
    // TODO XSS / escapecharacters 

    // const reqTask = await getAndValidateReq(req);

    // let newTask: IDlessTask = {
    //     ...reqTask,
    //     ownerID: getUserID(session!),
    //     completed: false,
    //     creationTimestamp: new Date(),
    // };

    console.log("---Req---");
    console.log(req.body);

    let newTasks = await parseTasks(req)
        .then(result => { return result })
        .catch(error => {
            res.status(400).send(JSON.stringify(error));
            return [];
        });

    // TODO phony handling 
    if (newTasks.length == 0) {
        return;
    }

    // TODO type error handling 
    // if (newTasks instanceof Object) {
    //     return res.status(500).send("request could not be understood.");
    // }

    console.log("---newTasks---");
    console.log(newTasks);
    // console.log(JSON.stringify(typeof newTasks));
    // return res.status(999).send("Debug. where is error ?");
    // res.status(409).send("Disabled API");
    // return;


    // let result = {
    //     count: newTasks.length,
    //     successful: 0,
    //     responses: [],
    // }
    // for (const newTask of newTasks) {
    //     const response = await postTask(newTask);
    // }
    console.log("PointerSTART");
    console.log("PointerEND");

    await Promise.all(newTasks.map((newTask: IDlessTask) => { return postTask(newTask) }))
        .then(results => {
            res.send(JSON.stringify({ results }, null, 2));
        })
        .catch(reason => {
            res.status(503).send(reason.toString());
        })

    // return res.status(500).send("All paths failed.");


    // const newTask: IDlessTask = {
    //     creationTimestamp: new Date(),
    //     ownerID: "daniel",
    //     public: 'private',
    //     completed: false,
    //     content: {
    //         headline: "headline",
    //         content: "Subnautica čumík 5",
    //     }
    // }


    //         .then(response => {
    //             res.send(JSON.stringify({ response }, null, 2));
    //         }).catch(reason => {
    //             res.status(503).send(reason.toString());
    //         })
}

const parseTasks = async (req: NextApiRequest): Promise<IDlessTask[]> => {
    const session = await getSession({ req });
    let PreparedTasks: IDlessTask[] = new Array();

    if (!req.body.tasks) {
        return [];
    }
    try {
        for (const reqTask of req.body.tasks) {
            const reqIDlessTask = await getAndValidateReq(reqTask);


            const PreparedTask: IDlessTask = {
                ...reqIDlessTask,
                creationTimestamp: new Date(),
                ownerID: getUserID(session!),
                completed: false,
            };
            PreparedTasks.push(PreparedTask);
        }

    } catch (error) {
        throw error;
    }
    return PreparedTasks;
}

const getAndValidateReq = async (idlessTask: NewTask): Promise<NewTask> => {
    //TODO better sanitizing solution
    try {
        let newTask: NewTask = {
            public: (() => {
                if (idlessTask.public == 'public') {
                    return 'public';
                }
                return 'private';

            })(),
            content: {
                headline: DOMPurify.sanitize(idlessTask.content.headline),
                content: DOMPurify.sanitize(idlessTask.content.content),
                tags: [],
            },
        };
        try {
            // a butifull place to be exploited :) or is it ?
            if (!!idlessTask.exiprationTimestamp) {
                const tmpTimestamp = new Date(idlessTask.exiprationTimestamp);
                if (tmpTimestamp instanceof Date && !isNaN(tmpTimestamp.getTime()) && tmpTimestamp.getTime() > 10) {
                    newTask.exiprationTimestamp = tmpTimestamp;
                }
            }
        } catch (error) {
            // Do nothing, 
            // newTask.exiprationTimestamp is optional.
        }

        return newTask;
    } catch (error) {
        throw error;
    }
}

export default newTask;