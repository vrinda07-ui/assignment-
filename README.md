# Clerk Auth Expo App

A production-ready Expo application with real authentication using Clerk, TypeScript, and Expo Router.

## Features

- **Real Authentication** using @clerk/clerk-expo
- **Persistent Sessions** with expo-secure-store token cache
- **File-based Routing** with Expo Router
- **Clean UI** with StyleSheet (production-ready styling)
- **Dashboard** with user information
- **Profile Management** with logout functionality
- **Auth Guard** for protected routes

## Project Structure

```
app/
├── _layout.tsx              # Root layout with ClerkProvider and auth guard
├── (auth)/                  # Authentication group
│   ├── _layout.tsx         # Auth navigation
│   ├── login.tsx           # Login screen
│   └── signup.tsx          # Signup screen
└── (app)/                   # Main app group (protected)
    ├── _layout.tsx         # Tab navigation
    ├── index.tsx           # Home dashboard
    └── profile.tsx         # Profile screen with logout
lib/
└── cache.ts                 # Token cache implementation
```

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure Clerk**

   - Create a Clerk account at [https://clerk.dev](https://clerk.dev)
   - Get your Publishable Key from the Clerk dashboard
   - Copy `.env.example` to `.env`
   - Replace the placeholder key with your actual Clerk Publishable Key:

   ```bash
   cp .env.example .env
   # Edit .env and add your Clerk Publishable Key
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

3. **Start the app**

   ```bash
   npx expo start
   ```

## Authentication Flow

1. **Unauthenticated users** are redirected to `/ (auth)/login`
2. **Authenticated users** are redirected to `/ (app)/` (dashboard)
3. **Persistent sessions** are maintained using expo-secure-store
4. **Logout** clears the session and redirects to login

## Key Components

### Token Cache (`lib/cache.ts`)
- Uses expo-secure-store for secure token storage
- Handles getToken, saveToken, and removeToken operations
- Provides persistent authentication across app restarts

### Auth Guard (`app/_layout.tsx`)
- Wraps the entire app with ClerkProvider
- Monitors authentication state with useAuth hook
- Automatically redirects based on isSignedIn status

### Login/Signup Screens
- Clean, professional UI with form validation
- Error handling with user-friendly messages
- Navigation between auth screens

### Dashboard & Profile
- Home screen with welcome message and stats
- Profile screen displaying user ID, email, and account details
- Styled logout button with proper session cleanup

## Development

The app uses:
- **TypeScript** for type safety
- **Expo Router** for file-based navigation
- **StyleSheet** for production-ready styling
- **Clerk** for authentication
- **expo-secure-store** for secure token storage

## Build for Production

```bash
# Build for iOS
npx expo build:ios

# Build for Android
npx expo build:android

# Build for web
npx expo build:web
```

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [Clerk documentation](https://clerk.com/docs)
- [Expo Router documentation](https://docs.expo.dev/router/introduction)
