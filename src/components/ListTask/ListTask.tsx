import type { Filter } from '../../App';
import CardTask from '../CardTask/CardTask';
import type { NotificationType } from '../Notification/Notification';
import styles from './ListTask.module.scss';
import { useEffect, useState } from 'react';

export type Task = {
    id: number;
    title: string;
    created: string;
    isDone: boolean;
};

export default function ListTask({
    currentFilter,
    refreshFunc,
    todoList,
    appearToast,
}: {
    currentFilter: Filter;
    refreshFunc: () => void;
    todoList: Task[];
    appearToast: (notification: NotificationType) => void;
}) {
    const [tasks, setTasks] = useState<Task[]>(todoList);

    useEffect(() => {
        setTasks(todoList);
    }, [todoList]);

    return (
        <div className={styles.list}>
            {tasks.map((task, index) => {
                switch (currentFilter) {
                    case 'completed':
                        return (
                            task.isDone && (
                                <CardTask
                                    task={task}
                                    refreshFunc={refreshFunc}
                                    appearToast={appearToast}
                                    key={`${task.id}-${index}`}
                                />
                            )
                        );
                    case 'inWork':
                        return (
                            !task.isDone && (
                                <CardTask
                                    task={task}
                                    refreshFunc={refreshFunc}
                                    appearToast={appearToast}
                                    key={`${task.id}-${index}`}
                                />
                            )
                        );
                    default:
                        return (
                            <CardTask
                                task={task}
                                refreshFunc={refreshFunc}
                                appearToast={appearToast}
                                key={`${task.id}-${index}`}
                            />
                        );
                }
            })}
        </div>
    );
}
