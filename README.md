[<img src="https://ik.imagekit.io/iutsav/fork_l0RKONb5l.svg" height="30" />](https://githubbox.com/utsavdotpro/starter-electron-react-tailwind-vite-ts)

# Electron Starter Template with React + Tailwind

A modern starter template for building crossplatform desktop apps using Electron with:

[![](https://img.shields.io/badge/Electron-v39-47848F?style=for-the-badge&logo=electron)](https://www.electronjs.org/)
[![](https://img.shields.io/badge/React-v19-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![](https://img.shields.io/badge/TypeScript-v5-3178c6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![](https://img.shields.io/badge/Vite-v7-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

## How to Reuse Locally?

Use `degit` to download the repository locally.

> **❓ What is [degit](https://github.com/Rich-Harris/degit)?**  
> degit downloads a copy of git repository without downloading its entire git history.

Install degit globally.

```bash
pnpm install -g degit
```

Download the latest version

```bash
degit utsavdotme/starter-electron-react-tailwind-vite-ts
```

## Getting Started

### Installation

```bash
pnpm install
```

### Development

#### Full Development (Electron + React)

```bash
pnpm dev
```

Starts Vite dev server with Electron integration. Hot reload enabled for both renderer and main process.

#### Web Only (Browser Testing)

```bash
pnpm dev:web
```

Runs React app in browser without Electron for quick UI testing.

#### Electron Only

```bash
pnpm dev:electron
```

Builds Electron main process and launches Electron app.

### Build for Production

```bash
pnpm build
```

Builds both Vite bundle and Electron main process for production.

### Distribution Builds

#### All Platforms

```bash
pnpm dist
```

#### Platform-Specific

```bash
# Windows
pnpm dist:win

# macOS
pnpm dist:mac

# Linux
pnpm dist:linux
```

#### Pack Without Installer

```bash
pnpm pack
```

Creates unpacked distribution without installer.

### Other Commands

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint
pnpm lint:fix

# Clean build artifacts
pnpm clean
```

## Project Structure

```
├── electron/              # Electron main process
│   ├── index.ts          # Main process entry point
│   ├── preload.ts        # Preload script (bridge between main & renderer)
│   └── tsconfig.json     # TypeScript config for Electron
├── src/                  # React application source
│   ├── App.tsx           # Main React component
│   ├── AppBar.tsx        # Custom application bar
│   ├── assets/           # Static assets (icons, images)
│   ├── types/            # TypeScript type definitions
│   │   └── window.d.ts  # Window interface extensions
│   ├── index.html        # HTML entry point
│   ├── index.css         # Global styles
│   ├── main.tsx          # React entry point
│   └── logo.svg          # Logo asset
├── dist-electron/        # Compiled Electron main process (generated)
├── dist-vite/            # Built React app (generated)
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts
```

## License

MIT
