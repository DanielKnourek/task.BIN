import Client_meredith from '../db/Client_meredith'

import { Task, IDlessTask, PartialTask } from '../../types/interfaces/Task'
import { RequestParams } from '@elastic/elasticsearch'
import { SearchResponse, UpdateResponse } from '../../types/interfaces/ElasticSearch'
import { json } from 'stream/consumers'

type getTasksParams = {
    taskID: string,
    userID: string,
} & ({
    querryType: 'completedStatus',
    completed: Task['status']['completed'],
} | {
    querryType: 'updateFields',
    updateFields: PartialTask,
})

const updateTask = async (querryParams: getTasksParams) => {

    let selectedQuerry = null;
    if (querryParams.querryType == 'completedStatus') {
        selectedQuerry = setCompletedStatus(querryParams.taskID, querryParams.userID, querryParams.completed);

    }
    if (querryParams.querryType == 'updateFields') {
        selectedQuerry = updateTaskFields(querryParams.taskID, querryParams.userID, querryParams.updateFields);
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



const setCompletedStatus = (taskID: string, userID: Task['ownerID'], completed: Task['status']['completed']) => {
    interface querryBody {
        script: {
            lang: 'painless',
            source: `if (ctx._source.ownerID == '${Task['ownerID']}') { ctx._source.status.completed = ${Task['status']['completed']}; }`,
        },
    }

    const params: RequestParams.Update<querryBody> = {
        index: 'task',
        id: taskID,
        body: {
            script: {
                lang: 'painless',
                source: `if (ctx._source.ownerID == '${userID}') { ctx._source.status.completed = ${completed}; }`,
            }
        }
    }
    return Client_meredith.update<UpdateResponse, querryBody>(params);
}

const updateTaskFields = (taskID: string, userID: Task['ownerID'], task: PartialTask) => {

    interface querryBody {
        script: {
            lang: 'painless',
            source: `if (ctx._source.ownerID == '${Task['ownerID']}') {${string}}`,
            params: {},
        },
    }
    let fieldsQuerry = "";
    let paramsObj: {
        access?: Task['status']['access'],
        exiprationTimestamp?: Date,
        content?: string,
        headline?: string
    } = {}
    if (Object.keys(task).includes('status')) {
        if (!!task.status?.access) {
            paramsObj.access = task.status.access;
            fieldsQuerry += ` ctx._source.status.access = params.access; `;
        }
    }
    if (Object.keys(task).includes('exiprationTimestamp')) {
        if (!!task.exiprationTimestamp){
            paramsObj.exiprationTimestamp = task.exiprationTimestamp;
            fieldsQuerry += ` ctx._source.exiprationTimestamp = params.exiprationTimestamp; `
        }else {
            fieldsQuerry += ` ctx._source.remove('exiprationTimestamp'); `
        }
    }
    if (Object.keys(task).includes('content')) {
        if (!!task.content?.content) {
            paramsObj.content = task.content.content;
            fieldsQuerry += ` ctx._source.content.content = params.content; `
        }
        if (!!task.content?.headline) {
            paramsObj.headline = task.content.headline;
            fieldsQuerry += ` ctx._source.content.headline = params.headline; `
        }
    }

    // Object.keys(task).forEach(key => {
    //     fieldsQuerry += ` ctx._source.${key} = ${JSON.stringify(task[key as keyof PartialTask])}; `
    // })

    const params: RequestParams.Update<querryBody> = {
        index: 'task',
        id: taskID,
        body: {
            script: {
                lang: 'painless',
                source: `if (ctx._source.ownerID == '${userID}') { ${fieldsQuerry} }`,
                params: paramsObj,
            }
        },
    }

    return Client_meredith.update<UpdateResponse, querryBody>(params);
}

export default updateTask;