// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://guiadasanduicheira.com.br',
  trailingSlash: 'never',
  output: 'static',
  integrations: [
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    defaultFormat: 'avif',
    formats: ['avif', 'webp'],
  },
});
