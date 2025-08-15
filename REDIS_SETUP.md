# Redis Setup Guide for Edu_Core Project

## Tổng quan
Dự án Edu_Core sử dụng Redis để cache dữ liệu và tăng hiệu suất. Tuy nhiên, hệ thống đã được thiết kế để hoạt động mà không cần Redis thông qua memory cache fallback.

## Tùy chọn 1: Chạy mà không cần Redis (Khuyến nghị cho Development)

Server hiện tại đã được cấu hình để hoạt động mà không cần Redis. Khi Redis không khả dụng, hệ thống sẽ sử dụng memory cache như fallback.

Trong file `.env`:
```env
REDIS_ENABLED=false
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
```

## Tùy chọn 2: Cài đặt Redis Server + CLI + Client Tools

### Cách 1: Sử dụng WSL (Windows Subsystem for Linux) - Khuyến nghị

1. **Cài đặt WSL:**
   ```powershell
   # Mở PowerShell với quyền Administrator
   wsl --install Ubuntu
   # Khởi động lại máy tính
   ```

2. **Cài đặt Redis Server và CLI:**
   ```bash
   # Mở WSL terminal
   sudo apt update
   sudo apt install redis-server redis-tools -y
   ```

3. **Cấu hình Redis:**
   ```bash
   # Chỉnh sửa file config
   sudo nano /etc/redis/redis.conf
   
   # Tìm và sửa các dòng sau:
   # bind 127.0.0.1 ::1  -> bind 0.0.0.0
   # protected-mode yes  -> protected-mode no
   ```

4. **Khởi động Redis:**
   ```bash
   sudo service redis-server start
   
   # Hoặc chạy Redis ở foreground để debug
   redis-server
   ```

5. **Kiểm tra Redis CLI:**
   ```bash
   # Test kết nối
   redis-cli ping
   # Kết quả mong đợi: PONG
   
   # Test basic commands
   redis-cli
   127.0.0.1:6379> SET test "Hello Redis"
   127.0.0.1:6379> GET test
   127.0.0.1:6379> DEL test
   127.0.0.1:6379> EXIT
   ```

### Cách 2: Sử dụng Docker (Dễ quản lý)

1. **Cài đặt Docker Desktop:**
   - Tải về từ: https://www.docker.com/products/docker-desktop

2. **Chạy Redis container với persistent storage:**
   ```powershell
   # Tạo volume để lưu trữ dữ liệu
   docker volume create redis_data
   
   # Chạy Redis server
   docker run -d `
     --name redis-server `
     -p 6379:6379 `
     -v redis_data:/data `
     redis:7-alpine redis-server --appendonly yes
   ```

3. **Sử dụng Redis CLI thông qua Docker:**
   ```powershell
   # Kết nối với Redis CLI
   docker exec -it redis-server redis-cli
   
   # Hoặc chạy lệnh trực tiếp
   docker exec redis-server redis-cli ping
   ```

4. **Quản lý Redis container:**
   ```powershell
   # Khởi động
   docker start redis-server
   
   # Dừng
   docker stop redis-server
   
   # Khởi động lại
   docker restart redis-server
   
   # Xem logs
   docker logs redis-server
   ```
   ```

### Cách 3: Redis GUI Client Tools (Tuỳ chọn)

Để quản lý và monitor Redis dễ dàng hơn, bạn có thể cài đặt các GUI tools:

1. **RedisInsight (Khuyến nghị - Free từ Redis Labs):**
   ```powershell
   # Tải về từ: https://redis.com/redis-enterprise/redis-insight/
   # Hoặc chạy qua Docker:
   docker run -d `
     --name redisinsight `
     -p 5540:5540 `
     redis/redisinsight:latest
   # Truy cập: http://localhost:5540
   ```

2. **Redis Desktop Manager (RDM):**
   ```powershell
   # Tải về từ: https://github.com/luckeyproductions/rdm
   # Phiên bản community miễn phí
   ```

3. **TablePlus (Commercial):**
   ```powershell
   # Tải về từ: https://tableplus.com/
   # Hỗ trợ nhiều database bao gồm Redis
   ```

### Cách 4: Sử dụng Redis Cloud (Khuyến nghị cho Production)

1. **Đăng ký tài khoản Redis Cloud:**
   - Website: https://redis.com/redis-cloud/
   - Plan miễn phí: 30MB, 30 connections

2. **Tạo database và lấy connection string**

3. **Cập nhật file .env:**
   ```env
   REDIS_ENABLED=true
   REDIS_HOST=your-redis-cloud-endpoint.c1.cloud.redislabs.com
   REDIS_PORT=12345
   REDIS_PASSWORD=your-password
   REDIS_DB=0
   ```

## Redis CLI Commands cho Edu_Core Project

### Basic Commands
```bash
# Kết nối Redis CLI
redis-cli

# Hoặc kết nối với authentication
redis-cli -h localhost -p 6379 -a your-password

# Test kết nối
ping

# Xem tất cả keys
keys *

# Xem keys theo pattern
keys user:*
keys tenant:*
keys cache:*
```

### Cache Management Commands
```bash
# Xem thông tin memory
info memory

# Xóa cache cụ thể
del "user:12345"
del "tenant:abc123"

# Xóa tất cả cache (cẩn thận!)
flushall

# Xóa cache theo pattern
eval "return redis.call('del', unpack(redis.call('keys', ARGV[1])))" 0 "user:*"

# Xem TTL của key
ttl "user:12345"

# Set TTL cho key
expire "user:12345" 300

# Monitor real-time commands
monitor

# Xem stats
info stats
```

### Debugging và Monitoring
```bash
# Xem slow queries
slowlog get 10

# Xem client connections
client list

# Xem keyspace info
info keyspace

# Memory usage của key cụ thể
memory usage "user:12345"

# Benchmark performance
redis-benchmark -h localhost -p 6379 -c 50 -n 10000
```

## Cấu hình Environment Variables

Cập nhật file `.env` để sử dụng Redis:

```env
# Redis Configuration
REDIS_ENABLED=true
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# Cache TTL Settings (giây)
CACHE_DEFAULT_TTL=1800    # 30 phút
CACHE_SHORT_TTL=300       # 5 phút
CACHE_MEDIUM_TTL=1800     # 30 phút
CACHE_LONG_TTL=7200       # 2 giờ
```

## Testing Redis Integration

Sau khi cài đặt Redis, test integration với dự án:

```powershell
# Khởi động server
cd C:\Users\qh208\OneDrive\Desktop\Workspace\Edu_Core\server
npm start

# Trong log, bạn sẽ thấy:
# ✅ Redis connected successfully
# 💾 Redis Cache: ✅ Connected
```

### Test Cache Performance

```bash
# Trong Redis CLI, monitor cache hits
redis-cli monitor

# Trong ứng dụng, thực hiện một số request để xem cache hoạt động
# Bạn sẽ thấy các commands như:
# SET "user:12345" "..." EX 1800
# GET "user:12345"
```

## Troubleshooting

### Redis không kết nối được
```bash
# Kiểm tra Redis service
sudo service redis-server status

# Khởi động lại Redis
sudo service redis-server restart

# Kiểm tra port đang được sử dụng
netstat -tlnp | grep :6379
```

### Memory issues
```bash
# Kiểm tra memory usage
redis-cli info memory

# Set max memory limit
redis-cli config set maxmemory 256mb
redis-cli config set maxmemory-policy allkeys-lru
```

### Performance tuning
```bash
# Tăng client timeout
redis-cli config set timeout 300

# Tối ưu persistence
redis-cli config set save ""
redis-cli config set appendonly yes
```
   ```env
   REDIS_ENABLED=true
   REDIS_HOST=your-redis-cloud-host
   REDIS_PORT=your-redis-cloud-port
   REDIS_PASSWORD=your-redis-cloud-password
   ```

## Kích hoạt Redis

Sau khi cài đặt Redis, cập nhật file `.env`:

```env
REDIS_ENABLED=true
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

Khởi động lại server:
```powershell
npm start
```

## Lợi ích của Redis

1. **Tăng hiệu suất:** Cache dữ liệu thường xuyên truy cập
2. **Giảm tải database:** Ít truy vấn database hơn
3. **Tốc độ phản hồi nhanh:** Dữ liệu được lưu trong memory
4. **Phân tán tải:** Dễ scale horizontal

## Monitoring Redis

Khi Redis hoạt động, bạn có thể monitor qua:

1. **Health check endpoint:**
   ```
   GET http://localhost:5000/health
   ```

2. **Redis CLI:**
   ```bash
   redis-cli info memory
   redis-cli info stats
   ```

3. **Server logs:** Kiểm tra console output khi server khởi động

## Troubleshooting

### Redis không kết nối được:
- Kiểm tra Redis service có đang chạy không
- Kiểm tra port 6379 có bị block không
- Kiểm tra firewall settings

### Memory cache fallback:
- Server sẽ tự động chuyển sang memory cache
- Không ảnh hưởng đến functionality
- Performance sẽ giảm nhẹ do không có persistent cache
