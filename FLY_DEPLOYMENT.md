# 🚀 Fly.io Deployment Guide

## ✅ Prerequisites

- [x] Code pushed to GitHub
- [ ] Fly.io account (free tier available)
- [ ] Flyctl CLI installed

---

## 📦 Step 1: Install Flyctl CLI

### Windows (PowerShell):

```powershell
# Install Flyctl
iwr https://fly.io/install.ps1 -useb | iex

# Verify installation
flyctl version
```

Or download from: https://fly.io/docs/hands-on/install-flyctl/

---

## 🔑 Step 2: Sign Up & Login

```powershell
# Sign up (if new user)
flyctl auth signup

# Or login (if existing user)
flyctl auth login
```

This will open your browser for authentication.

---

## 🚀 Step 3: Launch Your App

```powershell
# Navigate to project
cd D:\Murali_Printers\QR_Code_Generator

# Launch app (interactive setup)
flyctl launch
```

### During Launch, Answer:

1. **App name**: `murali-qr-generator` (or leave blank for auto-generated)
2. **Organization**: Select your organization
3. **Region**: `sin` (Singapore - closest to India) or `bom` (Mumbai)
4. **Set up Postgres database?**: `No`
5. **Set up Redis database?**: `No`
6. **Deploy now?**: `Yes`

Fly.io will:
- ✅ Detect Dockerfile
- ✅ Read fly.toml configuration
- ✅ Build Docker image
- ✅ Deploy to chosen region
- ✅ Assign public URL

---

## 🌐 Your App Will Be Live At:

```
https://murali-qr-generator.fly.dev
```

Or your custom name:
```
https://YOUR-APP-NAME.fly.dev
```

---

## 📊 Step 4: Monitor Deployment

```powershell
# Watch deployment logs
flyctl logs

# Check app status
flyctl status

# Open app in browser
flyctl open
```

---

## ✅ Step 5: Test Your Deployment

### Test Frontend:
```
https://murali-qr-generator.fly.dev/
```

### Test API Health:
```powershell
curl https://murali-qr-generator.fly.dev/api/health
```

### Test QR Generation:
```powershell
curl -X POST https://murali-qr-generator.fly.dev/api/generate `
  -H "Content-Type: application/json" `
  -d '{"text":"https://muraliprinters.com","size":300}'
```

---

## 🔄 Step 6: Update & Redeploy

```powershell
# Make changes to your code
# Then deploy:
flyctl deploy

# Or auto-deploy on git push (set up CI/CD):
flyctl deploy --remote-only
```

---

## 🎯 Fly.io Configuration Details

### App Configuration (fly.toml):
- **Region**: Singapore (sin) - Low latency for India
- **Memory**: 256MB (free tier)
- **CPU**: 1 shared CPU
- **Auto-scaling**: Stops when idle, starts on request
- **Health check**: Monitors `/api/health`
- **HTTPS**: Automatic SSL certificate

### Cost:
- ✅ **Free tier**: 3 shared-cpu-1x VMs with 256MB RAM
- ✅ **Always free**: SSL, metrics, logs
- ✅ **No credit card** required for free tier

---

## 🌍 Available Regions

Closest to India:
- `bom` - Mumbai, India (best for Indian users)
- `sin` - Singapore
- `hkg` - Hong Kong

Change region in `fly.toml`:
```toml
primary_region = "bom"  # Mumbai
```

Then redeploy:
```powershell
flyctl deploy
```

---

## 🔧 Useful Commands

```powershell
# View app status
flyctl status

# View logs (real-time)
flyctl logs

# SSH into app
flyctl ssh console

# Scale app
flyctl scale count 1

# View metrics
flyctl dashboard

# List all apps
flyctl apps list

# Destroy app (if needed)
flyctl apps destroy murali-qr-generator
```

---

## 🔐 Environment Variables

Set environment variables:

```powershell
# Set variable
flyctl secrets set NODE_ENV=production

# List secrets
flyctl secrets list

# Remove secret
flyctl secrets unset SECRET_NAME
```

---

## 🎨 Custom Domain

### Add Custom Domain:

```powershell
# Add your domain
flyctl certs add qr.muraliprinters.com

# Get DNS records to add
flyctl certs show qr.muraliprinters.com
```

Add these DNS records to your domain:
```
Type: CNAME
Name: qr
Value: murali-qr-generator.fly.dev
```

---

## 📊 Free Tier Limits

Fly.io Free Tier includes:
- ✅ Up to 3 shared-cpu-1x VMs (256MB RAM each)
- ✅ 160GB outbound bandwidth
- ✅ 3GB storage
- ✅ Automatic SSL certificates
- ✅ Metrics and logs

**Perfect for your QR Generator!** 🎉

---

## 🐛 Troubleshooting

### Build Fails:
```powershell
# Check Dockerfile
flyctl logs

# Force rebuild
flyctl deploy --build-only
```

### App Not Starting:
```powershell
# Check logs
flyctl logs

# Check status
flyctl status

# Restart app
flyctl apps restart
```

### Health Check Failing:
- Verify `/api/health` endpoint works locally
- Check PORT environment variable (should be 8080)
- Review logs: `flyctl logs`

---

## 🔄 CI/CD with GitHub Actions

Auto-deploy on git push:

1. Get Fly.io token:
```powershell
flyctl auth token
```

2. Add to GitHub Secrets:
   - Go to repository Settings → Secrets
   - Add `FLY_API_TOKEN` with your token

3. Create `.github/workflows/fly.yml`:
```yaml
name: Fly.io Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: superfly/flyctl-actions/setup-flyctl@master
      - run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

Now every push to `main` auto-deploys! 🚀

---

## 📝 Deployment Checklist

Before deploying:
- [x] Dockerfile created
- [x] fly.toml configured
- [x] .dockerignore created
- [x] Code tested locally
- [x] Pushed to GitHub

After deploying:
- [ ] Test frontend UI
- [ ] Test API endpoints
- [ ] Check logs for errors
- [ ] Test on mobile
- [ ] Add custom domain (optional)

---

## 🎯 Next Steps

1. **Deploy now**: `flyctl launch`
2. **Test app**: Visit your .fly.dev URL
3. **Monitor**: `flyctl logs`
4. **Share**: Send link to team!
5. **Custom domain**: Add qr.muraliprinters.com

---

## 💡 Why Fly.io?

✅ **Global CDN**: Low latency worldwide  
✅ **Auto-scaling**: Scales to zero, saves costs  
✅ **Docker native**: Uses your Dockerfile  
✅ **Free tier**: No credit card needed  
✅ **Fast deployment**: ~2 minutes  
✅ **SSL included**: Automatic HTTPS  
✅ **Health checks**: Built-in monitoring  

---

## 🚀 Quick Deploy Commands

```powershell
# Complete deployment in 3 commands:

# 1. Install Flyctl
iwr https://fly.io/install.ps1 -useb | iex

# 2. Login
flyctl auth login

# 3. Deploy
cd D:\Murali_Printers\QR_Code_Generator
flyctl launch
```

**That's it!** Your app will be live in ~2-3 minutes! 🎉

---

**Ready to deploy?** Run the commands above and you'll be live on Fly.io! 🚀

Need help? Just ask! 🤝
