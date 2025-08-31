// COMPONENTs
import DeleteIcon from '../../assets/delete-rounded.svg?react';
import EditIcon from '../../assets/edit-rounded.svg?react';
import ModalWindow from '../ModalWindow/ModalWindow';

// TYPES
import type { Task, Filter, NotificationType } from '../../types';

// HOOKS
import { useRef, useState } from 'react';

// API
import { deleteData, putData } from '../../api/fetchData';

// STYLES
import styles from './CardTask.module.scss';

export default function CardTask({
    task,
    currentFilter,
    refreshFunc,
    appearToast,
}: {
    task: Task;
    currentFilter: Filter;
    refreshFunc: (filter?: Filter) => void;
    appearToast: (notification: NotificationType) => void;
}) {
    const [complete, setComplete] = useState<boolean>(task.isDone);
    const [showModal, setShowModal] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    async function handleComplete(id: number): Promise<void> {
        const isDoneStatus = !complete;

        try {
            await putData(id, { isDone: isDoneStatus });
            setComplete(isDoneStatus);
        } catch {
            appearToast({
                type: 'error',
                message: 'Не удалось обновить задачу',
            });
        } finally {
            refreshFunc(currentFilter);
        }
    }

    async function handleDelete(id: number): Promise<void> {
        try {
            await deleteData(id);
            appearToast({
                type: 'success',
                message: 'Задача удалена',
            });
        } catch {
            appearToast({
                type: 'error',
                message: 'Не удалось удалить задачу',
            });
        } finally {
            refreshFunc(currentFilter);
        }
    }

    async function handleEdit(task: Task) {
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
            await putData(task.id, { title: inputValue });
            appearToast({
                type: 'success',
                message: 'Задача обновлена',
            });
        } catch {
            appearToast({
                type: 'error',
                message: 'Не удалось обновить задачу',
            });
        } finally {
            setShowModal(false);
            refreshFunc(currentFilter);
        }
    }

    return (
        <>
            {showModal && (
                <ModalWindow
                    handleEdit={handleEdit}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    inputRef={inputRef}
                    task={task}
                />
            )}
            <div className={styles.card}>
                <div className={styles.status}>
                    <label className={styles.status}>
                        <input
                            type='checkbox'
                            checked={complete}
                            onChange={() => handleComplete(task.id)}
                        />
                        <span className={styles.circle}></span>
                    </label>
                </div>
                <div className={styles.title}>{task.title}</div>
                <div className={styles.actionBox}>
                    <button
                        className={styles.edit}
                        onClick={() => setShowModal(!showModal)}
                    >
                        <EditIcon width={'1.5rem'} height={'1.5rem'} />
                    </button>
                    <button
                        className={styles.delete}
                        onClick={() => handleDelete(task.id)}
                    >
                        <DeleteIcon width={'1.5rem'} height={'1.5rem'} />
                    </button>
                </div>
            </div>
        </>
    );
}
