const BASE_URL = 'https://zenquotes.io/api';

export async function apiClient<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        // mode: 'no-cors'
    });
    
    // Check if the response is okay (status range between 200-299)
    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    // Parse the JSON response
    return response.json();
}
