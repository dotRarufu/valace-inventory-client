import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifestForPlugin: Partial<VitePWAOptions> = {
  manifest: {
    theme_color: '#f63557',
    background_color: '#35f6d4',
    display: 'fullscreen',
    scope: '/',
    start_url: '/',
    name: 'React Playground PWA',
    short_name: 'RPWA',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
