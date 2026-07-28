import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hefesto.com.uy',
  compressHTML: true,
  integrations: [sitemap()],
});
