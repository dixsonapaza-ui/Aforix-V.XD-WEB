/* ============================================
   JAVASCRIPT PRINCIPAL - AFORIX
   ============================================ */

// ============================================
// CONFIGURACIÓN Y UTILIDADES
// ============================================

const API_BASE_URL = '';

// Utilidades
const utils = {
  // Formatear fecha
  formatDate: (dateString) => {
    if (!dateString) return '--';
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  },
  
  // Mostrar notificación
  showNotification: (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  },
  
  // Validar email
  validateEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  
  // Loading overlay
  showLoading: () => {
    let overlay = document.getElementById('loading-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'loading-overlay';
      overlay.className = 'loading-overlay';
      overlay.innerHTML = '<div class="spinner"></div>';
      document.body.appendChild(overlay);
    }
    overlay.style.display = 'flex';
  },
  
  hideLoading: () => {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  }
};

// ============================================
// GESTIÓN DE LOGIN (Frontend Only)
// ============================================

const auth = {
  // Verificar si está logueado
  isAuthenticated: () => {
    return localStorage.getItem('aforix_auth') === 'true';
  },
  
  // Login (simulado)
  login: (username, password) => {
    // Validación básica
    if (!username || !password) {
      utils.showNotification('Por favor completa todos los campos', 'error');
      return false;
    }
    
    // Simulación de login (en producción conectarías con backend)
    if (username && password.length >= 4) {
      localStorage.setItem('aforix_auth', 'true');
      localStorage.setItem('aforix_user', username);
      utils.showNotification('¡Bienvenido!', 'success');
      return true;
    } else {
      utils.showNotification('Credenciales inválidas', 'error');
      return false;
    }
  },
  
  // Logout
  logout: () => {
    localStorage.removeItem('aforix_auth');
    localStorage.removeItem('aforix_user');
    window.location.href = '/login/';
  },
  
  // Obtener usuario actual
  getCurrentUser: () => {
    return localStorage.getItem('aforix_user') || 'Usuario';
  }
};

// ============================================
// API CLIENT
// ============================================

const api = {
  // GET request
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  },
  
  // POST request
  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  },
  
  // DELETE request
  delete: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.ok;
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  }
};

// ============================================
// GESTIÓN DE BARRAS DE PROGRESO RESPONSIVE
// ============================================

const progressBar = {
  // Actualizar barra de progreso con animación
  update: (elementId, percentage, options = {}) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const { animate = true, showLabel = true, minWidth = 20 } = options;
    
    // Determinar color según porcentaje
    let colorClass = 'bg-success';
    if (percentage >= 90) {
      colorClass = 'bg-danger';
    } else if (percentage >= 60) {
      colorClass = 'bg-warning';
    }
    
    // Remover clases anteriores
    element.classList.remove('bg-success', 'bg-warning', 'bg-danger');
    element.classList.add(colorClass);
    
    // Asegurar ancho mínimo para visibilidad
    const finalPercentage = percentage < minWidth && percentage > 0 ? minWidth : percentage;
    
    if (animate) {
      element.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    element.style.width = `${Math.min(finalPercentage, 100)}%`;
    
    // Mostrar porcentaje como label
    if (showLabel && percentage > 0) {
      element.textContent = `${Math.round(percentage)}%`;
    } else {
      element.textContent = '';
    }
    
    // Efecto de pulso si está en peligro
    if (percentage >= 90) {
      element.classList.add('pulse');
    } else {
      element.classList.remove('pulse');
    }
  },
  
  // Crear barra de progreso desde cero
  create: (containerId, percentage, label) => {
    const container = document.getElementById(containerId);
    if (!container) return null;
    
    container.innerHTML = `
      <div class="progress-container">
        <div id="${containerId}-bar" class="progress-bar" style="width: 0%"></div>
      </div>
    `;
    
    setTimeout(() => {
      progressBar.update(`${containerId}-bar`, percentage, { showLabel: true });
    }, 100);
    
    return `${containerId}-bar`;
  }
};

// ============================================
// ANIMACIONES Y EFECTOS
// ============================================

const animations = {
  // Fade in para elementos
  fadeIn: (element, duration = 300) => {
    if (!element) return;
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease-in-out`;
    setTimeout(() => {
      element.style.opacity = '1';
    }, 10);
  },
  
  // Slide up para elementos
  slideUp: (element, duration = 300) => {
    if (!element) return;
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `all ${duration}ms ease-out`;
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 10);
  },
  
  // Shake effect
  shake: (element) => {
    if (!element) return;
    element.classList.add('shake');
    setTimeout(() => {
      element.classList.remove('shake');
    }, 500);
  },
  
  // Bounce in
  bounceIn: (element) => {
    if (!element) return;
    element.classList.add('bounce-in');
  }
};

// Exportar para uso global PRIMERO
window.aforix = {
  utils,
  auth,
  api,
  progressBar,
  animations
};

// ============================================
// INICIALIZACIÓN AL CARGAR PÁGINA
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Agregar animaciones a elementos con clase fade-in
  document.querySelectorAll('.fade-in').forEach((el, index) => {
    setTimeout(() => {
      animations.fadeIn(el);
    }, index * 100);
  });
  
  // Agregar animaciones slide-up
  document.querySelectorAll('.slide-up').forEach((el, index) => {
    setTimeout(() => {
      animations.slideUp(el);
    }, index * 100);
  });
  
  // Verificación de autenticación desactivada automáticamente para evitar bucles
  // Cada página maneja su propia verificación si es necesario
  // Comentado para evitar recargas infinitas:
  /*
  const currentPath = window.location.pathname;
  const isLoginPage = currentPath.includes('/login');
  
  if (!isLoginPage && (currentPath === '/' || currentPath.startsWith('/local/') || currentPath.startsWith('/reportes/'))) {
    if (!auth.isAuthenticated()) {
      window.location.href = '/login/';
    }
  }
  */
  
  // Inicializar tooltips y otros componentes si existen
  if (typeof bootstrap !== 'undefined') {
    // Bootstrap tooltips, popovers, etc.
  }
});

