# Nairobi Taekwondo Association Website

## Overview

A comprehensive web platform for the Nairobi Taekwondo Association, serving as both a public-facing website and an administrative dashboard. The application enables the association to showcase their programs, manage events and announcements, and facilitate student registrations. Built with React, TypeScript, and Vite, the platform provides a modern, responsive experience for visitors while offering robust content management capabilities for administrators.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The application uses a modern React-based single-page application (SPA) architecture:

- **Framework**: React 18 with TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: React Router for client-side navigation
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system based on Taekwondo brand colors (Red #E63946, Black, White, Gold)
- **Animations**: Framer Motion for smooth transitions and interactive elements

**Design Rationale**: Vite was chosen over Create React App for significantly faster hot module replacement during development. The shadcn/ui component library provides accessible, customizable components without the bundle size overhead of complete UI frameworks.

### Backend Architecture

The application uses a dual-layer backend approach:

- **Development Server**: Express.js server that serves the Vite development environment
- **Production**: Static file serving with pre-built React application
- **Server Files**: Located in `/server` directory with minimal API routes (currently a placeholder structure)

**Current State**: The backend is minimal, with authentication and data management handled entirely through Firebase. The Express server primarily exists to support the development environment and could be expanded for custom API endpoints if needed.

### Authentication & Authorization

- **Provider**: Firebase Authentication
- **Admin Access Control**: Firestore-based admin verification
  - Admin emails stored in `admins` collection
  - Protected routes check both Firebase auth session AND admin collection membership
  - Login flow: Email/password → Firebase Auth → Firestore admin check → Dashboard access
- **Password Reset**: Firebase-provided email-based password reset flow

**Security Model**: Admin access requires TWO conditions: valid Firebase authentication AND existence in the `admins` Firestore collection. This two-tier approach prevents unauthorized users from accessing admin features even if they create Firebase accounts.

### Database Schema

Firebase Firestore with the following collections:

1. **admins**: Stores admin email addresses (document ID = email)
2. **coaches**: Coach profiles with name, role, bio, and photoUrl
3. **events**: Upcoming events with title, date, time, location, description, category
4. **announcements**: Site announcements with title, description, date, category
5. **media**: Media files metadata (type, title, url, category)
6. **gallery**: Gallery photos with url, caption, category, publicId
7. **registrations**: (Implied from email service) Student registration data

**Real-time Updates**: Firestore's `onSnapshot` API enables live data synchronization across all admin managers and public-facing pages.

### File Storage

- **Provider**: Firebase Storage
- **Buckets**: Organized by content type (coaches photos, gallery media, general media)
- **Access**: Public read access for visitor-facing content, authenticated write access for admins
- **Upload Flow**: Direct browser uploads to Firebase Storage with URL references saved to Firestore

**Migration Note**: The application previously used Cloudinary for media storage. All references have been removed and replaced with Firebase Storage.

### Email Notifications

- **Provider**: EmailJS
- **Service ID**: `service_0ayo19h`
- **Template**: `n3s5d4e`
- **Use Cases**: 
  - New student registration alerts
  - Contact form submissions
- **Recipient**: Admin email (`telo18429@gmail.com`)

**Implementation**: Client-side email sending through EmailJS browser SDK, bypassing the need for a backend email service.

## External Dependencies

### Firebase Configuration

- **Project ID**: `taekwondo-org-nrb`
- **Auth Domain**: `taekwondo-org-nrb.firebaseapp.com`
- **Storage Bucket**: `taekwondo-org-nrb.appspot.com`
- **Services Used**:
  - Authentication (email/password)
  - Firestore Database
  - Storage
  - Analytics (optional, loaded conditionally)

**Setup Requirements**: 
- Firestore collections must be created manually via Firebase Console
- Storage buckets require appropriate security rules (read: public, write: authenticated)
- Email verification can be disabled in Firebase Auth settings for immediate admin access

### EmailJS Integration

- **Public Key**: `YG5OTMHMqPXhtbobk`
- **Purpose**: Transactional email notifications for registrations and messages
- **Alternative Considered**: Firebase Cloud Functions were considered but EmailJS was chosen for simplicity and zero backend requirements

### UI Component Library

- **shadcn/ui**: Accessible component primitives from Radix UI
- **Radix UI Packages**: Extensive use of headless UI components (Dialog, Dropdown, Toast, etc.)
- **Lucide React**: Icon library for consistent iconography

### Development Tools

- **ESLint**: Code linting with TypeScript support
- **TypeScript**: Strict type checking disabled for rapid development (`noImplicitAny: false`)
- **PostCSS**: For Tailwind CSS processing

### Notable Architectural Decisions

1. **No Drizzle/PostgreSQL**: Despite the presence of `drizzle-orm` and `drizzle-zod` in dependencies, the application exclusively uses Firebase Firestore. These packages may be legacy or planned for future migration.

2. **Monorepo Structure**: The repository uses a client-server separation with shared types in `/shared`, though the shared folder is currently minimal.

3. **Migration History**: The codebase shows evidence of migration from Firebase + Cloudinary to an attempted Supabase migration, then back to Firebase. Multiple configuration files (`.md` files) document these transitions.

4. **Protected Routes**: Custom `ProtectedRoute` component wraps admin pages, checking Firebase auth state and Firestore admin status before rendering.

5. **Form Handling**: React Hook Form with Zod validation for type-safe form submissions.

6. **Optimistic UI Updates**: TanStack Query's mutation handling provides immediate UI feedback with automatic rollback on errors.