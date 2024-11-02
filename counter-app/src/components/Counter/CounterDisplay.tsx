interface CounterDisplayProps {
    count: number;
}

function CounterDisplay({ count }: CounterDisplayProps) {

    const baseStyles = "text-4xl font-bold my-4 flex items-center gap-2";

    const numberVariantStyles = {
        positive: "text-green-500",
        negative: "text-red-500",
        zero: "text-gray-500"
    };

    // const getVariant = (count: number) => {
    //     if (count > 0) return 'positive';
    //     if (count < 0) return 'negative';
    //     return 'zero';
    // };

    // const currentVariant = getVariant(count);

    // More direct way of determining the variant
    const currentVariant2 = count > 0 ? 'positive' : count < 0 ? 'negative' : 'zero';

    return (
        <div className={baseStyles}>
            <span>Count:</span>
            <span className={numberVariantStyles[currentVariant2]}>
                {count}
            </span>
        </div>
    );
}

export default CounterDisplay;
