import { apiClient } from "./baseApi";

export interface ApiResponse {
    quote: string;
}

export interface Quote {
    quote: string;
    author: string;
}

async function getQuote(): Promise<Quote> {
    // return apiClient<Quote>('/random')
    const response = await apiClient<ApiResponse>();

    return {
        quote: response.quote,
        author: "Kanye"
    };
}

export const quoteApi = {
    getQuote
}