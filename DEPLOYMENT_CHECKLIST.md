# 🚀 DEPLOYMENT QUICK CHECKLIST

## Before You Start

- [ ] GitHub repository is ready and pushed
- [ ] Gemini API key obtained (https://makersuite.google.com/app/apikey)
- [ ] All code is tested locally
- [ ] `.env` files are NOT committed (in `.gitignore`)

---

## 1. DATABASE (MongoDB Atlas)

- [ ] Create MongoDB Atlas account
- [ ] Create M0 (free) cluster
- [ ] Create database user with password
- [ ] Whitelist IP: `0.0.0.0/0`
- [ ] Copy connection string
- [ ] Add database name to URI: `/skill_gap_analyzer`
- [ ] Test connection (optional: use MongoDB Compass)

**Connection String Format:**

```
mongodb+srv://username:password@cluster.mongodb.net/skill_gap_analyzer?retryWrites=true&w=majority
```

---

## 2. BACKEND (Railway.app)

- [ ] Sign up at railway.app with GitHub
- [ ] New Project → Deploy from GitHub
- [ ] Select repository
- [ ] Set root directory: `backend`
- [ ] Add environment variables:
  - [ ] `GEMINI_API_KEY`
  - [ ] `MONGODB_URI`
  - [ ] `DATABASE_NAME=skill_gap_analyzer`
  - [ ] `ENVIRONMENT=production`
  - [ ] `DEBUG=False`
  - [ ] `CORS_ORIGINS=["*"]`
- [ ] Deploy and wait for completion
- [ ] Copy backend URL (e.g., `https://xxx.railway.app`)
- [ ] Test: Visit `https://xxx.railway.app/health`
- [ ] Should return: `{"status":"healthy"}`

---

## 3. FRONTEND (Vercel)

- [ ] Sign up at vercel.com with GitHub
- [ ] Import project from GitHub
- [ ] Set root directory: `frontend`
- [ ] Configure build:
  - [ ] Build command: `npm run build`
  - [ ] Output directory: `dist`
  - [ ] Install command: `npm install`
- [ ] Add environment variable:
  - [ ] `VITE_API_URL=https://your-backend.railway.app`
- [ ] Deploy and wait for completion
- [ ] Copy frontend URL (e.g., `https://xxx.vercel.app`)

---

## 4. FINAL STEPS

- [ ] Update backend `CORS_ORIGINS` with frontend URL
- [ ] Redeploy backend (if CORS updated)
- [ ] Test complete flow:
  - [ ] Open frontend URL
  - [ ] Register account
  - [ ] Login
  - [ ] Upload resume
  - [ ] Paste job description
  - [ ] Run analysis
  - [ ] Verify results display
  - [ ] Test chat feature
  - [ ] Test progress tracking

---

## 5. SHARE & MONITOR

- [ ] Share frontend URL with users
- [ ] Bookmark Railway dashboard (backend logs)
- [ ] Bookmark Vercel dashboard (frontend logs)
- [ ] Bookmark MongoDB Atlas dashboard
- [ ] Set up monitoring/alerts (optional)

---

## ⚡ QUICK DEPLOY COMMANDS

```bash
# If deploying from CLI (optional)

# Backend - Railway CLI
railway login
railway link
railway up

# Frontend - Vercel CLI
npm i -g vercel
cd frontend
vercel --prod
```

---

## 📱 YOUR DEPLOYMENT URLS

**Frontend**: ****************\_\_\_****************

**Backend**: ****************\_\_\_****************

**Database**: MongoDB Atlas Dashboard

---

## 🆘 COMMON ISSUES

| Issue                     | Solution                                |
| ------------------------- | --------------------------------------- |
| Backend won't start       | Check Railway logs, verify env vars     |
| CORS error                | Update `CORS_ORIGINS` with frontend URL |
| Database connection fails | Check MongoDB URI, whitelist IPs        |
| Frontend shows API errors | Verify `VITE_API_URL` is correct        |
| Analysis not working      | Check `GEMINI_API_KEY` is valid         |

---

## ✅ DONE!

Deployment time: ~20-30 minutes

Your app is now live and accessible worldwide! 🎉
