// TYPES
import type { Filter, NotificationType } from '../../types';

// HOOKS
import { useRef, useState } from 'react';

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
    const [hasError, setHasError] = useState<boolean>(false);

    async function handleSubmit() {
        setHasError(false);

        if (!inputRef.current) {
            appearToast({
                type: 'error',
                message: 'Не удается найти ссылку на ввод',
            });
            setHasError(true);
            return;
        }

        const inputValue = inputRef.current.value.trim();

        if (inputValue.length < 2) {
            appearToast({
                type: 'error',
                message: 'Длина новой задачи меньше 2 символов',
            });
            setHasError(true);
            inputRef.current.value = '';
            return;
        }

        if (inputValue.length > 64) {
            appearToast({
                type: 'error',
                message: 'Длина новой задачи более 64 символов',
            });
            setHasError(true);
            inputRef.current.value = '';
            return;
        }

        try {
            await postData({ title: inputValue, isDone: false });
            appearToast({
                type: 'success',
                message: 'Задача успешно добавлена',
            });
        } catch {
            appearToast({
                type: 'error',
                message: 'Не удалось добавить задачу',
            });
            setHasError(true);
        } finally {
            refreshFunc(currentFilter);
            inputRef.current.value = '';
        }
    }

    return (
        <div className={styles.box}>
            <input
                name='task-name'
                className={`${styles.input} ${hasError && styles.error}`}
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
