// COMPONENTS
import AddTask from '../../components/AddTask/AddTask';
import FilterTask from '../../components/FilterTask/FilterTask';
import ListTask from '../../components/ListTask/ListTask';
import Notification from '../../components/Notification/Notification';

// TYPES
import type { Filter, Response, NotificationType } from '../../types';

// API
import { getData } from '../../api/fetchData';

// HOOKS
import { useState, useEffect } from 'react';

// STYLES
import styles from './TodoListPage.module.scss';

export default function TodoListPage() {
    const [todosData, setTodosData] = useState<Response | null>(null);
    const [filter, setFilter] = useState<Filter>('all');
    const [notification, setNotification] = useState<NotificationType | null>(
        null
    );

    async function refreshData(filter: Filter = 'all') {
        const data = await getData<Response>(filter);
        setTodosData(data);
    }

    async function filterCallback(filter: Filter = 'all') {
        setFilter(filter);
    }

    async function appearToast(notification: NotificationType) {
        setNotification(notification);
    }

    useEffect(() => {
        (async function () {
            refreshData(filter);
        })();
    }, [filter]);

    if (!todosData) return null;

    return (
        <>
            {notification && (
                <Notification notification={notification} duration={3000} />
            )}
            <div className={styles.container}>
                <div className={styles.appBox}>
                    <AddTask
                        currentFilter={filter}
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
