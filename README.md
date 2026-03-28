# FutureTravel Admin

An elegant, modern, and powerful administrative panel for the FutureTravel application. Built with the latest front-end technologies to manage tours, user bookings, and overall platform operations efficiently.

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Form Handling & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack React Query (v5)](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Configured for [Vercel](https://vercel.com/) (with SPA routing support)

## ✨ Key Features

- **Intuitive Dashboard**: Real-time stats, including total tours, active tours, and average pricing.
- **Multilingual Support**: Manage tour details (e.g., destinations, descriptions) in multiple languages (Uzbek, Russian).
- **Tour Management**: Full CRUD operations for creating, updating, activating, and deleting tours.
- **Robust Filtering**: Filter and sort tours by attributes like `minPrice`, `maxPrice`, title, and activity status.
- **Modern UI/UX**: Clean aesthetic, responsive design, smooth animations (`tw-animate-css`), and user-friendly interface powered by Tailwind CSS and Shadcn.
- **Form Validation**: Strict and reliable client-side form validations using Zod schemas for properties like positive pricing, strict 0-5 ratings, and multi-language requirements.

## 🛠️ Getting Started

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone git@github.com:Kamalov-Q/Future-Travel-Admin.git
cd Future-Travel-Admin
npm install
```

### 3. Running Locally

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/` by default.

### 4. Building for Production

Compile TypeScript and build the static bundle:

```bash
npm run build
```

The production-ready site will be generated in the `dist/` directory.

### 5. Deployment

This project is configured out-of-the-box for [Vercel](https://vercel.com/). 
A `vercel.json` file is included in the root directory which handles all client-side routing rewrites, preventing 404 errors during page refreshes on production.

## 📂 Project Structure Overview

- `src/components/` - Global UI components (Shadcn, custom shared widgets, buttons, layouts).
- `src/featured/dashboard/` - Dashboard page views, charts, and summary statistics.
- `src/featured/tours/` - Tour management feature module.
  - `components/` - Tour-specific components (tables, modals, forms).
  - `hooks/` - Data fetching hooks (`useTours`), connected to React Query.
  - `schemas/` - Zod validation schemas for API inputs and form submission.
  - `types/` - TypeScript type definitions for Tours.
  - `pages/` - Main views for the Tours section.

## 🛡️ License

Private and Confidential - FutureTravel
