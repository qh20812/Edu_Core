import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaBook,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";
import { useAuth } from "../../Hooks/useAuthQueries";
import {
  StatsLoadingSkeleton,
  ListLoadingSkeleton,
} from "../../Components/UI/Loading";
import Button from "../../Components/UI/Button";
import StatCard from "../../Components/UI/StatCard";
import SectionCard from "../../Components/UI/SectionCard";
import ListItem from "../../Components/UI/ListItem";
import DashboardHeader from "../../Components/UI/DashboardHeader";

const StudentDashboardPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  // Sử dụng mock data tạm thời thay vì API call
  const [stats] = useState({
    totalAssignments: 12,
    completedAssignments: 8,
    pendingAssignments: 4,
    upcomingExams: 2,
    averageScore: 85.5,
    recentGrades: [
      { subject: "Toán học", score: 88, date: "2024-01-15" },
      { subject: "Vật lý", score: 92, date: "2024-01-14" },
      { subject: "Hóa học", score: 79, date: "2024-01-13" },
    ],
    upcomingDeadlines: [
      {
        title: "Bài tập Toán - Chương 3",
        dueDate: "2024-01-20",
        subject: "Toán học"
      },
      {
        title: "Thí nghiệm Vật lý",
        dueDate: "2024-01-22", 
        subject: "Vật lý"
      }
    ],
    todaySchedule: [
      {
        subject: "Toán học",
        teacher: "Nguyễn Văn A",
        room: "101",
        time: "7:00 - 7:45"
      },
      {
        subject: "Vật lý", 
        teacher: "Trần Thị B",
        room: "102",
        time: "8:00 - 8:45"
      }
    ]
  });

  const [loading] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <DashboardHeader
        title={t("dashboard.welcome", "Chào mừng") + `, ${user?.full_name || "Học sinh"}!`}
        subtitle={t("dashboard.student.subtitle", "Tổng quan về quá trình học tập của bạn")}
        titleClassName="text-3xl font-bold text-gray-900 dark:text-white"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <StatsLoadingSkeleton cards={4} />
        ) : (
          <>
            <StatCard
              title={t("dashboard.totalAssignments", "Tổng bài tập")}
              value={stats.totalAssignments}
              icon={<FaClipboardList />}
              color="blue"
            />
            <StatCard
              title={t("dashboard.completedAssignments", "Đã hoàn thành")}
              value={stats.completedAssignments}
              icon={<FaCheckCircle />}
              color="green"
            />
            <StatCard
              title={t("dashboard.pendingAssignments", "Đang chờ")}
              value={stats.pendingAssignments}
              icon={<FaClock />}
              color="yellow"
            />
            <StatCard
              title={t("dashboard.upcomingExams", "Kỳ thi sắp tới")}
              value={stats.upcomingExams}
              icon={<FaBook />}
              color="red"
            />
          </>
        )}
      </div>

      {/* Recent Grades and Upcoming Deadlines */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Grades */}
        <SectionCard
          title={t("dashboard.recentGrades", "Điểm số gần đây")}
          subtitle={t("dashboard.recentGrades.subtitle", "Kết quả học tập mới nhất")}
          icon={<FaChartLine className="text-blue-600" />}
        >
          {loading ? (
            <ListLoadingSkeleton items={3} />
          ) : (
            <div className="space-y-3">
              {stats.recentGrades.map((grade, index) => (
                <ListItem
                  key={index}
                  title={grade.subject}
                  subtitle={new Date(grade.date).toLocaleDateString('vi-VN')}
                  value={`${grade.score}/100`}
                  status={grade.score >= 80 ? "success" : grade.score >= 70 ? "warning" : "danger"}
                />
              ))}
            </div>
          )}
        </SectionCard>

        {/* Upcoming Deadlines */}
        <SectionCard
          title={t("dashboard.upcomingDeadlines", "Hạn nộp sắp tới")}
          subtitle={t("dashboard.upcomingDeadlines.subtitle", "Các bài tập cần hoàn thành")}
          icon={<FaCalendarAlt className="text-red-600" />}
        >
          {loading ? (
            <ListLoadingSkeleton items={3} />
          ) : (
            <div className="space-y-3">
              {stats.upcomingDeadlines.map((deadline, index) => (
                <ListItem
                  key={index}
                  title={deadline.title}
                  subtitle={deadline.subject}
                  value={new Date(deadline.dueDate).toLocaleDateString('vi-VN')}
                  status="warning"
                />
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      {/* Today's Schedule */}
      <SectionCard
        title={t("dashboard.todaySchedule", "Lịch học hôm nay")}
        subtitle={t("dashboard.todaySchedule.subtitle", "Các tiết học trong ngày")}
        icon={<FaCalendarAlt className="text-green-600" />}
      >
        {loading ? (
          <ListLoadingSkeleton items={4} />
        ) : (
          <div className="space-y-3">
            {stats.todaySchedule.map((schedule, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                    <FaBook className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {schedule.subject}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {schedule.teacher} • Phòng {schedule.room}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {schedule.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
};

export default StudentDashboardPage;
