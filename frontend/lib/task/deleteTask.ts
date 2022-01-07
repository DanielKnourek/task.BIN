import Client_meredith from '../db/Client_meredith'

import { Task, IDlessTask } from '../../types/interfaces/Task'
import { RequestParams } from '@elastic/elasticsearch'
import { SearchResponse, UpdateResponse } from '../../types/interfaces/ElasticSearch'

type getTasksParams = {
    taskID: string,
    userID: string,
}

const deleteTask = async (querryParams: getTasksParams) => {

    let selectedQuerry = null;
    if (!!querryParams.taskID) {
        selectedQuerry = verifyAndDeleteTask(querryParams.taskID, querryParams.userID);
    }

    if (!selectedQuerry) {
        throw Error("No valid request for tasks.");
    }

    return await selectedQuerry
        .then(({ body, statusCode, headers, warnings, meta }) => {
            if (statusCode != 200) { throw new Error("Request to database was unsuccessful."); }
            return body;
        }).catch(reason => {
            throw reason;
        });

}

const verifyAndDeleteTask = (taskID: Task['id'], userID: Task['ownerID']) => {
    interface querryBody {
        query: {
            bool: {
                must: [
                    { "match": { "_id": `${Task['id']}` } },
                    { "match": { "ownerID": `${Task['ownerID']}` } }
                ]
            }
        }
    }

    const params: RequestParams.DeleteByQuery<querryBody> = {
        index: 'task',
        body: {
            query: {
                bool: {
                    must: [
                        { "match": { "_id": `${taskID}` } },
                        { "match": { "ownerID": `${userID}` } }
                    ]
                }
            }
        },
    }
    return Client_meredith.deleteByQuery<UpdateResponse, querryBody>(params);
}

export default deleteTask;