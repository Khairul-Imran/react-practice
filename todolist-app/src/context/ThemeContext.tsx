import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

// 1. Define the type for our context
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

// 2. Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Create the provider along with its functionality
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Initialise theme from localStorage or default to 'light' mode
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "light" || savedTheme === "dark"
            ? savedTheme
            : "light";
    });

    // Theme toggle implementation
    useEffect(() => {
        // First, save the theme preference to localStorage
        localStorage.setItem("theme", theme);

        // Remove both possible theme classes to avoid conflicts, and "start fresh"
        document.documentElement.classList.remove("light", "dark");

        // Add the current theme class
        document.documentElement.classList.add(theme);
    }, [theme]); // Run this effect whenever the theme changes

    // IMPORTANT:

    // <!-- Before theme change (light mode) -->
    // <html class="light">
    //     <!-- rest of your app -->
    // </html>

    // <!-- After changing to dark mode -->
    // <html class="dark">
    //     <!-- rest of your app -->
    // </html>

    // This is necessary because:
    // 1. Tailwind's dark mode looks for a parent dark class to apply dark mode styles
    // 2. When you write dark:bg-gray-900 in your components, it only works if there's a dark class on a parent element
    // 3. Putting it on the <html> tag ensures it affects the entire application

    // Now Tailwind knows to apply dark mode styles
    // className="bg-white dark:bg-gray-900"
    // ➜ Will use bg-gray-900 because parent has 'dark' class

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 4. Create a custom hook for easier usage
// 5. Then use the hook in other components
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider.");
    }
    return context;
}
