# ItzFizz Scroll-Driven Hero Assignment

React.js + Tailwind + GSAP implementation of a smooth, scroll-driven hero section inspired by:

https://paraschaturvedi.github.io/car-scroll-animation

## Features Implemented

- Full-screen hero above the fold
- Letter-spaced headline: `WELCOME ITZFIZZ`
- Stats block with delayed staggered reveal
- Smooth intro animation on first load
- Scroll-linked core visual motion using `ScrollTrigger` with scrub interpolation
- Transform-based animation (`translate/rotate/scale`) for better performance

## Run Locally

```bash
npm install
npm run dev
```

Open:

http://localhost:5173

## Production Build

```bash
npm run build
npm run preview
```

The production output is generated in the `dist/` directory and can be deployed to GitHub Pages or Netlify.
