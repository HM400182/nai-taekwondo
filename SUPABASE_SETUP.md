# 🚀 Supabase Migration Complete - Setup Guide

Your Taekwondo website has been successfully migrated from Firebase + Cloudinary to Supabase!

## ⚠️ CRITICAL FIRST STEP: Disable Email Confirmation

**YOU MUST DO THIS BEFORE CREATING ADMIN ACCOUNTS!**

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/project/yjuvbiglrpetsfgwabic)
2. Navigate to **Authentication** → **Providers** → **Email**
3. **Uncheck** "Confirm email" option
4. Click **"Save"**

**Why?** This allows admins to log in immediately without email verification.

---

## 📋 What Changed

### ✅ Replaced
- **Firebase Authentication** → Supabase Auth
- **Firebase Firestore** → Supabase PostgreSQL Tables
- **Firebase Storage + Cloudinary** → Supabase Storage

### ✅ Updated Components
- All admin manager components (Coaches, Events, Announcements, Media, Gallery)
- Gallery page - now fetches from Supabase
- Join page - now stores registrations in Supabase
- Login page - uses Supabase authentication
- Protected routes - checks admin role via Supabase

### ✅ Deleted Files
- `src/lib/firebase.ts` - Old Firebase config
- `src/lib/firestoreUtils.ts` - Firebase utilities
- `src/lib/cloudinary.ts` - Cloudinary config
- `src/components/admin/PhotoManager.tsx` - Duplicate component

---

## 🔧 Setup Instructions

### Step 1: Run the SQL Migrations

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `yjuvbiglrpetsfgwabic`
3. Navigate to **SQL Editor**
4. Click **"New Query"**
5. Copy the entire contents of `SUPABASE_MIGRATIONS.sql`
6. Paste and click **"Run"**

This creates:
- `user_roles` table (for admin access control)
- `coaches` table
- `events` table
- `announcements` table
- `media` table
- `gallery` table
- `registrations` table (for Join form submissions)
- `messages` table (for contact messages)
- Storage buckets: `coaches`, `media`, `gallery`
- Row Level Security (RLS) policies for all tables

### Step 2: Create Admin Accounts

**Method 1: Using Supabase Dashboard (Recommended)**

1. Go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Create first admin:
   - Email: `mukakahillary26@gmail.com`
   - Password: `nrb-7616`
   - **Auto Confirm User**: Check this box (important!)
4. Click **"Create user"**
5. Repeat for second admin:
   - Email: `telo18429@gmail.com`
   - Password: `nrb-7616`
   - **Auto Confirm User**: Check this box

**Method 2: Sign Up via Website (If email confirmation is disabled)**

1. Go to `/login` on your website
2. If there's no signup link, you'll need to add one temporarily
3. Sign up with both admin emails

### Step 3: Grant Admin Roles

After both accounts are created:

1. Go back to **Supabase Dashboard → SQL Editor**
2. Run this query to find the user IDs:
   ```sql
   SELECT id, email FROM auth.users;
   ```
3. Copy the user IDs for both admin emails
4. Grant admin roles:
   ```sql
   INSERT INTO public.user_roles (user_id, role)
   VALUES 
     ('USER_ID_FOR_mukakahillary26@gmail.com', 'admin'),
     ('USER_ID_FOR_telo18429@gmail.com', 'admin');
   ```

### Step 4: Test Admin Login

1. Go to `/login` on your website
2. Log in with:
   - Email: `mukakahillary26@gmail.com`
   - Password: `nrb-7616`
3. You should be **redirected to `/admin` immediately**
4. Test the second admin account as well

✅ If login works, you're all set!

### Step 5: Configure Redirect URLs

1. Go to **Supabase Dashboard → Authentication → URL Configuration**
2. Set **Site URL** to your preview URL (e.g., `https://your-preview-url.lovable.app`)
3. Add **Redirect URLs**:
   - Your preview URL
   - `http://localhost:5173` (for local development)
   - Your production domain (when deployed)

---

## 🎨 Admin Dashboard Features

Your admin dashboard at `/admin` now includes:

### 📊 Dashboard Tab
- Statistics overview (coaches, events, announcements, gallery items)
- Quick action buttons

### 👥 Coaches Manager
- Add/Edit/Delete coaches
- Upload coach photos to Supabase Storage
- View all coaches with real-time updates

### 📅 Events Manager
- Create/Edit/Delete events
- Set date, time, location, description
- Real-time sync across all devices

### 📢 Announcements Manager
- Post announcements with categories
- Edit and delete existing announcements
- Displayed on Events page automatically

### 🖼️ Gallery Manager
- Upload photos/videos to Supabase Storage
- Add captions and categories
- Delete media items
- Photos appear on Gallery page automatically

### 🎬 Media Manager
- Upload training videos and photos
- Categorize media (training, tournament, etc.)
- Manage all media in one place

---

## 🔒 Security Features

✅ **Row Level Security (RLS)** enabled on all tables
✅ **Admin-only access** via `user_roles` table
✅ **Protected routes** check authentication and role
✅ **Storage policies** restrict upload/delete to admins
✅ **Public read access** for website visitors
✅ **Security definer functions** prevent privilege escalation

---

## 📝 Additional Tables Needed

The migration added these bonus tables for your forms:

### `registrations` Table
Stores student registration data from the Join page:
```sql
CREATE TABLE public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    age TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `messages` Table
Stores contact form submissions:
```sql
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Run these if they're not in your migrations file!

---

## 🧪 Testing Checklist

- [ ] Sign up with both admin emails
- [ ] Grant admin roles via SQL
- [ ] Login to `/admin` dashboard
- [ ] Upload a coach photo
- [ ] Create an event
- [ ] Post an announcement
- [ ] Upload gallery photos/videos
- [ ] Check if photos appear on Gallery page
- [ ] Test registration form on Join page
- [ ] Verify non-admin users can't access `/admin`
- [ ] Test logout functionality

---

## 🚨 Troubleshooting

### "Cannot read properties of null"
→ Make sure you've run all SQL migrations

### "Access Denied" in admin dashboard
→ Check that admin role was granted correctly in `user_roles` table

### Photos not uploading
→ Verify storage buckets exist and policies are set correctly

### "Invalid token" errors
→ Check Redirect URLs in Authentication settings

### Can't see uploaded images
→ Make sure storage buckets are set to `public: true`

---

## 🎯 Next Steps

1. ✅ Complete the setup steps above
2. 🎨 Test all admin features
3. 📸 Upload your real coaches, events, and media
4. 🌐 Deploy to production
5. 🔐 Re-enable email confirmation for security
6. 📱 Test on mobile devices

---

## 💡 Pro Tips

- All uploads now go to Supabase Storage (unlimited free tier!)
- Real-time updates mean changes appear instantly without refresh
- RLS policies ensure security without extra code
- Use the Supabase dashboard to view/edit data directly
- Storage usage is tracked in your Supabase dashboard

---

## 📚 Documentation Links

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Need help?** Check the Supabase dashboard logs or contact support!
