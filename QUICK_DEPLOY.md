# 🚀 Quick Deployment Guide - 100% Free

Deploy your AI Skill Gap Analyzer in **under 30 minutes** for **$0/month**.

## 🎯 Overview

- **Frontend**: Vercel (Free)
- **Backend**: Railway.app (Free $5 credit/month)
- **Database**: MongoDB Atlas (Free 512MB)
- **Total Cost**: $0/month

---

## 📋 Prerequisites

Before you start, sign up for these FREE accounts:

1. **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Railway.app**: https://railway.app (sign in with GitHub)
3. **Vercel**: https://vercel.com (sign in with GitHub)
4. **Gemini API**: https://makersuite.google.com/app/apikey

---

## Step 1: Database Setup (5 minutes)

### MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Build a Database" → Choose **M0 FREE**
3. Select a cloud provider and region (choose closest to you)
4. Click "Create"

### Configure Access

1. **Database Access**:

   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Username: `skillgap_admin`
   - Password: Generate and **SAVE THIS**
   - Role: "Read and write to any database"
   - Click "Add User"

2. **Network Access**:

   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

3. **Get Connection String**:
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like):
   ```
   mongodb+srv://skillgap_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password
   - Add `/skill_gap_analyzer` before the `?`

**Final URI**:

```
mongodb+srv://skillgap_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/skill_gap_analyzer?retryWrites=true&w=majority
```

✅ **SAVE THIS URI** - You'll need it soon!

---

## Step 2: Get Gemini API Key (2 minutes)

1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. **COPY AND SAVE** the key (starts with `AIza...`)

---

## Step 3: Deploy Backend to Railway (10 minutes)

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Select the `backend` folder as root directory

### Configure Environment Variables

Click on "Variables" tab and add:

```env
GEMINI_API_KEY=your_gemini_key_here
MONGODB_URI=your_mongodb_connection_string_here
DATABASE_NAME=skill_gap_analyzer
ENVIRONMENT=production
DEBUG=False
USE_GEMINI=True
MODEL_NAME=gemini-1.5-flash
SIMILARITY_THRESHOLD=0.7
JWT_SECRET_KEY=GENERATE_THIS_BELOW
CORS_ORIGINS=["*"]
```

### Generate JWT Secret Key

Run this command locally:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Copy the output and paste it as `JWT_SECRET_KEY`.

### Update CORS After Frontend Deploy

We'll update `CORS_ORIGINS` later with your Vercel URL.

### Wait for Deployment

Railway will automatically:

- Detect Python
- Install dependencies
- Download spaCy model
- Start the server

This takes **3-5 minutes**. Watch the logs for any errors.

### Get Your Backend URL

Once deployed, Railway provides a URL like:

```
https://your-app-name.up.railway.app
```

✅ **SAVE THIS URL** - You need it for frontend!

### Test Backend

Visit: `https://your-app-name.up.railway.app/health`

Should return:

```json
{
  "status": "healthy",
  "database": "connected",
  "version": "1.0.0"
}
```

If you see this, **backend is working!** 🎉

---

## Step 4: Deploy Frontend to Vercel (5 minutes)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Add Environment Variable

In Vercel dashboard, add:

**Name**: `VITE_API_URL`  
**Value**: `https://your-backend.railway.app` (from Step 3)

### Deploy

Click "Deploy" and wait **2-3 minutes**.

### Get Your Frontend URL

Vercel gives you a URL like:

```
https://your-app-name.vercel.app
```

---

## Step 5: Update Backend CORS (2 minutes)

Now that you have your frontend URL, go back to Railway:

1. Go to your backend project
2. Click "Variables"
3. Update `CORS_ORIGINS`:
   ```json
   ["https://your-app-name.vercel.app", "http://localhost:5173"]
   ```
4. Save (Railway will auto-redeploy)

---

## Step 6: Test Your Application! 🎉

1. Visit your Vercel URL: `https://your-app-name.vercel.app`
2. Register a new account
3. Upload a resume and job description
4. Watch the AI analyze your profile!

---

## ✅ Post-Deployment Checklist

Test these features:

- [ ] Homepage loads without errors
- [ ] Register new account
- [ ] Login works
- [ ] Upload resume (try both file and text paste)
- [ ] Job description analysis
- [ ] Progress bar shows percentages
- [ ] Results display correctly
- [ ] All sections show data (matched skills, missing skills, suggestions)
- [ ] Chat feature responds
- [ ] Progress tracking works

---

## 🐛 Troubleshooting

### Backend Won't Start

**Check Railway Logs**:

1. Go to Railway dashboard
2. Click your service
3. Click "Deployments"
4. View logs

**Common Issues**:

- Missing environment variables
- Invalid MongoDB URI
- Wrong Python version

**Fix**: Double-check all environment variables match the template above.

### Frontend Can't Connect to Backend

**Symptoms**:

- Network errors in browser console
- "Analysis failed" message

**Fix**:

1. Verify `VITE_API_URL` in Vercel settings
2. Check CORS_ORIGINS in Railway includes your Vercel URL
3. Test backend health check directly: `https://your-backend.railway.app/health`

### Database Connection Failed

**Check**:

1. MongoDB Atlas network access allows 0.0.0.0/0
2. Database user has correct password
3. Connection string format is correct
4. Database name is in the URI

### Analysis Not Working

**Possible Causes**:

1. Invalid Gemini API key
2. API quota exceeded (check Google AI Studio)
3. spaCy model not loaded

**Check Railway Logs** for specific error messages.

---

## 📊 Monitor Your Application

### Railway Dashboard

- View real-time logs
- Monitor CPU/memory usage
- Check deployment history

### Vercel Dashboard

- View deployment logs
- Monitor bandwidth usage
- Check function execution

### MongoDB Atlas

- View database collections
- Monitor storage usage
- Check connection count

---

## 🔄 Updating Your Application

### To Update Backend:

1. Push code to GitHub
2. Railway auto-deploys
3. Monitor logs for errors

### To Update Frontend:

1. Push code to GitHub
2. Vercel auto-deploys
3. Check deployment status

---

## 💰 Free Tier Limits

Stay within these limits to remain FREE:

### Railway

- **500 hours/month** execution time
- **$5 credit/month**
- If always running: ~720 hours (exceeds limit)
- **Solution**: App sleeps after 30 min inactivity (sufficient for most use cases)

### Vercel

- **100GB bandwidth/month**
- Unlimited deployments
- 100GB build time

### MongoDB Atlas

- **512MB storage**
- Shared cluster (slower performance)
- Should handle 1000s of analyses

---

## 🚨 Important Notes

1. **API Keys**:

   - Never commit API keys to GitHub
   - Always use environment variables
   - Rotate keys if exposed

2. **Security**:

   - Generate a strong JWT secret
   - Keep `.env` files local only
   - Use HTTPS in production

3. **Backups**:

   - MongoDB Atlas has automatic backups
   - Export important data regularly

4. **Scaling**:
   - If you exceed free tiers, upgrade costs $5-20/month
   - Monitor usage in dashboards

---

## 🎯 Next Steps

After successful deployment:

1. **Custom Domain** (Optional):

   - Buy domain ($10-15/year)
   - Add to Vercel (frontend)
   - Add to Railway (backend)

2. **Monitoring**:

   - Set up error tracking (Sentry - free tier)
   - Add analytics (Google Analytics)

3. **Enhancements**:
   - Add more AI features
   - Improve UI/UX
   - Add email notifications

---

## 📞 Need Help?

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Docs**: https://www.mongodb.com/docs/atlas

---

## ✨ Congratulations!

Your AI Skill Gap Analyzer is now live and accessible worldwide! 🌍

Share your app: `https://your-app-name.vercel.app`

**Total Time**: ~30 minutes  
**Total Cost**: $0/month  
**Status**: Production-ready! ✅
