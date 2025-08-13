import React from 'react';

const ProcessInfo = () => {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
      <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-3">
        Quy trình đăng ký
      </h3>
      <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
          <span>Gửi thông tin đăng ký</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
          <span>Thời gian xử lý: 1-3 ngày làm việc</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
          <span>Bạn sẽ nhận được email thông báo kết quả</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
          <span>Sau khi được duyệt, bạn có thể đăng nhập và sử dụng hệ thống</span>
        </div>
      </div>
    </div>
  );
};

export default ProcessInfo;
