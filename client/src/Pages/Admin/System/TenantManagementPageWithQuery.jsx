import React, { useState, useCallback } from 'react';
import { useUI } from '../../../Hooks/useUI';
import { useTenants, useApproveTenant, useRejectTenant } from '../../../Hooks/useSystemQueries';
import { FaBuilding, FaCheck, FaTimes, FaEye, FaSearch, FaFilter, FaUsers, FaCrown, FaSpinner } from 'react-icons/fa';

const TenantManagementPageWithQuery = () => {
  const { showSuccess, showError } = useUI();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Use TanStack Query hooks
  const { data: tenantsResponse, isLoading: loading, error } = useTenants();
  const approveMutation = useApproveTenant();
  const rejectMutation = useRejectTenant();

  // Extract tenants array safely
  const tenants = Array.isArray(tenantsResponse?.data) ? tenantsResponse.data : [];

  // Approve tenant function
  const handleApproveTenant = useCallback(async (tenantId) => {
    try {
      await approveMutation.mutateAsync(tenantId);
      showSuccess('Tenant đã được duyệt thành công!');
    } catch (error) {
      showError('Lỗi khi duyệt tenant: ' + (error.message || 'Unknown error'));
    }
  }, [approveMutation, showSuccess, showError]);

  // Reject tenant function
  const handleRejectTenant = useCallback(async (tenantId, reason = 'Không đáp ứng yêu cầu') => {
    try {
      await rejectMutation.mutateAsync({ tenantId, reason });
      showSuccess('Tenant đã được từ chối!');
    } catch (error) {
      showError('Lỗi khi từ chối tenant: ' + (error.message || 'Unknown error'));
    }
  }, [rejectMutation, showSuccess, showError]);

  // View tenant details
  const handleViewTenant = useCallback((tenant) => {
    setSelectedTenant(tenant);
    setShowModal(true);
  }, []);

  // Close modal
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedTenant(null);
  }, []);

  // Filter tenants
  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.contact_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.school_code?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Safe count function
  const safeCount = (filterFn) => {
    return Array.isArray(tenants) ? tenants.filter(filterFn).length : 0;
  };

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaTimes className="mx-auto h-8 w-8 text-red-600 mb-4" />
          <p className="text-red-600">Lỗi tải dữ liệu: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quản lý Trường học</h1>
        <p className="text-gray-600 dark:text-gray-400">Duyệt và quản lý các trường học đăng ký</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <FaBuilding className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tổng số trường</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {loading ? '...' : tenants.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <FaCrown className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chờ duyệt</h3>
              <p className="text-2xl font-semibold text-yellow-600">
                {loading ? '...' : safeCount(t => t.status === 'pending')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <FaCheck className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Đã duyệt</h3>
              <p className="text-2xl font-semibold text-green-600">
                {loading ? '...' : safeCount(t => t.status === 'active')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <FaTimes className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bị từ chối</h3>
              <p className="text-2xl font-semibold text-red-600">
                {loading ? '...' : safeCount(t => t.status === 'rejected')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên trường, email hoặc mã trường..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <FaFilter className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ duyệt</option>
              <option value="active">Đã duyệt</option>
              <option value="rejected">Bị từ chối</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Trường học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Liên hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ngày đăng ký
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <FaSpinner className="mx-auto h-8 w-8 animate-spin text-blue-600" />
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Đang tải dữ liệu...</p>
                  </td>
                </tr>
              ) : filteredTenants.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <FaBuilding className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Không có dữ liệu</p>
                  </td>
                </tr>
              ) : (
                filteredTenants.map((tenant) => (
                  <tr key={tenant._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaBuilding className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {tenant.name || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Mã: {tenant.school_code || 'Chưa có'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {tenant.contact_email || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {tenant.contact_phone || 'Chưa có SĐT'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        tenant.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : tenant.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {tenant.status === 'active' ? 'Đã duyệt' :
                         tenant.status === 'pending' ? 'Chờ duyệt' : 'Bị từ chối'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {tenant.created_at ? new Date(tenant.created_at).toLocaleDateString('vi-VN') : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewTenant(tenant)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <FaEye className="h-4 w-4" />
                        </button>
                        {tenant.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveTenant(tenant._id)}
                              disabled={approveMutation.isPending}
                              className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300
                                       disabled:opacity-50"
                            >
                              <FaCheck className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleRejectTenant(tenant._id)}
                              disabled={rejectMutation.isPending}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300
                                       disabled:opacity-50"
                            >
                              <FaTimes className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for tenant details */}
      {showModal && selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Chi tiết trường học
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tên trường
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {selectedTenant.name || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Mã trường
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {selectedTenant.school_code || 'Chưa có'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email liên hệ
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {selectedTenant.contact_email || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Số điện thoại
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {selectedTenant.contact_phone || 'Chưa có'}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Địa chỉ
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {selectedTenant.address || 'Chưa có'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Trạng thái
                    </label>
                    <span className={`mt-1 inline-block px-2 py-1 text-xs rounded-full ${
                      selectedTenant.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : selectedTenant.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedTenant.status === 'active' ? 'Đã duyệt' :
                       selectedTenant.status === 'pending' ? 'Chờ duyệt' : 'Bị từ chối'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ngày đăng ký
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {selectedTenant.created_at ? 
                        new Date(selectedTenant.created_at).toLocaleDateString('vi-VN') : 'N/A'}
                    </p>
                  </div>
                </div>

                {selectedTenant.status === 'pending' && (
                  <div className="flex space-x-4 pt-4 border-t">
                    <button
                      onClick={() => {
                        handleApproveTenant(selectedTenant._id);
                        handleCloseModal();
                      }}
                      disabled={approveMutation.isPending}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {approveMutation.isPending ? 'Đang duyệt...' : 'Duyệt'}
                    </button>
                    <button
                      onClick={() => {
                        handleRejectTenant(selectedTenant._id);
                        handleCloseModal();
                      }}
                      disabled={rejectMutation.isPending}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {rejectMutation.isPending ? 'Đang từ chối...' : 'Từ chối'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantManagementPageWithQuery;
