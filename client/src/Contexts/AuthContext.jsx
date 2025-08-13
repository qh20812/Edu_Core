import React, { createContext, useState, useEffect } from "react";

// API BASE URL - Sử dụng biến môi trường Vite
const API_BASE_URL = import.meta.env.VITE_API_URL;

// 1. Tạo Context
const AuthContext = createContext(null);

// Export để có thể sử dụng trong hook
export { AuthContext };

// 2. Tạo Provider Component
// Component này sẽ "bao bọc" toàn bộ ứng dụng của bạn
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tenant, setTenant] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // useEffect để lấy thông tin user nếu có token
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          // Gọi API /api/auth/me để lấy thông tin user hiện tại
          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setUser(data.data.user);
              setTenant(data.data.tenant);
              
              // Save tenant info to localStorage
              if (data.data.tenant) {
                localStorage.setItem("tenant", JSON.stringify(data.data.tenant));
              }
            } else {
              // Token không hợp lệ, xóa khỏi localStorage
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              localStorage.removeItem("tenant");
              setToken(null);
              setUser(null);
              setTenant(null);
            }
          } else {
            // Token hết hạn hoặc không hợp lệ
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("tenant");
            setToken(null);
            setUser(null);
            setTenant(null);
          }
        } catch (error) {
          console.error("Error validating token:", error);
          // Lỗi mạng, vẫn giữ user từ localStorage nếu có
          const savedUser = localStorage.getItem("user");
          const savedTenant = localStorage.getItem("tenant");
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
          if (savedTenant) {
            setTenant(JSON.parse(savedTenant));
          }
        }
      } else {
        setUser(null);
        setTenant(null);
      }
      setLoading(false);
    };

    validateToken();
  }, [token]);

  // Hàm để xử lý đăng nhập
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const { token: userToken, user: userData, tenant: tenantData } = data.data;

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userToken);
        if (tenantData) {
          localStorage.setItem("tenant", JSON.stringify(tenantData));
          setTenant(tenantData);
        }
        setUser(userData);
        setToken(userToken);

        return { success: true, user: userData, tenant: tenantData };
      } else {
        return {
          success: false,
          message: data.message || "Đăng nhập thất bại",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "Lỗi kết nối. Vui lòng thử lại sau.",
      };
    } finally {
      setLoading(false);
    }
  };

  // Hàm để xử lý đăng ký
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        return {
          success: true,
          message: data.message || "Đăng ký thành công",
        };
      } else {
        return {
          success: false,
          message: data.message || "Đăng ký thất bại",
        };
      }
    } catch (error) {
      console.error("Register error:", error);
      return {
        success: false,
        message: "Lỗi kết nối. Vui lòng thử lại sau.",
      };
    } finally {
      setLoading(false);
    }
  };

  // Hàm để xử lý đăng xuất
  const logout = async () => {
    try {
      // Gọi API logout nếu backend hỗ trợ
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Luôn xóa dữ liệu local
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("tenant");
      setUser(null);
      setToken(null);
      setTenant(null);
    }
  };

  // Kiểm tra quyền truy cập
  const hasRole = (requiredRoles) => {
    if (!user) return false;
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(user.role);
    }
    return user.role === requiredRoles;
  };

  // Giá trị sẽ được cung cấp cho toàn bộ ứng dụng
  const value = {
    user,
    tenant,
    token,
    loading,
    isLoggedIn: !!token && !!user,
    login,
    register,
    logout,
    hasRole,
    // Thông tin bổ sung về user
    isAdmin: user && ["sys_admin", "school_admin"].includes(user.role),
    isTeacher: user && user.role === "teacher",
    isStudent: user && user.role === "student",
    isParent: user && user.role === "parent",
    tenantId: user ? user.tenant_id : null,
    // Thông tin về subscription
    canAddStudents: () => {
      if (!tenant) return true; // Allow if no tenant info
      // This should be checked on backend, but we can show UI hints
      return true; // Actual check will be done on backend
    },
    subscriptionStatus: tenant ? tenant.subscription_status : null,
    planType: tenant ? tenant.plan : null,
    maxStudents: tenant ? tenant.max_students : null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
