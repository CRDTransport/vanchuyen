// PWA Install Prompt and Offline Detection for CRD Transport
class PWAHandler {
  constructor() {
    this.deferredPrompt = null;
    this.init();
  }

  init() {
    // Listen for the beforeinstallprompt event - but don't show prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      // Don't show install prompt - user can manually install via browser menu
    });

    // Listen for successful installation
    window.addEventListener('appinstalled', (evt) => {
      console.log('PWA was installed successfully');
    });

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('PWA is running in standalone mode');
    }

    // Offline detection - only show when actually offline
    this.setupOfflineDetection();
  }

  showSubtleInstallPrompt() {
    // This method is disabled - users can install manually via browser menu
    console.log('Install prompt disabled - users can install via browser menu');
  }

  hideInstallPrompt() {
    // No prompt to hide since it's disabled
  }

  async installApp() {
    // Manual installation via browser menu
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    this.deferredPrompt = null;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  }

  setupOfflineDetection() {
    // Create offline indicator - only show when actually offline
    const offlineIndicator = document.createElement('div');
    offlineIndicator.className = 'offline-indicator';
    offlineIndicator.innerHTML = '<i class="fas fa-wifi-slash"></i> Offline';
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