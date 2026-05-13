# vanchuyen

# CRD TRANSPORT - Next.js Full Stack Application với Firebase

Hệ thống quản lý vận chuyển quốc tế với đầy đủ tính năng đăng nhập, dashboard, và quản lý đơn hàng.

## 🚀 Quick Start

```bash
# 1. Cài đặt dependencies
npm install

# 2. Sửa lỗ hổng bảo mật (nếu có)
npm audit fix

# 3. Tạo Firebase project và cấu hình .env.local
# Xem file FIREBASE_SETUP.md để biết chi tiết

# 4. Chạy development server
npm run dev

# 5. Mở trình duyệt
# http://localhost:3000
```

## 📋 Tài liệu chi tiết

- **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)** - Hướng dẫn thiết lập Firebase từng bước
- **[SETUP.md](SETUP.md)** - Hướng dẫn cài đặt đầy đủ

## ✨ Tính năng chính

- ✅ Đăng ký/Đăng nhập người dùng (Firebase Authentication)
- ✅ Dashboard quản lý với thống kê
- ✅ Tạo và theo dõi đơn hàng
- ✅ Phân quyền Admin/User
- ✅ Quản lý thông tin cá nhân
- ✅ Real-time updates với Firestore
- ✅ Responsive design với Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Backend**: Firebase (Authentication + Firestore)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 📁 Cấu trúc dự án

```
vanchuyen/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── page.tsx          # Trang chủ (redirect)
│   │   ├── login/            # Trang đăng nhập
│   │   ├── register/         # Trang đăng ký
│   │   ├── dashboard/        # Dashboard
│   │   └── orders/           # Quản lý đơn hàng
│   │       ├── page.tsx      # Danh sách
│   │       ├── create/       # Tạo đơn mới
│   │       └── [id]/         # Chi tiết đơn
│   ├── lib/
│   │   ├── firebase.ts       # Firebase config
│   │   ├── auth.ts           # Auth service
│   │   └── orders.ts         # Orders service
│   └── types/
│       └── index.ts          # TypeScript types
├── Img/                      # Assets từ website cũ
├── index.html                # Website HTML cũ (giữ lại)
├── style.css                 # CSS website cũ
├── .env.local                # Firebase config (KHÔNG commit!)
├── FIREBASE_SETUP.md         # Hướng dẫn Firebase
└── README.md                 # File này
```

## 🔐 Bảo mật

- File `.env.local` chứa thông tin nhạy cảm, **KHÔNG** commit lên Git
- Đã được thêm vào `.gitignore`
- Firestore Rules được cấu hình bảo mật

## 👤 Tạo tài khoản Admin

1. Đăng ký tài khoản mới tại `/register`
2. Vào Firebase Console > Firestore Database
3. Tìm collection `users` > document của user
4. Sửa field `role` từ `user` thành `admin`
5. Đăng xuất và đăng nhập lại

## 📊 Collections trong Firestore

### `users`
```typescript
{
  uid: string
  email: string
  name: string
  role: 'admin' | 'user'
  createdAt: timestamp
}
```

### `orders`
```typescript
{
  id: string
  userId: string
  customerName: string
  customerPhone: string
  origin: string
  destination: string
  weight: number
  price: number
  status: 'pending' | 'in-transit' | 'delivered' | 'cancelled'
  createdAt: timestamp
  updatedAt: timestamp
}
```

## 🌐 Website cũ (HTML)

Website HTML tĩnh vẫn được giữ lại:
- Mở file `index.html` để xem
- Chứa thông tin về công ty, dịch vụ, bảng giá
- Có thể dùng làm landing page

## 📞 Liên hệ & Hỗ trợ

**CRD TRANSPORT**
- 📞 Hotline: 0912597313
- 📧 Email: crdtransport2023@gmail.com
- 🏢 Địa chỉ: Thanh Xuan, Ha Noi
- 🌐 Website cũ: [index.html](./index.html)

## 🚨 Troubleshooting

### Lỗi SWC Binary trên Windows
```
⚠ Failed to load SWC binary for win32/x64
```

**Giải pháp 1:** Cài lại dependencies
```bash
# Xóa và cài lại
rm -rf node_modules package-lock.json
npm install --force
```

**Giải pháp 2:** Cài Visual C++ Redistributable
- Tải: https://aka.ms/vs/17/release/vc_redist.x64.exe
- Cài đặt và restart máy
- Chạy lại: `npm run dev`

**Giải pháp 3:** Disable SWC
Sửa `next.config.js`:
```javascript
const nextConfig = {
  swcMinify: false,
  // ...existing code...
}
```

**Giải pháp 4:** Downgrade Next.js
```bash
npm install next@14.0.4 --save-exact
npm install
npm run dev
```

### Lỗi "Firebase config not found"
```bash
# Kiểm tra file .env.local đã tạo chưa
# Restart dev server
Ctrl + C
npm run dev
```

### Lỗi "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Lỗi "Permission denied" (Firestore)
- Kiểm tra Firestore Rules
- Kiểm tra user đã đăng nhập chưa
- Xem Console log

## 📝 Scripts

```bash
npm run dev      # Chạy development server
npm run build    # Build production
npm start        # Chạy production build
npm run lint     # Lint code
```

---

© 2025 CRD TRANSPORT - *Đối tác tin cậy cho mọi hành trình của bạn*