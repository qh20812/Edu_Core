import React from 'react';
import { useTranslation } from 'react-i18next';
import StatusBadge from '../Components/UI/StatusBadge';
import DashboardHeader from '../Components/UI/DashboardHeader';
import RecentTenantsCard from '../Components/UI/RecentTenantsCard';
import SystemHealthCard from '../Components/UI/SystemHealthCard';
import { FaRefresh, FaCog, FaPlus } from 'react-icons/fa';

const ComponentTranslationTestPage = () => {
  const { t, i18n } = useTranslation();

  // Mock data for testing
  const mockTenants = [
    { id: 1, name: 'Trường THPT ABC', status: 'active', totalUsers: 150 },
    { id: 2, name: 'Trường THCS XYZ', status: 'pending', totalUsers: 80 },
    { id: 3, name: 'Trường Tiểu học DEF', status: 'inactive', totalUsers: 45 }
  ];

  const mockServices = [
    { service: 'systemHealth', status: 'healthy', uptime: '99.9%' },
    { service: 'apiServer', status: 'healthy', uptime: '99.8%' },
    { service: 'database', status: 'warning', uptime: '98.5%' },
    { service: 'emailService', status: 'error', uptime: '85.2%' }
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Component Translation Test
        </h1>
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Switch to {i18n.language === 'vi' ? 'English' : 'Tiếng Việt'}
        </button>
      </div>

      {/* StatusBadge Test */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          StatusBadge Component
        </h2>
        <div className="flex flex-wrap gap-4">
          <StatusBadge status="active" />
          <StatusBadge status="pending" />
          <StatusBadge status="inactive" />
          <StatusBadge status="healthy" />
          <StatusBadge status="warning" />
          <StatusBadge status="error" />
          <StatusBadge status="online" />
          <StatusBadge status="offline" />
          <StatusBadge status="processing" />
          <StatusBadge status="completed" />
        </div>
      </section>

      {/* DashboardHeader Test */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          DashboardHeader Component
        </h2>
        <DashboardHeader
          title={t('systemDashboard.title')}
          subtitle={t('systemDashboard.subtitle')}
          actions={[
            {
              label: t('systemDashboard.refresh'),
              icon: <FaRefresh />,
              onClick: () => console.log('Refresh clicked'),
              variant: 'primary'
            },
            {
              label: t('systemDashboard.settings'),
              icon: <FaCog />,
              onClick: () => console.log('Settings clicked'),
              variant: 'secondary'
            }
          ]}
        />
      </section>

      {/* Card Components Test */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            RecentTenantsCard Component
          </h2>
          <RecentTenantsCard
            tenants={mockTenants}
            loading={false}
            showUsers={true}
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            SystemHealthCard Component
          </h2>
          <SystemHealthCard
            services={mockServices}
            loading={false}
          />
        </section>
      </div>

      {/* Loading States Test */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Loading States
          </h2>
          <RecentTenantsCard
            tenants={[]}
            loading={true}
            showUsers={true}
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Loading States
          </h2>
          <SystemHealthCard
            services={[]}
            loading={true}
          />
        </section>
      </div>

      {/* Empty States Test */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Empty States
          </h2>
          <RecentTenantsCard
            tenants={[]}
            loading={false}
            showUsers={true}
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Empty States
          </h2>
          <SystemHealthCard
            services={[]}
            loading={false}
          />
        </section>
      </div>
    </div>
  );
};

export default ComponentTranslationTestPage;
