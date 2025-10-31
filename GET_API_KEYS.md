# 🔑 How to Get Your API Keys (FREE)

You need these API keys to make the AI analysis work:

---

## 1. Gemini API Key (Recommended - FREE)

### Why Gemini?

- ✅ **Completely FREE** (60 requests/minute)
- ✅ Fast and reliable
- ✅ No credit card required
- ✅ Generous rate limits
- ✅ Latest AI model

### Get Your Key (2 minutes):

1. **Go to**: https://makersuite.google.com/app/apikey

2. **Sign in** with your Google account

3. **Click**: "Create API Key"

4. **Select**: Create API key in new project (or use existing)

5. **Copy** the key (starts with `AIza...`)

6. **Save it** somewhere safe - you'll need it for deployment

### Example Key Format:

```
AIzaSyBIec7hcFiGYjKywLF70bsyYw5Sp5jscHo
```

⚠️ **Keep this secret!** Don't share it publicly.

---

## 2. OpenAI API Key (Optional - PAID)

### Why OpenAI? (Optional)

- Slightly different AI responses
- Good as a fallback
- **Requires credit card**
- $5 credit for new accounts
- More expensive than Gemini

### Get Your Key (5 minutes):

1. **Go to**: https://platform.openai.com/signup

2. **Sign up** with email

3. **Verify** your email

4. **Add payment method** (required)

5. **Go to**: https://platform.openai.com/api-keys

6. **Click**: "Create new secret key"

7. **Name it**: "skill-gap-analyzer"

8. **Copy** the key (starts with `sk-...`)

9. **Save it** - you can only see it once!

### Example Key Format:

```
sk-proj-abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ
```

### Pricing:

- GPT-3.5 Turbo: ~$0.002 per analysis
- Should cost < $1/month for testing

---

## 3. MongoDB Atlas (Database - FREE)

### Why MongoDB Atlas?

- ✅ **FREE forever** (512MB)
- ✅ Managed database
- ✅ Automatic backups
- ✅ Global availability
- ✅ Easy setup

### Get Your Connection String (5 minutes):

1. **Go to**: https://www.mongodb.com/cloud/atlas

2. **Sign up** for free account

3. **Click**: "Build a Database"

4. **Choose**: M0 (FREE tier)

5. **Select**: Cloud provider and region (choose closest to you)

6. **Click**: "Create"

### Create Database User:

1. **Username**: `skillgap_admin` (or any name)
2. **Password**: Click "Autogenerate Secure Password" and **SAVE IT**
3. **Click**: "Create Database User"

### Allow Network Access:

1. **Click**: "Add IP Address"
2. **Select**: "Allow Access from Anywhere" (0.0.0.0/0)
3. **Click**: "Confirm"

### Get Connection String:

1. **Click**: "Connect" button
2. **Choose**: "Connect your application"
3. **Copy** the connection string
4. **Replace** `<password>` with your actual password
5. **Add** `/skill_gap_analyzer` before the `?`

### Example Connection String:

```
mongodb+srv://skillgap_admin:MyPassword123@cluster0.ab1cd.mongodb.net/skill_gap_analyzer?retryWrites=true&w=majority
```

---

## 4. JWT Secret Key (Security)

### Why JWT Secret?

- Secures user authentication
- Prevents token forgery
- Required for login system

### Generate Your Key (1 minute):

**Option 1 - Python** (Recommended):

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

**Option 2 - Online Generator**:
Go to: https://www.grc.com/passwords.htm
Copy the "63 random alpha-numeric characters" string

### Example JWT Secret:

```
Kx9j2mN7pQ4rT8vW1yZ3bC5dF0gH6iJ4lM2nP9qR7sT5uV8wX1yZ4aC6bE9fG3h
```

⚠️ **Use a different key!** Never use example keys in production.

---

## 🎯 Quick Reference

After getting all keys, you'll have:

```env
# For Railway (Backend)
GEMINI_API_KEY=AIzaSy...........................
MONGODB_URI=mongodb+srv://skillgap_admin:MyPassword123@cluster0...
JWT_SECRET_KEY=Kx9j2mN7pQ4rT8vW1yZ3bC5dF0gH6iJ4lM2nP9qR7sT5uV8wX1yZ4aC6bE9fG3h
```

---

## 💰 Cost Summary

| Service           | Tier        | Monthly Cost |
| ----------------- | ----------- | ------------ |
| Gemini API        | Free        | $0           |
| MongoDB Atlas     | M0 Free     | $0           |
| Railway (Backend) | Free Credit | $0           |
| Vercel (Frontend) | Free        | $0           |
| **TOTAL**         |             | **$0/month** |

**OpenAI** (Optional): ~$0.50-$2/month for testing

---

## 🔒 Security Best Practices

1. **Never commit** API keys to GitHub
2. **Use environment variables** only
3. **Rotate keys** if exposed
4. **Monitor usage** in dashboards
5. **Set spending limits** (OpenAI)

---

## 🚨 What If Keys Are Exposed?

### If Gemini Key Exposed:

1. Go to https://makersuite.google.com/app/apikey
2. Delete the compromised key
3. Create a new one
4. Update Railway environment variables

### If MongoDB Exposed:

1. Go to MongoDB Atlas → Database Access
2. Delete the compromised user
3. Create new user with new password
4. Update connection string in Railway

### If JWT Secret Exposed:

1. Generate new secret
2. Update Railway environment variables
3. All users will need to log in again

---

## ✅ Checklist

Before deploying, make sure you have:

- [ ] Gemini API Key
- [ ] MongoDB Connection String
- [ ] JWT Secret Key
- [ ] (Optional) OpenAI API Key

Save all these in a secure password manager!

---

## 🎉 Next Steps

Once you have all keys:

1. **Go to**: `QUICK_DEPLOY.md`
2. **Follow**: The 30-minute deployment guide
3. **Add**: Your keys to Railway environment variables
4. **Deploy**: Your application!

---

## 💡 Pro Tips

1. **Gemini is enough**: You don't need OpenAI unless you want to compare AI responses

2. **Test locally first**: Create a `.env` file in `backend/` folder with your keys before deploying

3. **Monitor usage**:

   - Gemini: https://makersuite.google.com/app/apikey
   - MongoDB: https://cloud.mongodb.com/
   - OpenAI: https://platform.openai.com/usage

4. **Set alerts**: MongoDB Atlas can email you when storage is 75% full

5. **Backup keys**: Save them in a password manager (LastPass, 1Password, Bitwarden)

---

## 📞 Support Links

- **Gemini API**: https://ai.google.dev/
- **MongoDB Atlas**: https://www.mongodb.com/docs/atlas/
- **OpenAI**: https://help.openai.com/

---

## 🎯 Summary

Getting your API keys is:

- ✅ **Fast**: 5-10 minutes total
- ✅ **Free**: No credit card required (except OpenAI)
- ✅ **Easy**: Step-by-step instructions
- ✅ **Secure**: Best practices included

**Ready?** Start with Gemini API (2 minutes): https://makersuite.google.com/app/apikey
