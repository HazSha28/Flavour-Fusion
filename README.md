<<<<<<< HEAD
# Flavour Fusion - React Application

A fully reactive React application converted from the original HTML/CSS Flavour Fusion website, integrated with Firebase Authentication and Firestore.

## Features

- **Authentication**: Login, Signup, Logout with Firebase Authentication
- **Database**: User data storage with Firestore
- **Route Protection**: Protected routes and public routes
- **Responsive Design**: Preserved original UI design and styling
- **Modern Tech Stack**: React, Vite, Firebase v9+, React Router

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password method)
3. Create a Firestore database
4. Get your Firebase configuration from Project Settings

### 3. Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Firebase configuration in `.env`:
   ```
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # React components
│   ├── Home.jsx        # Home page component
│   ├── Login.jsx       # Login page component
│   ├── Signup.jsx      # Signup page component
│   ├── About.jsx       # About page component
│   └── ProtectedRoute.jsx # Route protection wrapper
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication context
├── firebase.js         # Firebase configuration
├── App.jsx            # Main App component with routing
├── main.jsx           # Application entry point
├── index.css          # Global styles
└── style.css          # Original project styles (preserved)
```

## Authentication Features

- **Login**: Email and password authentication
- **Signup**: User registration with username, email, and password
- **Logout**: Secure logout functionality
- **Route Protection**: 
  - Unauthenticated users redirected to login
  - Authenticated users cannot access login/signup pages
- **User Data Storage**: User information stored in Firestore

## Firestore Collections

- `users`: Stores user profile information including:
  - uid (Firebase Auth UID)
  - email
  - username
  - createdAt (timestamp)

## Original UI Preservation

The application maintains the exact visual appearance of the original HTML/CSS:
- All original styling preserved
- Same layout and design
- All images and assets reused
- No visual changes to the interface

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Tech Stack

- **Frontend**: React 18, Vite
- **Routing**: React Router v6
- **Authentication**: Firebase Authentication
- **Database**: Firestore
- **Styling**: Original CSS (preserved)

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your preferred hosting service (Vercel, Netlify, Firebase Hosting, etc.)

## Notes

- The application preserves all original styling and visual design
- Firebase configuration is required for authentication to work
- All image paths have been updated to work with the React build process
- The application is fully responsive and maintains the original user experience
=======
# Flavour-Fusion
>>>>>>> 2da62bef9f99280d5761e75e22ac35b6d3db7482
