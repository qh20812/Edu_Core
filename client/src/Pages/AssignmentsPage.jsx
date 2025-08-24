import React, { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaSearch, FaCalendarAlt, FaBook, FaClock, FaEdit, FaTrash, FaEye, FaClipboardList } from 'react-icons/fa';
import { useUI } from '../Hooks/useUI';
import { useAuth } from '../Hooks/useAuthQueries';
import { assignmentService } from '../Services';
import { TableLoadingSkeleton } from '../Components/UI/Loading';
import Pagination from '../Components/UI/Pagination';

const AssignmentsPage = () => {
  const { showError, showSuccess, showConfirm } = useUI();
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [statusFilter, setStatusFilter] = useState('all');
  const itemsPerPage = 10;

  // Fetch assignments data
  const fetchAssignments = useCallback(async (page = 1, search = '', status = 'all') => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
        ...(search && { search }),
        ...(status !== 'all' && { status }),
        ...(user?.role === 'teacher' && { teacher: 'current' }),
        ...(user?.role === 'student' && { student: 'current' })
      }).toString();

      const result = await assignmentService.getAllAssignments(`?${query}`);
      
      if (result.success) {
        setAssignments(result.data || []);
        setTotalPages(result.pagination?.totalPages || 1);
        setTotalAssignments(result.pagination?.total || 0);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
      showError('Không thể tải danh sách bài tập: ' + error.message);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  }, [user?.role, showError, itemsPerPage]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAssignments(1, searchTerm, statusFilter);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAssignments(page, searchTerm, statusFilter);
  };

  // Handle status filter change
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
    fetchAssignments(1, searchTerm, status);
  };

  // Handle delete assignment
  const handleDeleteAssignment = async (assignmentId, assignmentTitle) => {
    const confirmed = await showConfirm(
      'Xác nhận xóa',
      `Bạn có chắc chắn muốn xóa bài tập "${assignmentTitle}"? Hành động này không thể hoàn tác.`
    );

    if (confirmed) {
      try {
        const result = await assignmentService.deleteAssignment(assignmentId);
        if (result.success) {
          showSuccess('Xóa bài tập thành công');
          fetchAssignments(currentPage, searchTerm, statusFilter);
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Error deleting assignment:', error);
        showError('Không thể xóa bài tập: ' + error.message);
      }
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status info
  const getStatusInfo = (assignment) => {
    const now = new Date();
    const dueDate = new Date(assignment.dueDate);
    
    if (assignment.status === 'draft') {
      return { text: 'Bản nháp', color: 'gray' };
    }
    
    if (dueDate < now) {
      return { text: 'Đã hết hạn', color: 'red' };
    }
    
    const hoursLeft = Math.floor((dueDate - now) / (1000 * 60 * 60));
    if (hoursLeft <= 24) {
      return { text: 'Sắp hết hạn', color: 'yellow' };
    }
    
    return { text: 'Đang mở', color: 'green' };
  };

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const canManageAssignments = ['admin', 'school_admin', 'sys_admin', 'teacher'].includes(user?.role);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Quản lý bài tập
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {totalAssignments > 0 ? `Tổng cộng ${totalAssignments} bài tập` : 'Chưa có bài tập nào'}
          </p>
        </div>
        {canManageAssignments && (
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2">
            <FaPlus size={16} />
            <span>Tạo bài tập mới</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài tập..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-700 dark:border-slate-600"
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
              <option value="expired">Đã hết hạn</option>
            </select>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Tìm kiếm
            </button>
          </div>
        </form>
      </div>

      {/* Assignments Table */}
      {loading ? (
        <TableLoadingSkeleton rows={5} columns={6} />
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
          {assignments.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bài tập
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lớp học
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hạn nộp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Điểm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                    {assignments.map((assignment) => {
                      const statusInfo = getStatusInfo(assignment);
                      return (
                        <tr key={assignment._id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-foreground">
                                {assignment.title}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center mt-1">
                                <FaBook className="mr-1" />
                                {assignment.subject}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-foreground">
                              {assignment.class?.name || 'Không xác định'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-foreground">
                              <FaCalendarAlt className="mr-2 text-gray-400" />
                              {formatDate(assignment.dueDate)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-foreground">
                              {assignment.maxScore || 10} điểm
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              statusInfo.color === 'green' 
                                ? 'bg-success/10 text-success dark:bg-success/20 dark:text-success'
                                : statusInfo.color === 'yellow'
                                ? 'bg-warning/10 text-warning dark:bg-warning/20 dark:text-warning'
                                : statusInfo.color === 'red'
                                ? 'bg-danger/10 text-danger dark:bg-danger/20 dark:text-danger'
                                : 'bg-secondary/10 text-secondary-foreground dark:bg-secondary/20 dark:text-secondary-foreground'
                            }`}>
                              <FaClock className="mr-1" />
                              {statusInfo.text}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="text-primary hover:text-primary/80 p-1">
                                <FaEye size={16} />
                              </button>
                              {canManageAssignments && (
                                <>
                                  <button className="text-success hover:text-success/80 p-1">
                                    <FaEdit size={16} />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteAssignment(assignment._id, assignment.title)}
                                    className="text-danger hover:text-danger/80 p-1"
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
                totalItems={totalAssignments}
                itemsPerPage={itemsPerPage}
                className="mt-6 px-6 pb-6"
              />
            </>
          ) : (
            <div className="text-center py-12">
              <FaClipboardList className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Không có bài tập nào
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm ? 'Không tìm thấy bài tập phù hợp với từ khóa tìm kiếm.' : 'Chưa có bài tập nào được tạo.'}
              </p>
              {canManageAssignments && !searchTerm && (
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Tạo bài tập đầu tiên
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;
