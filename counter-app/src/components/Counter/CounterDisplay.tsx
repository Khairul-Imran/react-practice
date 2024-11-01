interface CounterDisplayProps {
    count: number;
}

function CounterDisplay({ count }: CounterDisplayProps) {
    return (
        <div className="text-4xl font-bold my-4">
            Count: {count}
        </div>
    );
}

export default CounterDisplay;
