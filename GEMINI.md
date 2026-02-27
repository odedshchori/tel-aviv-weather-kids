# Project Analysis: tel-aviv-weather-kids

## Project Type: Code Project (Frontend Web Application)

The project is a frontend web application built with React, TypeScript, and Vite.

## Project Overview

The project appears to be a weather application, likely tailored for children, given the project name and the presence of components like `WeatherIcon.tsx`, `Character.tsx`, and `ForecastCard.tsx`. It utilizes modern web technologies for a fast and interactive user experience.

## Key Technologies

*   **Framework:** React
*   **Language:** TypeScript
*   **Build Tool/Dev Server:** Vite
*   **Styling:** CSS (likely scoped per component or globally via `index.css` and `App.css`)
*   **Linting:** ESLint (with TypeScript support)

## Building and Running

Based on `package.json` and `vite.config.ts`, the following commands are essential for development and deployment:

*   **Install Dependencies:**
    ```bash
    npm install
    # or if using yarn:
    # yarn install
    ```

*   **Start Development Server:**
    ```bash
    npm run dev
    # or if using yarn:
    # yarn dev
    ```
    This command starts a local development server with hot module replacement (HMR) for rapid development. It is typically accessible at `http://localhost:5173`.

*   **Build for Production:**
    ```bash
    npm run build
    # or if using yarn:
    # yarn build
    ```
    This command compiles the application for production, optimizing assets and creating static files in the `dist` directory.

*   **Preview Production Build:**
    ```bash
    npm run preview
    # or if using yarn:
    # yarn preview
    ```
    This command serves the production build locally, allowing you to preview the deployed version before actual deployment.

*   **Lint Project:**
    ```bash
    npm run lint
    # or if using yarn:
    # yarn lint
    ```
    This command runs ESLint to check for code style and potential errors according to the project's configuration.

## Development Conventions

*   **Component Structure:** React components are organized within the `src/components/` directory.
*   **File Naming:** Components likely follow PascalCase naming conventions (e.g., `ForecastCard.tsx`).
*   **TypeScript Usage:** The project extensively uses TypeScript for type safety.
*   **Styling:** Styling is managed through CSS files, potentially scoped per component or globally managed.
*   **Linting:** ESLint is configured to enforce code quality and consistency, with support for TypeScript as noted in the `README.md`. The `README.md` also mentions expanding ESLint with type-aware rules.
*   **Build Process:** Vite is configured for efficient development builds and production bundling.

## Key Configuration Files

*   `package.json`: Manages project dependencies, scripts, and metadata.
*   `vite.config.ts`: Configures the Vite build tool and development server.
*   `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json`: Configure the TypeScript compiler.
*   `eslint.config.js`: Configures the ESLint linter.
*   `README.md`: Provides project overview and setup instructions.

## Project Structure

```
.
├── .git/              # Git repository metadata
├── dist/              # Production build output
├── node_modules/      # Project dependencies
├── public/            # Static assets
│   └── vite.svg
├── src/               # Source code
│   ├── assets/        # Application assets (e.g., images)
│   │   └── react.svg
│   ├── components/    # Reusable React components
│   │   ├── Background.tsx
│   │   ├── Character.tsx
│   │   ├── CharacterShowcase.tsx
│   │   ├── ForecastCard.tsx
│   │   ├── HourlyTimeline.tsx
│   │   └── WeatherIcon.tsx
│   ├── App.css        # Global or App-specific styles
│   ├── App.tsx        # Main application component
│   ├── index.css      # Global CSS styles
│   └── main.tsx       # Application entry point
├── .gitignore         # Files/directories to ignore in Git
├── eslint.config.js   # ESLint configuration
├── index.html         # Main HTML file
├── package-lock.json  # npm dependency lock file
├── package.json       # Project metadata, scripts, and dependencies
├── README.md          # Project description and instructions
├── tsconfig.app.json
├── tsconfig.json      # Base TypeScript configuration
├── tsconfig.node.json
└── vite.config.ts     # Vite configuration file
```
