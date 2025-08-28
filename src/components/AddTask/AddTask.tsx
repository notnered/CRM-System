import styles from './AddTask.module.scss';

export default function AddTask() {
    return (
        <div className={styles.box}>
            <input
                name='task-name'
                className={styles.input}
                type='text'
                placeholder='Текст задачи'
            />
            <button type='submit' className={styles.button}>
                Добавить задачу
            </button>
        </div>
    );
}
