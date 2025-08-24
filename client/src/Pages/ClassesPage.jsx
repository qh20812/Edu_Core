import React, { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaSearch, FaUsers, FaBook, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useUI } from '../Hooks/useUI';
import { useAuth } from '../Hooks/useAuthQueries';
import { classService } from '../Services';
import { TableLoadingSkeleton } from '../Components/UI/Loading';
import Pagination from '../Components/UI/Pagination';

const ClassesPage = () => {
  const { showError, showSuccess, showConfirm } = useUI();
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalClasses, setTotalClasses] = useState(0);
  const itemsPerPage = 10;

  // Fetch classes data
  const fetchClasses = useCallback(async (page = 1, search = '') => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
        ...(search && { search }),
        ...(user?.role === 'teacher' && { teacher: 'current' })
      }).toString();

      const result = await classService.getAllClasses(`?${query}`);
      
      if (result.success) {
        setClasses(result.data || []);
        setTotalPages(result.pagination?.totalPages || 1);
        setTotalClasses(result.pagination?.total || 0);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
      showError('Không thể tải danh sách lớp học: ' + error.message);
      setClasses([]);
    } finally {
      setLoading(false);
    }
  }, [user?.role, showError, itemsPerPage]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchClasses(1, searchTerm);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchClasses(page, searchTerm);
  };

  // Handle delete class
  const handleDeleteClass = async (classId, className) => {
    const confirmed = await showConfirm(
      'Xác nhận xóa',
      `Bạn có chắc chắn muốn xóa lớp "${className}"? Hành động này không thể hoàn tác.`
    );

    if (confirmed) {
      try {
        const result = await classService.deleteClass(classId);
        if (result.success) {
          showSuccess('Xóa lớp học thành công');
          fetchClasses(currentPage, searchTerm);
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Error deleting class:', error);
        showError('Không thể xóa lớp học: ' + error.message);
      }
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const canManageClasses = ['admin', 'school_admin', 'sys_admin', 'teacher'].includes(user?.role);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Quản lý lớp học
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {totalClasses > 0 ? `Tổng cộng ${totalClasses} lớp học` : 'Chưa có lớp học nào'}
          </p>
        </div>
        {canManageClasses && (
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2">
            <FaPlus size={16} />
            <span>Tạo lớp mới</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <form onSubmit={handleSearch} className="flex space-x-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm lớp học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-slate-700 dark:border-slate-600"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Tìm kiếm
          </button>
        </form>
      </div>

      {/* Classes Table */}
      {loading ? (
        <TableLoadingSkeleton rows={5} columns={6} />
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
          {classes.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lớp học
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Giáo viên
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số học sinh
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Môn học
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
                    {classes.map((classItem) => (
                      <tr key={classItem._id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              {classItem.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {classItem.code}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-foreground">
                            {classItem.teacher?.name || 'Chưa phân công'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-foreground">
                            <FaUsers className="mr-2 text-gray-400" />
                            {classItem.studentCount || 0}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary">
                            <FaBook className="mr-1" />
                            {classItem.subject}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            classItem.status === 'active' 
                              ? 'bg-success/10 text-success dark:bg-success/20 dark:text-success'
                              : 'bg-secondary/10 text-secondary-foreground dark:bg-secondary/20 dark:text-secondary-foreground'
                          }`}>
                            {classItem.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-primary hover:text-primary/80 p-1">
                              <FaEye size={16} />
                            </button>
                            {canManageClasses && (
                              <>
                                <button className="text-success hover:text-success/80 p-1">
                                  <FaEdit size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteClass(classItem._id, classItem.name)}
                                  className="text-danger hover:text-danger/80 p-1"
                                >
                                  <FaTrash size={16} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalClasses}
                itemsPerPage={itemsPerPage}
                className="mt-6 px-6 pb-6"
              />
            </>
          ) : (
            <div className="text-center py-12">
              <FaBook className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Không có lớp học nào
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm ? 'Không tìm thấy lớp học phù hợp với từ khóa tìm kiếm.' : 'Chưa có lớp học nào được tạo.'}
              </p>
              {canManageClasses && !searchTerm && (
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Tạo lớp đầu tiên
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassesPage;
