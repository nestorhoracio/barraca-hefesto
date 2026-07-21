import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://barraca-hefesto.netlify.app',
  compressHTML: true,
  integrations: [sitemap()],
});
