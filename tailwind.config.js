/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'neo-bg': '#F5F5F0',
                'neo-accent': '#00FF00',
                'neo-black': '#000000',
                'neo-white': '#FFFFFF',
            },
            boxShadow: {
                'neo': '4px 4px 0px 0px rgba(0,0,0,1)',
                'neo-hover': '6px 6px 0px 0px rgba(0,0,0,1)',
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
