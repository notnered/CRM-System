import styles from './FilterTask.module.scss';
import type { Response, Filter } from '../../App';
import { useEffect, useState } from 'react';

const options = [
    { filter: 'all', label: 'Все' },
    { filter: 'completed', label: 'Выполненные' },
    { filter: 'inWork', label: 'В прогрессе' },
];

type TodoInfo = Response['info'];

type FilteredAmount = {
    filter: string;
    label: string;
    amount: number;
};

export default function FilterTask({
    currentFilter,
    todoInfo,
    changeFilter,
}: {
    currentFilter: Filter;
    todoInfo: TodoInfo;
    changeFilter: (filter: Filter) => void;
}) {
    const [filters, setFilters] = useState<FilteredAmount[]>([]);

    useEffect(() => {
        const unitedData = options.map((option, index) => {
            return {
                filter: option.filter,
                label: option.label,
                amount: Object.values(todoInfo)[index],
            };
        });
        setFilters(unitedData);
    }, [todoInfo]);

    return (
        <div className={styles.filterBox}>
            {filters.map((filter, index) => {
                return (
                    <span
                        className={`${styles.filter} ${
                            currentFilter === filter.filter && styles.active
                        }`}
                        key={`${filter.filter}-${index}`}
                        id={filter.filter}
                        onClick={(e) =>
                            changeFilter(String(e.currentTarget.id) as Filter)
                        }
                    >
                        {filter.label}{' '}
                        {filter.amount > 0 && `(${filter.amount})`}
                    </span>
                );
            })}
        </div>
    );
}
