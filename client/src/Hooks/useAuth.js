import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

// 3. Tạo một custom hook để sử dụng Context dễ dàng hơn
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
