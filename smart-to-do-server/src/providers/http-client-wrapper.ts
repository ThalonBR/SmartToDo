import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpClientWrapper {
    async request<T = unknown>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        {
            headers = {},
            body
        }: {
            headers?: Record<string, unknown>;
            body?: Record<string, unknown>
        } = {},
    ): Promise<T> {
        console.log(`HTTP ${method} Request to ${url}`);
        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!res.ok) {
            console.log(res)
            throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
        }
        return (await res.json()) as T;
    }
}
