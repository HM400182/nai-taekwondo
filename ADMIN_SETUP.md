# Admin Setup Instructions

## Step 1: Disable Email Confirmation (CRITICAL)

To allow admins to log in immediately without email verification:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/yjuvbiglrpetsfgwabic
2. Navigate to **Authentication** → **Providers** → **Email**
3. **Uncheck** "Confirm email" option
4. Click **Save**

This allows admins to log in immediately after account creation without verifying their email.

---

## Step 2: Create Admin Accounts

### Method 1: Using Supabase Dashboard (Recommended)

1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Add the first admin:
   - Email: `mukakahillary26@gmail.com`
   - Password: `nrb-7616` (change later)
   - **Uncheck** "Auto Confirm User" if it's checked
4. Click **Create user**
5. Repeat for the second admin:
   - Email: `telo18429@gmail.com`
   - Password: `nrb-7616` (change later)

### Method 2: Using SQL Editor

```sql
-- Insert admin users directly
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
VALUES
  (
    gen_random_uuid(),
    'mukakahillary26@gmail.com',
    crypt('nrb-7616', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    false,
    'authenticated'
  ),
  (
    gen_random_uuid(),
    'telo18429@gmail.com',
    crypt('nrb-7616', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    false,
    'authenticated'
  );
```

---

## Step 3: Grant Admin Roles

After creating the users, you need to grant them admin roles:

1. Go to **SQL Editor** in Supabase
2. Run this query to find the user IDs:

```sql
SELECT id, email FROM auth.users 
WHERE email IN ('mukakahillary26@gmail.com', 'telo18429@gmail.com');
```

3. Copy the user IDs, then run:

```sql
-- Replace USER_ID_1 and USER_ID_2 with actual IDs from step 2
INSERT INTO public.user_roles (user_id, role)
VALUES 
  ('USER_ID_1', 'admin'),
  ('USER_ID_2', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

---

## Step 4: Test Admin Login

1. Go to your website: `/login`
2. Try logging in with:
   - Email: `mukakahillary26@gmail.com`
   - Password: `nrb-7616`
3. You should be redirected to `/admin` dashboard immediately
4. Test the second admin account as well

---

## Step 5: Change Passwords (Recommended)

After testing, change the default passwords:

1. Log in to Supabase Dashboard
2. Go to **Authentication** → **Users**
3. Find each admin user
4. Click the three dots → **Reset password**
5. Send reset email or set a new password manually

---

## Troubleshooting

### "You don't have admin access" error
- Make sure you ran the admin role assignment SQL (Step 3)
- Check if the user exists in `user_roles` table:
  ```sql
  SELECT * FROM public.user_roles WHERE role = 'admin';
  ```

### "Invalid email or password" error
- Verify the user exists in Supabase Auth
- Make sure "Confirm email" is disabled in Email provider settings
- Try creating the user again

### Can't access /admin route
- Clear browser cache and cookies
- Check browser console for errors
- Verify the user has `admin` role in `user_roles` table

---

## Security Notes

⚠️ **Important Security Practices:**

1. Change the default password `nrb-7616` immediately after first login
2. Use strong passwords (minimum 12 characters, mixed case, numbers, symbols)
3. Never share admin credentials
4. Regularly review admin access in the `user_roles` table
5. Enable Multi-Factor Authentication (MFA) when ready for production

---

## Site URL Configuration

To avoid redirect errors, configure your Site URL in Supabase:

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to your production URL (e.g., `https://yourdomain.com`)
3. Add **Redirect URLs**:
   - Your development URL: `http://localhost:5173`
   - Your preview URL: `https://yourproject.lovable.app`
   - Your production URL: `https://yourdomain.com`

This ensures authentication redirects work correctly across all environments.
