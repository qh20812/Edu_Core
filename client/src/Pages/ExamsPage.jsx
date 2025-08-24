import React, { useState, useEffect, useCallback } from "react";
import {
  FaPlus,
  FaSearch,
  FaCalendarAlt,
  FaBook,
  FaClock,
  FaEdit,
  FaTrash,
  FaEye,
  FaGraduationCap,
  FaQuestionCircle,
} from "react-icons/fa";
import { useUI } from "../Hooks/useUI";
import { useAuth } from "../Hooks/useAuthQueries";
import { examService } from "../Services";
import { TableLoadingSkeleton } from "../Components/UI/Loading";
import Pagination from "../Components/UI/Pagination";

const ExamsPage = () => {
  const { showError, showSuccess, showConfirm } = useUI();
  const { user } = useAuth();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalExams, setTotalExams] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const itemsPerPage = 10;

  // Fetch exams data
  const fetchExams = useCallback(
    async (page = 1, search = "", status = "all") => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          page: page.toString(),
          limit: itemsPerPage.toString(),
          ...(search && { search }),
          ...(status !== "all" && { status }),
          ...(user?.role === "teacher" && { teacher: "current" }),
          ...(user?.role === "student" && { student: "current" }),
        }).toString();

        const result = await examService.getAllExams(`?${query}`);

        if (result.success) {
          setExams(result.data || []);
          setTotalPages(result.pagination?.totalPages || 1);
          setTotalExams(result.pagination?.total || 0);
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error("Error fetching exams:", error);
        showError("Không thể tải danh sách bài kiểm tra: " + error.message);
        setExams([]);
      } finally {
        setLoading(false);
      }
    },
    [user?.role, showError, itemsPerPage]
  );

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchExams(1, searchTerm, statusFilter);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchExams(page, searchTerm, statusFilter);
  };

  // Handle status filter change
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
    fetchExams(1, searchTerm, status);
  };

  // Handle delete exam
  const handleDeleteExam = async (examId, examTitle) => {
    const confirmed = await showConfirm(
      "Xác nhận xóa",
      `Bạn có chắc chắn muốn xóa bài kiểm tra "${examTitle}"? Hành động này không thể hoàn tác.`
    );

    if (confirmed) {
      try {
        const result = await examService.deleteExam(examId);
        if (result.success) {
          showSuccess("Xóa bài kiểm tra thành công");
          fetchExams(currentPage, searchTerm, statusFilter);
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error("Error deleting exam:", error);
        showError("Không thể xóa bài kiểm tra: " + error.message);
      }
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status info
  const getStatusInfo = (exam) => {
    const now = new Date();
    const examDate = new Date(exam.examDate);
    const endDate = new Date(exam.examDate);
    endDate.setMinutes(endDate.getMinutes() + (exam.duration || 60));

    if (exam.status === "draft") {
      return { text: "Bản nháp", color: "gray" };
    }

    if (endDate < now) {
      return { text: "Đã kết thúc", color: "red" };
    }

    if (examDate <= now && now < endDate) {
      return { text: "Đang diễn ra", color: "blue" };
    }

    const hoursLeft = Math.floor((examDate - now) / (1000 * 60 * 60));
    if (hoursLeft <= 24) {
      return { text: "Sắp bắt đầu", color: "yellow" };
    }

    return { text: "Đã lên lịch", color: "green" };
  };

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  const canManageExams = [
    "admin",
    "school_admin",
    "sys_admin",
    "teacher",
  ].includes(user?.role);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Quản lý bài kiểm tra
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            {totalExams > 0
              ? `Tổng cộng ${totalExams} bài kiểm tra`
              : "Chưa có bài kiểm tra nào"}
          </p>
        </div>
        {canManageExams && (
          <button className="flex items-center px-4 py-2 space-x-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary/90">
            <FaPlus size={16} />
            <span>Tạo bài kiểm tra mới</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="p-6 bg-white rounded-lg shadow-md dark:bg-slate-800">
        <form
          onSubmit={handleSearch}
          className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4"
        >
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Tìm kiếm bài kiểm tra..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-700 dark:border-slate-600"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-700 dark:border-slate-600"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="published">Đã xuất bản</option>
              <option value="draft">Bản nháp</option>
              <option value="ongoing">Đang diễn ra</option>
              <option value="completed">Đã kết thúc</option>
            </select>
            <button
              type="submit"
              className="px-6 py-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary/90"
            >
              Tìm kiếm
            </button>
          </div>
        </form>
      </div>

      {/* Exams Table */}
      {loading ? (
        <TableLoadingSkeleton rows={5} columns={7} />
      ) : (
        <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-slate-800">
          {exams.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Bài kiểm tra
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Lớp học
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Thời gian
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Thời lượng
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Câu hỏi
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-800 dark:divide-slate-700">
                    {exams.map((exam) => {
                      const statusInfo = getStatusInfo(exam);
                      return (
                        <tr
                          key={exam._id}
                          className="hover:bg-gray-50 dark:hover:bg-slate-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-foreground">
                                {exam.title}
                              </div>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <FaBook className="mr-1" />
                                {exam.subject}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-foreground">
                              {exam.class?.name || "Không xác định"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-foreground">
                              <FaCalendarAlt className="mr-2 text-gray-400" />
                              {formatDate(exam.examDate)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-foreground">
                              <FaClock className="mr-2 text-gray-400" />
                              {exam.duration || 60} phút
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-foreground">
                              <FaQuestionCircle className="mr-2 text-gray-400" />
                              {exam.questionCount || 0} câu
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                statusInfo.color === "green"
                                  ? "bg-success/10 text-success dark:bg-success/20 dark:text-success"
                                  : statusInfo.color === "yellow"
                                  ? "bg-warning/10 text-warning dark:bg-warning/20 dark:text-warning"
                                  : statusInfo.color === "red"
                                  ? "bg-danger/10 text-danger dark:bg-danger/20 dark:text-danger"
                                  : statusInfo.color === "blue"
                                  ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary"
                                  : "bg-secondary/10 text-secondary-foreground dark:bg-secondary/20 dark:text-secondary-foreground"
                              }`}
                            >
                              <FaClock className="mr-1" />
                              {statusInfo.text}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <div className="flex justify-end space-x-2">
                              <button className="p-1 text-primary hover:text-primary/80">
                                <FaEye size={16} />
                              </button>
                              {canManageExams && (
                                <>
                                  <button className="p-1 text-success hover:text-success/80">
                                    <FaEdit size={16} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteExam(exam._id, exam.title)
                                    }
                                    className="p-1 text-danger hover:text-danger/80"
                                  >
                                    <FaTrash size={16} />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalExams}
                itemsPerPage={itemsPerPage}
                className="px-6 pb-6 mt-6"
              />
            </>
          ) : (
            <div className="py-12 text-center">
              <FaGraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                Không có bài kiểm tra nào
              </h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                {searchTerm
                  ? "Không tìm thấy bài kiểm tra phù hợp với từ khóa tìm kiếm."
                  : "Chưa có bài kiểm tra nào được tạo."}
              </p>
              {canManageExams && !searchTerm && (
                <button className="px-4 py-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary/90">
                  Tạo bài kiểm tra đầu tiên
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamsPage;
