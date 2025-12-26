# VivaFemini Frontend

Frontend application for VivaFemini - A women's health tracking application focused on menstrual cycle monitoring and symptom tracking.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Context Architecture](#context-architecture)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Component Library**: Radix UI primitives (shadcn/ui pattern)
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Authentication**: Firebase Auth
- **HTTP Client**: Axios
- **Date Handling**: date-fns

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **Firebase Project**: With Authentication enabled
- **Backend API**: Running on `http://localhost:3050` (or configured endpoint)

## 🚀 Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## ⚙️ Environment Setup

Create a `.env.local` file in the frontend root directory with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3050
```

### Getting Firebase Credentials:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Project Settings** > **General**
4. Scroll to **Your apps** section
5. Click on the web app (</>) icon
6. Copy the configuration values

**Note**: The `.env.local` file is gitignored for security.

## 🏃 Running the Application

### Development Mode:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build:
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Linting:
```bash
npm run lint
```

## 🏗 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── dashboard/               # Main dashboard view
│   ├── tracking/                # Symptom tracking page
│   ├── health-report/           # Health analytics page
│   ├── login/                   # Authentication pages
│   ├── register/
│   └── layout.tsx               # Root layout with providers
│
├── components/                   # React components
│   ├── ui/                      # Reusable UI primitives (shadcn/ui)
│   ├── auth/                    # Authentication components
│   ├── health-report/           # Health report specific components
│   └── loading/                 # Loading states and skeletons
│
├── context/                      # React Context providers
│   ├── AuthContext.tsx          # Firebase authentication
│   ├── UserContext.tsx          # User profile management
│   ├── ContentContext.tsx       # Dashboard content (renamed from ContentContext)
│   ├── TrackingContext.tsx      # Tracking page data
│   └── HealthReportContext.tsx  # Health report analytics
│
├── hooks/                        # Custom React hooks
│   ├── useContent.ts            # Dashboard data hooks
│   ├── useTracking.ts           # Tracking data hooks
│   └── useHealthReport.ts       # Health report hooks
│
├── lib/                          # Utility functions and configurations
│   ├── firebase.ts              # Firebase client setup
│   ├── api.ts                   # Axios API client
│   ├── contentService.ts        # Dashboard API calls
│   ├── trackingService.ts       # Tracking API calls
│   ├── healthReportService.ts   # Health report API calls
│   ├── cacheManager.ts          # Session-based caching
│   └── utils.ts                 # Helper functions
│
└── assets/                       # Static assets (SVGs, images)
```

## 🎯 Key Features

### Pages:

1. **Dashboard** (`/dashboard`)
   - Cycle calendar with current cycle day
   - Cycle highlights carousel
   - Daily check-offs
   - Referral card
   - Pregnancy test tracker
   - Quick actions
   - Recommended articles

2. **Tracking** (`/tracking`)
   - Symptom logging form
   - Multiple symptom categories
   - Flow intensity slider
   - Notes input
   - Real-time form state

3. **Health Report** (`/health-report`)
   - Cycle summary (avg length, next period, ovulation window)
   - Symptom frequency analysis (5 categories with percentages)
   - Period length chart
   - Flow & symptom summary
   - Historical cycle data table

## 🔄 Context Architecture

The application uses a multi-context architecture for separation of concerns:

### 1. **AuthContext**
- Manages Firebase authentication state
- Provides user login/logout functionality
- Persists auth state across sessions

### 2. **UserContext**
- Manages user profile data
- Handles profile updates (name, email, profile picture)
- Provides dynamic greeting based on time of day

### 3. **DashboardContext** (formerly ContentContext)
- Fetches dashboard-specific data:
  - Articles
  - Quick actions
  - Symptom categories
  - Health tips
  - Cycle highlights
  - Daily check-offs
- Cache key: `dashboard_data`
- Loads on login, cached for session

### 4. **TrackingContext**
- Manages tracking page data
- Fetches cycle records and symptom logs
- Cache key: `tracking_data`
- Loads on login, cached for session

### 5. **HealthReportContext**
- Manages health report analytics:
  - Cycle summary
  - Symptom frequency percentages
  - Cycle records for charts
  - Symptom logs for historical data
- Cache key: `health_report_data`
- Loads on login, cached for session

### Caching Strategy:
- All contexts use `CacheManager` for session-based caching
- Data is cached on first fetch
- Cache persists during login session
- Cache is cleared on logout
- Offline support with cached data fallback

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start development server with hot-reload

# Production
npm run build            # Build optimized production bundle
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript compiler check
```

## 🔧 Troubleshooting

### Common Issues:

#### 1. Firebase Authentication Error
```
Error: Firebase: Error (auth/invalid-api-key)
```
**Solution**: Verify Firebase credentials in `.env.local` are correct

#### 2. API Connection Error
```
Error: Network Error / CORS Error
```
**Solution**: 
- Ensure backend is running on `http://localhost:3050`
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify backend CORS configuration allows `http://localhost:3000`

#### 3. Build Errors
```
Error: Module not found
```
**Solution**: 
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Clear Next.js cache: `rm -rf .next`

#### 4. Hydration Errors
```
Warning: Text content did not match
```
**Solution**: 
- Check for dynamic content rendering on server/client
- Use `suppressHydrationWarning` prop where necessary
- Ensure date formatting is consistent

#### 5. Context Data Not Loading
```
Dashboard shows loading state indefinitely
```
**Solution**:
- Check browser console for API errors
- Verify user is logged in (check AuthContext)
- Clear browser cache and localStorage
- Check backend is seeded with data (`npm run seed` in backend)

### Getting Help

If you encounter issues not covered here:
1. Check the [Next.js Documentation](https://nextjs.org/docs)
2. Review the [Firebase Documentation](https://firebase.google.com/docs/web/setup)
3. Check the backend README for API documentation

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Firebase API keys are safe to expose in frontend (they're restricted by domain)
- Use Firebase Security Rules to protect data
- All API calls require Firebase authentication token
- Profile pictures are stored as base64 (max 500KB)

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Key responsive features:
- Mobile-first design approach
- Touch-friendly UI elements
- Optimized layouts for each breakpoint
- Skeleton loaders for better UX

## 🎨 Styling

- **Tailwind CSS 4**: Utility-first CSS framework
- **Custom Design System**: Defined in `globals.css`
- **Color Palette**: 
  - Primary: Pink (#E94867)
  - Secondary: Purple, Teal, Yellow
  - Neutrals: Gray scale
- **Typography**: Inter font family
- **Components**: Radix UI primitives with custom styling

## 📄 License

This project is proprietary and confidential.
