export type TaskContent = {
    headline: string,
    content: string,
    tags?: string[],
};

export type Task = {
    id: string,
    ownerID: string,
    creationTimestamp: Date,
    exiprationTimestamp?: Date,
    public: boolean,
    content: TaskContent,
    completed: boolean,
};

export type IDlessTask = Omit<Task, 'id'>;

export type NewTask = Pick<Task, 'public' | 'content' | 'exiprationTimestamp'>;