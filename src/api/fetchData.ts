import type { Filter } from '../types';

const API_URL = 'https://easydev.club/api/v1';

export async function getData<TResponse>(
    filter: Filter = 'all'
): Promise<TResponse> {
    const response = await fetch(`${API_URL}/todos?filter=${filter}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json;
}

export async function postData<TRequest, TResponse>(
    data: TRequest
): Promise<TResponse> {
    const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json;
}

export async function putData<TRequest, TResponse>(
    id: number,
    data: TRequest
): Promise<TResponse> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json;
}

export async function deleteData(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return;
}
