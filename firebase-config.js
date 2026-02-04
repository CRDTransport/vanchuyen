// Firebase Configuration for CRD Transport - ES Modules Version 12.8.0
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, sendPasswordResetEmail, updateProfile, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoXC5OIwzU5Y10RVRofubfOAdLaKajZdI",
  authDomain: "crd-transport-a0638.firebaseapp.com",
  projectId: "crd-transport-a0638",
  storageBucket: "crd-transport-a0638.firebasestorage.app",
  messagingSenderId: "637864243970",
  appId: "1:637864243970:web:e99d44e45f2385e884481b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Auth state observer
onAuthStateChanged(auth, (user) => {
  updateUIForAuth(user);
});

// Cập nhật UI dựa trên trạng thái đăng nhập
function updateUIForAuth(user) {
  const authBtn = document.getElementById('auth-btn');
  
  if (user) {
    // User đã đăng nhập
    if (authBtn) {
      const displayName = user.displayName || user.email.split('@')[0];
      authBtn.innerHTML = `
        <div class="user-dropdown">
          <button class="btn-user" onclick="toggleUserMenu()">
            <i class="fas fa-user-circle"></i>
            <span>${displayName}</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="user-menu" id="user-menu">
            <a href="#" onclick="viewProfile()"><i class="fas fa-user"></i> Tài khoản</a>
            <a href="#" onclick="viewOrders()"><i class="fas fa-box"></i> Đơn hàng</a>
            <a href="#" onclick="handleSignOut()"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a>
          </div>
        </div>
      `;
    }
  } else {
    // User chưa đăng nhập
    if (authBtn) {
      authBtn.innerHTML = `
        <a href="login.html" class="btn-login">
          <i class="fas fa-user"></i> Đăng nhập
        </a>
      `;
    }
  }
}

// Toggle user menu
window.toggleUserMenu = function() {
  const menu = document.getElementById('user-menu');
  if (menu) {
    menu.classList.toggle('show');
  }
}

// Đăng ký tài khoản mới
window.signUp = async function(email, password, displayName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(userCredential.user, { displayName: displayName });
    }
    console.log('Đăng ký thành công:', userCredential.user);
    showNotification('Đăng ký thành công! Chào mừng bạn đến với CRD Transport.', 'success');
    return userCredential.user;
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    let errorMessage = 'Đã xảy ra lỗi khi đăng ký.';
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Email này đã được sử dụng.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Email không hợp lệ.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Mật khẩu phải có ít nhất 6 ký tự.';
        break;
    }
    showNotification(errorMessage, 'error');
    throw error;
  }
}

// Đăng nhập
window.signIn = async function(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Đăng nhập thành công:', userCredential.user);
    showNotification('Đăng nhập thành công!', 'success');
    return userCredential.user;
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    let errorMessage = 'Đã xảy ra lỗi khi đăng nhập.';
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'Không tìm thấy tài khoản với email này.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Mật khẩu không chính xác.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Email không hợp lệ.';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Email hoặc mật khẩu không chính xác.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Quá nhiều lần thử. Vui lòng thử lại sau.';
        break;
    }
    showNotification(errorMessage, 'error');
    throw error;
  }
}

// Đăng xuất
window.handleSignOut = async function() {
  try {
    await firebaseSignOut(auth);
    showNotification('Đã đăng xuất thành công!', 'success');
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Lỗi đăng xuất:', error);
    showNotification('Đã xảy ra lỗi khi đăng xuất.', 'error');
  }
}

// Gửi email đặt lại mật khẩu
window.resetPassword = async function(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    showNotification('Email đặt lại mật khẩu đã được gửi!', 'success');
  } catch (error) {
    console.error('Lỗi đặt lại mật khẩu:', error);
    let errorMessage = 'Đã xảy ra lỗi.';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Không tìm thấy tài khoản với email này.';
    }
    showNotification(errorMessage, 'error');
    throw error;
  }
}

// Google Sign In
window.signInWithGoogle = async function() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    showNotification('Đăng nhập với Google thành công!', 'success');
    return result.user;
  } catch (error) {
    console.error(error);
    showNotification('Không thể đăng nhập với Google. Vui lòng thử lại.', 'error');
    throw error;
  }
}

// Facebook Sign In
window.signInWithFacebook = async function() {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    showNotification('Đăng nhập với Facebook thành công!', 'success');
    return result.user;
  } catch (error) {
    console.error(error);
    showNotification('Không thể đăng nhập với Facebook. Vui lòng thử lại.', 'error');
    throw error;
  }
}

// Hiển thị thông báo
window.showNotification = function(message, type = 'info') {
  // Xóa notification cũ nếu có
  const existingNotification = document.querySelector('.firebase-notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = `firebase-notification ${type}`;
  notification.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
    <span>${message}</span>
    <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
  `;
  document.body.appendChild(notification);

  // Tự động ẩn sau 5 giây
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Lấy user hiện tại
window.getCurrentUser = function() {
  return auth.currentUser;
}

// Kiểm tra trạng thái đăng nhập
window.isLoggedIn = function() {
  return auth.currentUser !== null;
}

// View profile - redirect to account page
window.viewProfile = function() {
  window.location.href = 'account.html#profile';
}

// View orders - redirect to account page
window.viewOrders = function() {
  window.location.href = 'account.html#orders';
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.user-dropdown')) {
    const menu = document.getElementById('user-menu');
    if (menu) {
      menu.classList.remove('show');
    }
  }
});

// Export auth for use in other modules
export { auth, app };
