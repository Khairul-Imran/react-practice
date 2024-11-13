import { Todo } from "../types/todo";
import ThemeToggle from "./ThemeToggle";
import { useQuote } from "../hooks/useQuote";

interface TodoHeaderProps {
    todos: Todo[];
}

function TodoHeader({ todos }: TodoHeaderProps) {
    // These were moved to our custom hook
    // const [quote, setQuote] = useState<Quote>();
    // const [isLoading, setIsLoading] = useState(false); // Track loading state
    // const [error, setError] = useState<string | null>(null); // Store any errors

    // Use the custom hook instead of direct state management like above
    const { quote, isLoading, error, refetch } = useQuote();

    const completedCount = todos.filter((todo) => todo.completed).length;
    const totalTodosCount = todos.length;

    // This also moved to our custom hook
    // useEffect(() => {
    //     async function handleGetQuote() {
    //         setIsLoading(true);

    //         try {
    //             // Make the api call
    //             const quote = await quoteApi.getQuote();

    //             // Update the state with the data
    //             setQuote(quote);
    //         } catch (err) {
    //             // Handle any errors that might occur
    //             setError(
    //                 err instanceof Error ? err.message : "An error occurred."
    //             );
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }

    //     handleGetQuote();
    // }, []);

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

            {/* Quote section with retry capability */}
            <div className="mt-4 text-center w-full max-w-2xl">
                {isLoading ? (
                    <div className="text-gray-600 dark:text-gray-400 animate-pulse">
                        Loading quote...
                    </div>
                ) : error ? (
                    <div className="text-red-500 dark:text-red-400">
                        <span>{error}</span>
                        {/* New */}
                        <button
                            onClick={() => refetch()}
                            className="ml-2 px-2 py-1 text-sm bg-red-100 dark:bg-red-900 
                                     rounded hover:bg-red-200 dark:hover:bg-red-800 
                                     transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                ) : quote ? (
                    <div className="text-gray-700 dark:text-gray-300 relative group">
                        <p className="italic">"{quote.quote}"</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            — {quote.author || "Unknown"}
                        </p>
                        {/* New refresh button */}
                        <button
                            onClick={() => refetch()}
                            className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100
                                     transition-opacity duration-200 text-gray-400 
                                     hover:text-gray-600 dark:hover:text-gray-200"
                            title="Get new quote"
                        >
                            ↺
                        </button>
                    </div>
                ) : null}
            </div>
        </header>
    );
}

export default TodoHeader;
