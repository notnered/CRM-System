import { useRef } from 'react';
import styles from './AddTask.module.scss';

export default function AddTask({ refreshFunc }: { refreshFunc: () => void }) {
    const inputRef = useRef<HTMLInputElement>(null);
    async function handleSubmit() {
        if (!inputRef.current) {
            console.error('Текст задачи пустой');
            return;
        }

        if (inputRef.current.value.length < 2) {
            console.error('Длина задачи меньше 2 символов');
            return;
        }

        if (inputRef.current.value.length > 64) {
            console.error('Длина новой задачи более 64 символов');
            return;
        }

        const taskTitle = inputRef.current.value;

        const response = await fetch('https://easydev.club/api/v1/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: taskTitle,
                isDone: false,
            }),
        });
        if (!response.ok) {
            console.error('Ошибка при добавлении задачи');
            return;
        }

        refreshFunc();
    }

    return (
        <div className={styles.box}>
            <input
                name='task-name'
                className={styles.input}
                type='text'
                placeholder='Текст задачи'
                ref={inputRef}
                required
                aria-required
            />
            <button
                onClick={handleSubmit}
                type='submit'
                className={styles.button}
            >
                Добавить задачу
            </button>
        </div>
    );
}
