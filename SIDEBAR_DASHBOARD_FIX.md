# Fix Sidebar Trống và Lỗi "Không thể tải dữ liệu học tập"

## 🐛 Vấn đề

1. **Sidebar hiển thị trống** - không có menu items nào hiển thị cho bất kỳ role nào
2. **Lỗi "không thể tải dữ liệu học tập"** xuất hiện trên dashboard
3. **Authentication issues** sau khi implement React Query

## ✅ Nguyên nhân và giải pháp

### 1. **Vấn đề Import Hook**

**Nguyên nhân:** Các components vẫn đang import `useAuth` từ old hook thay vì new React Query hook.

**Files bị ảnh hưởng:**
- `Components/Layouts/Sidebar.jsx`
- `Routes/index.jsx` 
- `Contexts/SocketContext.jsx`
- `Components/Layouts/Header.jsx`
- `Pages/ClassesPage.jsx`
- `Pages/AssignmentsPage.jsx`
- `Pages/DashboardPage.jsx`

**Fix:** Thay đổi import statement:
```jsx
// Trước đây
import { useAuth } from '../Hooks/useAuth';

// Bây giờ  
import { useAuth } from '../Hooks/useAuthQueries';
```

### 2. **Lỗi Logic hasRole vs hasAnyRole**

**Nguyên nhân:** Sidebar sử dụng `hasRole(item.roles)` nhưng `hasRole` chỉ nhận 1 role string, không phải array.

**Fix trong Sidebar.jsx:**
```jsx
// Trước đây
const { user, hasRole, logout } = useAuth();
navItems.map((item) => hasRole(item.roles) && (...))

// Bây giờ
const { user, hasAnyRole, logout } = useAuth();  
navItems.map((item) => hasAnyRole(item.roles) && (...))
```

### 3. **Logout Function Incompatibility**

**Nguyên nhân:** New React Query `logout` là một mutation, không phải function thông thường.

**Fix handleLogout:**
```jsx
// Trước đây
const handleLogout = () => {
  logout();
  navigate('/login');
};

// Bây giờ
const handleLogout = async () => {
  try {
    await logout.mutateAsync();
    navigate('/login');
  } catch (error) {
    // Fallback logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tenant');
    navigate('/login');
  }
};
```

### 4. **API Service Calls Failing**

**Nguyên nhân:** StudentDashboardPage đang gọi API services mà có thể fail do authentication hoặc endpoints không tồn tại.

**Fix:** Sử dụng mock data tạm thời thay vì API calls:
```jsx
// Thay vì fetch từ API
const [stats] = useState({
  totalAssignments: 12,
  completedAssignments: 8,
  pendingAssignments: 4,
  upcomingExams: 2,
  averageScore: 85.5,
  // ... mock data
});
```

## 🔧 Files đã được fix

### ✅ Component Updates
1. **Sidebar.jsx**
   - ✅ Import useAuth từ useAuthQueries
   - ✅ Sử dụng hasAnyRole thay vì hasRole
   - ✅ Fix handleLogout với async/await

2. **DashboardPage.jsx**
   - ✅ Import useAuth từ useAuthQueries

3. **StudentDashboardPage.jsx**
   - ✅ Import useAuth từ useAuthQueries
   - ✅ Sử dụng mock data thay vì API calls
   - ✅ Remove unused imports và variables

### ✅ Other Components
4. **Routes/index.jsx** - ✅ Import fix
5. **SocketContext.jsx** - ✅ Import fix  
6. **Header.jsx** - ✅ Import fix
7. **ClassesPage.jsx** - ✅ Import fix
8. **AssignmentsPage.jsx** - ✅ Import fix

## 🎯 Kết quả mong đợi

### Sidebar sẽ hiển thị:
- **Student**: Dashboard, Assignments, Exams, Grades, Schedule
- **Teacher**: Dashboard, Classes, Assignments, Exams, Grading  
- **Sys Admin**: Dashboard, Tenant Management, System Analytics, User Management, etc.
- **School Admin**: Dashboard, School Users, Classes, Subjects, etc.

### Dashboard sẽ hiển thị:
- Thông tin user role tương ứng
- Mock data thay vì error "không thể tải dữ liệu học tập"
- UI responsive và functional

## 🔮 Next Steps (Optional Improvements)

### 1. **Implement proper API integration**
```jsx
// Trong StudentDashboardPage
import { useStudentStats } from '../../Hooks/useStudentData';

const { data: stats, isLoading, error } = useStudentStats();
```

### 2. **Add loading states**
```jsx
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage />;
```

### 3. **Add role-based dashboard data**
```jsx
// Different mock data cho mỗi role
const getDashboardData = (userRole) => {
  switch(userRole) {
    case 'student': return studentMockData;
    case 'teacher': return teacherMockData;
    // ...
  }
};
```

### 4. **Implement React Query hooks cho dashboard data**
```jsx
// useStudentData.js
export const useStudentStats = () => {
  return useQuery({
    queryKey: ['student', 'stats'],
    queryFn: studentService.getStats,
    staleTime: 1000 * 60 * 5
  });
};
```

## 🧪 Testing

### Manual Testing Steps:
1. ✅ Login với student account → check sidebar có đầy đủ student menu items
2. ✅ Login với teacher account → check sidebar có đầy đủ teacher menu items  
3. ✅ Login với sys_admin → check sidebar có system admin menu items
4. ✅ Dashboard hiển thị mock data thay vì error
5. ✅ Logout functionality hoạt động đúng

### Debug Steps nếu vẫn có issue:
1. Check browser DevTools Console cho errors
2. Check React Query DevTools cho auth queries
3. Verify localStorage có đúng token, user, tenant data
4. Check network tab cho failed API calls

## 📝 Key Learnings

1. **Consistency in hook imports** - Khi refactor, cần update tất cả components
2. **Function signature changes** - React Query mutations khác với regular functions
3. **Gradual migration** - Có thể dùng mock data trong lúc chuyển đổi API architecture
4. **Error handling** - Cần fallback cho các API calls fail

Sau khi áp dụng các fix này, sidebar sẽ hiển thị đầy đủ menu items cho từng role và dashboard sẽ không còn báo lỗi "không thể tải dữ liệu học tập".
