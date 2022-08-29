const colors = require("tailwindcss/colors")


const DEFAULT_COLOR = {
    "blue": "var(--color-blue)",
    "blue--light": "var(--color-blue--light)",
    "green": "var(--color-green)",
    "grey": "var(--color-grey)",
    "grey--light": "var(--color-grey--light)",
    "grey--lightsword": "var(--color-grey--lightsword)",
    "black": "var(--color-black)",
    "red": "var(--color-red)",
    "bg": "var(--color-bg)",
    transparent: "transparent",
    current: "currentColor",
    white: colors.white,
}

module.exports = {
    mode: "jit",
    purge: [
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            tablet: "768px",
            laptop: "1024px",
            desktop: "1110px"
        },
        colors: DEFAULT_COLOR,
        textColor: DEFAULT_COLOR,
        borderColor: DEFAULT_COLOR,

        extend: {
            spacing: {
                px: "1px",
                0: "0",
                1: "0.25rem",
                2: "0.5rem",
                3: "0.75rem",
                4: "1rem",
                5: "1.25rem",
                6: "1.5rem",
                7: "1.75rem",
                8: "2rem",
                9: "2.25rem",
                10: "2.5rem",
                11: "2.75rem",
                12: "3rem"
            },
            maxWidth: {
                primary: "var(--max-width-primary)"
            },
            minWidth: {
                px: "1px",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
