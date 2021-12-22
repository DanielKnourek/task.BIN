export type TaskContent = {
    headline: string,
    content: string,
    tags?: string[],
};

export type Task = {
    id: string,
    ownerID: string,
    creationTimestamp: number,
    exiprationTimestamp?: number,
    public: boolean,
    content: TaskContent,
};

export type IDlessTask = Omit<Task, 'id'>;