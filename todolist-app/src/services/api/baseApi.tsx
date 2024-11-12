// const BASE_URL = 'https://zenquotes.io/api';
// const BASE_URL = 'https://stoic.tekloon.net/stoic-quote';
const BASE_URL = 'https://api.kanye.rest';

export async function apiClient<T>(): Promise<T> {
    // const response = await fetch(`${BASE_URL}${endpoint}`, {
    const response = await fetch(BASE_URL, {
        // mode: 'no-cors'
    });
    
    // Check if the response is okay (status range between 200-299)
    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    // Parse the JSON response
    return response.json();
}
