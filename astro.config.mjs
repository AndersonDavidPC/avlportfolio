
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://avl-asesorias.com',
  base: '/',
  output: 'static',
  webAnalytics: {
    enabled: true, // set to false when using @vercel/analytics@1.4.0
  },
});
