# Fix Token Expired Error - Documentation

## 🐛 Vấn đề

Ứng dụng gặp lỗi `401 Unauthorized` và `Token expired` trong console, gây ra trải nghiệm người dùng không tốt khi token JWT hết hạn.

```
GET http://localhost:5000/api/auth/me 401 (Unauthorized)
API Error on GET /auth/me: Error: Token expired
```

## ✅ Giải pháp đã implement

### 1. **Cải thiện API Client**

**File: `src/Services/apiClient.service.js`**

- ✅ **Validate token format** trước khi sử dụng
- ✅ **Auto clear invalid tokens** khỏi localStorage  
- ✅ **Graceful error handling** cho 401 errors
- ✅ **Smart redirect logic** tránh redirect ở public pages
- ✅ **Distinguish** giữa token expired và unauthorized khác

```javascript
// Trước đây: Generic error handling
if (!response.ok) {
  throw new Error(data.message || 'Có lỗi xảy ra');
}

// Bây giờ: Specific token expired handling
if (response.status === 401) {
  const errorMessage = data.message || 'Unauthorized';
  
  if (errorMessage.includes('expired')) {
    handleAuthError('Token expired');
    throw new Error('Session expired. Please login again.');
  }
}
```

### 2. **Enhanced React Query Auth Hooks**

**File: `src/Hooks/useAuthQueries.js`**

- ✅ **Smart retry logic** - không retry khi token expired
- ✅ **Auto cache clearing** khi authentication error
- ✅ **Token expiry detection** trong useAuth hook
- ✅ **Enhanced error states** cho debugging

```javascript
// useCurrentUser với improved error handling
export const useCurrentUser = (options = {}) => {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authService.getMe,
    retry: (failureCount, error) => {
      // Không retry nếu token expired
      if (error?.message?.includes('expired')) {
        return false;
      }
      return failureCount < 2;
    },
    onError: (error) => {
      if (error?.message?.includes('expired')) {
        queryClient.clear(); // Clear cache
      }
    }
  });
};
```

### 3. **Auth Utilities**

**File: `src/Utils/authUtils.js`**

- ✅ **Client-side token validation**
- ✅ **Centralized auth data clearing**
- ✅ **Public route detection**
- ✅ **Smart return URL generation**

```javascript
// Check token expiry client-side
export const isTokenExpired = (token) => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const currentTime = Date.now() / 1000;
  return payload.exp < (currentTime + 60); // 1 phút buffer
};
```

### 4. **AuthGuard Component**

**File: `src/Components/Common/AuthGuard.jsx`**

- ✅ **Automatic token expiry detection**
- ✅ **User-friendly error messages**
- ✅ **Graceful login redirect** với return URL
- ✅ **Prevents infinite redirects**

## 🔧 Cách sử dụng

### 1. Wrap App với AuthGuard

```jsx
// App.jsx
import AuthGuard from './Components/Common/AuthGuard';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthGuard>
          <Router>
            {/* Your routes */}
          </Router>
        </AuthGuard>
      </AuthProvider>
    </QueryClientProvider>
  );
}
```

### 2. Use Enhanced useAuth Hook

```jsx
// Trong component
import { useAuth } from '../Hooks/useAuthQueries';

function Dashboard() {
  const { 
    user, 
    isLoading, 
    isTokenExpired, 
    isAuthenticated 
  } = useAuth();

  if (isTokenExpired) {
    return <div>Session expired, redirecting...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return <div>Welcome {user?.name}</div>;
}
```

## 📋 Error Handling Flow

### Khi Token Expired:

1. **API Request** → 401 Token expired response
2. **apiClient** detects expired token → calls `handleAuthError()`
3. **Clear localStorage** (token, user, tenant)
4. **React Query** catches error → doesn't retry
5. **AuthGuard** detects `isTokenExpired` → shows user message
6. **Auto redirect** to login với return URL
7. **User logs in** → redirected back to original page

### Khi Network Error:

1. **API Request** fails với network error
2. **React Query** automatically retries
3. **If still fails** → show error message
4. **No auth data clearing** (might be temporary network issue)

## 🎯 Benefits

### User Experience
- ✅ **Clear error messages** in Vietnamese
- ✅ **Automatic redirect** với return URL
- ✅ **No infinite loading** states
- ✅ **Graceful fallback** to login

### Developer Experience  
- ✅ **Centralized error handling**
- ✅ **Consistent auth state** across app
- ✅ **Better debugging** với detailed logs
- ✅ **TypeScript ready** structure

### Performance
- ✅ **No unnecessary retries** on auth errors
- ✅ **Smart caching** strategies
- ✅ **Efficient token validation**
- ✅ **Background auth checks**

## 🔮 Advanced Features

### 1. Token Refresh (Future Enhancement)

```javascript
// Auto refresh token before expiry
export const useTokenRefresh = () => {
  const refreshToken = useRefreshToken();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && willExpireSoon(token)) {
      refreshToken.mutate();
    }
  }, []);
};
```

### 2. Offline Support

```javascript
// Handle offline scenarios
export const useOfflineAuth = () => {
  const isOnline = useOnlineStatus();
  const { user } = getUserFromStorage();
  
  return {
    user: isOnline ? userFromAPI : user,
    isOffline: !isOnline
  };
};
```

## 🚨 Troubleshooting

### Common Issues:

1. **"Maximum update depth exceeded"**
   - ✅ Fixed: Using `setTimeout` in redirect logic

2. **"Infinite redirect loop"**  
   - ✅ Fixed: Public route detection

3. **"Token cleared but user still showing"**
   - ✅ Fixed: React Query cache clearing

4. **"Login redirect doesn't work"**
   - ✅ Fixed: Proper return URL handling

### Debug Steps:

1. Check browser DevTools → Application → Local Storage
2. Look for token format in console logs
3. Check Network tab for 401 responses
4. Verify React Query DevTools for cache state

## 📝 Testing

```javascript
// Test token expiry handling
describe('Token Expiry', () => {
  test('should redirect to login when token expired', () => {
    // Mock expired token
    localStorage.setItem('token', expiredToken);
    
    // Render protected component
    render(<ProtectedComponent />);
    
    // Should redirect to login
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
```
