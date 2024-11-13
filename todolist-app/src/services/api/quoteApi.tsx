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

export const quoteApi = {
    getQuote
}