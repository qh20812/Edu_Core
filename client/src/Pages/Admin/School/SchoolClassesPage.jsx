import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaUsers, FaPlus, FaSearch, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useUI } from "../../../Hooks/useUI";
import Button from "../../../Components/UI/Button";
import SectionCard from "../../../Components/UI/SectionCard";
import { classService } from '../../../Services';

const SchoolClassesPage = () => {
  const { t } = useTranslation();
  const { showError, isLoading, setLoading } = useUI();
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const classData = await classService.getAllClasses();
      setClasses(classData?.data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
      showError("Không thể tải danh sách lớp học: " + error.message);
      // Mock data fallback
      setClasses([
        {
          id: 1,
          name: "10A1",
          description: "Lớp 10 chuyên Toán",
          teacher_name: "Nguyễn Văn A",
          student_count: 35,
          subject: "Toán học",
          created_at: new Date()
        },
        {
          id: 2,
          name: "10A2",
          description: "Lớp 10 chuyên Lý",
          teacher_name: "Trần Thị B",
          student_count: 32,
          subject: "Vật lý",
          created_at: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredClasses = classes.filter(cls =>
    cls.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.teacher_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-blue-600">
            {t("navigation.schoolClasses")}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Quản lý các lớp học trong trường
          </p>
        </div>
        <Button variant="accent">
          <FaPlus className="inline mr-2" />
          Tạo lớp mới
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm kiếm lớp học..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
        />
      </div>

      {/* Classes List */}
      <SectionCard
        title={`Danh sách lớp học (${filteredClasses.length})`}
        icon={<FaUsers size={20} className="text-blue-600" />}
      >
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Đang tải...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls) => (
              <div key={cls.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {cls.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {cls.description}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      <FaEye size={14} />
                    </button>
                    <button className="p-1 text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300">
                      <FaEdit size={14} />
                    </button>
                    <button className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Giáo viên chủ nhiệm:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{cls.teacher_name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Số học sinh:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{cls.student_count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Môn học:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{cls.subject}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="outline" className="w-full">
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!isLoading && filteredClasses.length === 0 && (
          <div className="text-center py-8">
            <FaUsers size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Không tìm thấy lớp học nào</p>
          </div>
        )}
      </SectionCard>
    </div>
  );
};

export default SchoolClassesPage;
