# Cải Tiến Kiến Trúc Frontend - React Query Integration

Tài liệu này mô tả các cải tiến kiến trúc được thực hiện để giải quyết các vấn đề coupling, state management và tái sử dụng code.

## 🔧 Các Cải Tiến Đã Thực Hiện

### 1. **Tách Logic API ra Services**

#### Trước đây:
```jsx
// Direct fetch calls trong component
const response = await fetch(`${API_URL}/system/analytics`, {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

#### Bây giờ:
```jsx
// services/system.service.js
export const systemService = {
  getAnalytics: async () => {
    return await apiClient.get('/system/analytics');
  }
};
```

**Lợi ích:**
- ✅ Tái sử dụng code
- ✅ Dễ test và maintain
- ✅ Centralized error handling
- ✅ Type safety (có thể thêm TypeScript sau)

### 2. **Custom Hook useSocket**

#### Trước đây:
```jsx
// Import trực tiếp context
import { SocketContext } from '../Contexts/SocketContext';
const socket = useContext(SocketContext);
```

#### Bây giờ:
```jsx
// Hooks/useSocket.js
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

// Sử dụng trong component
import { useSocket } from '../Hooks/useSocket';
const { socket, isConnected, notifications } = useSocket();
```

**Lợi ích:**
- ✅ Consistent interface giống useAuth
- ✅ Error boundary protection
- ✅ Easier to refactor later
- ✅ Better TypeScript support

### 3. **React Query cho Server State Management**

#### Trước đây:
```jsx
const [analytics, setAnalytics] = useState({});
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    const response = await fetch(url);
    setAnalytics(response.data);
    setLoading(false);
  };
  loadData();
}, []);
```

#### Bây giờ:
```jsx
// Hooks/useSystemData.js
export const useSystemAnalytics = () => {
  return useQuery({
    queryKey: ['system', 'analytics'],
    queryFn: systemService.getAnalytics,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval: 1000 * 60 * 5, // Auto refetch
  });
};

// Component sử dụng
const { data, isLoading, error, refetch } = useSystemAnalytics();
```

**Lợi ích:**
- ✅ Automatic caching
- ✅ Background refetching
- ✅ Error retry logic
- ✅ Loading states handled automatically
- ✅ Optimistic updates
- ✅ Cache invalidation

## 📁 Cấu Trúc Thư Mục Mới

```
src/
├── Services/
│   ├── auth.service.js
│   ├── system.service.js         # 🆕 New
│   ├── user.service.js
│   └── index.js                  # Export all services
├── Hooks/
│   ├── useAuth.js
│   ├── useSocket.js              # 🆕 Enhanced
│   ├── useSystemData.js          # 🆕 New
│   ├── useAuthQueries.js         # 🆕 New
│   └── useSystemQueries.js       # Existing
├── Lib/
│   ├── queryClient.js            # React Query setup
│   └── apiClient.js              # Centralized API client
└── Components/
    └── Pages/
        └── SystemAnalyticsPage.jsx  # 🔄 Refactored
```

## 🚀 Cách Sử Dụng

### 1. **Sử dụng React Query Hooks**

```jsx
import { useSystemOverview } from '../Hooks/useSystemData';

function SystemAnalyticsPage() {
  const { 
    analytics, 
    health, 
    databaseStats, 
    isLoading, 
    isError, 
    error, 
    refetchAll 
  } = useSystemOverview();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <div>
      <button onClick={refetchAll}>Refresh</button>
      {/* Render data */}
    </div>
  );
}
```

### 2. **Sử dụng Service Layer**

```jsx
import { systemService } from '../Services';

// Trong component hoặc custom hook
const handleManualAction = async () => {
  try {
    const result = await systemService.backupDatabase();
    showSuccess('Backup completed');
  } catch (error) {
    showError(error.message);
  }
};
```

### 3. **Auth với React Query**

```jsx
import { useAuth } from '../Hooks/useAuthQueries';

function LoginPage() {
  const { login, isLoading } = useAuth();
  
  const handleLogin = async (email, password) => {
    try {
      await login.mutateAsync({ email, password });
      navigate('/dashboard');
    } catch (error) {
      showError(error.message);
    }
  };
}
```

## 🎯 Lợi Ích Tổng Thể

### Performance
- **Background updates**: Data tự động refresh khi cần
- **Intelligent caching**: Giảm API calls không cần thiết
- **Optimistic updates**: UI responsive hơn

### Developer Experience
- **Less boilerplate**: Không cần viết loading/error states
- **Consistency**: Tất cả API calls đều follow same pattern
- **Debugging**: React Query DevTools giúp debug dễ dàng

### Maintainability
- **Separation of concerns**: Logic API tách khỏi UI
- **Reusability**: Services có thể sử dụng ở nhiều nơi
- **Error handling**: Centralized và consistent

### Scalability
- **Easy to extend**: Thêm new endpoints chỉ cần update service
- **Cache strategies**: Flexible với different data types
- **Background sync**: Tự động sync khi user quay lại

## 📋 Migration Guidelines

### Cho Components Khác:

1. **Identify direct fetch calls**
```bash
# Tìm tất cả direct fetch calls
grep -r "fetch(" src/Pages/
grep -r "axios\." src/Pages/
```

2. **Move logic to services**
```js
// Thay vì direct fetch trong component
export const serviceMethod = async () => {
  return await apiClient.get('/endpoint');
};
```

3. **Create React Query hooks**
```js
export const useDataHook = () => {
  return useQuery({
    queryKey: ['key'],
    queryFn: serviceMethod,
    staleTime: 1000 * 60 * 5
  });
};
```

4. **Update components**
```jsx
// Thay useState + useEffect
const { data, isLoading, error } = useDataHook();
```

## 🔮 Next Steps

1. **Migrate remaining components**:
   - AuthContext → useAuthQueries
   - Other pages with direct API calls

2. **Add error boundaries** cho better error handling

3. **Implement optimistic updates** for mutations

4. **Add TypeScript** for better type safety

5. **Setup React Query DevTools** in development

## 📝 Best Practices

### Service Layer
- Always handle errors in services
- Use consistent response format
- Add proper error messages in Vietnamese

### React Query Hooks
- Use appropriate staleTime based on data nature
- Implement proper cache invalidation
- Use queryKeys consistently

### Error Handling
- Use React Query's error boundaries
- Provide meaningful error messages
- Handle network errors gracefully

### Performance
- Use background refetching for real-time data
- Implement proper loading states
- Cache frequently accessed data longer
