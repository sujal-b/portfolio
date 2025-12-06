/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'discord-bg': 'var(--bg-primary)',
                'neon-green': 'var(--accent-color)',
                'card-bg': 'var(--card-bg)',
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
            },
            boxShadow: {
                'glow': '0 0 10px rgba(57, 255, 20, 0.5), 0 0 20px rgba(57, 255, 20, 0.3)',
                'glow-strong': '0 0 15px rgba(57, 255, 20, 0.7), 0 0 30px rgba(57, 255, 20, 0.5)',
            },
            fontFamily: {
                'mono': ['"Space Mono"', 'monospace'],
                'sans': ['Inter', 'sans-serif'],
            },
            borderWidth: {
                '3': '3px',
                '4': '4px',
            }
        },
    },
    plugins: [],
}
