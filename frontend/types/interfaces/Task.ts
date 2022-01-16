export type TaskContent = {
    headline: string,
    content: string,
    tags?: string[],
};

export type AccessGroup = "public" | "private"

export type Task = {
    id: string,
    ownerID: string,
    creationTimestamp: Date,
    exiprationTimestamp?: Date,
    content: TaskContent,
    status: {
        access: AccessGroup,
        completed: boolean,
    },
};

export type PartialTask = Partial<NewTask>

export type IDlessTask = Omit<Task, 'id'>

export type NewTask = Pick<Task, 'content' | 'exiprationTimestamp'> & { status : { access: AccessGroup}};
// export type NewTask = Pick<Task, 'status' | 'content' | 'exiprationTimestamp'>;

export type FormUtilTypes = {
    allowDeadline?: boolean,
} & FormOperationResponse

export type FormOperationResponse = {
    responseStatus?: {
        status: 201,
        message?: 'created',
        taskID?: string,
    } | {
        status: 500,
        message?: 'Something went wrong, try again.'
    } |
    {
        status: number,
        message?: string
    },
}