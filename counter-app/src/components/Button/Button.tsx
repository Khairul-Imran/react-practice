interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode; // Important
    variant?: 'increment' | 'decrement' | 'reset';
}

function Button({ onClick, children, variant = 'increment' }: ButtonProps) {

    const baseStyles = "px-4 py-2 rounded-md text-white font-bold";
    const variantStyles = {
        increment: "bg-green-500 hover:bg-green-600",
        decrement: "bg-red-500 hover:bg-red-600",
        reset: "bg-gray-500 hover:bg-gray-600"
    };

    // Ensures variant is valid
    // If variant is in variantStyles, leave it
    // If it isn't assign it 'increment'
    const safeVariant = variant in variantStyles ? variant : 'increment';

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[safeVariant]}`}
        >
            {children}
        </button>
    );
}

export default Button;
