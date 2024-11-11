// import { useEffect, useState } from "react";
import { apiClient } from "./baseApi";

export interface Quote {
    quote: string;
    author: string;
}

function getQuote() {
    return apiClient<Quote>('/random')
}

export const quoteApi = {
    getQuote
}