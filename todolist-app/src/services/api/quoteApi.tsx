import { apiClient } from "./baseApi";

export interface ApiResponse {
    quote: string;
}

export interface Quote {
    quote: string;
    author: string;
}

// Accepts AbortSignal as an optional parameter
async function getQuote(signal?: AbortSignal): Promise<Quote> {
    const response = await apiClient<ApiResponse>('', {
        signal // Pass the signal to fetch for cancellation
    });

    return {
        quote: response.quote,
        author: "Kanye"
    };
}

// Some examples of other requests that can be used (includes headers, other options)

// Basic GET request
// const data = await apiClient<SomeType>('/endpoint');

// POST request with body
// const response = await apiClient<SomeType>('/endpoint', {
//     method: 'POST',
//     body: JSON.stringify({ name: 'John' })
// });

// Request with custom headers
// const dataWithAuth = await apiClient<SomeType>('/endpoint', {
//     headers: {
//         'Authorization': 'Bearer token123'
//     }
// });

// Combining multiple options
// const complexRequest = await apiClient<SomeType>('/endpoint', {
//     method: 'POST',
//     body: JSON.stringify({ name: 'John' }),
//     headers: {
//         'Authorization': 'Bearer token123',
//         'Custom-Header': 'some-value'
//     }
// });

export const quoteApi = {
    getQuote
}
