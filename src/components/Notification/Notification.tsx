// COMPONENTs
import ErrorIcon from '../../assets/error.svg?react';
import SuccessIcon from '../../assets/success.svg?react';

// TYPES
import type { NotificationType } from '../../types';

// HOOKS
import { useEffect, useState } from 'react';

// STYLES
import styles from './Notification.module.scss';

export default function Notification({
    notification,
    duration = 3000,
}: {
    notification: NotificationType;
    duration?: number;
}) {
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), duration);

        return () => clearTimeout(timer);
    }, [notification, duration]);

    if (!visible) return null;

    return (
        <div
            className={`${styles.notification} ${
                visible ? styles.show : styles.hide
            } ${
                notification.type === 'success' ? styles.success : styles.error
            }`}
        >
            <span className={styles.icon}>
                {notification.type === 'success' ? (
                    <SuccessIcon
                        width={'1.5rem'}
                        height={'1.5rem'}
                        color='#00d123'
                    />
                ) : (
                    <ErrorIcon
                        width={'1.5rem'}
                        height={'1.5rem'}
                        color='#d10000'
                    />
                )}
            </span>
            <span>
                {notification.type === 'success' ? 'Успешно!' : 'Ошибка!'}{' '}
                {notification.message}
            </span>
        </div>
    );
}
