import { rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'path';
import type { ConfigEnv, UserConfig } from 'vite';
import pkg from './package.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname);
const srcRoot = join(__dirname, 'src');
rmSync('dist-electron', { recursive: true, force: true });

const buildElectron = (isDev: boolean) => ({
  sourcemap: isDev,
  minify: !isDev,
  outDir: join(root, 'dist-electron'),
  rollupOptions: {
    external: Object.keys(pkg.dependencies || {})
  }
});

async function plugins(isDev: boolean): Promise<Plugin[]> {
  const isWebOnly = process.env.WEB_ONLY === 'true';

  const react = (await import('@vitejs/plugin-react')).default;

  if (isWebOnly) {
    return [react()];
  }

  const electron = (await import('vite-plugin-electron')).default;
  const renderer = (await import('vite-plugin-electron-renderer')).default;

  return [
    react(),
    electron([
      {
        // Main-Process entry file of the Electron App.
        entry: join(root, 'electron/index.ts'),
        onstart(options) {
          options.startup();
        },
        vite: {
          build: buildElectron(isDev)
        }
      },
      {
        entry: join(root, 'electron/preload.ts'),
        onstart(options) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
          // instead of restarting the entire Electron App.
          options.reload();
        },
        vite: {
          build: buildElectron(isDev)
        }
      }
    ]),
    renderer()
  ];
}

export default async ({ command }: ConfigEnv): Promise<UserConfig> => {
  // DEV
  if (command === 'serve') {
    return {
      root: srcRoot,
      base: '/',
      plugins: await plugins(true),
      resolve: {
        alias: {
          '/@': srcRoot
        }
      },
      build: {
        outDir: join(root, '/dist-vite'),
        emptyOutDir: true,
        rollupOptions: {}
      },
      server: {
        port: process.env.PORT === undefined ? 3000 : +process.env.PORT
      },
      optimizeDeps: {
        exclude: ['path']
      }
    };
  }
  // PROD
  return {
    root: srcRoot,
    base: './',
    plugins: await plugins(false),
    resolve: {
      alias: {
        '/@': srcRoot
      }
    },
    build: {
      outDir: join(root, '/dist-vite'),
      emptyOutDir: true,
      rollupOptions: {}
    },
    server: {
      port: process.env.PORT === undefined ? 3000 : +process.env.PORT
    },
    optimizeDeps: {
      exclude: ['path']
    }
  };
};
