export type Response = {
    data: Task[];
    info: {
        all: number;
        completed: number;
        inWork: number;
    };
    meta: {
        totalAmount: number;
    };
};

export type Filter = 'all' | 'inWork' | 'completed';

export type Task = {
    id: number;
    title: string;
    created: string;
    isDone: boolean;
};

export type NotificationType = {
    type: 'success' | 'error';
    message: string;
};

export type TodoInfo = Response['info'];

export type FilteredAmount = {
    filter: string;
    label: string;
    amount: number;
};
