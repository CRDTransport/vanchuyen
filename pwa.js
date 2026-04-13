// PWA Install Prompt and Offline Detection for CRD Transport
class PWAHandler {
  constructor() {
    this.deferredPrompt = null;
    this.init();
  }

  init() {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      this.deferredPrompt = e;
      // Show the install prompt
      this.showInstallPrompt();
    });

    // Listen for successful installation
    window.addEventListener('appinstalled', (evt) => {
      console.log('PWA was installed successfully');
      this.hideInstallPrompt();
    });

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('PWA is running in standalone mode');
    }

    // Offline detection
    this.setupOfflineDetection();
  }

  showInstallPrompt() {
    const prompt = document.createElement('div');
    prompt.className = 'pwa-install-prompt show';
    prompt.innerHTML = `
      <div>
        <strong>Cài đặt CRD Transport</strong><br>
        <small>Thêm vào màn hình chính để trải nghiệm tốt hơn</small>
      </div>
      <button class="install-btn" onclick="pwaHandler.installApp()">Cài đặt</button>
      <button class="close-btn" onclick="pwaHandler.hideInstallPrompt()">×</button>
    `;

    document.body.appendChild(prompt);

    // Auto-hide after 10 seconds
    setTimeout(() => {
      this.hideInstallPrompt();
    }, 10000);
  }

  hideInstallPrompt() {
    const prompt = document.querySelector('.pwa-install-prompt');
    if (prompt) {
      prompt.classList.remove('show');
      setTimeout(() => {
        prompt.remove();
      }, 300);
    }
  }

  async installApp() {
    if (!this.deferredPrompt) return;

    // Show the install prompt
    this.deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await this.deferredPrompt.userChoice;

    // Reset the deferred prompt
    this.deferredPrompt = null;

    // Hide the install prompt
    this.hideInstallPrompt();

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  }

  setupOfflineDetection() {
    // Create offline indicator
    const offlineIndicator = document.createElement('div');
    offlineIndicator.className = 'offline-indicator';
    offlineIndicator.textContent = 'Không có kết nối internet';
    document.body.appendChild(offlineIndicator);

    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.hideOfflineIndicator();
    });

    window.addEventListener('offline', () => {
      this.showOfflineIndicator();
    });

    // Check initial state
    if (!navigator.onLine) {
      this.showOfflineIndicator();
    }
  }

  showOfflineIndicator() {
    const indicator = document.querySelector('.offline-indicator');
    if (indicator) {
      indicator.classList.add('show');
    }
  }

  hideOfflineIndicator() {
    const indicator = document.querySelector('.offline-indicator');
    if (indicator) {
      indicator.classList.remove('show');
    }
  }
}

// Initialize PWA handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.pwaHandler = new PWAHandler();
});

// Register service worker if available (for future caching features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Note: GitHub Pages has limitations with service workers
    // This is prepared for when you move to a different hosting
    console.log('Service Worker support detected');
  });
}