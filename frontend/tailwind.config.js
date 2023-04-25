/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/tw-elements/dist/js/**/*.js"],
	theme: {
		screens: {
			sm: "320px",
			// => @media (min-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }

			"2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
		},
		extend: {
			backgroundImage: {
				"navbar-texture": "url('./assets/wave.svg')",
				"home-image": "url('./assets/home.jpg')",
				"hands-image": "url('./assets/hands-digital-universe-background.jpg')",
				"nft-example": "url('./assets/nft-example.png')",
				"playful-hand-image": "url('./assets/hand.jpg')",
			},
			colors: {
				"color-bg": "#81afdd",
				"color-logo": "#8925B1",
			},
		},
	},
	plugins: [require("tw-elements/dist/plugin.cjs")],
	darkMode: "class",
	safelist: [
		"animate-[fade-in_1s_ease-in-out]",
		"animate-[fade-in-down_1s_ease-in-out]",
		"animate-[slide-right_1s_ease-in-out]",
		"animate-[slide-right_1s_ease-in-out]",
	],
};
