export type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export type TodoState = { 
    list: Todo[];
    loading: boolean;
    error: string | undefined;
}