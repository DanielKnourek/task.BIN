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
    public: false | AccesGroup,
    content: TaskContent,
    completed: boolean,
};

export type IDlessTask = Omit<Task, 'id'>;

export type NewTask = Pick<Task, 'public' | 'content' | 'exiprationTimestamp'>;

export type FormUtilTypes = {
    allowDeadline?: boolean,
    responseStatus?: {
        status: 201,
        message?: 'created'
    } | {
        status: 500,
        message?: 'Error, please try again.'
    },
}