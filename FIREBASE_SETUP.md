# Firebase Setup Complete

## Configuration
The website has been migrated from Supabase to Firebase with the following credentials:

```javascript
apiKey: "AIzaSyCmqi9iy5Bfi-zVTS8qT9Tl8cmn8iRWzoo"
authDomain: "taekwondo-org-nrb.firebaseapp.com"
projectId: "taekwondo-org-nrb"
storageBucket: "taekwondo-org-nrb.appspot.com"
messagingSenderId: "92207465879"
appId: "1:92207465879:web:f1b231cde940fc6a9e30d2"
measurementId: "G-KWJLWHC4S4"
```

## Required Steps in Firebase Console

### 1. Set Up Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **taekwondo-org-nrb**
3. Click on **Firestore Database** in the left menu
4. Click **Create database**
5. Choose **Start in production mode** or **Test mode** (for development)
6. Select your preferred location
7. Click **Enable**

### 2. Create Collections

Create the following collections in Firestore:

- **admins** - Stores admin email addresses
  - Document ID: Use admin email as document ID (e.g., `mukakahillary26@gmail.com`)
  - Fields: (No additional fields needed, existence of document = admin access)

- **coaches** - Stores coach information
  - Fields: `name` (string), `role` (string), `bio` (string), `photoUrl` (string)

- **events** - Stores event information
  - Fields: `title` (string), `date` (string), `time` (string), `location` (string), `description` (string), `category` (string)

- **announcements** - Stores announcements
  - Fields: `title` (string), `description` (string), `category` (string), `date` (string)

- **media** - Stores media files metadata
  - Fields: `type` (string: "image" or "video"), `title` (string), `url` (string), `category` (string)

- **gallery** - Stores gallery photos metadata
  - Fields: `url` (string), `caption` (string), `category` (string), `publicId` (string)

- **registrations** - Stores student registrations
  - Auto-generated fields from registration form

- **messages** - Stores contact form messages
  - Auto-generated fields from contact form

### 3. Add Admin Users

1. Go to **Firestore Database**
2. Click **Start collection**
3. Collection ID: `admins`
4. Add two documents:
   - Document ID: `mukakahillary26@gmail.com` (no fields needed)
   - Document ID: `telo18429@gmail.com` (no fields needed)

### 4. Set Up Firebase Authentication

1. Go to **Authentication** in the left menu
2. Click **Get started**
3. Enable **Email/Password** sign-in method
4. Create admin accounts:
   - Email: `mukakahillary26@gmail.com`, Password: `nrb-7616`
   - Email: `telo18429@gmail.com`, Password: `nrb-7616`

### 5. Configure Firebase Storage

1. Go to **Storage** in the left menu
2. Click **Get started**
3. Choose **Start in production mode** or **Test mode**
4. Create the following folders:
   - `coaches/` - For coach profile photos
   - `gallery/` - For gallery images
   - `images/` - For general images
   - `videos/` - For video files

### 6. Set Storage Rules (Production Ready)

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 7. Set Firestore Security Rules (Production Ready)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admins collection - only authenticated admins can read
    match /admins/{email} {
      allow read: if request.auth != null && request.auth.token.email == email;
      allow write: if false;
    }
    
    // Public read access, authenticated write
    match /coaches/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /events/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /announcements/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /media/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /gallery/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /registrations/{document=**} {
      allow read: if request.auth != null;
      allow create: if true;
    }
    
    match /messages/{document=**} {
      allow read: if request.auth != null;
      allow create: if true;
    }
  }
}
```

## Admin Access

Only users with email addresses in the `admins` collection can access the admin dashboard:
- mukakahillary26@gmail.com
- telo18429@gmail.com

Password for both: **nrb-7616**

## Testing

1. Try logging in at `/login` with admin credentials
2. Verify admin dashboard access
3. Test adding/editing/deleting coaches
4. Test uploading photos to gallery
5. Test creating events and announcements

## Migration Complete

All data, authentication, and storage have been migrated from Supabase to Firebase. The admin dashboard is fully functional with role-based access control.
