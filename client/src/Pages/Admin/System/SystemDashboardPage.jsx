import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FaSchool,
  FaClipboardList,
  FaUsers,
  FaServer,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import { useUI } from "../../../Hooks/useUI";
import { systemService } from "../../../Services/system.service";
import StatCard from "../../../Components/UI/StatCard";
import DashboardHeader from "../../../Components/UI/DashboardHeader";
import RecentTenantsCard from "../../../Components/UI/RecentTenantsCard";
import SystemHealthCard from "../../../Components/UI/SystemHealthCard";

const SystemDashboardPage = () => {
  const { t } = useTranslation();
  const { showError, isLoading, setLoading } = useUI();
  const [stats, setStats] = useState({
    totalTenants: 0,
    totalUsers: 0,
    systemLogs: 0,
    serverStatus: t("systemDashboard.serverStatus"),
    recentTenants: [],
    systemHealth: [],
  });

  const fetchSystemStats = async () => {
    setLoading(true);
    try {
      // Lấy dashboard stats từ API thật
      const dashboardResponse = await systemService.getDashboardStats();
      const healthResponse = await systemService.getHealth();

      // Xử lý dữ liệu từ API
      const dashboardData = dashboardResponse.data;
      const healthData = healthResponse.data;

      setStats({
        totalTenants: dashboardData.totalTenants || 0,
        totalUsers: dashboardData.totalUsers || 0,
        systemLogs: dashboardData.systemLogs || 0,
        serverStatus: healthData.status === "healthy" ? "online" : "warning",
        recentTenants: dashboardData.recentTenants || [],
        systemHealth: healthData.services || [
          { service: "systemHealth", status: "healthy", uptime: "99.9%" },
          { service: "apiServer", status: "healthy", uptime: "99.8%" },
          { service: "fileStorage", status: "healthy", uptime: "99.7%" },
          { service: "emailService", status: "warning", uptime: "98.5%" },
        ],
      });
    } catch (error) {
      console.error("Error fetching system stats:", error);
      showError(t("common.error") + ": " + error.message);

      // Fallback to mock data if API fails
      setStats({
        totalTenants: 0,
        totalUsers: 0,
        systemLogs: 0,
        serverStatus: t("common.error"),
        recentTenants: [],
        systemHealth: [
          {
            service: t("systemDashboard.systemHealth"),
            status: "error",
            uptime: "0%",
          },
          { service: "API Server", status: "error", uptime: "0%" },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader
        title={t("systemDashboard.title")}
        subtitle={t("systemDashboard.subtitle")}
        actions={[
          {
            label: t("systemDashboard.refresh"),
            icon: <FaChartBar />,
            onClick: fetchSystemStats,
            variant: "primary",
          },
          {
            label: t("systemDashboard.settings"),
            icon: <FaCog />,
            onClick: () => {
              /* Handle settings */
            },
            variant: "secondary",
          },
        ]}
      />

      {/* Khu vực thống kê */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t("systemDashboard.totalTenants")}
          value={stats.totalTenants}
          icon={<FaSchool size={24} />}
          variant="primary"
          loading={isLoading}
        />
        <StatCard
          title={t("systemDashboard.totalUsers")}
          value={stats.totalUsers.toLocaleString()}
          icon={<FaUsers size={24} />}
          variant="purple"
          loading={isLoading}
        />
        <StatCard
          title={t("systemDashboard.systemLogs")}
          value={stats.systemLogs.toLocaleString()}
          icon={<FaClipboardList size={24} />}
          variant="orange"
          loading={isLoading}
        />
        <StatCard
          title={t("systemDashboard.serverStatus")}
          value={t(`systemDashboard.${stats.serverStatus}`)}
          icon={<FaServer size={24} />}
          variant={
            stats.serverStatus === t("systemDashboard.active")
              ? "success"
              : stats.serverStatus === t("systemDashboard.pending")
              ? "warning"
              : "danger"
          }
          loading={isLoading}
        />
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentTenantsCard
          tenants={stats.recentTenants}
          loading={isLoading}
          showUsers={true}
        />

        <SystemHealthCard services={stats.systemHealth} loading={isLoading} />
      </div>
    </div>
  );
};

export default SystemDashboardPage;
