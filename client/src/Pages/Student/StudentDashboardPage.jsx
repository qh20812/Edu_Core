import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FaBook,
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";
import { useUI } from "../../Hooks/useUI";
import {
  assignmentService,
  submissionService,
  examService,
} from "../../Services";
import {
  StatsLoadingSkeleton,
  ListLoadingSkeleton,
} from "../../Components/UI/Loading";
import Button from "../../Components/UI/Button";
import StatCard from "../../Components/UI/StatCard";
import SectionCard from "../../Components/UI/SectionCard";
import ListItem from "../../Components/UI/ListItem";

const StudentDashboardPage = () => {
  const { t } = useTranslation();
  const { showError, isLoading, setLoading } = useUI();
  const [stats, setStats] = useState({
    totalAssignments: 0,
    completedAssignments: 0,
    pendingAssignments: 0,
    upcomingExams: 0,
    averageScore: 0,
    recentGrades: [],
    upcomingDeadlines: [],
    todaySchedule: [],
  });

  const fetchStudentStats = async () => {
    setLoading(true);
    try {
      // Gọi API để lấy thống kê của học sinh
      const [assignmentsResult, submissionsResult, examsResult] =
        await Promise.all([
          assignmentService.getAllAssignments("?student=current"),
          submissionService.getSubmissionsByStudent("current"),
          examService.getAllExams("?student=current&upcoming=true"),
        ]);

      // Xử lý dữ liệu từ API
      const assignments = assignmentsResult.data || [];
      const submissions = submissionsResult.data || [];
      const upcomingExams = examsResult.data || [];

      // Tính toán thống kê
      const totalAssignments = assignments.length;
      const completedAssignments = assignments.filter((assignment) =>
        submissions.some(
          (sub) =>
            sub.assignmentId === assignment._id && sub.status === "submitted"
        )
      ).length;
      const pendingAssignments = totalAssignments - completedAssignments;

      // Tính điểm trung bình
      const gradedSubmissions = submissions.filter(
        (sub) => sub.grade && sub.grade > 0
      );
      const averageScore =
        gradedSubmissions.length > 0
          ? gradedSubmissions.reduce((sum, sub) => sum + sub.grade, 0) /
            gradedSubmissions.length
          : 0;

      // Lấy điểm gần đây (3 điểm mới nhất)
      const recentGrades = gradedSubmissions
        .sort(
          (a, b) =>
            new Date(b.gradedAt || b.submittedAt) -
            new Date(a.gradedAt || a.submittedAt)
        )
        .slice(0, 3)
        .map((sub) => {
          const assignment = assignments.find(
            (a) => a._id === sub.assignmentId
          );
          return {
            subject: assignment?.subject || "Không xác định",
            assignment: assignment?.title || "Bài tập",
            score: sub.grade,
            date: sub.gradedAt || sub.submittedAt,
          };
        });

      // Lấy deadline sắp tới
      const upcomingDeadlines = [
        ...assignments
          .filter(
            (a) =>
              new Date(a.dueDate) > new Date() &&
              !submissions.some(
                (sub) =>
                  sub.assignmentId === a._id && sub.status === "submitted"
              )
          )
          .map((a) => ({
            subject: a.subject,
            assignment: a.title,
            deadline: a.dueDate,
            type: "assignment",
          })),
        ...upcomingExams.map((e) => ({
          subject: e.subject,
          assignment: e.title,
          deadline: e.examDate,
          type: "exam",
        })),
      ]
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 5);

      setStats({
        totalAssignments,
        completedAssignments,
        pendingAssignments,
        upcomingExams: upcomingExams.length,
        averageScore,
        recentGrades,
        upcomingDeadlines,
        todaySchedule: [
          {
            subject: t("subject.math"),
            teacher: "Nguyễn Văn A",
            room: "101",
            time: "7:30 - 8:15"
          },
          {
            subject: t("subject.literature"),
            teacher: "Trần Thị B",
            room: "102",
            time: "8:15 - 9:00"
          },
          {
            subject: t("subject.english"),
            teacher: "Lê Văn C",
            room: "103",
            time: "9:15 - 10:00"
          },
          {
            subject: t("subject.physics"),
            teacher: "Phạm Thị D",
            room: "104",
            time: "10:00 - 10:45"
          }
        ]
      });
    } catch (error) {
      console.error("Error fetching student stats:", error);
      showError("Không thể tải thông tin học tập: " + error.message);
      // Fallback to mock data on error
      setStats({
        totalAssignments: 0,
        completedAssignments: 0,
        pendingAssignments: 0,
        upcomingExams: 0,
        averageScore: 0,
        recentGrades: [],
        upcomingDeadlines: [],
        todaySchedule: [
          {
            subject: t("subject.math"),
            teacher: "Nguyễn Văn A",
            room: "101",
            time: "7:30 - 8:15"
          },
          {
            subject: t("subject.literature"),
            teacher: "Trần Thị B", 
            room: "102",
            time: "8:15 - 9:00"
          }
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const completionRate =
    stats.totalAssignments > 0
      ? Math.round((stats.completedAssignments / stats.totalAssignments) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-blue-600 text-shadow-2xs">
            {t("studentDashboard.title")}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {t("studentDashboard.subtitle")}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="primary">
            <FaBook className="inline mr-2" />
            {t("studentDashboard.viewAssignments")}
          </Button>
          <Button variant="accent">
            <FaCalendarAlt className="inline mr-2" />
            {t("studentDashboard.schedule")}
          </Button>
        </div>
      </div>

      {/* Khu vực thống kê */}
      {isLoading ? (
        <StatsLoadingSkeleton count={5} />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          <StatCard
            title={t("studentDashboard.totalAssignments")}
            value={stats.totalAssignments}
            icon={<FaClipboardList size={24} />}
            variant="primary"
          />
          <StatCard
            title={t("studentDashboard.completedAssignments")}
            value={stats.completedAssignments}
            icon={<FaCheckCircle size={24} />}
            variant="success"
          />
          <StatCard
            title={t("studentDashboard.pendingAssignments")}
            value={stats.pendingAssignments}
            icon={<FaClock size={24} />}
            variant="orange"
          />
          <StatCard
            title={t("studentDashboard.upcomingExams")}
            value={stats.upcomingExams}
            icon={<FaCalendarAlt size={24} />}
            variant="danger"
          />
          <StatCard
            title={t("studentDashboard.averageScore")}
            value={stats.averageScore.toFixed(1)}
            icon={<FaChartLine size={24} />}
            variant="purple"
          />
        </div>
      )}

      {/* Progress Bar */}
      <SectionCard
        title={t("studentDashboard.progressTitle")}
        subtitle={`${stats.completedAssignments} / ${
          stats.totalAssignments
        } ${t("studentDashboard.progressSubtitle")}`}
        icon={<FaChartLine size={20} className="text-green-600" />}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-primary">
            {completionRate}%
          </span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="h-3 transition-all duration-500 rounded-full bg-primary"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </SectionCard>

      {/* Nội dung chính */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Thời khóa biểu hôm nay */}
        <SectionCard
          title={t("studentDashboard.todaySchedule")}
          subtitle={t("studentDashboard.todayScheduleSubtitle")}
          icon={<FaCalendarAlt size={20} className="text-blue-600" />}
        >
          {isLoading ? (
            <ListLoadingSkeleton rows={4} />
          ) : (
            <div className="space-y-3">
              {stats.todaySchedule.map((schedule, index) => (
                <ListItem
                  key={index}
                  title={schedule.subject}
                  subtitle={schedule.teacher}
                  meta={`${t("studentDashboard.room")}: ${schedule.room}`}
                  status={{
                    type: 'text',
                    variant: 'primary',
                    label: schedule.time
                  }}
                  className="border-l-4 border-primary bg-primary/5 dark:bg-primary/10"
                />
              ))}
            </div>
          )}
        </SectionCard>

        {/* Deadline sắp tới */}
        <SectionCard
          title={t("studentDashboard.upcomingDeadlines")}
          subtitle={t("studentDashboard.upcomingDeadlinesSubtitle")}
          icon={<FaClock size={20} className="text-orange-600" />}
        >
          <div className="space-y-3">
            {stats.upcomingDeadlines.map((deadline, index) => (
              <ListItem
                key={index}
                title={deadline.assignment}
                subtitle={deadline.subject}
                meta={
                  <span
                    className={`text-xs px-2 py-1 rounded inline-block ${
                      deadline.type === "exam"
                        ? "bg-danger/10 text-danger dark:bg-danger/20 dark:text-danger"
                        : "bg-warning/10 text-warning dark:bg-warning/20 dark:text-warning"
                    }`}
                  >
                    {deadline.type === "exam"
                      ? t("studentDashboard.exam")
                      : t("studentDashboard.assignment")}
                  </span>
                }
                status={{
                  type: 'text',
                  variant: deadline.type === "exam" ? 'danger' : 'warning',
                  label: new Date(deadline.deadline).toLocaleDateString("vi-VN")
                }}
                className={`border-l-4 ${
                  deadline.type === "exam"
                    ? "bg-danger/5 dark:bg-danger/10 border-danger"
                    : "bg-warning/5 dark:bg-warning/10 border-warning"
                }`}
              />
            ))}
          </div>
        </SectionCard>

        {/* Điểm số gần đây */}
        <SectionCard
          title={t("studentDashboard.recentGrades")}
          subtitle={t("studentDashboard.recentGradesSubtitle")}
          icon={<FaChartLine size={20} className="text-purple-600" />}
          actions={
            <Button variant="outline" size="sm">
              {t("studentDashboard.viewAllGrades")}
            </Button>
          }
        >
          <div className="space-y-3">
            {stats.recentGrades.map((grade, index) => (
              <ListItem
                key={index}
                title={grade.assignment}
                subtitle={grade.subject}
                meta={new Date(grade.date).toLocaleDateString("vi-VN")}
                status={{
                  type: 'text',
                  variant: grade.score >= 8 ? 'success' : grade.score >= 6.5 ? 'warning' : 'danger',
                  label: `${grade.score}/10`
                }}
              />
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Bài tập chưa hoàn thành */}
      <SectionCard
        title={t("studentDashboard.incompleteAssignments")}
        subtitle={t("studentDashboard.incompleteAssignmentsSubtitle")}
        icon={<FaClipboardList size={20} className="text-red-600" />}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              subject: t("subject.math"),
              title: "Bài tập về hàm số",
              deadline: "2024-08-15",
              priority: "high",
            },
            {
              subject: t("subject.literature"),
              title: "Phân tích tác phẩm",
              deadline: "2024-08-18",
              priority: "medium",
            },
            {
              subject: t("subject.english"),
              title: "Grammar exercises",
              deadline: "2024-08-20",
              priority: "low",
            },
            {
              subject: t("subject.physics"),
              title: "Bài tập động học",
              deadline: "2024-08-22",
              priority: "medium",
            },
            {
              subject: t("subject.chemistry"),
              title: "Phương trình hóa học",
              deadline: "2024-08-25",
              priority: "low",
            },
          ].map((assignment, index) => (
            <div
              key={index}
              className="p-4 transition-shadow rounded-lg bg-gray-50 dark:bg-slate-700 hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground">
                  {assignment.title}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    assignment.priority === "high"
                      ? "bg-danger/10 text-danger dark:bg-danger/20 dark:text-danger"
                      : assignment.priority === "medium"
                      ? "bg-warning/10 text-warning dark:bg-warning/20 dark:text-warning"
                      : "bg-success/10 text-success dark:bg-success/20 dark:text-success"
                  }`}
                >
                  {assignment.priority === "high"
                    ? t("studentDashboard.priorityHigh")
                    : assignment.priority === "medium"
                    ? t("studentDashboard.priorityMedium")
                    : t("studentDashboard.priorityLow")}
                </span>
              </div>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                {assignment.subject}
              </p>
              <p className="mb-3 text-xs text-gray-500">
                {t("studentDashboard.deadline")}:{" "}
                {new Date(assignment.deadline).toLocaleDateString("vi-VN")}
              </p>
              <Button size="sm" className="w-full">
                {t("studentDashboard.doAssignment")}
              </Button>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default StudentDashboardPage;
