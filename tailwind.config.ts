import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			dark:{
				1: '#1c1f2e',
				2:'#161925'
			},
			blue:{
				1:'#0E78f9'
			},
			sky : {
				1:"#C9DDFF",
				2:'#ECF0FF',
				3:'#F5FCFF'
			},
			orange: {
				1:'#FF742E'
			},
			purple: {
				1:'#830EF9'
			},
			yellow: {
				1:'#f9A90E'
			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},

  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			
  		},
  		backgroundImage: {
			hero:"url('/images/hero-background.png')"
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
