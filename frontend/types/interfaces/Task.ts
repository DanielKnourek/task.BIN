export type TaskContent = {
    headline: string,
    content: string,
    tags?: string[],
};

export type AccesGroup = "public" | "private"

export type Task = {
    id: string,
    ownerID: string,
    creationTimestamp: Date,
    exiprationTimestamp?: Date,
    public: AccesGroup,
    content: TaskContent,
    completed: boolean,
};

export type IDlessTask = Omit<Task, 'id' >

export type NewTask = Pick<Task, 'public' | 'content' | 'exiprationTimestamp'>;

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