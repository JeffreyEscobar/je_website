# Favicon Update Protocol

## Immediate Actions (Every Favicon Update)

### A. Clear Build Caches
```bash
# Clear Vite build cache
rm -rf dist/ .vite/ node_modules/.vite/

# Clear npm/yarn cache (if needed)
npm cache clean --force
# or: yarn cache clean
```

### B. Verify File Path & HTML References
```bash
# Confirm favicon exists in public directory
ls -la public/favicon.ico

# Check file size and modification date
stat public/favicon.ico

# Verify HTML template references
grep -n "favicon" index.html
```

### C. Force Browser Cache Invalidation (Choose One)

#### Option 1: Version Query String
```html
<!-- In index.html -->
<link rel="icon" type="image/x-icon" href="/favicon.ico?v=2025010601" />
<link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico?v=2025010601" />
```

#### Option 2: Unique Filename (Recommended)
```bash
# Rename favicon with timestamp/version
mv public/favicon.ico public/favicon-v2.ico

# Update HTML references
<link rel="icon" type="image/x-icon" href="/favicon-v2.ico" />
```

#### Option 3: Hash-based Naming (Automated)
```javascript
// In vite.config.ts - enable asset hashing
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'favicon.ico') {
            return 'favicon-[hash].ico';
          }
          return '[name]-[hash].[ext]';
        }
      }
    }
  }
});
```

### D. Build & Deploy Process
```bash
# 1. Clean build
npm run build

# 2. Verify favicon in dist
ls -la dist/favicon*

# 3. Check dist/index.html references
grep favicon dist/index.html

# 4. Restart preview with clean cache
npm run preview -- --force
```

### E. Browser Cache Clearing
```bash
# Developer actions:
# 1. Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
# 2. Clear site data: DevTools → Application → Storage → Clear
# 3. Incognito/Private browsing mode
# 4. Different browser for testing
```

## Browser-Specific Cache Clearing

### Chrome/Edge
1. DevTools → Application → Storage → "Clear site data"
2. Or: Settings → Privacy → Clear browsing data → "Cached images and files"

### Firefox  
1. DevTools → Storage → Clear All
2. Or: about:preferences#privacy → "Clear Data"

### Safari
1. Develop → Empty Caches
2. Or: Safari → Clear History and Website Data

## Production Deployment Considerations

### CDN Cache Invalidation
```bash
# AWS CloudFront
aws cloudfront create-invalidation --distribution-id E123456789 --paths "/favicon*"

# Cloudflare
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer {api_token}" \
  -d '{"files":["https://yoursite.com/favicon.ico"]}'
```

### Server Cache Headers
```nginx
# Nginx - Shorter cache for favicons
location ~* \.(ico)$ {
    expires 1d;
    add_header Cache-Control "public, must-revalidate";
}
```

## Testing Checklist

- [ ] New favicon appears in browser tab
- [ ] Bookmark shows new icon  
- [ ] Desktop shortcut updated (if applicable)
- [ ] Mobile home screen icon updated
- [ ] Different browsers show new icon
- [ ] Incognito mode shows new icon
- [ ] Network tab shows 200 (not 304) for favicon request 