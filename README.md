# Mini CRM Frontend

This is the frontend for the Mini CRM Platform, built with React and Vite. It provides a user interface for authentication, customer management, order tracking, and campaign creation/monitoring. The frontend integrates with the backend via REST APIs and uses Google OAuth 2.0 for secure authentication.

## Features

- **Authentication**: Secure login using Google OAuth 2.0.

- **Routing and Navigation**:
  - Protected routes for authenticated users.
  - Conditional Navbar display (hidden on login and 404 pages).

- **Pages**:
  - **Landing Page**: Home page at "/".
  - **Login Page**: Handles Google OAuth login at "/login".
  - **Dashboard Page**: Overview dashboard at "/dashboard".
  - **Customer Page**: Manage customers at "/customers".
  - **Order Page**: Manage orders at "/orders".
  - **Main Campaign Page**: Campaign overview at "/campaigns".
  - **Campaign Creation Page**: Create new campaigns at "/campaigns/create".
  - **Campaign History Page**: View campaign history at "/campaigns/history".
  - **404 Page**: Custom not found page.

- **Layout**:
  - MainLayout for sidebar integration in protected routes.
  - AppLayout for conditional Navbar.

## 🏗️ Architecture

The frontend uses React Router for client-side routing. Public routes (like login and landing) are accessible without authentication, while protected routes require authentication and are wrapped in a MainLayout with a sidebar. The app communicates with the backend API Gateway for data fetching and operations.

### Key Components

- **Navbar**: Navigation bar shown on most pages.
- **ProtectedRoute**: Ensures routes are only accessible to authenticated users.
- **MainLayout**: Includes sidebar for protected pages.
- **SidebarLayout**: Layout component for sidebar integration.

## ⚙️ Tech Stack

- **Framework**: React
- **Bundler**: Vite
- **Routing**: React Router DOM
- **Authentication**: Google OAuth 2.0
- **Styling**: Tailwind CSS (assumed based on class names like "text-center text-3xl")
- **Other**: React Hooks (e.g., useLocation)

## 🚀 Setup

### Prerequisites

- Node.js (v18 or higher recommended)

### Steps

1. Navigate to the frontend directory (assuming it's in the project root):
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables (in .env file):
   - VITE_GOOGLE_CLIENT_ID: Your Google OAuth Client ID
   - VITE_API_BASE_URL: URL to the backend API Gateway (e.g., http://localhost:5000)

4. Run the development server:
   ```
   npm run dev
   ```
   The app will be available at http://localhost:5173 (default Vite port).

5. Build for production:
   ```
   npm run build
   ```

## 📊 Known Limitations

- None as of now.

## 🎥 Demo

- **Deployed Frontend**: https://xeno-minicrm.vercel.app/
- **Demo Video**: https://youtu.be/q8ut8Zgsujg