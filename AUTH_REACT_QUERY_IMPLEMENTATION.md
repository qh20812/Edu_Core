# AuthProvider với React Query - Hoàn thiện

## 🚀 Tóm tắt cải tiến

AuthProvider đã được hoàn toàn tái cấu trúc để sử dụng React Query, loại bỏ việc quản lý state thủ công và cung cấp trải nghiệm developer tốt hơn.

## 📋 So sánh trước và sau

### Trước đây (useState + useEffect):
```jsx
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const validateToken = async () => {
    if (token) {
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setUser(data.data.user);
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
  };
  validateToken();
}, [token]);
```

### Bây giờ (React Query):
```jsx
const { 
  data: userData, 
  isLoading, 
  error: userError,
  refetch: refetchUser 
} = useCurrentUser();

const user = userData?.data?.user || null;
```

## 🔧 Cấu trúc mới

### 1. **useAuthQueries.js** - Query Keys và Hooks

```javascript
// Query Keys được tổ chức tốt
const authKeys = {
  all: ['auth'],
  me: () => [...authKeys.all, 'me'],
};

// Hook lấy user hiện tại
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authService.getMe,
    enabled: !!localStorage.getItem('token'),
    staleTime: 1000 * 60 * 15, // 15 phút
    retry: (failureCount, error) => {
      if (error?.message?.includes('401')) return false;
      return failureCount < 2;
    },
  });
};

// Hook login với auto cache invalidation
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.token);
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};
```

### 2. **AuthContext.jsx** - Simplified Provider

```jsx
export const AuthProvider = ({ children }) => {
  // React Query hooks thay vì manual state
  const { data: userData, isLoading, error, refetch } = useCurrentUser();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  
  // Extract data
  const user = userData?.data?.user || null;
  const tenant = userData?.data?.tenant || null;
  
  // Simple wrapper functions
  const login = async (email, password) => {
    await loginMutation.mutateAsync({ email, password });
    return { success: true };
  };
  
  // Rich context value
  const contextValue = {
    user, tenant, token,
    loading: isLoading,
    login, logout, register,
    isAuthenticated: !!user && !!token,
    // ... many more helper functions
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
```

## 🎯 Lợi ích chính

### 1. **Automatic Cache Management**
- User data được cache trong 15 phút
- Auto refetch khi token thay đổi
- Background updates không làm gián đoạn UX

### 2. **Better Error Handling**
```jsx
const { error, loginError, registerError } = useAuth();

// Error cụ thể cho từng action
if (loginError) {
  showError(`Đăng nhập thất bại: ${loginError.message}`);
}
```

### 3. **Loading States Granular**
```jsx
const { 
  loading,        // General user loading
  loginLoading,   // Login in progress
  logoutLoading,  // Logout in progress
  registerLoading // Register in progress
} = useAuth();
```

### 4. **Rich Helper Functions**
```jsx
const { 
  isAuthenticated,
  isAdmin, isSysAdmin, isTeacher, isStudent,
  hasRole, hasAnyRole, hasPermission,
  tenantName, subscriptionStatus,
  canAddStudents
} = useAuth();
```

## 🔄 Migration Guidelines

### Các component cần update:

1. **Components sử dụng loading state**:
```jsx
// Trước
if (loading) return <Spinner />;

// Sau - không thay đổi gì!
if (loading) return <Spinner />;
```

2. **Components sử dụng login/logout**:
```jsx
// Trước
const handleLogin = async (email, password) => {
  const result = await login(email, password);
  if (result.success) {
    navigate('/dashboard');
  }
};

// Sau - cải thiện error handling
const handleLogin = async (email, password) => {
  try {
    await login(email, password);
    navigate('/dashboard');
  } catch (error) {
    showError(error.message);
  }
};
```

### Error handling improvements:
```jsx
const LoginForm = () => {
  const { login, loginLoading, loginError } = useAuth();
  
  return (
    <form>
      {loginError && (
        <ErrorMessage>
          Đăng nhập thất bại: {loginError.message}
        </ErrorMessage>
      )}
      
      <Button 
        onClick={handleLogin} 
        loading={loginLoading}
      >
        Đăng nhập
      </Button>
    </form>
  );
};
```

## 🛠 Advanced Features

### 1. **Optimistic Updates**
```jsx
// Trong useAuthQueries.js
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (profileData) => authService.updateProfile(profileData),
    onMutate: async (newProfile) => {
      // Cancel ongoing queries
      await queryClient.cancelQueries({ queryKey: authKeys.me() });
      
      // Snapshot current value
      const previousUser = queryClient.getQueryData(authKeys.me());
      
      // Optimistically update
      queryClient.setQueryData(authKeys.me(), (old) => ({
        ...old,
        data: { ...old.data, user: { ...old.data.user, ...newProfile } }
      }));
      
      return { previousUser };
    },
    onError: (err, newProfile, context) => {
      // Rollback on error
      queryClient.setQueryData(authKeys.me(), context.previousUser);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
};
```

### 2. **Background Sync**
```jsx
// Auto refresh user data mỗi 30 phút
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authService.getMe,
    enabled: !!localStorage.getItem('token'),
    staleTime: 1000 * 60 * 15, // 15 phút
    refetchInterval: 1000 * 60 * 30, // Background refetch mỗi 30 phút
    refetchOnWindowFocus: true, // Refetch khi user quay lại tab
  });
};
```

### 3. **Offline Support**
```jsx
// Trong auth service
export const authService = {
  getMe: async () => {
    try {
      return await apiClient.get('/auth/me');
    } catch (error) {
      // Fallback to cached data khi offline
      const cachedUser = localStorage.getItem('user');
      if (cachedUser && error.name === 'NetworkError') {
        return { data: { user: JSON.parse(cachedUser) } };
      }
      throw error;
    }
  }
};
```

## 📊 Performance Improvements

### Before:
- ✅ Manual state management
- ❌ No caching strategy
- ❌ Multiple unnecessary API calls
- ❌ Loading states không consistent

### After:
- ✅ Intelligent caching với React Query
- ✅ Background updates
- ✅ Automatic retry logic
- ✅ Optimistic updates
- ✅ Offline support potential
- ✅ DevTools support

## 🔮 Next Steps

1. **Add TypeScript** cho better type safety
2. **Implement refresh token logic** 
3. **Add offline support** với service workers
4. **Implement role-based routing** với React Query
5. **Add audit logging** cho auth actions

## 📝 Testing Strategy

```jsx
// Test với React Query Testing Library
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCurrentUser } from '../useAuthQueries';

test('should fetch user data when token exists', async () => {
  localStorage.setItem('token', 'fake-token');
  
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
  
  const { result } = renderHook(() => useCurrentUser(), { wrapper });
  
  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });
  
  expect(result.current.data?.data?.user).toBeDefined();
});
```

## 🎉 Kết luận

AuthProvider mới với React Query mang lại:
- **Better Developer Experience**: Ít boilerplate code hơn
- **Better User Experience**: Loading states và error handling tốt hơn  
- **Better Performance**: Intelligent caching và background updates
- **Better Maintainability**: Code dễ test và extend hơn

Việc refactor này tạo nền tảng vững chắc cho việc scale ứng dụng trong tương lai!
