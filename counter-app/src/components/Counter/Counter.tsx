import { useState, useEffect, KeyboardEvent as ReactKeyBoardEvent, useRef } from "react";
import Button from '../Button/Button'
import CounterDisplay from "./CounterDisplay";

function Counter() {

    // Create a ref for the div
    const divRef = useRef<HTMLDivElement>(null);

    // Focuses the div when the component mounts
    useEffect(() => {
        divRef.current?.focus();
    }, []);

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
    // Best not to use useEffect like this.
    // useEffect(() => {
    //     const handleKeyPress = (e: KeyboardEvent) => {
    //         if (e.key === 'ArrowUp') increment();
    //         if (e.key === 'ArrowDown') decrement();
    //     };

    //     window.addEventListener('keydown', handleKeyPress);

    //     // Cleanup function - runs before effect runs again or component unmounts
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyPress);
    //     };
    // }, []);

    // New
    const handleKeyDown = (e: ReactKeyBoardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowUp') increment();
        if (e.key === 'ArrowDown') decrement();
    };

    return (
        <div
            ref={divRef} 
            className="flex flex-col items-center gap-4"
            tabIndex={0} 
            onKeyDown={handleKeyDown}
        >
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
