import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useUI } from "../../../Hooks/useUI";
import {
  useTenants,
  useApproveTenant,
  useRejectTenant,
} from "../../../Hooks/useSystemQueries";
import {
  FaBuilding,
  FaCheck,
  FaTimes,
  FaEye,
  FaSearch,
  FaUsers,
} from "react-icons/fa";

// Import reusable components
import StatCard from "../../../Components/UI/StatCard";
import DataTable from "../../../Components/UI/DataTable";
import Modal from "../../../Components/UI/Modal";
import StatusBadge from "../../../Components/UI/StatusBadge";
import DashboardHeader from "../../../Components/UI/DashboardHeader";

const TenantManagementPage = () => {
  const { t } = useTranslation();
  const { showSuccess, showError, showWarning } = useUI();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Use TanStack Query hooks
  const { data: tenantsResponse, isLoading: loading, error } = useTenants();
  const approveMutation = useApproveTenant();
  const rejectMutation = useRejectTenant();

  // Extract tenants array safely from TanStack Query response
  const tenants = Array.isArray(tenantsResponse?.data)
    ? tenantsResponse.data
    : [];

  // Handle approve tenant using mutation
  const handleApprove = useCallback(
    async (tenantId) => {
      try {
        await approveMutation.mutateAsync(tenantId);
        showSuccess(t("tenantManagement.approveSuccess"));
      } catch (err) {
        console.error("Error approving tenant:", err);
        showError(t("tenantManagement.approveError"));
      }
    },
    [approveMutation, showSuccess, showError, t]
  );

  // Handle reject tenant using mutation
  const handleReject = useCallback(
    async (tenantId, reason) => {
      try {
        await rejectMutation.mutateAsync({ tenantId, reason });
        showWarning(t("tenantManagement.rejectSuccess"));
      } catch (err) {
        console.error("Error rejecting tenant:", err);
        showError(t("tenantManagement.rejectError"));
      }
    },
    [rejectMutation, showWarning, showError, t]
  );

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <FaTimes className="w-12 h-12 mx-auto mb-4 text-red-600" />
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
            {t("tenantManagement.loadError")}
          </h3>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            {error.message || t("tenantManagement.loadErrorMessage")}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            {t("tenantManagement.retry")}
          </button>
        </div>
      </div>
    );
  }

  // Table columns configuration
  const tableColumns = [
    {
      header: t("tenantManagement.schoolName"),
      accessor: "name",
      cell: (tenant) => (
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
              {tenant.contact_email || t("tenantManagement.noEmail")}
            </div>
          </div>
        </div>
      )
    },
    {
      header: t("tenantManagement.schoolCode"),
      accessor: "school_code",
      cell: (tenant) => (
        <span className="text-sm text-gray-900 dark:text-white">
          {tenant.school_code || t("tenantManagement.noCode")}
        </span>
      )
    },
    {
      header: t("tenantManagement.schoolType"),
      accessor: "school_type",
      cell: (tenant) => (
        <span className="text-sm text-gray-900 dark:text-white">
          {tenant.school_type}
        </span>
      )
    },
    {
      header: t("tenantManagement.status"),
      accessor: "status",
      cell: (tenant) => (
        <div className="flex items-center">
          <StatusBadge status={tenant.status} translate={true} size="sm" />
        </div>
      )
    },
    {
      header: t("tenantManagement.registrationDate"),
      accessor: "created_at",
      cell: (tenant) => (
        <span className="text-sm text-gray-900 dark:text-white">
          {tenant.created_at
            ? new Date(tenant.created_at).toLocaleDateString("vi-VN")
            : "N/A"}
        </span>
      )
    },
    {
      header: t("tenantManagement.actions"),
      accessor: "actions",
      cell: (tenant) => (
        <div className="flex items-center space-x-2">
          {/* View Details Button */}
          <button
            onClick={() => {
              setSelectedTenant(tenant);
              setShowModal(true);
            }}
            className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 transition-colors duration-150"
            title={t("tenantManagement.viewDetails")}
          >
            <FaEye className="mr-1" />
            {t("tenantManagement.viewDetails")}
          </button>

          {/* Conditional Action Buttons for Pending Tenants */}
          {tenant.status === "pending" && (
            <>
              <button
                onClick={() => handleApprove(tenant._id)}
                disabled={approveMutation.isPending}
                className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                title={t("tenantManagement.approve")}
              >
                <FaCheck className="mr-1" />
                {approveMutation.isPending ? t("tenantManagement.approving") : t("tenantManagement.approve")}
              </button>
              <button
                onClick={() => {
                  const reason = prompt(t("tenantManagement.rejectReason"));
                  if (reason) handleReject(tenant._id, reason);
                }}
                disabled={rejectMutation.isPending}
                className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                title={t("tenantManagement.reject")}
              >
                <FaTimes className="mr-1" />
                {rejectMutation.isPending ? t("tenantManagement.rejecting") : t("tenantManagement.reject")}
              </button>
            </>
          )}

          {/* Status indicator for non-pending tenants */}
          {tenant.status !== "pending" && (
            <span className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300">
              {tenant.status === "active" && t("tenantManagement.approved")}
              {tenant.status === "rejected" && t("tenantManagement.rejected")}
              {tenant.status === "suspended" && t("tenantManagement.suspended")}
            </span>
          )}
        </div>
      )
    }
  ];

  // Filter tenants based on search and status
  const filteredTenants = Array.isArray(tenants)
    ? tenants.filter((tenant) => {
        const matchesSearch =
          tenant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tenant.school_code
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          tenant.contact_email
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "all" || tenant.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
    : [];

  // Tenant Detail Modal Component
  const TenantDetailModal = () => (
    <Modal 
      isOpen={showModal} 
      onClose={() => {
        setShowModal(false);
        setSelectedTenant(null);
      }}
      title={t("tenantManagement.schoolDetails")}
      size="md"
    >
      {selectedTenant && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("tenantManagement.schoolName")}
              </label>
              <p className="text-sm text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {selectedTenant.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("tenantManagement.schoolCode")}
              </label>
              <p className="text-sm text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {selectedTenant.school_code || t("tenantManagement.noCode")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("tenantManagement.contactEmail")}
              </label>
              <p className="text-sm text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {selectedTenant.contact_email || t("tenantManagement.noEmail")}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("tenantManagement.contactPhone")}
              </label>
              <p className="text-sm text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {selectedTenant.contact_phone || t("tenantManagement.noPhone")}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("tenantManagement.address")}
            </label>
            <p className="text-sm text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {selectedTenant.address}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("tenantManagement.schoolType")}
              </label>
              <p className="text-sm text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {selectedTenant.school_type}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("tenantManagement.status")}
              </label>
              <div className="p-3">
                <StatusBadge status={selectedTenant.status} translate={true} />
              </div>
            </div>
          </div>

          {selectedTenant.status === "pending" && (
            <div className="flex pt-6 space-x-3 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={() => {
                  handleApprove(selectedTenant._id);
                  setShowModal(false);
                  setSelectedTenant(null);
                }}
                disabled={approveMutation.isPending}
                className="flex-1 px-4 py-3 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <FaCheck className="inline mr-2" />
                {approveMutation.isPending ? t("tenantManagement.approving") : t("tenantManagement.approve")}
              </button>
              <button
                onClick={() => {
                  const reason = prompt(t("tenantManagement.rejectReason"));
                  if (reason) {
                    handleReject(selectedTenant._id, reason);
                    setShowModal(false);
                    setSelectedTenant(null);
                  }
                }}
                disabled={rejectMutation.isPending}
                className="flex-1 px-4 py-3 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <FaTimes className="inline mr-2" />
                {rejectMutation.isPending ? t("tenantManagement.rejecting") : t("tenantManagement.reject")}
              </button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <DashboardHeader
        title={t("tenantManagement.title")}
        subtitle={t("tenantManagement.subtitle")}
        actions={[
          {
            label: t("tenantManagement.refresh"),
            variant: "secondary",
            onClick: () => window.location.reload()
          }
        ]}
      />

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <div className="relative">
            <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder={t("tenantManagement.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-150"
            />
          </div>
        </div>

        <div className="sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-150"
          >
            <option value="all">{t("tenantManagement.allStatuses")}</option>
            <option value="pending">{t("tenantManagement.pending")}</option>
            <option value="active">{t("tenantManagement.active")}</option>
            <option value="rejected">{t("tenantManagement.rejected")}</option>
            <option value="suspended">{t("tenantManagement.suspended")}</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t("tenantManagement.total")}
          value={tenants.length}
          icon={FaBuilding}
          variant="primary"
        />
        <StatCard
          title={t("tenantManagement.pending")}
          value={tenants.filter((t) => t.status === "pending").length}
          icon={FaUsers}
          variant="warning"
        />
        <StatCard
          title={t("tenantManagement.active")}
          value={tenants.filter((t) => t.status === "active").length}
          icon={FaCheck}
          variant="success"
        />
        <StatCard
          title={t("tenantManagement.rejected")}
          value={tenants.filter((t) => t.status === "rejected").length}
          icon={FaTimes}
          variant="danger"
        />
      </div>

      {/* Data Table */}
      <DataTable
        columns={tableColumns}
        data={filteredTenants}
        loading={loading}
        emptyMessage={
          searchTerm || statusFilter !== "all"
            ? t("tenantManagement.noResultsFilter")
            : t("tenantManagement.noResultsEmpty")
        }
        emptyIcon={FaBuilding}
      />

      {/* Modal */}
      <TenantDetailModal />
    </div>
  );
};

export default TenantManagementPage;
