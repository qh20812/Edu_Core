# 🔐 SECURITY GUIDELINES - EduCore

## 🚨 IMPORTANT SECURITY REMINDERS

### ⚠️ Files NEVER to commit to Git:

#### 🔑 Environment & Configuration
- `.env` (all variants)
- `config.json` (if contains sensitive data)
- `secrets.json`
- Any file with passwords, API keys, or tokens

#### 🗄️ Database & Data
- Database files (`.db`, `.sqlite`)
- Database dumps (`.sql`, `.dump`)
- Backup files (`.backup`, `.bak`)
- User data exports

#### 🔒 Certificates & Keys
- SSL certificates (`.pem`, `.crt`, `.key`)
- SSH keys
- JWT secrets
- OAuth client secrets

#### 📁 Upload Directories
- `uploads/` folder contents
- User-generated files
- Temporary files

## 🛡️ Security Best Practices

### 1. Environment Variables
```bash
# ✅ Good - Use environment variables
const jwtSecret = process.env.JWT_SECRET;

# ❌ Bad - Hardcoded secrets
const jwtSecret = "mysecret123";
```

### 2. Database Credentials
```bash
# ✅ Good - Environment variable
MONGO_URI=mongodb://username:password@host:port/database

# ❌ Bad - Hardcoded in code
const mongoUri = "mongodb://admin:password123@localhost:27017/educore";
```

### 3. API Keys & Secrets
```bash
# ✅ Good - Environment variables
STRIPE_SECRET_KEY=sk_live_...
GOOGLE_CLIENT_SECRET=...

# ❌ Bad - In source code
const stripeKey = "sk_live_abc123...";
```

## 🔍 Before Committing Checklist

- [ ] Check for `.env` files
- [ ] Check for hardcoded passwords/secrets
- [ ] Check for API keys in code
- [ ] Check for database credentials
- [ ] Check for sensitive documentation
- [ ] Check for user data/uploads
- [ ] Review git diff for sensitive data

## 🚀 Deployment Security

### Production Environment
- Use strong, unique passwords
- Enable SSL/TLS
- Use environment variables for all secrets
- Regular security updates
- Monitor access logs
- Implement rate limiting

### Database Security
- Use database authentication
- Encrypt connections
- Regular backups (encrypted)
- Restrict database access
- Monitor database logs

## 📞 Security Issues

If you find a security vulnerability:
1. **DO NOT** create a public issue
2. Email: security@educore.vn
3. Include detailed description
4. Wait for response before disclosure

## 🔧 Development Security

### Local Development
- Never commit `.env` files
- Use `.env.example` for templates
- Rotate secrets regularly
- Use different secrets for dev/prod
- Keep dependencies updated

### Code Review
- Check for hardcoded secrets
- Verify environment variable usage
- Review authentication logic
- Check input validation
- Verify authorization checks

## 📋 Security Audit Checklist

### Monthly Checks
- [ ] Update all dependencies
- [ ] Review access logs
- [ ] Check for exposed endpoints
- [ ] Verify SSL certificates
- [ ] Review user permissions

### Before Release
- [ ] Security scan
- [ ] Dependency audit
- [ ] Environment variable check
- [ ] SSL/TLS verification
- [ ] Access control review

## 🛠️ Tools & Commands

### Check for secrets in git history
```bash
git log --all --grep="password\|secret\|key" -i
```

### Scan for potential secrets
```bash
# Install git-secrets
npm install -g git-secrets

# Scan repository
git secrets --scan
```

### Remove sensitive data from git history
```bash
# Use BFG Repo-Cleaner or git filter-branch
# Contact admin before running these commands
```

## 🚫 What NOT to do

- Never commit `.env` files
- Never hardcode secrets in source code
- Never commit database files
- Never commit user uploads
- Never share credentials in chat/email
- Never log sensitive information
- Never expose internal API endpoints
- Never use weak passwords

## ✅ What TO do

- Use environment variables for all secrets
- Use `.env.example` for documentation
- Encrypt sensitive data
- Use HTTPS in production
- Implement proper authentication
- Validate all inputs
- Use secure session management
- Regular security audits

---

**Remember: Security is everyone's responsibility! 🔐**
