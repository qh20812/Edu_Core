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
            } else {
              // Token không hợp lệ, xóa khỏi localStorage
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setToken(null);
              setUser(null);
            }
          } else {
            // Token hết hạn hoặc không hợp lệ
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error("Error validating token:", error);
          // Lỗi mạng, vẫn giữ user từ localStorage nếu có
          const savedUser = localStorage.getItem("user");
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
      } else {
        setUser(null);
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
        const { token: userToken, user: userData } = data.data;

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userToken);
        setUser(userData);
        setToken(userToken);

        return { success: true, user: userData };
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
      setUser(null);
      setToken(null);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
