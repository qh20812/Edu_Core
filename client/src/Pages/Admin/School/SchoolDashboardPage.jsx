import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaBook,
  FaClipboardList,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import { useUI } from "../../../Hooks/useUI";
import Button from "../../../Components/UI/Button";
import StatCard from "../../../Components/UI/StatCard";
import SectionCard from "../../../Components/UI/SectionCard";
import ListItem from "../../../Components/UI/ListItem";
import { userService, classService, assignmentService } from '../../../Services';

const SchoolDashboardPage = () => {
  const { t } = useTranslation();
  const { showError, isLoading, setLoading } = useUI();
  const [stats, setStats] = useState({
    totalTeachers: 0,
    totalStudents: 0,
    totalClasses: 0,
    totalSubjects: 0,
    pendingAssignments: 0,
    recentActivities: [],
  });

  const fetchSchoolStats = async () => {
    setLoading(true);
    try {
      // Gọi API thực để lấy thống kê trường học
      const [teachers, students, classes] = await Promise.all([
        userService.getTeachers({ count: true }),
        userService.getStudents({ count: true }), 
        classService.getAllClasses({ count: true })
      ]);

      const assignments = await assignmentService.getAllAssignments({ status: 'pending', count: true });

      // Lấy hoạt động gần đây
      const activities = await userService.getRecentActivities({ limit: 5 });

      setStats({
        totalTeachers: teachers?.data?.total || 0,
        totalStudents: students?.data?.total || 0,
        totalClasses: classes?.data?.total || 0,
        totalSubjects: 15, // Có thể thêm API cho subjects sau
        pendingAssignments: assignments?.data?.total || 0,
        recentActivities: activities?.data || []
      });
    } catch (error) {
      console.error('Error fetching school stats:', error);
      showError("Không thể tải thống kê trường học: " + error.message);
      
      // Fallback với mock data nếu API lỗi
      setStats({
        totalTeachers: 45,
        totalStudents: 512,
        totalClasses: 18,
        totalSubjects: 15,
        pendingAssignments: 23,
        recentActivities: [
          {
            action: `Giáo viên Nguyễn Văn A tạo bài tập ${t("subject.math")} mới`,
            time: "2 phút trước",
            type: "assignment",
          },
          {
            action: `Học sinh Trần Thị B nộp bài tập ${t("subject.literature")}`,
            time: "5 phút trước",
            type: "submission",
          },
          {
            action: "Lớp 10A1 được tạo mới",
            time: "1 giờ trước",
            type: "class",
          },
          {
            action: `Giáo viên Lê Văn C cập nhật điểm ${t("subject.english")}`,
            time: "15 phút trước",
            type: "grading",
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchoolStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-blue-600 text-shadow-2xs">
            {t("schoolDashboard.title")}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {t("schoolDashboard.subtitle")}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={fetchSchoolStats} variant="accent" disabled={isLoading}>
            <FaChartLine className="inline mr-2" />
            {t("schoolDashboard.refresh")}
          </Button>
          <Button variant="secondary">
            <FaCog className="inline mr-2" />
            {t("schoolDashboard.settings")}
          </Button>
        </div>
      </div>

      {/* Khu vực thống kê */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          title={t("schoolDashboard.totalTeachers")}
          value={stats.totalTeachers}
          icon={<FaChalkboardTeacher size={24} />}
          variant="accent"
          loading={isLoading}
        />
        <StatCard
          title={t("schoolDashboard.totalStudents")}
          value={stats.totalStudents}
          icon={<FaUsers size={24} />}
          variant="info"
          loading={isLoading}
        />
        <StatCard
          title={t("schoolDashboard.totalClasses")}
          value={stats.totalClasses}
          icon={<FaBook size={24} />}
          variant="success"
          loading={isLoading}
        />
        <StatCard
          title={t("schoolDashboard.totalSubjects")}
          value={stats.totalSubjects}
          icon={<FaClipboardList size={24} />}
          variant="pink"
          loading={isLoading}
        />
        <StatCard
          title={t("schoolDashboard.pendingAssignments")}
          value={stats.pendingAssignments}
          icon={<FaClipboardList size={24} />}
          variant="orange"
          loading={isLoading}
        />
      </div>

      {/* Quick Actions */}
      <SectionCard
        title={t("schoolDashboard.quickActions")}
        subtitle={t("schoolDashboard.quickActionsSubtitle")}
        icon={<FaCog size={20} className="text-gray-600" />}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <button className="p-4 text-left transition-colors rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30">
            <div className="flex items-center space-x-3">
              <FaUsers className="text-xl text-blue-600" />
              <span className="font-medium text-blue-700 dark:text-blue-300">
                {t("schoolDashboard.addStudent")}
              </span>
            </div>
          </button>
          <button className="p-4 text-left transition-colors rounded-lg bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30">
            <div className="flex items-center space-x-3">
              <FaChalkboardTeacher className="text-xl text-green-600" />
              <span className="font-medium text-green-700 dark:text-green-300">
                {t("schoolDashboard.addTeacher")}
              </span>
            </div>
          </button>
          <button className="p-4 text-left transition-colors rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30">
            <div className="flex items-center space-x-3">
              <FaBook className="text-xl text-purple-600" />
              <span className="font-medium text-purple-700 dark:text-purple-300">
                {t("schoolDashboard.createClass")}
              </span>
            </div>
          </button>
          <button className="p-4 text-left transition-colors rounded-lg bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/30">
            <div className="flex items-center space-x-3">
              <FaClipboardList className="text-xl text-orange-600" />
              <span className="font-medium text-orange-700 dark:text-orange-300">
                {t("schoolDashboard.viewReports")}
              </span>
            </div>
          </button>
        </div>
      </SectionCard>

      {/* Recent Activities */}
      <SectionCard
        title={t("schoolDashboard.recentActivities")}
        subtitle={t("schoolDashboard.recentActivitiesSubtitle")}
        icon={<FaClipboardList size={20} className="text-blue-600" />}
      >
        <div className="space-y-3">
          {stats.recentActivities.map((activity, index) => (
            <ListItem
              key={index}
              title={activity.action}
              status={{
                type: 'text',
                variant: 'info',
                label: activity.time
              }}
              icon={
                activity.type === 'assignment' ? (
                  <FaClipboardList className="text-blue-600" />
                ) : activity.type === 'submission' ? (
                  <FaBook className="text-green-600" />
                ) : activity.type === 'grading' ? (
                  <FaChartLine className="text-orange-600" />
                ) : (
                  <FaUsers className="text-purple-600" />
                )
              }
            />
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default SchoolDashboardPage;
