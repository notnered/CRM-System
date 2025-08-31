// COMPONENTs
import CardTask from '../CardTask/CardTask';

// TYPES
import type { Filter, Task, NotificationType } from '../../types';

// HOOKS
import { useEffect, useState } from 'react';

// STYLES
import styles from './ListTask.module.scss';

export default function ListTask({
    currentFilter,
    refreshFunc,
    todoList,
    appearToast,
}: {
    currentFilter: Filter;
    refreshFunc: (filter?: Filter) => void;
    todoList: Task[];
    appearToast: (notification: NotificationType) => void;
}) {
    const [tasks, setTasks] = useState<Task[]>(todoList);

    useEffect(() => {
        setTasks(todoList);
    }, [todoList]);

    if (tasks.length === 0) {
        return (
            <div className={styles.list}>
                <div className={styles.empty}>Список задач пуст</div>
            </div>
        );
    }

    return (
        <div className={styles.list}>
            {tasks.map((task, index) => {
                return (
                    <CardTask
                        task={task}
                        currentFilter={currentFilter}
                        refreshFunc={refreshFunc}
                        appearToast={appearToast}
                        key={`${task.id}-${index}`}
                    />
                );
            })}
        </div>
    );
}
