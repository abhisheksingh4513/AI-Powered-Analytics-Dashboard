# Storage Cleanup Instructions

If you're experiencing "Resource::kQuotaBytesPerItem quota exceeded" errors, follow these steps:

## Quick Fix (Browser Console)

1. **Open Browser DevTools** (F12)
2. **Go to Console tab**
3. **Run these commands**:

```javascript
// Clear all local storage
localStorage.clear();

// Clear all session storage  
sessionStorage.clear();

// Clear service worker cache if any
if ('caches' in window) {
  caches.keys().then(names => {
    names.forEach(name => caches.delete(name));
  });
}

// Reload the page
window.location.reload();
```

## Alternative Fix (Browser Settings)

### Chrome/Edge:
1. F12 → Application tab → Storage
2. Click "Clear storage"
3. Refresh page

### Firefox:
1. F12 → Storage tab
2. Right-click → Clear All
3. Refresh page

## Prevention

The dashboard now includes:
- ✅ Automatic storage cleanup on load
- ✅ Reduced toast message lengths
- ✅ Memory-optimized components
- ✅ Longer intervals for real-time updates
- ✅ Immediate cleanup of blob URLs

## If Issues Persist

1. **Clear browser cache completely**
2. **Restart browser**
3. **Try incognito/private mode**
4. **Check available disk space**

The updated dashboard should now run smoothly without storage quota issues!
