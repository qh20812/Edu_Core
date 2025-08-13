
// IMPORT: Thư viện và các module chính
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config(); // Đọc biến môi trường từ file .env

// FUNCTION: Kết nối MongoDB
const connectDB = require('./Configs/db');

// ROUTES: Import các route chính
const authRoutes = require('./Routes/auth.routes'); // Đăng ký, đăng nhập, xác thực
const classRoutes = require('./Routes/class.routes'); // Quản lý lớp học
const assignmentRoutes = require('./Routes/assignment.routes'); // Quản lý bài tập
const submissionRoutes = require('./Routes/submission.routes'); // Quản lý bài nộp
const questionRoutes = require('./Routes/question.routes'); // Quản lý câu hỏi
const examRoutes = require('./Routes/exam.routes'); // Quản lý đề thi
const paymentRoutes = require('./Routes/payment.routes'); // Quản lý thanh toán
const tenantRoutes = require('./Routes/tenant.routes'); // Quản lý tenant

// MIDDLEWARE: Xử lý lỗi chung
const errorHandler = require('./Middlewares/error.middleware');

// BIẾN: Cổng server
const PORT = process.env.PORT || 3000;

// KẾT NỐI DATABASE
// FUNCTION: connectDB() - Kết nối tới MongoDB, nếu lỗi sẽ dừng server
connectDB();

// MIDDLEWARE: Xử lý dữ liệu đầu vào
app.use(express.json({ limit: '10mb' })); // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse form-urlencoded
app.use(cors()); // Cho phép CORS (giao tiếp với frontend)

// ROUTE: Kiểm tra server sống
app.get('/', (req, res) => {
    res.json({ 
        success: true,
        message: 'Edu Core API Server is running!',
        version: '1.0.0'
    });
});

// --- ĐĂNG KÝ ROUTES CHÍNH ---
// ROUTE: Xác thực người dùng (đăng ký, đăng nhập, lấy thông tin user)
console.log("Loading auth routes...");
app.use('/api/auth', authRoutes);
console.log("✅ Auth routes loaded.");

// ROUTE: Quản lý lớp học (tạo, lấy danh sách, thêm user vào lớp, ...)
console.log("Loading class routes...");
app.use('/api/classes', classRoutes);
console.log("✅ Class routes loaded.");

// ROUTE: Quản lý bài tập (tạo, lấy danh sách, cập nhật, xóa)
console.log("Loading assignment routes...");
app.use('/api/assignments', assignmentRoutes);
console.log("✅ Assignment routes loaded.");

// ROUTE: Quản lý bài nộp (nộp bài, xem bài nộp, chấm điểm)
console.log("Loading submission routes...");
app.use('/api/submissions', submissionRoutes);
console.log("✅ Submission routes loaded.");

// ROUTE: Quản lý ngân hàng câu hỏi (tạo, tìm kiếm, lấy chi tiết)
console.log("Loading question routes...");
app.use('/api/questions', questionRoutes);
console.log("✅ Question routes loaded.");

// ROUTE: Quản lý đề thi (tạo, lấy danh sách, cập nhật, xóa)
console.log("Loading exam routes...");
app.use('/api/exams', examRoutes);
console.log("✅ Exam routes loaded.");

// ROUTE: Quản lý thanh toán (tạo order, xử lý thanh toán, lịch sử)
console.log("Loading payment routes...");
app.use('/api/payments', paymentRoutes);
console.log("✅ Payment routes loaded.");

// ROUTE: Quản lý tenant (đăng ký, thông tin, thống kê)
console.log("Loading tenant routes...");
app.use('/api/tenants', tenantRoutes);
console.log("✅ Tenant routes loaded.");
// --- KẾT THÚC ĐĂNG KÝ ROUTES ---


// MIDDLEWARE: Xử lý lỗi chung (luôn đặt cuối cùng)
app.use(errorHandler);

// ROUTE: Xử lý 404 cho các route không tồn tại
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});


// FUNCTION: Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});