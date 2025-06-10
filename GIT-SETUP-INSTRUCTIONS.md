# 🛡️ Git Setup - Protecting Client Data

## Important: Before Initializing Git

**CRITICAL**: The `.gitignore` has been configured to protect client data, but you need to follow these steps to ensure nothing sensitive gets committed.

## 🚨 Pre-Git Checklist

### 1. **Verify Client Data Location**
```bash
# Check if client ktypemaster file exists
ls -la public/ktypemaster3.csv
ls -la public/ktypemaster*.csv
```

### 2. **Move Client Data (if exists)**
```bash
# Create a secure backup location outside the project
mkdir -p ~/secure-client-data/shopify-processor/
mv public/ktypemaster3.csv ~/secure-client-data/shopify-processor/ 2>/dev/null || echo "No client file found"
```

### 3. **Initialize Git Safely**
```bash
# Initialize git repository
git init

# Verify .gitignore is protecting files
git status

# You should see:
# - demo-ktypemaster.csv (this is OK - it's fictional)
# - NO ktypemaster3.csv (this should be ignored)
```

## ✅ Safe Files to Commit

These files are **SAFE** and contain **NO** client data:
- `public/demo-ktypemaster.csv` - Fictional demo data only
- `src/services/demoMockData.ts` - Sample orders (fake customers)
- `README-DEMO.md` - Public documentation
- All other source code files

## ❌ Never Commit These

The `.gitignore` protects these patterns:
- `public/ktypemaster3.csv` - Real client data
- `public/ktypemaster*.csv` - Any ktypemaster files (except demo)
- `*-orders-*.csv` - Downloaded order exports
- `*-processed-*.csv` - Processing results
- `*-courier-*.csv` - Courier files
- `.env*` - Environment variables with API keys
- `client-*` or `production-*` files

## 🔄 First Commit

```bash
# Add all safe files
git add .

# Double-check what's being committed
git status

# Commit (only if no sensitive files are listed)
git commit -m "Initial commit: Shopify Order Processor with demo mode

- Complete demo version with fictional data
- No client information included
- Toggle between demo and live modes
- Ready for recruiter showcase"
```

## 🌐 Remote Repository Setup

```bash
# Add your GitHub remote
git remote add origin https://github.com/yourusername/shopify-order-processor.git

# Push to GitHub
git push -u origin main
```

## 🛡️ Additional Security Tips

1. **Never add `-f` flag** to override .gitignore
2. **Review commits** before pushing with `git log --stat`
3. **Use git hooks** if you want extra protection
4. **Keep client data** in a separate, private location
5. **Document** where real data is stored for your reference

## 🆘 If Client Data Was Accidentally Committed

If you accidentally commit sensitive data:

```bash
# Remove from history (DESTRUCTIVE - use carefully)
git filter-branch --index-filter 'git rm --cached --ignore-unmatch public/ktypemaster3.csv' --prune-empty -- --all

# Or use the more modern tool
git filter-repo --path public/ktypemaster3.csv --invert-paths

# Force push (only if you haven't shared the repo yet)
git push --force-with-lease
```

## ✅ Verification Commands

Before any commit, always run:
```bash
# Check what's staged
git diff --cached --name-only

# Search for potential sensitive data
grep -r "ktypemaster3" . --exclude-dir=node_modules --exclude-dir=.git || echo "No references found"
grep -r "real customer\|actual customer\|production" . --exclude-dir=node_modules --exclude-dir=.git || echo "No production references found"
```

---

**Remember**: The demo is designed to showcase your skills while keeping client data completely private and secure. 🔒 