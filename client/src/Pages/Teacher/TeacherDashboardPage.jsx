import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FaBook,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaPlus,
  FaEye,
  FaClock,
} from "react-icons/fa";
import { useUI } from "../../Hooks/useUI";
import {
  classService,
  assignmentService,
  submissionService,
} from "../../Services";
import Button from "../../Components/UI/Button";
import StatCard from "../../Components/UI/StatCard";
import SectionCard from "../../Components/UI/SectionCard";
import ListItem from "../../Components/UI/ListItem";
import DashboardHeader from "../../Components/UI/DashboardHeader";

const TeacherDashboardPage = () => {
  const { t } = useTranslation();
  const { showError, isLoading, setLoading } = useUI();
  const [stats, setStats] = useState({
    myClasses: 0,
    myAssignments: 0,
    pendingGrading: 0,
    totalStudents: 0,
    recentSubmissions: [],
    upcomingDeadlines: [],
  });

  const fetchTeacherStats = async () => {
    setLoading(true);
    try {
      // Gọi API để lấy thống kê của giáo viên
      const [classesResult, assignmentsResult, submissionsResult] =
        await Promise.all([
          classService.getAllClasses("?teacher=current"),
          assignmentService.getAllAssignments("?teacher=current"),
          submissionService.getAllSubmissions(
            "?status=submitted&teacher=current"
          ),
        ]);

      const myClasses = classesResult.data || [];
      const myAssignments = assignmentsResult.data || [];
      const pendingSubmissions = submissionsResult.data || [];

      // Tính tổng số học sinh
      const totalStudents = myClasses.reduce(
        (total, cls) => total + (cls.studentCount || 0),
        0
      );

      // Lấy các bài nộp gần đây (chưa chấm điểm)
      const recentSubmissions = pendingSubmissions
        .filter((sub) => !sub.grade || sub.grade === 0)
        .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
        .slice(0, 5)
        .map((sub) => {
          const assignment = myAssignments.find(
            (a) => a._id === sub.assignmentId
          );
          const studentClass = myClasses.find((c) =>
            c.students?.includes(sub.studentId)
          );
          return {
            student: sub.studentName || t("teacherDashboard.student"),
            assignment: assignment?.title || t("teacherDashboard.exercise"),
            time: formatTimeAgo(sub.submittedAt),
            class: studentClass?.name || t("common.unknown"),
          };
        });

      // Lấy deadline sắp tới
      const upcomingDeadlines = myAssignments
        .filter((a) => new Date(a.dueDate) > new Date())
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5)
        .map((a) => {
          const assignmentClass = myClasses.find((c) => c._id === a.classId);
          return {
            assignment: a.title,
            date: a.dueDate,
            class: assignmentClass?.name || t("common.unknown"),
          };
        });

      setStats({
        myClasses: myClasses.length,
        myAssignments: myAssignments.length,
        pendingGrading: pendingSubmissions.filter(
          (sub) => !sub.grade || sub.grade === 0
        ).length,
        totalStudents,
        recentSubmissions,
        upcomingDeadlines,
      });
    } catch (error) {
      console.error("Error fetching teacher stats:", error);
      showError(t("common.error") + ": " + error.message);
      // Fallback to empty data on error
      setStats({
        myClasses: 0,
        myAssignments: 0,
        pendingGrading: 0,
        totalStudents: 0,
        recentSubmissions: [],
        upcomingDeadlines: [],
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function để format thời gian
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return t("teacherDashboard.justNow");
    if (diffInMinutes < 60)
      return `${diffInMinutes} ${t("teacherDashboard.minutesAgo")}`;
    if (diffInMinutes < 1440)
      return `${Math.floor(diffInMinutes / 60)} ${t(
        "teacherDashboard.hoursAgo"
      )}`;
    return `${Math.floor(diffInMinutes / 1440)} ${t(
      "teacherDashboard.daysAgo"
    )}`;
  };

  useEffect(() => {
    fetchTeacherStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader
        title={t("teacherDashboard.title")}
        subtitle={t("teacherDashboard.subtitle")}
        actions={[
          {
            label: t("teacherDashboard.addhomework"),
            icon: <FaPlus />,
            onClick: () => {/* Handle add homework */},
            variant: 'primary'
          },
          {
            label: t("teacherDashboard.viewClass"),
            icon: <FaEye />,
            onClick: () => {/* Handle view class */},
            variant: 'secondary'
          }
        ]}
      />

      {/* Khu vực thống kê */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t("teacherDashboard.myClass")}
          value={stats.myClasses}
          icon={<FaBook size={24} />}
          variant="info"
          loading={isLoading}
        />
        <StatCard
          title={t("teacherDashboard.myAssignments")}
          value={stats.myAssignments}
          icon={<FaClipboardList size={24} />}
          variant="purple"
          loading={isLoading}
        />
        <StatCard
          title={t("teacherDashboard.assignmentsPending")}
          value={stats.pendingGrading}
          icon={<FaChartBar size={24} />}
          variant="orange"
          loading={isLoading}
        />
        <StatCard
          title={t("teacherDashboard.totalStudents")}
          value={stats.totalStudents}
          icon={<FaUsers size={24} />}
          variant="success"
          loading={isLoading}
        />
      </div>

      {/* Nội dung chính */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Bài nộp gần đây */}
        <SectionCard
          title={t("teacherDashboard.recentSubmission")}
          subtitle={t("teacherDashboard.subtitle-recentSub")}
          icon={<FaClipboardList size={20} className="text-blue-600" />}
          className="lg:col-span-2"
          actions={
            <Button size="sm" variant="outline">
              {t("teacherDashboard.viewAllSubmissions")}
            </Button>
          }
        >
          <div className="space-y-3">
            {stats.recentSubmissions.map((submission, index) => (
              <ListItem
                key={index}
                title={submission.student}
                subtitle={submission.assignment}
                meta={`${t("teacherDashboard.class")}: ${submission.class}`}
                status={{
                  type: 'text',
                  variant: 'info',
                  label: submission.time
                }}
                actions={
                  <Button size="sm">
                    {t("teacherDashboard.gradeSubmission")}
                  </Button>
                }
              />
            ))}
          </div>
        </SectionCard>

        {/* Deadline sắp tới */}
        <SectionCard
          title={t("teacherDashboard.deadline")}
          subtitle={t("teacherDashboard.deadlineSubtitle")}
          icon={<FaClock size={20} className="text-orange-600" />}
        >
          <div className="space-y-3">
            {stats.upcomingDeadlines.map((deadline, index) => (
              <ListItem
                key={index}
                title={deadline.assignment}
                subtitle={`${t("teacherDashboard.class")}: ${deadline.class}`}
                status={{
                  type: 'text',
                  variant: 'warning',
                  label: new Date(deadline.date).toLocaleDateString("vi-VN")
                }}
                className="border-l-4 border-warning bg-warning/5 dark:bg-warning/20"
              />
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Lớp học của tôi */}
      <SectionCard
        title={t("teacherDashboard.myClass")}
        subtitle={t("teacherDashboard.myClassSubtitle")}
        icon={<FaBook size={20} className="text-green-600" />}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "12A1",
              subject: t("subject.math"),
              students: 35,
              assignments: 5,
            },
            {
              name: "11B2",
              subject: t("subject.literature"),
              students: 32,
              assignments: 3,
            },
            {
              name: "10C1",
              subject: t("subject.english"),
              students: 38,
              assignments: 4,
            },
            {
              name: "12A2",
              subject: t("subject.math"),
              students: 33,
              assignments: 5,
            },
            {
              name: "11A1",
              subject: t("subject.literature"),
              students: 36,
              assignments: 2,
            },
          ].map((classItem, index) => (
            <div
              key={index}
              className="p-4 transition-shadow rounded-lg cursor-pointer bg-gray-50 dark:bg-slate-700 hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground">
                  {classItem.name}
                </h3>
                <span className="px-2 py-1 text-xs rounded text-primary bg-primary/10 dark:bg-primary/20 dark:text-primary">
                  {classItem.subject}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  {classItem.students} {t("teacherDashboard.student")}
                </p>
                <p>
                  {classItem.assignments} {t("teacherDashboard.exercise")}
                </p>
              </div>
              <Button size="sm" className="w-full mt-3">
                {t("teacherDashboard.enterClass")}
              </Button>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default TeacherDashboardPage;
