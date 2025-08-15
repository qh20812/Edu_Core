import React, { useState, useCallback } from 'react';
import { useUI } from '../../../Hooks/useUI';
import { useTenants, useApproveTenant, useRejectTenant } from '../../../Hooks/useSystemQueries';
import { FaBuilding, FaCheck, FaTimes, FaEye, FaSearch, FaFilter, FaUsers, FaCrown } from 'react-icons/fa';

const TenantManagementPage = () => {
  const { showSuccess, showError, showWarning } = useUI();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Use TanStack Query hooks
  const { data: tenantsResponse, isLoading: loading, error } = useTenants();
  const approveMutation = useApproveTenant();
  const rejectMutation = useRejectTenant();

  // Extract tenants array safely from TanStack Query response
  const tenants = Array.isArray(tenantsResponse?.data) ? tenantsResponse.data : [];

  // Handle approve tenant using mutation
  const handleApprove = useCallback(async (tenantId) => {
    try {
      await approveMutation.mutateAsync(tenantId);
      showSuccess('Đã phê duyệt trường học thành công');
    } catch (err) {
      console.error('Error approving tenant:', err);
      showError('Lỗi khi phê duyệt trường học');
    }
  }, [approveMutation, showSuccess, showError]);

  // Handle reject tenant using mutation
  const handleReject = useCallback(async (tenantId, reason) => {
    try {
      await rejectMutation.mutateAsync({ tenantId, reason });
      showWarning('Đã từ chối đăng ký trường học');
    } catch (err) {
      console.error('Error rejecting tenant:', err);
      showError('Lỗi khi từ chối đăng ký');
    }
  }, [rejectMutation, showWarning, showError]);

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaTimes className="w-12 h-12 mx-auto text-red-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Lỗi tải dữ liệu
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {error.message || 'Không thể tải danh sách trường học'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  const filteredTenants = Array.isArray(tenants) ? tenants.filter(tenant => {
    const matchesSearch = tenant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.school_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.contact_email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) : [];

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { color: 'bg-yellow-100 text-yellow-800', label: 'Chờ duyệt' },
      'active': { color: 'bg-green-100 text-green-800', label: 'Hoạt động' },
      'rejected': { color: 'bg-red-100 text-red-800', label: 'Từ chối' },
      'suspended': { color: 'bg-gray-100 text-gray-800', label: 'Tạm ngưng' }
    };
    
    const config = statusConfig[status] || statusConfig['pending'];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const TenantDetailModal = ({ tenant, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Chi tiết trường học
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tên trường
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">{tenant.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mã trường
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">{tenant.school_code || 'Chưa có'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email liên hệ
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">{tenant.contact_email || 'Chưa có'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Số điện thoại
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">{tenant.contact_phone || 'Chưa có'}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Địa chỉ
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">{tenant.address}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Loại trường
              </label>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">{tenant.school_type}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Trạng thái
              </label>
              <div className="mt-1">{getStatusBadge(tenant.status)}</div>
            </div>
          </div>

          {tenant.status === 'pending' && (
            <div className="flex pt-4 space-x-3 border-t">
              <button
                onClick={() => {
                  handleApprove(tenant._id);
                  onClose();
                }}
                disabled={approveMutation.isPending}
                className="flex-1 px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaCheck className="inline mr-2" />
                {approveMutation.isPending ? 'Đang phê duyệt...' : 'Phê duyệt'}
              </button>
              <button
                onClick={() => {
                  const reason = prompt('Lý do từ chối:');
                  if (reason) {
                    handleReject(tenant._id, reason);
                    onClose();
                  }
                }}
                disabled={rejectMutation.isPending}
                className="flex-1 px-4 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaTimes className="inline mr-2" />
                {rejectMutation.isPending ? 'Đang từ chối...' : 'Từ chối'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Đang tải danh sách trường học...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Quản lý trường học
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Duyệt và quản lý các trường học trong hệ thống
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-6 sm:flex-row">
        <div className="flex-1">
          <div className="relative">
            <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, mã trường, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ duyệt</option>
            <option value="active">Hoạt động</option>
            <option value="rejected">Từ chối</option>
            <option value="suspended">Tạm ngưng</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
              <FaBuilding className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng số trường</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{tenants.length}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg dark:bg-yellow-900">
              <FaUsers className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Chờ duyệt</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {tenants.filter(t => t.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
              <FaCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hoạt động</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {tenants.filter(t => t.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
              <FaTimes className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Từ chối</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {tenants.filter(t => t.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                  Trường học
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                  Mã trường
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                  Loại trường
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                  Ngày đăng ký
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-300">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {filteredTenants.map((tenant) => (
                <tr key={tenant._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg dark:bg-blue-900">
                          <FaBuilding className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {tenant.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {tenant.contact_email || 'Chưa có email'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                    {tenant.school_code || 'Chưa có mã'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                    {tenant.school_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(tenant.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">
                    {tenant.created_at ? new Date(tenant.created_at).toLocaleDateString('vi-VN') : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedTenant(tenant);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <FaEye />
                      </button>
                      {tenant.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(tenant._id)}
                            disabled={approveMutation.isPending}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 disabled:opacity-50"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt('Lý do từ chối:');
                              if (reason) handleReject(tenant._id, reason);
                            }}
                            disabled={rejectMutation.isPending}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                          >
                            <FaTimes />
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

        {filteredTenants.length === 0 && (
          <div className="py-12 text-center">
            <FaBuilding className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              Không có trường học nào
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {searchTerm || statusFilter !== 'all' 
                ? 'Không tìm thấy trường học phù hợp với bộ lọc.'
                : 'Chưa có trường học nào đăng ký.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedTenant && (
        <TenantDetailModal
          tenant={selectedTenant}
          onClose={() => {
            setShowModal(false);
            setSelectedTenant(null);
          }}
        />
      )}
    </div>
  );
};

export default TenantManagementPage;
