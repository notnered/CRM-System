import AddTask from './components/AddTask/AddTask';
import FilterTask from './components/FilterTask/FilterTask';
import ListTask, { type Task } from './components/ListTask/ListTask';
import { useState, useEffect } from 'react';
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

    async function refreshData() {
        const response = await fetch('https://easydev.club/api/v1/todos');
        const json = await response.json();
        console.log(json);
        setTodosData(json);
    }

    async function filterCallback(filter: Filter) {
        setFilter(filter);
    }

    useEffect(() => {
        (async function () {
            refreshData();
        })();
    }, []);

    if (!todosData) return null;

    return (
        <div className={styles.container}>
            <div className={styles.appBox}>
                <AddTask refreshFunc={refreshData} />
                <FilterTask
                    currentFilter={filter}
                    changeFilter={filterCallback}
                    todoInfo={todosData.info}
                />
                <ListTask
                    currentFilter={filter}
                    refreshFunc={refreshData}
                    todoList={todosData.data}
                />
            </div>
        </div>
    );
}

export default App;
