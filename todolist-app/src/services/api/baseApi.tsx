const BASE_URL = 'https://api.kanye.rest';

export async function apiClient<T>(
        endpoint: string = '', // Make endpoint optional, with default empty string value
        options: RequestInit = {} // Allow passing fetch options and AbortSignal
    ): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        // These are the parameters/properties that you are passing to the RequestInit
        ...options,
        headers: {
            'Content-Type' : 'application/json',
            ...options.headers,
        },
    });
    
    // Check if the response is okay (status range between 200-299)
    if (!response.ok) {
        // response.statusText contains the status message corresponding to the HTTP status code received
        throw new Error(`API Error: ${response.statusText}`);
    }

    // Parse the JSON response
    return response.json();
}
