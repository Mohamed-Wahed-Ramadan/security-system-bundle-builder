# Security System Bundle Builder

A modern and polished front-end experience for building a custom security system bundle. The app lets users choose cameras, a plan, sensors, and accessories, then instantly see a live review summary with pricing, shipping, and savings updates.

## Overview

This project is a React + Vite application that provides an interactive bundle-building experience inspired by a security product storefront. Users can:

- browse and select security products across multiple steps
- switch between product variants
- adjust quantities dynamically
- review their selected items in real time
- save their system locally for later use

## Repository

- GitHub: https://github.com/Mohamed-Wahed-Ramadan/security-system-bundle-builder

## Getting Started

### 1) Clone the repository

```bash
git clone https://github.com/Mohamed-Wahed-Ramadan/security-system-bundle-builder.git
cd security-system-bundle-builder
```

### 2) Install dependencies

```bash
npm install
```

### 3) Run the app locally

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

### 4) Build for production

```bash
npm run build
npm run preview
```

## Features

- Multi-step bundle builder experience
- Live review panel with pricing and totals
- Variant selection and quantity management
- Responsive layout for desktop and mobile screens
- Local persistence using browser storage
- Clean modular component structure

## Technology Stack

This project is built with:

- React 19
- Vite
- JavaScript / JSX
- CSS for component styling
- Vitest for testing
- React Icons

## Project Structure

```text
src/
  App.jsx                  # Main application layout
  components/              # UI and builder components
  hooks/                   # State management logic
  data/                    # Seed data for products, plans, and content
  styles/                  # Component styling
  utils/                   # Helper functions for calculations and data processing
```

## How the App Works

The application uses a central state hook to manage:

- selected quantities per product and variant
- active variant selection
- chosen plan
- live review totals
- saved bundle state in local storage

The review panel updates instantly as users make changes, making the experience feel interactive and seamless.

## Notes

- The project uses local JSON data rather than a backend API.
- Product illustrations are rendered as lightweight inline visuals, making the app self-contained.
- The design is optimized for a modern, polished user experience with responsive behavior across screen sizes.

## Author

Developed by Mohamed Wahed Ramadan.

