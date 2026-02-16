```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  // The final production domain of the website.
  site: 'https://www.wimmer-edv.at',
  
  // Integrations are Astro's way of adding new features.
  integrations: [
    tailwind({
      // Disable Tailwind's base styles to use our own `src/styles/global.css`.
      applyBaseStyles: false,
    }), 
    sitemap()
  ],
  
  // The Vercel adapter is needed for server-side rendering (SSR) and API endpoints.
  // It enables Vercel's Edge Image Optimization via the `imageService` flag.
  output: 'server',
  adapter: vercel({
    imageService: true,
  }),

  // Astro's image configuration. `sharp` is used for local processing during development.
  image: {
    service: {
      entry: 'astro/assets/services/sharp',
    },
  },
});
```