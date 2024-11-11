import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import ThemeToggle from "./ThemeToggle";
import { Quote, quoteApi } from "../services/api/quoteApi";

interface TodoHeaderProps {
    todos: Todo[];
}

function TodoHeader({ todos }: TodoHeaderProps) {
    const [quote, setQuote] = useState<Quote>();
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const [error, setError] = useState<string | null>(null); // Store any errors

    const completedCount = todos.filter((todo) => todo.completed).length;
    const totalTodosCount = todos.length;

    useEffect(() => {
        async function handleGetQuote() {
            setIsLoading(true);

            try {
                // Make the api call
                const quote = await quoteApi.getQuote();

                // Update the state with the data
                setQuote(quote);
            } catch (err) {
                // Handle any errors that might occur
                setError(
                    err instanceof Error ? err.message : "An error occurred."
                );
            } finally {
                setIsLoading(false);
            }
        }

        handleGetQuote();
    }, []);

    return (
        <header className="w-full flex flex-col items-center bg-white dark:bg-gray-800 shadow-sm px-6 py-4 mb-6 transition-colors">
            <div className="w-full flex justify-end mb-2">
                <ThemeToggle />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Todo List
            </h1>

            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-4">
                    <span>Total tasks: {totalTodosCount}</span>
                    <span className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                    <span>Completed: {completedCount}</span>
                    <span className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                    <span>Remaining: {totalTodosCount - completedCount}</span>
                </div>
            </div>

            {/* Quote stuff */}
            <div className="mt-4 text-center w-full max-w-2xl">
                {isLoading ? (
                    <div className="text-gray-600 dark:text-gray-400 animate-pulse">
                        Loading quote...
                    </div>
                ) : error ? (
                    <div className="text-red-500 dark:text-red-400">
                        {error}
                    </div>
                ) : quote ? (
                    <div className="text-gray-700 dark:text-gray-300">
                        <p className="italic">"{quote.quote}"</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            — {quote.author || "Unknown"}
                        </p>
                    </div>
                ) : null}
            </div>
        </header>
    );
}

export default TodoHeader;
