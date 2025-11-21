# 🚀 Deployment Checklist: Admin Access Setup

## ⚠️ CRITICAL: Complete These Steps to Enable Admin Login

Your code is **already correctly configured**. The issue is that you need to complete the Supabase setup in your dashboard.

### Step 1: Run SQL Migrations in Supabase

1. Go to your Supabase project: **https://yjuvbiglrpetsfgwabic.supabase.co**
2. Navigate to **SQL Editor** (left sidebar)
3. Click **"New Query"**
4. Open the file `SUPABASE_MIGRATIONS.sql` in your project
5. Copy the **entire contents** and paste into the SQL Editor
6. Click **"Run"** to execute all migrations
7. ✅ Verify success: Go to **Table Editor** - you should see:
   - `user_roles` table
   - `coaches` table
   - `events` table
   - `announcements` table
   - `media` table
   - `gallery` table

### Step 2: Disable Email Verification (REQUIRED)

1. In Supabase dashboard, go to **Authentication** → **Email Auth**
2. Scroll down and **UNCHECK** "Confirm Email"
3. Click **Save**
4. ⚠️ This is critical - without this, you can't log in immediately

### Step 3: Configure Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to: `http://localhost:5173` (or your deployed URL)
3. Add **Redirect URLs**:
   - `http://localhost:5173/**`
   - Your deployed URL if you have one (e.g., `https://yourapp.lovable.app/**`)
4. Click **Save**

### Step 4: Create Admin Accounts

1. Go to **Authentication** → **Users** in Supabase
2. Click **"Add User"** → **"Create new user"**
3. For **first admin**:
   - Email: `mukakahillary26@gmail.com`
   - Password: `nrb-7616`
   - ✅ Check **"Auto Confirm User"** (very important!)
4. Click **"Create User"**
5. Repeat for **second admin**:
   - Email: `telo18429@gmail.com`
   - Password: `nrb-7616`
   - ✅ Check **"Auto Confirm User"**
6. Click **"Create User"**

### Step 5: Grant Admin Role to Users

1. After creating both users, go to **SQL Editor**
2. Run this query to get their user IDs:
```sql
SELECT id, email 
FROM auth.users 
WHERE email IN ('mukakahillary26@gmail.com', 'telo18429@gmail.com')
ORDER BY email;
```
3. You'll see output like:
```
id: a1b2c3d4-e5f6-7890-abcd-ef1234567890 | email: mukakahillary26@gmail.com
id: b2c3d4e5-f6a7-8901-bcde-f12345678901 | email: telo18429@gmail.com
```
4. Copy both `id` values
5. Run this query (replace with the actual IDs from step 3):
```sql
-- Replace USER_ID_1 and USER_ID_2 with actual UUIDs
INSERT INTO public.user_roles (user_id, role)
VALUES 
  ('USER_ID_1', 'admin'),
  ('USER_ID_2', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

**Example with real IDs:**
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES 
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

6. Verify the roles were added:
```sql
SELECT ur.user_id, au.email, ur.role
FROM public.user_roles ur
JOIN auth.users au ON ur.user_id = au.id;
```

### Step 6: Test Admin Login

1. Open your app: **http://localhost:5173**
2. Navigate to `/login`
3. Log in with:
   - Email: `mukakahillary26@gmail.com`
   - Password: `nrb-7616`
4. ✅ You should be redirected to `/admin` dashboard
5. Test the second admin account

---

## 🔍 Troubleshooting Common Issues

### ❌ "You don't have admin access" Error

**This means:** User exists in Supabase Auth, but no admin role assigned

**Fix:**
1. Verify user exists: **Authentication** → **Users**
2. Check `user_roles` table: **Table Editor** → `user_roles`
3. If the table is empty or missing your users, repeat **Step 5**
4. Make sure you used the correct user IDs (UUIDs from auth.users)

### ❌ "Invalid email or password" Error

**This means:** User account doesn't exist or wrong password

**Fix:**
1. Verify both users exist: **Authentication** → **Users**
2. If missing, repeat **Step 4** to create them
3. Make sure "Auto Confirm User" was checked
4. Password must be exactly: `nrb-7616`

### ❌ "Email not confirmed" / Verification Email Sent

**This means:** Email verification is still enabled

**Fix:**
1. Go to **Authentication** → **Email Auth**
2. **Uncheck** "Confirm Email"
3. Click **Save**
4. Try logging in again

### ❌ Cannot See Tables or Data

**This means:** RLS policies are blocking or tables don't exist

**Fix:**
1. Verify migrations ran: **Table Editor** should show all tables
2. If tables are missing, repeat **Step 1**
3. Check RLS policies:
```sql
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('user_roles', 'coaches', 'events');
```

---

## ✅ Final Verification Checklist

- [ ] Migrations executed (all 6 tables visible in Table Editor)
- [ ] Email verification **disabled**
- [ ] Redirect URLs configured
- [ ] Both admin users created with "Auto Confirm User" ✅
- [ ] Admin roles assigned (visible in `user_roles` table)
- [ ] Successfully logged in as `mukakahillary26@gmail.com`
- [ ] Successfully logged in as `telo18429@gmail.com`
- [ ] Can access `/admin` dashboard
- [ ] Can view all admin sections (Events, Coaches, Photos, Announcements)

---

## 🔐 Security Best Practices

1. **Change Default Password:** After first login, change `nrb-7616` to a strong password
2. **Secure Your Keys:** Never commit `.env` to Git
3. **Row Level Security:** Already configured - only admins can modify data
4. **Storage Security:** Supabase Storage buckets have proper RLS policies

---

## 📚 Need Help?

- **Supabase Authentication:** https://supabase.com/docs/guides/auth
- **Row Level Security:** https://supabase.com/docs/guides/auth/row-level-security
- **Storage:** https://supabase.com/docs/guides/storage
