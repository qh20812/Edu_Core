# 🎓 EduCore - Hệ thống Quản lý Giáo dục

<div align="center">
  <img src="https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Latest-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.1.11-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</div>

<div align="center">
  <h3>🌟 Hệ thống quản lý giáo dục hiện đại và toàn diện</h3>
  <p>Giải pháp công nghệ hỗ trợ quản lý trường học, lớp học, bài tập, kiểm tra và học tập trực tuyến</p>
</div>

---

## 📋 Mục lục

- [✨ Tính năng chính](#-tính-năng-chính)
- [🏗️ Kiến trúc hệ thống](#️-kiến-trúc-hệ-thống)
- [🚀 Cài đặt và chạy dự án](#-cài-đặt-và-chạy-dự-án)
- [📁 Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [🎯 Tính năng theo vai trò](#-tính-năng-theo-vai-trò)
- [🌐 Đa ngôn ngữ](#-đa-ngôn-ngữ)
- [🔐 Bảo mật](#-bảo-mật)
- [📱 Giao diện người dùng](#-giao-diện-người-dùng)
- [🔧 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [📈 Deployment](#-deployment)
- [🤝 Đóng góp](#-đóng-góp)
- [📄 License](#-license)

---

## ✨ Tính năng chính

### 🎯 Quản lý Toàn diện
- **👥 Quản lý người dùng**: Học sinh, giáo viên, phụ huynh, quản trị viên
- **🏫 Multi-tenant**: Hỗ trợ nhiều trường học trên cùng hệ thống
- **📚 Quản lý lớp học**: Tạo lớp, phân công giáo viên, đăng ký học sinh
- **📝 Bài tập & Kiểm tra**: Tạo, phân phối và chấm điểm tự động
- **📊 Báo cáo & Thống kê**: Dashboard chi tiết cho từng vai trò

### 🌟 Tính năng Nâng cao
- **🌐 Đa ngôn ngữ**: Hỗ trợ Tiếng Việt và Tiếng Anh
- **🌙 Dark/Light Mode**: Giao diện tối/sáng tùy chọn
- **📱 Responsive Design**: Tối ưu cho mọi thiết bị
- **🔔 Thông báo Realtime**: Cập nhật tức thì
- **📈 Analytics**: Phân tích hiệu suất học tập

---

## 🏗️ Kiến trúc hệ thống

```
EduCore
├── 🖥️  Frontend (React + Vite)
│   ├── ⚛️  React 19.1.1
│   ├── 🎨 TailwindCSS 4.1.11
│   ├── 🔄 React Router v7
│   ├── 📋 React Hook Form
│   ├── 🌐 i18next (Đa ngôn ngữ)
│   └── 🎭 React Icons
│
├── 🔧 Backend (Node.js + Express)
│   ├── 🟢 Node.js + Express
│   ├── 🍃 MongoDB + Mongoose
│   ├── 🔐 JWT Authentication
│   ├── 🔒 bcryptjs
│   └── 🌐 CORS
│
└── 📊 Database (MongoDB)
    ├── 👤 Users & Roles
    ├── 🏫 Schools (Multi-tenant)
    ├── 📚 Classes & Subjects
    ├── 📝 Assignments & Exams
    └── 📈 Analytics Data
```

---

## 🚀 Cài đặt và chạy dự án

### 📋 Yêu cầu hệ thống

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **MongoDB**: >= 5.0
- **Git**: Latest version

### ⚡ Cài đặt nhanh

```bash
# 1️⃣ Clone repository
git clone https://github.com/your-username/edu-core.git
cd edu-core

# 2️⃣ Cài đặt dependencies cho Server
cd server
npm install

# 3️⃣ Cài đặt dependencies cho Client
cd ../client
npm install

# 4️⃣ Cấu hình environment variables
cd ../server
cp .env.example .env
# Chỉnh sửa file .env với thông tin của bạn

# 5️⃣ Khởi chạy MongoDB
# Đảm bảo MongoDB đang chạy trên máy của bạn

# 6️⃣ Chạy ứng dụng
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

### 🔧 Cấu hình Environment

Tạo file `.env` trong thư mục `server/`:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/educore
DB_NAME=educore

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# CORS
CLIENT_URL=http://localhost:5173

# Email (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

---

## 📁 Cấu trúc thư mục

<details>
<summary>🖱️ Click để xem cấu trúc chi tiết</summary>

```
edu-core/
│
├── 📂 client/                          # Frontend React Application
│   ├── 📂 public/                      # Static assets
│   │   └── 📂 Images/                  # Public images
│   │
│   ├── 📂 src/
│   │   ├── 📂 Components/              # Reusable UI Components
│   │   │   ├── 📂 Layouts/            # Layout components
│   │   │   │   ├── DashboardLayout.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   └── 📂 UI/                 # Basic UI components
│   │   │       └── Button.jsx
│   │   │       └── ListItem.jsx        # Reusable list item
│   │   │
│   │   ├── 📂 Contexts/               # React Contexts
│   │   │   ├── AuthContext.jsx        # Authentication state
│   │   │   └── UIContext.jsx          # UI state (theme, sidebar, etc.)
│   │   │
│   │   ├── 📂 Hooks/                  # Custom React Hooks
│   │   │   ├── useAuth.js             # Authentication hook
│   │   │   ├── useFetch.js            # Data fetching hook
│   │   │   └── useUI.js               # UI state hook
│   │   │
│   │   ├── 📂 i18n/                   # Internationalization
│   │   │   ├── index.js               # i18n configuration
│   │   │   └── 📂 locales/            # Translation files
│   │   │       ├── en.json            # English translations
│   │   │       └── vi.json            # Vietnamese translations
│   │   │
│   │   ├── 📂 Lib/                    # Utility libraries
│   │   │   ├── apiClient.js           # API client configuration
│   │   │   └── utils.js               # Common utilities
│   │   │
│   │   ├── 📂 Pages/                  # Page components
│   │   │   ├── 📂 Auth/               # Authentication pages
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── RegisterPage.jsx
│   │   │   │   ├── TenantRegisterPage.jsx
│   │   │   │   └── TenantRegistrationSuccessPage.jsx
│   │   │   ├── 📂 Admin/              # Admin pages
│   │   │   │   ├── 📂 School/         # School management
│   │   │   │   └── 📂 System/         # System management
│   │   │   ├── 📂 Teacher/            # Teacher pages
│   │   │   ├── 📂 Student/            # Student pages
│   │   │   ├── 📂 Parent/             # Parent pages
│   │   │   ├── DashboardPage.jsx      # Main dashboard
│   │   │   ├── LandingPage.jsx        # Landing page
│   │   │   └── NotFoundPage.jsx       # 404 page
│   │   │
│   │   ├── 📂 Routes/                 # Routing configuration
│   │   │   └── index.jsx              # Main routes
│   │   │
│   │   ├── 📂 Services/               # API Services
│   │   │   ├── apiClient.service.js   # Base API client
│   │   │   ├── auth.service.js        # Authentication API
│   │   │   ├── assignment.service.js  # Assignment API
│   │   │   ├── class.service.js       # Class API
│   │   │   ├── exam.service.js        # Exam API
│   │   │   ├── question.service.js    # Question API
│   │   │   ├── submission.service.js  # Submission API
│   │   │   ├── tenant.service.js      # Tenant API
│   │   │   ├── user.service.js        # User API
│   │   │   └── index.js               # Service exports
│   │   │
│   │   ├── 📂 assets/                 # Application assets
│   │   │   └── 📂 Images/             # Image assets
│   │   │
│   │   ├── App.jsx                    # Main App component
│   │   ├── main.jsx                   # Application entry point
│   │   ├── App.css                    # Global styles
│   │   └── index.css                  # Base styles
│   │
│   ├── eslint.config.js               # ESLint configuration
│   ├── tailwind.config.js             # TailwindCSS configuration
│   ├── vite.config.js                 # Vite configuration
│   ├── package.json                   # Dependencies and scripts
│   └── index.html                     # HTML template
│
├── 📂 server/                          # Backend Node.js Application
│   ├── 📂 Configs/                    # Configuration files
│   │   └── db.js                      # Database configuration
│   │
│   ├── 📂 Controllers/                # Route controllers
│   │   ├── auth.controller.js         # Authentication logic
│   │   ├── assignment.controller.js   # Assignment logic
│   │   ├── class.controller.js        # Class logic
│   │   ├── exam.controller.js         # Exam logic
│   │   ├── question.controller.js     # Question logic
│   │   └── submission.controller.js   # Submission logic
│   │
│   ├── 📂 Middlewares/                # Express middlewares
│   │   ├── auth.middleware.js         # Authentication middleware
│   │   └── error.middleware.js        # Error handling middleware
│   │
│   ├── 📂 Models/                     # MongoDB schemas
│   │   ├── user.model.js              # User schema
│   │   ├── tenant.model.js            # Tenant (school) schema
│   │   ├── class.model.js             # Class schema
│   │   ├── assignment.model.js        # Assignment schema
│   │   ├── exam.model.js              # Exam schema
│   │   ├── question.model.js          # Question schema
│   │   ├── submission.model.js        # Submission schema
│   │   ├── subject.model.js           # Subject schema
│   │   ├── schedule.model.js          # Schedule schema
│   │   ├── notification.model.js      # Notification schema
│   │   └── log.model.js               # System log schema
│   │
│   ├── 📂 Routes/                     # API routes
│   │   ├── auth.routes.js             # Authentication routes
│   │   ├── assignment.routes.js       # Assignment routes
│   │   ├── class.routes.js            # Class routes
│   │   ├── exam.routes.js             # Exam routes
│   │   ├── question.routes.js         # Question routes
│   │   └── submission.routes.js       # Submission routes
│   │
│   ├── 📂 Services/                   # Business logic services
│   │   ├── assignment.service.js      # Assignment business logic
│   │   ├── class.service.js           # Class business logic
│   │   ├── exam.service.js            # Exam business logic
│   │   ├── question.service.js        # Question business logic
│   │   ├── submission.service.js      # Submission business logic
│   │   └── user.service.js            # User business logic
│   │
│   ├── 📂 Utils/                      # Utility functions
│   │   └── apiFeatures.js             # API helper functions
│   │
│   ├── 📄 Documentation files         # API and feature documentation
│   │   ├── APIFEATURES_IMPLEMENTATION.md
│   │   ├── ASSIGNMENT_SUBMISSION_README.md
│   │   ├── AUTH_README.md
│   │   ├── QUESTION_EXAM_README.md
│   │   └── TRANSACTION_IMPROVEMENTS.md
│   │
│   ├── index.js                       # Server entry point
│   └── package.json                   # Dependencies and scripts
│
├── README.md                          # Project documentation
└── .gitignore                         # Git ignore rules
```

</details>

---

## 🎯 Tính năng theo vai trò

### 👨‍🎓 Học sinh (Student)
- 📊 **Dashboard cá nhân**: Lịch học, điểm số, thông báo
- 📚 **Lớp học**: Xem danh sách lớp, tài liệu học tập
- 📝 **Bài tập**: Làm bài tập, nộp bài, xem kết quả
- 📋 **Kiểm tra**: Tham gia kiểm tra trực tuyến
- 📈 **Tiến độ học tập**: Theo dõi điểm số và tiến độ

### 👨‍🏫 Giáo viên (Teacher)
- 📊 **Dashboard giảng dạy**: Quản lý lớp học, tiến độ giảng dạy
- 👥 **Quản lý lớp**: Danh sách học sinh, điểm danh
- 📝 **Tạo bài tập**: Soạn đề, phân phối, chấm điểm
- 📋 **Tạo kiểm tra**: Tạo đề thi, quản lý kỳ thi
- 📊 **Báo cáo**: Thống kê điểm số, tiến độ học tập

### 👨‍👩‍👧‍👦 Phụ huynh (Parent)
- 👀 **Theo dõi con**: Điểm số, lịch học, thông báo
- 📞 **Liên lạc**: Trao đổi với giáo viên
- 📊 **Báo cáo tiến độ**: Xem báo cáo học tập định kỳ

### 👨‍💼 Quản trị viên (Admin)
- 🏫 **Quản lý trường**: Thông tin trường, cấu hình hệ thống
- 👥 **Quản lý người dùng**: Tạo tài khoản, phân quyền
- 📚 **Quản lý môn học**: Tạo môn học, phân công giáo viên
- 📊 **Thống kê tổng quan**: Báo cáo toàn trường

### 🔧 Quản trị hệ thống (System Admin)
- 🌐 **Multi-tenant**: Quản lý nhiều trường học
- ⚙️ **Cấu hình hệ thống**: Tham số, tính năng
- 🛡️ **Bảo mật**: Quản lý quyền truy cập, audit log
- 📈 **Monitoring**: Theo dõi hiệu suất hệ thống

---

## 🌐 Đa ngôn ngữ

Hệ thống hỗ trợ đa ngôn ngữ với **i18next**:

### 🗣️ Ngôn ngữ được hỗ trợ
- 🇻🇳 **Tiếng Việt** (Mặc định)
- 🇺🇸 **English**

### 📝 Cách thêm ngôn ngữ mới

1. Tạo file translation mới trong `client/src/i18n/locales/`
2. Thêm cấu hình trong `client/src/i18n/index.js`
3. Update UI để hiển thị option chọn ngôn ngữ

```javascript
// Ví dụ sử dụng translation
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <h1>{t('common.welcome')}</h1>
  );
}
```

---

## 🔐 Bảo mật

### 🛡️ Các biện pháp bảo mật

- **🔐 JWT Authentication**: Xác thực bằng JSON Web Token
- **🔒 Password Hashing**: Mã hóa mật khẩu với bcryptjs
- **🛡️ Role-based Access Control**: Phân quyền theo vai trò
- **🌐 CORS Protection**: Bảo vệ Cross-Origin requests
- **🔍 Input Validation**: Kiểm tra dữ liệu đầu vào
- **🚫 XSS Protection**: Chống tấn công Cross-Site Scripting

### 🔑 Vai trò và quyền hạn

```javascript
// Hệ thống phân quyền
const roles = {
  student: ['read:own-data'],
  teacher: ['read:class-data', 'write:assignments'],
  admin: ['read:school-data', 'write:school-data'],
  sys_admin: ['read:all', 'write:all']
};
```

---

## 📱 Giao diện người dùng

### 🎨 Design System

- **🎭 Framework**: TailwindCSS 4.1.11
- **🌙 Dark/Light Mode**: Tự động chuyển đổi
- **📱 Responsive**: Mobile-first approach
- **♿ Accessibility**: WCAG 2.1 compliant
- **🎯 Components**: Tái sử dụng và module hóa

### 🎪 Tính năng UI/UX

- ✨ **Smooth Animations**: Chuyển động mượt mà
- 🔔 **Toast Notifications**: Thông báo thân thiện
- 📊 **Interactive Charts**: Biểu đồ tương tác
- 🔍 **Smart Search**: Tìm kiếm thông minh
- 💾 **Auto Save**: Tự động lưu dữ liệu

---

## 🔧 API Documentation

### 📡 Base URL
```
Development: http://localhost:5000/api
Production: https://api.educore.vn/api
```

### 🔐 Authentication Endpoints

<details>
<summary>🔑 Auth APIs</summary>

```javascript
// Đăng nhập
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Đăng ký
POST /auth/register
{
  "fullName": "Nguyen Van A",
  "email": "user@example.com",
  "password": "password123",
  "role": "student"
}

// Làm mới token
POST /auth/refresh
{
  "refreshToken": "your_refresh_token"
}

// Đăng xuất
POST /auth/logout
Headers: { Authorization: "Bearer your_token" }
```

</details>

### 📚 Resource Endpoints

<details>
<summary>📖 Resource APIs</summary>

```javascript
// Classes
GET    /classes              // Lấy danh sách lớp
POST   /classes              // Tạo lớp mới
GET    /classes/:id          // Lấy thông tin lớp
PUT    /classes/:id          // Cập nhật lớp
DELETE /classes/:id          // Xóa lớp

// Assignments
GET    /assignments          // Lấy danh sách bài tập
POST   /assignments          // Tạo bài tập mới
GET    /assignments/:id      // Lấy thông tin bài tập
PUT    /assignments/:id      // Cập nhật bài tập
DELETE /assignments/:id      // Xóa bài tập

// Exams
GET    /exams               // Lấy danh sách kiểm tra
POST   /exams               // Tạo kiểm tra mới
GET    /exams/:id           // Lấy thông tin kiểm tra
PUT    /exams/:id           // Cập nhật kiểm tra
DELETE /exams/:id           // Xóa kiểm tra
```

</details>

---

## 🧪 Testing

### 🔍 Test Strategy

```bash
# Frontend Testing
cd client
npm run test          # Unit tests with Vitest
npm run test:e2e      # E2E tests with Playwright
npm run test:coverage # Coverage report

# Backend Testing
cd server
npm run test          # Unit tests with Jest
npm run test:integration # Integration tests
```

### 📊 Test Coverage

- **Unit Tests**: Components, hooks, utilities
- **Integration Tests**: API endpoints, database operations
- **E2E Tests**: User workflows, critical paths

---

## 📈 Deployment

### 🚀 Production Deployment

<details>
<summary>🔧 Deploy với Docker</summary>

```dockerfile
# Dockerfile.client
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]

# Dockerfile.server
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  client:
    build: ./client
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
  
  server:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/educore
    depends_on:
      - mongo
  
  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

</details>

### ☁️ Cloud Deployment Options

- **🔹 Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **🔹 Backend**: Heroku, AWS EC2, Digital Ocean
- **🔹 Database**: MongoDB Atlas, AWS DocumentDB

---

## 🤝 Đóng góp

### 📝 Quy trình đóng góp

1. **🍴 Fork** repository
2. **🌿 Tạo branch** cho feature: `git checkout -b feature/amazing-feature`
3. **💾 Commit** changes: `git commit -m 'Add amazing feature'`
4. **📤 Push** to branch: `git push origin feature/amazing-feature`
5. **🔄 Tạo Pull Request**

### 📋 Coding Standards

- **✅ ESLint**: Code linting
- **🎨 Prettier**: Code formatting
- **📝 JSDoc**: Documentation
- **🧪 Tests**: Bắt buộc cho mọi feature mới

### 🐛 Bug Reports

Khi báo cáo bug, vui lòng cung cấp:
- 📱 Môi trường (OS, Browser, Version)
- 🔍 Các bước tái tạo lỗi
- 📸 Screenshots (nếu có)
- 📝 Log errors

---

## 📞 Liên hệ & Hỗ trợ

<div align="center">

### 💬 Cần hỗ trợ?

📧 **Email**: [qh20812@gmail.com](mailto:qh20812@gmail.com) 
🌐 **Website**: educore.vn

### 👥 Team

**🧑‍💻 Lead Developer**: [Huỳnh Ngọc Quí](mailto:quihn.124010124091@vtc.edu.vn)
**🎨 UI/UX Designer**: [Mai Xuân Gia Quyến, Trần Phương Khôi](mailto:quyenmxq.124010124083@vtc.edu.vn)
**📊 Product Manager**: [Huỳnh Ngọc Quí, Võ Nguyễn Vỹ Khang](mailto:quihn.124010124091@vtc.edu.vn)
**📈 Marketing**: [Đặng Thị Trúc Linh](mailto:linhdtt.125020124041@vtc.edu.vn)

</div>

---

## 📄 License

```
MIT License

Copyright (c) 2025 EduCore Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">
  <h3>🌟 Cảm ơn bạn đã quan tâm đến EduCore!</h3>
  <p>Nếu dự án hữu ích, hãy cho chúng tôi một ⭐ trên GitHub!</p>
  
  <img src="https://img.shields.io/github/stars/your-username/edu-core?style=social" alt="GitHub Stars" />
  <img src="https://img.shields.io/github/forks/your-username/edu-core?style=social" alt="GitHub Forks" />
  <img src="https://img.shields.io/github/watchers/your-username/edu-core?style=social" alt="GitHub Watchers" />
</div>