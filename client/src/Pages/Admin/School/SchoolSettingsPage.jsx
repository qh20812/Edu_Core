import React from "react";
import { useTranslation } from "react-i18next";
import { FaCog } from "react-icons/fa";
import SectionCard from "../../../Components/UI/SectionCard";

const SchoolSettingsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-blue-600">
            {t("navigation.schoolSettings")}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Cài đặt hệ thống trường học
          </p>
        </div>
      </div>

      <SectionCard
        title="Cài đặt trường học"
        subtitle="Trang này đang được phát triển"
        icon={<FaCog size={20} className="text-blue-600" />}
      >
        <div className="text-center py-12">
          <FaCog size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Trang đang phát triển
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Chức năng cài đặt sẽ được cập nhật trong phiên bản tiếp theo.
          </p>
        </div>
      </SectionCard>
    </div>
  );
};

export default SchoolSettingsPage;
