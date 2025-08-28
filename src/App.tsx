import AddTask from './components/AddTask/AddTask';
import FilterTask from './components/FilterTask/FilterTask';
import ListTask, { type Task } from './components/ListTask/ListTask';
import { useState, useEffect } from 'react';
import Notification, {
    type NotificationType,
} from './components/Notification/Notification';
import styles from './App.module.scss';

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

function App() {
    const [todosData, setTodosData] = useState<Response | null>(null);
    const [filter, setFilter] = useState<Filter>('all');
    const [notification, setNotification] = useState<NotificationType | null>(
        null
    );

    async function refreshData() {
        const response = await fetch('https://easydev.club/api/v1/todos');
        const json = await response.json();
        setTodosData(json);
    }

    async function filterCallback(filter: Filter) {
        setFilter(filter);
    }

    async function appearToast(notification: NotificationType) {
        setNotification(notification);
    }

    useEffect(() => {
        (async function () {
            refreshData();
        })();
    }, []);

    if (!todosData) return null;

    return (
        <>
            {notification && (
                <Notification notification={notification} duration={3000} />
            )}
            <div className={styles.container}>
                <div className={styles.appBox}>
                    <AddTask
                        refreshFunc={refreshData}
                        appearToast={appearToast}
                    />
                    <FilterTask
                        currentFilter={filter}
                        changeFilter={filterCallback}
                        todoInfo={todosData.info}
                    />
                    <ListTask
                        currentFilter={filter}
                        refreshFunc={refreshData}
                        appearToast={appearToast}
                        todoList={todosData.data}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
