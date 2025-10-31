# 🚀 DEPLOYMENT GUIDE - AI Skill Gap Analyzer

## 📋 Quick Overview

**Recommended Stack:**

- **Frontend**: Vercel (Free tier)
- **Backend**: Railway.app or Render.com (Free tier)
- **Database**: MongoDB Atlas (Free tier - 512MB)

**Total Cost**: $0/month (Free tier limits apply)

---

## ⚙️ STEP-BY-STEP DEPLOYMENT

### 1️⃣ DATABASE SETUP (MongoDB Atlas)

#### Create Account & Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create new cluster:
   - **Tier**: M0 (Free)
   - **Region**: Choose closest to your users
   - **Cluster Name**: skill-gap-analyzer

#### Configure Database

1. **Database Access**:

   - Create database user
   - Username: `skillgap_admin`
   - Password: Generate strong password
   - User Privileges: Read and write to any database

2. **Network Access**:

   - Add IP Address
   - Allow access from anywhere: `0.0.0.0/0`
   - (Required for cloud deployments)

3. **Get Connection String**:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string:
   ```
   mongodb+srv://skillgap_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with actual password
   - Add database name: `/skill_gap_analyzer` before `?`

**Final URI Example:**

```
mongodb+srv://skillgap_admin:MySecurePass123@cluster0.ab1cd.mongodb.net/skill_gap_analyzer?retryWrites=true&w=majority
```

---

### 2️⃣ BACKEND DEPLOYMENT (Railway.app)

#### Initial Setup

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Authorize Railway to access your repositories
6. Select your repository

#### Configure Deployment

1. **Root Directory**: Set to `backend`
2. **Build Settings**: Auto-detected (Python)
3. Railway will detect `Procfile` automatically

#### Environment Variables

Click "Variables" tab and add:

```env
GEMINI_API_KEY=your_actual_gemini_key_here
MONGODB_URI=mongodb+srv://skillgap_admin:password@cluster0.xxxxx.mongodb.net/skill_gap_analyzer?retryWrites=true&w=majority
DATABASE_NAME=skill_gap_analyzer
ENVIRONMENT=production
DEBUG=False
USE_GEMINI=True
MODEL_NAME=gemini-1.5-flash
SIMILARITY_THRESHOLD=0.7
CORS_ORIGINS=["*"]
```

#### Deploy

1. Click "Deploy"
2. Wait for build to complete (3-5 minutes)
3. Railway will provide a URL like: `https://your-app.railway.app`
4. **SAVE THIS URL** - you'll need it for frontend

#### Test Backend

Visit: `https://your-app.railway.app/health`
Should return: `{"status":"healthy"}`

---

### 2️⃣-ALT BACKEND DEPLOYMENT (Render.com)

If Railway doesn't work, use Render:

1. Go to https://render.com
2. Sign up with GitHub
3. New → Web Service
4. Connect repository

**Settings:**

- **Root Directory**: `backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Environment**: Python 3

**Environment Variables**: (Same as Railway above)

---

### 3️⃣ FRONTEND DEPLOYMENT (Vercel)

#### Prepare Environment File

1. In your project, create `frontend/.env.production`:

```env
VITE_API_URL=https://your-backend.railway.app
```

Replace with your actual backend URL from Step 2

#### Deploy to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### Environment Variables

Add in Vercel dashboard:

```
VITE_API_URL=https://your-backend.railway.app
```

#### Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Vercel will provide URL: `https://your-app.vercel.app`

---

### 4️⃣ FINAL CONFIGURATION

#### Update Backend CORS

1. Go back to Railway dashboard
2. Update `CORS_ORIGINS` variable:

```
CORS_ORIGINS=["https://your-app.vercel.app", "http://localhost:5173"]
```

3. Redeploy backend

#### Test Complete Application

1. Visit your Vercel URL
2. Register new account
3. Upload resume and job description
4. Verify analysis works

---

## 🔧 POST-DEPLOYMENT CHECKLIST

- [ ] Backend health endpoint responding
- [ ] Frontend loads without errors
- [ ] User registration works
- [ ] Login/logout works
- [ ] Resume upload works
- [ ] Analysis generates results
- [ ] Progress tracking saves data
- [ ] Chat feature works
- [ ] All API calls succeed

---

## 📊 MONITORING & MAINTENANCE

### Check Application Health

- **Backend**: `https://your-backend.railway.app/health`
- **Frontend**: Browser console for errors
- **Database**: MongoDB Atlas dashboard

### View Logs

- **Railway**: Dashboard → Deployments → Logs
- **Vercel**: Dashboard → Deployments → Function Logs
- **MongoDB**: Atlas → Collections → Browse

### Usage Limits (Free Tier)

- **Railway**: 500 hours/month, $5 credit
- **Vercel**: 100GB bandwidth, unlimited deployments
- **MongoDB Atlas**: 512MB storage, shared CPU

---

## 🚨 TROUBLESHOOTING

### Backend Not Starting

- Check Railway logs for errors
- Verify all environment variables are set
- Ensure MongoDB URI is correct
- Check Python version in `runtime.txt`

### Frontend Can't Connect to Backend

- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Ensure backend is running (visit `/health`)
- Check browser console for CORS errors

### Database Connection Failed

- Verify MongoDB URI format
- Check IP whitelist (should be 0.0.0.0/0)
- Verify database user credentials
- Check network access in Atlas

### Analysis Not Working

- Verify `GEMINI_API_KEY` is set correctly
- Check API key has quota remaining
- View backend logs for specific errors
- Ensure spaCy model is loaded (check startup logs)

---

## 🔄 UPDATING THE APPLICATION

### Update Backend

1. Push code to GitHub
2. Railway auto-deploys on push
3. Monitor deployment logs

### Update Frontend

1. Push code to GitHub
2. Vercel auto-deploys on push
3. Check deployment status

### Manual Deploy

- **Railway**: Dashboard → Deploy → Redeploy
- **Vercel**: Dashboard → Deployments → Redeploy

---

## 💰 SCALING OPTIONS

### When to Upgrade

**Backend** (Upgrade Railway when):

- App running 24/7 exceeds 500 hours/month
- Need faster CPU/more memory
- Cost: $5-20/month

**Database** (Upgrade Atlas when):

- Storage exceeds 512MB
- Need better performance
- Cost: $9/month (M10 tier)

**Frontend** (Rarely needed):

- Bandwidth exceeds 100GB
- Vercel Pro: $20/month

---

## 🎯 CUSTOM DOMAIN (Optional)

### Add Custom Domain

**Frontend (Vercel)**:

1. Buy domain (Namecheap, Google Domains)
2. Vercel Dashboard → Settings → Domains
3. Add domain
4. Update DNS records as instructed

**Backend (Railway)**:

1. Railway Dashboard → Settings → Domains
2. Add custom domain
3. Update DNS CNAME record

---

## 📞 SUPPORT RESOURCES

- **Railway**: https://railway.app/help
- **Vercel**: https://vercel.com/docs
- **MongoDB Atlas**: https://www.mongodb.com/docs/atlas/
- **FastAPI**: https://fastapi.tiangolo.com/
- **Vite**: https://vitejs.dev/

---

## ✅ DEPLOYMENT COMPLETE!

Your AI Skill Gap Analyzer is now:
✨ Always online
🌍 Accessible worldwide
🔒 Secure and scalable
💰 Free to run (within limits)

**Share your app**: `https://your-app.vercel.app`
