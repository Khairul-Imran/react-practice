import { useState } from "react";
import Button from '../Button/Button'
import CounterDisplay from "./CounterDisplay";

function Counter() {
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount(prev => prev + 1);
    const decrement = () => setCount(prev => prev - 1);
    const reset = () => setCount(0);

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