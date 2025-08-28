import styles from './FilterTask.module.scss';

const options = [
    { filter: 'all', label: 'Все' },
    { filter: 'active', label: 'Активные' },
    { filter: 'completed', label: 'Выполненные' },
];

export default function FilterTask() {
    return (
        <div className={styles.filterBox}>
            {options.map((option, index) => {
                return (
                    <span
                        className={styles.filter}
                        key={`${option.filter}-${index}`}
                    >
                        {option.label} (0)
                    </span>
                );
            })}
        </div>
    );
}
