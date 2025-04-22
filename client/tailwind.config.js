/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "files./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require('tailwindcss-primeui')]
}