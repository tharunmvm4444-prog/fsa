/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#A67C52',
                    light: '#C6A68A',
                    dark: '#7A5C3D',
                },
                background: {
                    light: '#FDFCFB',
                    dark: '#1A1A1A',
                },
                surface: {
                    light: '#FFFFFF',
                    dark: '#262626',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                headings: ['Poppins', 'sans-serif'],
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            boxShadow: {
                'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}
