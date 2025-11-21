# Firebase Storage Rules Configuration

To enable media uploads in the admin dashboard, you need to configure Firebase Storage rules.

## Option 1: Allow authenticated users only (Recommended)

Go to Firebase Console > Storage > Rules and add:

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

## Option 2: Allow all (For testing only - NOT recommended for production)

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

## How to Apply Rules:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **taekwondo-org-nrb**
3. Click on **Storage** in the left menu
4. Click on the **Rules** tab
5. Paste one of the rules above
6. Click **Publish**

## Verify Storage Bucket

Make sure your Firebase Storage bucket exists:
- Expected bucket: `taekwondo-org-nrb.appspot.com`
- Check if it's enabled in Firebase Console > Storage

## Troubleshooting

If uploads still fail:
1. Check browser console for detailed error messages
2. Verify you're logged in as an admin
3. Check Firebase Storage quota (free tier has limits)
4. Ensure CORS is properly configured (usually automatic)
