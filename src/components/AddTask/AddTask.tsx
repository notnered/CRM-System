import { useRef } from 'react';
import styles from './AddTask.module.scss';
import type { NotificationType } from '../Notification/Notification';

export default function AddTask({
    refreshFunc,
    appearToast,
}: {
    refreshFunc: () => void;
    appearToast: (notification: NotificationType) => void;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    async function handleSubmit() {
        if (!inputRef.current) {
            appearToast({
                type: 'error',
                message: 'Не удается найти ссылку на ввод',
            });
            return;
        }

        if (inputRef.current.value.length < 2) {
            appearToast({
                type: 'error',
                message: 'Длина новой задачи меньше 2 символов',
            });
            return;
        }

        if (inputRef.current.value.length > 64) {
            appearToast({
                type: 'error',
                message: 'Длина новой задачи более 64 символов',
            });
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
            appearToast({
                type: 'error',
                message: 'Не удалось добавить задачу',
            });
            return;
        }

        appearToast({
            type: 'success',
            message: 'Задача успешно добавлена',
        });
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
