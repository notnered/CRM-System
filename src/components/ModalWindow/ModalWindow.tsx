// COMPONENTs
import CrossIcon from '../../assets/cross.svg?react';

// TYPES
import type { Task } from '../../types';

// STYLES
import styles from './ModalWindow.module.scss';

export default function ModalWindow({
    handleEdit,
    showModal,
    setShowModal,
    inputRef,
    task,
}: {
    handleEdit: (task: Task) => void;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
    task: Task;
}) {
    return (
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
    );
}
