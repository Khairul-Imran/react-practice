import { useState, useEffect } from "react";
import Button from '../Button/Button'
import CounterDisplay from "./CounterDisplay";

function Counter() {
    // Initialise state from localStorage or default to 0
    const [count, setCount] = useState<number>(() => {
        const savedCount = localStorage.getItem('count');
        return savedCount ? JSON.parse(savedCount) : 0;
    });

    const increment = () => setCount(prev => prev + 1);
    const decrement = () => setCount(prev => prev - 1);
    const reset = () => setCount(0);

    // to save count to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('count', JSON.stringify(count));
    }, [count]); // Dependency array - useEffect runs when these values change

    // Event listeners for arrow keys
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') increment();
            if (e.key === 'ArrowDown') decrement();
        };

        window.addEventListener('keydown', handleKeyPress);

        // Cleanup function - runs before effect runs again or component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div className="flex flex-col items-center gap-4">
            <CounterDisplay count={count} />
            <div className="flex gap-2">
                <Button onClick={decrement} variant="decrement">-</Button>
                <Button onClick={increment} variant="increment">+</Button>
            </div>
            <Button onClick={reset} variant="reset">Reset</Button>
        </div>
    );
}

export default Counter;
