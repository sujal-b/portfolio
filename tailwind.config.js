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
                'accent': 'var(--accent-color)',
                'card-bg': 'var(--card-bg)',
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(245, 158, 11, 0.25), 0 0 40px rgba(245, 158, 11, 0.15)',
            },
            fontFamily: {
                'mono': ['"Space Grotesk"', 'monospace'],
                'sans': ['"Archivo"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
