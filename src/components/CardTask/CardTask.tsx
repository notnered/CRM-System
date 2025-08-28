import DeleteIcon from '../../assets/delete-rounded.svg?react';
import EditIcon from '../../assets/edit-rounded.svg?react';
import { useRef, useState } from 'react';
import CrossIcon from '../../assets/cross.svg?react';
import type { Task } from '../ListTask/ListTask';
import styles from './CardTask.module.scss';
import type { NotificationType } from '../Notification/Notification';

export default function CardTask({
    task,
    refreshFunc,
    appearToast,
}: {
    task: Task;
    refreshFunc: () => void;
    appearToast: (notification: NotificationType) => void;
}) {
    const [complete, setComplete] = useState<boolean>(task.isDone);
    const [showModal, setShowModal] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleComplete(id: number) {
        const isDoneStatus = !complete;
        const response = await fetch(
            `https://easydev.club/api/v1/todos/${id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    isDone: isDoneStatus,
                }),
            }
        );
        if (!response.ok) {
            appearToast({
                type: 'error',
                message: 'Не удалось обновить задачу',
            });
            return;
        }

        setComplete(isDoneStatus);
        refreshFunc();
    }

    async function handleDelete(id: number) {
        const response = await fetch(
            `https://easydev.club/api/v1/todos/${id}`,
            {
                method: 'DELETE',
            }
        );
        if (!response.ok) {
            appearToast({
                type: 'error',
                message: 'Не удалось обновить задачу',
            });
            return;
        }

        appearToast({
            type: 'success',
            message: 'Задача удалена',
        });
        refreshFunc();
    }

    async function handleEdit(task: Task) {
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

        const newTitle = inputRef.current.value;
        const response = await fetch(
            `https://easydev.club/api/v1/todos/${task.id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: newTitle,
                }),
            }
        );
        if (!response.ok) {
            appearToast({
                type: 'error',
                message: 'Не удалось обновить задачу',
            });
            return;
        }

        appearToast({
            type: 'success',
            message: 'Задача обновлена',
        });
        setShowModal(false);
        refreshFunc();
    }

    return (
        <>
            {showModal && (
                <div className={styles.modalBg}>
                    <div className={styles.modal}>
                        <div
                            className={styles.modal__close}
                            onClick={() => setShowModal(!showModal)}
                        >
                            <CrossIcon
                                color='black'
                                width={'1.5rem'}
                                height={'1.5rem'}
                            />
                        </div>
                        <label className={styles.modal__label}>
                            <span className={styles.modal__labelText}>
                                Текст задачи: {task.id}
                            </span>
                            <input
                                className={styles.modal__input}
                                ref={inputRef}
                                placeholder='Новый текст задачи'
                                type='text'
                                required
                            />
                        </label>
                        <button
                            onClick={() => handleEdit(task)}
                            className={styles.modal__button}
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
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
