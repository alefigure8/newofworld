import {apiUrl} from './config.js';

export async function getNews (value) {
    const result = await fetch(`http://localhost:8000/${value}`)
    const data = await result.json()
    return data
}