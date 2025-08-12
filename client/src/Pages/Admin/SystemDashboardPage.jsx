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
import { useUI } from "../../Hooks/useUI";
import Button from "../../Components/UI/Button";
import StatCard from "../../Components/UI/StatCard";
import SectionCard from "../../Components/UI/SectionCard";
import ListItem from "../../Components/UI/ListItem";
// import { tenantService, userService } from '../../../Services';

const SystemDashboardPage = () => {
  const { t } = useTranslation();
  const { showError, isLoading, setLoading } = useUI();
  const [stats, setStats] = useState({
    totalTenants: 0,
    totalUsers: 0,
    systemLogs: 0,
    serverStatus: "Online",
  });

  const fetchSystemStats = async () => {
    setLoading(true);
    try {
      // Gọi API để lấy thống kê hệ thống
      // const tenantStats = await tenantService.getTenantStatistics();
      // const userStats = await userService.getAllUsers('?count=true');

      // Temporary mock data - thay thế bằng real API calls
      setTimeout(() => {
        setStats({
          totalTenants: 12,
          totalUsers: 1482,
          systemLogs: 5231,
          serverStatus: "Online",
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      showError("Không thể tải thống kê hệ thống: " + error.message);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-blue-600 text-shadow-2xs">
            {t("systemDashboard.title")}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {t("systemDashboard.subtitle")}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={fetchSystemStats} variant="primary">
            <FaChartBar className="inline mr-2" />
            {t("systemDashboard.refresh")}
          </Button>
          <Button variant="secondary">
            <FaCog className="inline mr-2" />
            {t("systemDashboard.settings")}
          </Button>
        </div>
      </div>

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
          variant="accent"
          loading={isLoading}
        />
        <StatCard
          title={t("systemDashboard.systemLogs")}
          value={stats.systemLogs.toLocaleString()}
          icon={<FaClipboardList size={24} />}
          variant="warning"
          loading={isLoading}
        />
        <StatCard
          title={t("systemDashboard.serverStatus")}
          value={stats.serverStatus}
          icon={<FaServer size={24} />}
          variant="success"
          loading={isLoading}
        />
      </div>
      {/* Các component khác cho sys_admin */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Bảng quản lý Tenants */}
        <SectionCard
          title={t("systemDashboard.recentSchools")}
          subtitle={t("systemDashboard.recentSchoolsSubtitle")}
          icon={<FaSchool size={20} className="text-blue-600" />}
        >
          <div className="space-y-3">
            {/* Mock data - thay thế bằng real data */}
            {[
              { name: "THPT Nguyễn Huệ", status: "active", users: 245 },
              { name: "THCS Lê Lợi", status: "active", users: 189 },
              { name: "TH Trần Hưng Đạo", status: "pending", users: 67 },
            ].map((school, index) => (
              <ListItem
                key={index}
                title={school.name}
                subtitle={`${school.users} ${t("systemDashboard.users")}`}
                status={{
                  type: 'badge',
                  variant: school.status === "active" ? 'success' : 'warning',
                  label: school.status === "active" ? t("systemDashboard.active") : t("systemDashboard.pending")
                }}
              />
            ))}
          </div>
        </SectionCard>

        {/* System Health */}
        <SectionCard
          title={t("systemDashboard.systemHealth")}
          subtitle={t("systemDashboard.systemHealthSubtitle")}
          icon={<FaServer size={20} className="text-green-600" />}
        >
          <div className="space-y-4">
            {[
              { service: "Database", status: "healthy", uptime: "99.9%" },
              { service: "API Server", status: "healthy", uptime: "99.8%" },
              { service: "File Storage", status: "healthy", uptime: "99.7%" },
              { service: "Email Service", status: "warning", uptime: "98.5%" },
            ].map((service, index) => (
              <ListItem
                key={index}
                icon={
                  <div
                    className={`w-3 h-3 rounded-full ${
                      service.status === "healthy"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                }
                title={service.service}
                status={{
                  type: 'text',
                  variant: 'info',
                  label: service.uptime
                }}
              />
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default SystemDashboardPage;
