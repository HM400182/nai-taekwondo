# Cloudinary Setup Guide

This guide will help you set up Cloudinary for media uploads in your Swift Taekwondo admin dashboard.

## Step 1: Create a Cloudinary Account

1. Go to [Cloudinary.com](https://cloudinary.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your Credentials

1. Log in to your Cloudinary dashboard
2. You'll see your **Cloud Name** on the dashboard homepage
3. Copy your Cloud Name

## Step 3: Create an Upload Preset

1. In the Cloudinary dashboard, go to **Settings** (gear icon)
2. Click on **Upload** tab
3. Scroll down to **Upload presets**
4. Click **Add upload preset**
5. Configure the preset:
   - **Preset name**: Choose a name (e.g., `taekwondo_uploads`)
   - **Signing Mode**: Select **Unsigned** (this allows uploads from the browser)
   - **Folder**: Optionally set a default folder (e.g., `taekwondo`)
6. Click **Save**
7. Copy the preset name

## Step 4: Add Environment Variables

Create a `.env` file in your project root (or update if it exists):

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name_here
```

Replace:
- `your_cloud_name_here` with your actual Cloud Name from Step 2
- `your_upload_preset_name_here` with your preset name from Step 3

## Step 5: Restart Your Development Server

After adding the environment variables:

1. Stop your development server (Ctrl+C or Cmd+C)
2. Start it again

## Verification

1. Log in to your admin dashboard
2. Go to the Media tab
3. Try uploading an image or video
4. The file should upload to Cloudinary and appear in your media library

## Troubleshooting

### "Cloudinary is not configured" error
- Make sure your `.env` file is in the project root
- Verify the variable names are exactly: `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET`
- Restart your development server

### Upload fails with "401 Unauthorized"
- Check that your upload preset is set to **Unsigned** mode
- Verify the preset name is correct

### Files not appearing in Cloudinary
- Log in to your Cloudinary dashboard
- Go to Media Library
- Check the folder you specified in the upload preset

## Free Tier Limits

Cloudinary's free tier includes:
- 25 GB storage
- 25 GB bandwidth per month
- Unlimited transformations

This should be sufficient for most small to medium-sized projects.
