# Contract Form Generator

🔗 **Live Demo:** https://contract-form.netlify.app/

This is a web application built with React and Vite that allows users to dynamically generate sales agreements. It features a step-by-step form to input client details, contract items, and a digital signature, culminating in a downloadable PDF contract.

## Features

-   **Dynamic Form:** Easily input client information, contract date, and item details.
-   **Item Management:** Add multiple items with individual quantities, prices, and currencies (PLN/EUR).
-   **Digital Signature:** Capture a user's signature directly in the browser using a canvas element.
-   **PDF Generation:** Instantly generate and download a professional-looking sales agreement in PDF format using `@react-pdf/renderer`.
-   **Internationalization (i18n):** The UI and the generated PDF are available in both Polish (PL) and English (EN).
-   **Real-time Validation & Summary:** The application provides real-time feedback on form completeness and a running summary of contract values.
-   **Responsive Design:** A clean, responsive interface built with Tailwind CSS.

## Technology Stack

-   **Framework:** React (with Vite)
-   **Styling:** Tailwind CSS
-   **PDF Generation:** `@react-pdf/renderer`
-   **State Management:** React Context API
-   **Routing:** React Router
-   **Internationalization:** i18next
-   **Icons:** Huge Icons

## Getting Started

To run this project locally, follow these steps.

### Prerequisites

-   Node.js (v18 or later)
-   npm

### Installation & Setup

1.  Clone the repository:
    ```sh
    git clone https://github.com/jokerrooss/contract-form.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd contract-form
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```
4.  Start the development server:
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

## Available Scripts

In the project directory, you can run:

-   `npm run dev`
    Runs the app in development mode with hot-reloading.

-   `npm run build`
    Builds the app for production to the `dist` folder.

-   `npm run lint`
    Lints the source files using ESLint.

-   `npm run preview`
    Serves the production build locally to preview your changes.

## Project Structure

The project follows a standard Vite/React structure, with key logic organized as follows:

```
/src
├── components/     # UI components for form sections (ClientInfo, ItemsTable, etc.)
│   ├── ui/         # Generic UI elements (e.g., Input)
│   └── ...
├── contexts/       # React context for global user data state
├── locales/        # Translation files for i18n (en.json, pl.json)
├── pages/          # Main application page (Generator.jsx)
├── App.jsx         # Root component with routing setup
├── ContractPDF.jsx # React-PDF template for the generated contract
└── i18n.js         # i18next configuration
