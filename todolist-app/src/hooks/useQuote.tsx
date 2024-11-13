import { useCallback, useEffect, useState } from "react";
import { Quote, quoteApi } from "../services/api/quoteApi";

interface UseQuoteResult {
    quote: Quote | undefined;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>; // Why this?
}

// Custom Hook:
// - Encapsulates all quote-related logic
// - Provides clean interface for components
// - Handles all state management
// - Reusable across components if needed

export function useQuote(): UseQuoteResult {
    const [quote, setQuote] = useState<Quote>();
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const [error, setError] = useState<string | null>(null); // Store any errors

    // Use useCallback to memoize the fetch function
    const fetchQuote = useCallback(async (signal?: AbortSignal) => {
        setIsLoading(true);
        setError(null);

        try {
            // Make the api call
            const quote = await quoteApi.getQuote(signal);
            // Update the state with the data
            setQuote(quote);
        } catch (err) { // Handle any errors that might occur
            // Don't set error if the request was cancelled
            if (err instanceof Error && err.name === 'AbortError') return;
            setError(err instanceof Error ? err.message : "An error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial fetch with cleanup
    useEffect(() => {
        const abortController = new AbortController();

        fetchQuote(abortController.signal);

        // Cleanup function to cancel request when component unmounts
        return () => abortController.abort();


    }, [fetchQuote]);

    // Request Cancellation:
    // - Uses AbortController for request cancellation
    // - Prevents memory leaks
    // - Handles component unmounting properly
    // - Ignores errors from cancelled requests

    return {
        quote,
        isLoading,
        error,
        refetch: () => fetchQuote()
    };
}
