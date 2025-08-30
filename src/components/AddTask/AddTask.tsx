// TYPES
import type { Filter, NotificationType } from '../../types';

// HOOKS
import { useRef } from 'react';

// API
import { postData } from '../../api/fetchData';

// STYLES
import styles from './AddTask.module.scss';

export default function AddTask({
    currentFilter,
    refreshFunc,
    appearToast,
}: {
    currentFilter: Filter;
    refreshFunc: (filter?: Filter) => void;
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

        const inputValue = inputRef.current.value.trim();

        if (inputValue.length < 2) {
            appearToast({
                type: 'error',
                message: 'Длина новой задачи меньше 2 символов',
            });
            return;
        }

        if (inputValue.length > 64) {
            appearToast({
                type: 'error',
                message: 'Длина новой задачи более 64 символов',
            });
            return;
        }

        try {
            await postData({ title: inputValue, isDone: false });
            appearToast({
                type: 'success',
                message: 'Задача успешно добавлена',
            });
        } catch (err) {
            appearToast({
                type: 'error',
                message: 'Не удалось добавить задачу',
            });
        } finally {
            refreshFunc(currentFilter);
            inputRef.current.value = '';
        }
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
