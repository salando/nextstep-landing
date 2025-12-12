# NextStep Landing Page

A modern, animated landing page for the NextStep Exoskeleton capstone project. Built with React, TypeScript, and Vite.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Boot/           # Boot sequence animation
│   ├── Footer/         # Site footer
│   ├── Hero/           # Hero section with animations
│   ├── Progress/       # Development progress components
│   ├── Research/       # Research page components
│   ├── Specs/          # Technical specifications
│   └── UI/             # Core UI components (NavBar, ThemeToggle, etc.)
├── data/               # Static data (cards, progress items)
├── hooks/              # Custom React hooks
├── pages/              # Page components (lazy-loaded)
├── styles/             # Global styles and design tokens
└── App.tsx             # Main app component with routing
```

## 🎨 Key Features

- **Boot Sequence Animation**: Terminal-style loading screen with animated logo fly-in
- **Theme Toggle**: Light/dark mode with View Transitions API circular reveal effect
- **Scroll Animations**: Apple-style "Reveal" components with blur effects
- **Responsive Design**: Mobile-first with floating navbar and hamburger menu
- **Performance Optimized**: Lazy-loaded pages, GPU-accelerated animations

## 🧩 Key Components

| Component | Description |
|-----------|-------------|
| `GlobalLogo` | Animated logo that flies from boot screen to navbar |
| `ThemeToggle` | Dark/light mode switch with circular reveal animation |
| `BootSequence` | Terminal-style loading animation on app startup |
| `NavBar` | Floating navbar with animated active indicator pill |
| `Reveal` | Scroll-triggered fade-in animation wrapper |

## 🎯 Design Tokens

Design tokens are centralized in `src/styles/tokens.css`:
- Colors (with light/dark mode variants)
- Typography (fonts, sizes)
- Spacing scale
- Animation easings

## 📦 Tech Stack

- **React 18** with TypeScript
- **Vite** for fast builds
- **React Router** for navigation
- **Framer Motion** for animations
- **CSS Modules** with CSS custom properties

## 🔗 Links

- [Live Site](https://nextstep.salando.dev)
- [GitHub Repository](https://github.com/salando/nextstep-landing)
