// COMPONENTS
import TodoListPage from './pages/TodoListPage/TodoListPage.tsx';

// REACT
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

// STYLES
import './global.scss';

const router = createBrowserRouter([
    {
        path: '/',
        element: <TodoListPage />,
    },
    {
        path: '*',
        element: <div>404</div>,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
