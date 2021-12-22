import Client_meredith from '../db/Client_meredith'

import { RequestParams } from '@elastic/elasticsearch'
import { IDlessTask } from '../../types/interfaces/Task'
import { IndexResponse } from '../../types/interfaces/ElasticSearch'

const postTask = async (newTask: IDlessTask) => {
    const newTaskQuerry: RequestParams.Index<IDlessTask> = {
        index: 'task',
        body: newTask
    }

    Client_meredith.index<IndexResponse>(newTaskQuerry)
        .then(({ body, statusCode, headers, warnings, meta }) => {
            if (statusCode != 201) { throw new Error("Request to database was unsuccessful."); }

            return body;
        }).catch(reason => {
            throw reason;
        })
}

export default postTask;