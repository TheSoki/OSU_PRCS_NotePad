/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
                '10xl': '104rem',
            },
        },
    },
    plugins: [],
}
