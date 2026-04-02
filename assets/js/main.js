/**
 * SaturnNet ISP - Main JavaScript
 * Handles localStorage, navigation, animations, and data simulation
 */

// ===== CONFIGURATION =====
const CONFIG = {
  STORAGE_KEYS: {
    USERS: 'saturnnet_users',
    TICKETS: 'saturnnet_tickets',
    INVOICES: 'saturnnet_invoices',
    SESSION: 'saturnnet_session',
    COOKIE: 'saturnnet_cookie'
  },
  DEMO_CUSTOMER: {
    id: 'USR-001',
    name: 'Budi Santoso',
    email: 'pelanggan@saturnnet.id',
    password: 'demo123',
    phone: '081234567890',
    address: 'Jl. Mawar No. 123,RT 01/RW 02',
    package: 'Saturn-Home Regular',
    speed: '50 Mbps',
    price: 280000,
    status: 'Aktif',
    joinDate: '2025-01-01'
  },
  DEMO_ADMIN: {
    email: 'admin@saturnnet.id',
    password: 'admin2025'
  }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  initializeData();
  initializeLoader();
  initializeNavbar();
  initializeAccordions();
  initializeCounters();
  initializeCookieConsent();
  checkAuth();
});

// ===== LOCAL STORAGE MANAGEMENT =====
function initializeData() {
  // Initialize users if not exists
  if (!localStorage.getItem(CONFIG.STORAGE_KEYS.USERS)) {
    const users = [
      {
        ...CONFIG.DEMO_CUSTOMER,
        id: 'USR-001',
        invoices: [
          { id: 'INV-001', month: 'Februari 2025', amount: 280000, status: 'Belum Bayar', dueDate: '2025-02-15' },
          { id: 'INV-002', month: 'Januari 2025', amount: 280000, status: 'Lunas', dueDate: '2025-01-15' }
        ]
      }
    ];
    localStorage.setItem(CONFIG.STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  // Initialize tickets if not exists
  if (!localStorage.getItem(CONFIG.STORAGE_KEYS.TICKETS)) {
    const tickets = [
      {
        id: 'TKT-001',
        userId: 'USR-001',
        userName: 'Budi Santoso',
        userEmail: 'pelanggan@saturnnet.id',
        package: 'Saturn-Home Regular',
        title: 'Koneksi terputus sejak kemarin',
        category: 'Koneksi Terputus',
        urgency: 'Tinggi',
        status: 'Menunggu',
        date: '2025-01-15',
        description: 'Internet saya tidak bisa digunakan sejak kemarin malam. lampu ONT menyala merah.',
        replies: []
      },
      {
        id: 'TKT-002',
        userId: 'USR-001',
        userName: 'Budi Santoso',
        userEmail: 'pelanggan@saturnnet.id',
        package: 'Saturn-Home Regular',
        title: 'Kecepatan download sangat lambat',
        category: 'Kecepatan Lambat',
        urgency: 'Sedang',
        status: 'Dalam Proses',
        date: '2025-01-10',
        description: 'Speedtest menunjukkan hanya 5 Mbps padahal paket 50 Mbps.',
        replies: [
          {
            from: 'admin',
            name: 'Jeffa Gideon',
            message: 'Mohon maaf atas ketidaknyamanannya. Kami sedang melakukan optimasi jaringan di area Anda.',
            date: '2025-01-11'
          }
        ]
      },
      {
        id: 'TKT-003',
        userId: 'USR-001',
        userName: 'Budi Santoso',
        userEmail: 'pelanggan@saturnnet.id',
        package: 'Saturn-Home Regular',
        title: 'Tidak bisa akses Instagram',
        category: 'Tidak Bisa Akses Situs',
        urgency: 'Rendah',
        status: 'Selesai',
        date: '2025-01-05',
        description: 'Instagram tidak bisa dibuka, tapi aplikasi lain normal.',
        replies: [
          {
            from: 'admin',
            name: 'Jeffa Gideon',
            message: 'Masalah telah diselesaikan. Silakan coba akses kembali.',
            date: '2025-01-06'
          }
        ]
      }
    ];
    localStorage.setItem(CONFIG.STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  }

  // Initialize invoices if not exists
  if (!localStorage.getItem(CONFIG.STORAGE_KEYS.INVOICES)) {
    const invoices = [
      { id: 'INV-001', userId: 'USR-001', month: 'Februari 2025', amount: 280000, status: 'Belum Bayar', dueDate: '2025-02-15', paidDate: null },
      { id: 'INV-002', userId: 'USR-001', month: 'Januari 2025', amount: 280000, status: 'Lunas', dueDate: '2025-01-15', paidDate: '2025-01-14' },
      { id: 'INV-003', userId: 'USR-001', month: 'Desember 2024', amount: 280000, status: 'Lunas', dueDate: '2024-12-15', paidDate: '2024-12-10' },
      { id: 'INV-004', userId: 'USR-001', month: 'November 2024', amount: 280000, status: 'Lunas', dueDate: '2024-11-15', paidDate: '2024-11-12' }
    ];
    localStorage.setItem(CONFIG.STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  }
}

// ===== LOADER =====
function initializeLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800);
  }
}

// ===== NAVBAR =====
function initializeNavbar() {
  const toggle = document.querySelector('.navbar-toggle');
  const nav = document.querySelector('.navbar-nav');
  
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('active');
      }
    });
  }

  // Active link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ===== ACCORDION =====
function initializeAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        accordionItems.forEach(i => i.classList.remove('active'));
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

// ===== COUNTER ANIMATION =====
function initializeCounters() {
  const counters = document.querySelectorAll('.counter');
  
  const animateCounter = (element) => {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current).toLocaleString('id-ID');
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString('id-ID');
      }
    };
    
    updateCounter();
  };
  
  // Intersection Observer for triggering animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// ===== COOKIE CONSENT =====
function initializeCookieConsent() {
  const cookieConsent = document.querySelector('.cookie-consent');
  if (!cookieConsent) return;
  
  const hasConsent = localStorage.getItem(CONFIG.STORAGE_KEYS.COOKIE);
  
  if (!hasConsent) {
    setTimeout(() => {
      cookieConsent.classList.add('show');
    }, 1000);
  }
  
  const acceptBtn = cookieConsent.querySelector('.btn-accept');
  const declineBtn = cookieConsent.querySelector('.btn-decline');
  
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem(CONFIG.STORAGE_KEYS.COOKIE, 'accepted');
      cookieConsent.classList.remove('show');
    });
  }
  
  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem(CONFIG.STORAGE_KEYS.COOKIE, 'declined');
      cookieConsent.classList.remove('show');
    });
  }
}

// ===== AUTHENTICATION =====
function checkAuth() {
  const session = getSession();
  const isPortalPage = window.location.pathname.includes('/portal/');
  const isAdminPage = window.location.pathname.includes('/admin/');
  const isLoginPage = window.location.pathname.includes('login.html');
  const isIndexPage = !isPortalPage && !isAdminPage;
  
  // Update UI based on auth status
  updateAuthUI(session);
}

function getSession() {
  const sessionStr = sessionStorage.getItem(CONFIG.STORAGE_KEYS.SESSION);
  return sessionStr ? JSON.parse(sessionStr) : null;
}

function setSession(user, type = 'customer') {
  const session = {
    ...user,
    type: type,
    loginTime: new Date().toISOString()
  };
  sessionStorage.setItem(CONFIG.STORAGE_KEYS.SESSION, JSON.stringify(session));
}

function clearSession() {
  sessionStorage.removeItem(CONFIG.STORAGE_KEYS.SESSION);
}

function updateAuthUI(session) {
  const authLinks = document.querySelectorAll('[data-auth]');
  const userNameElements = document.querySelectorAll('[data-user-name]');
  
  authLinks.forEach(link => {
    const auth = link.dataset.auth;
    if (session) {
      if (auth === 'logged-out') link.style.display = 'none';
      if (auth === 'logged-in') link.style.display = 'block';
    } else {
      if (auth === 'logged-out') link.style.display = 'block';
      if (auth === 'logged-in') link.style.display = 'none';
    }
  });
  
  userNameElements.forEach(el => {
    if (session && session.name) {
      el.textContent = session.name;
    }
  });
}

// Login function
function login(email, password, type = 'customer') {
  if (type === 'admin') {
    if (email === CONFIG.DEMO_ADMIN.email && password === CONFIG.DEMO_ADMIN.password) {
      setSession({
        id: 'ADMIN-001',
        name: 'Administrator',
        email: email
      }, 'admin');
      return { success: true, redirect: 'dashboard.html' };
    }
  } else {
    const users = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.USERS) || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      setSession(user, 'customer');
      return { success: true, redirect: 'portal/dashboard.html' };
    }
  }
  
  return { success: false, message: 'Email atau password salah' };
}

// Logout function
function logout() {
  clearSession();
  window.location.href = 'login.html';
}

// Check if logged in
function requireAuth(requiredType = 'customer') {
  const session = getSession();
  
  if (!session) {
    window.location.href = 'login.html';
    return false;
  }
  
  if (requiredType === 'admin' && session.type !== 'admin') {
    window.location.href = 'login.html';
    return false;
  }
  
  return true;
}

// ===== TICKET MANAGEMENT =====
function createTicket(data) {
  const tickets = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.TICKETS) || '[]');
  const session = getSession();
  
  const newTicket = {
    id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
    userId: session?.id || 'USR-001',
    userName: session?.name || data.name,
    userEmail: session?.email || data.email,
    package: session?.package || 'Saturn-Home Regular',
    title: data.title,
    category: data.category,
    urgency: data.urgency,
    status: 'Menunggu',
    date: new Date().toISOString().split('T')[0],
    description: data.description,
    replies: []
  };
  
  tickets.push(newTicket);
  localStorage.setItem(CONFIG.STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  
  return newTicket;
}

function getTickets(userId = null) {
  const tickets = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.TICKETS) || '[]');
  
  if (userId) {
    return tickets.filter(t => t.userId === userId);
  }
  
  return tickets;
}

function addTicketReply(ticketId, message, from = 'customer') {
  const tickets = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.TICKETS) || '[]');
  const ticketIndex = tickets.findIndex(t => t.id === ticketId);
  
  if (ticketIndex > -1) {
    const reply = {
      from: from,
      name: from === 'admin' ? 'Jeffa Gideon' : getSession()?.name || 'Pelanggan',
      message: message,
      date: new Date().toISOString().split('T')[0]
    };
    
    tickets[ticketIndex].replies.push(reply);
    localStorage.setItem(CONFIG.STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
    
    return tickets[ticketIndex];
  }
  
  return null;
}

function updateTicketStatus(ticketId, status) {
  const tickets = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.TICKETS) || '[]');
  const ticketIndex = tickets.findIndex(t => t.id === ticketId);
  
  if (ticketIndex > -1) {
    tickets[ticketIndex].status = status;
    localStorage.setItem(CONFIG.STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
    
    return tickets[ticketIndex];
  }
  
  return null;
}

// ===== INVOICE MANAGEMENT =====
function getInvoices(userId = null) {
  const invoices = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.INVOICES) || '[]');
  
  if (userId) {
    return invoices.filter(i => i.userId === userId);
  }
  
  return invoices;
}

function payInvoice(invoiceId) {
  const invoices = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.INVOICES) || '[]');
  const invoiceIndex = invoices.findIndex(i => i.id === invoiceId);
  
  if (invoiceIndex > -1) {
    invoices[invoiceIndex].status = 'Lunas';
    invoices[invoiceIndex].paidDate = new Date().toISOString().split('T')[0];
    localStorage.setItem(CONFIG.STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
    
    return invoices[invoiceIndex];
  }
  
  return null;
}

// ===== USER MANAGEMENT =====
function getUsers() {
  return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.USERS) || '[]');
}

function registerUser(data) {
  const users = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.USERS) || '[]');
  
  // Check if email already exists
  if (users.find(u => u.email === data.email)) {
    return { success: false, message: 'Email sudah terdaftar' };
  }
  
  const newUser = {
    id: `USR-${String(users.length + 1).padStart(3, '0')}`,
    name: data.name,
    email: data.email,
    password: data.password,
    phone: data.phone,
    nik: data.nik,
    address: data.address,
    rt: data.rt,
    rw: data.rw,
    district: data.district,
    city: data.city,
    package: data.package,
    speed: getPackageSpeed(data.package),
    price: getPackagePrice(data.package),
    status: 'Aktif',
    joinDate: new Date().toISOString().split('T')[0],
    invoices: []
  };
  
  users.push(newUser);
  localStorage.setItem(CONFIG.STORAGE_KEYS.USERS, JSON.stringify(users));
  
  // Create first invoice
  const invoices = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.INVOICES) || '[]');
  invoices.push({
    id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
    userId: newUser.id,
    month: getCurrentMonth(),
    amount: newUser.price,
    status: 'Belum Bayar',
    dueDate: getDueDate(),
    paidDate: null
  });
  localStorage.setItem(CONFIG.STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  
  return { success: true, user: newUser };
}

function getPackageSpeed(packageName) {
  const speeds = {
    'Saturn-Home Lite': '20 Mbps',
    'Saturn-Home Regular': '50 Mbps',
    'Saturn-Home Plus': '75 Mbps',
    'Saturn-Pro Game Starter': '50 Mbps',
    'Saturn-Pro Game Pro': '100 Mbps',
    'Saturn-Pro Game Ultra': '200 Mbps',
    'Saturn-Elite Ded 100M': '100 Mbps',
    'Saturn-Elite Ded 200M': '200 Mbps',
    'Saturn-Elite Ded 500M': '500 Mbps'
  };
  return speeds[packageName] || 'N/A';
}

function getPackagePrice(packageName) {
  const prices = {
    'Saturn-Home Lite': 180000,
    'Saturn-Home Regular': 280000,
    'Saturn-Home Plus': 380000,
    'Saturn-Pro Game Starter': 330000,
    'Saturn-Pro Game Pro': 490000,
    'Saturn-Pro Game Ultra': 750000,
    'Saturn-Elite Ded 100M': 1500000,
    'Saturn-Elite Ded 200M': 2500000,
    'Saturn-Elite Ded 500M': 5000000
  };
  return prices[packageName] || 0;
}

function getCurrentMonth() {
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const now = new Date();
  return `${months[now.getMonth()]} ${now.getFullYear()}`;
}

function getDueDate() {
  const date = new Date();
  date.setDate(15);
  return date.toISOString().split('T')[0];
}

// ===== FORMAT CURRENCY =====
function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}

// ===== DATE FORMAT =====
function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('id-ID', options);
}

// ===== MODAL FUNCTIONS =====
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// ===== TAB FUNCTIONS =====
function switchTab(tabId) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  // Deactivate all tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Activate selected tab
  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
}

// ===== TOGGLE FUNCTIONS =====
function toggleBillingPeriod() {
  const toggle = document.querySelector('.billing-toggle');
  const prices = document.querySelectorAll('.price-amount');
  const isYearly = toggle.classList.contains('active');
  
  prices.forEach(price => {
    const monthly = parseInt(price.dataset.monthly);
    const yearly = Math.floor(monthly * 12 * 0.85);
    
    if (isYearly) {
      price.textContent = formatCurrency(yearly);
      price.dataset.display = 'yearly';
    } else {
      price.textContent = formatCurrency(monthly);
      price.dataset.display = 'monthly';
    }
  });
}

// ===== PASSWORD TOGGLE =====
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const toggleIcon = document.querySelector('.password-toggle .toggle-icon');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
  } else {
    passwordInput.type = 'password';
    toggleIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
  }
}

// ===== COVERAGE CHECK =====
function checkCoverage() {
  const input = document.getElementById('coverage-input');
  const result = document.getElementById('coverage-result');
  const area = input.value.toLowerCase();
  
  const availableAreas = ['sukasari', 'sukajadi', 'sukasari', 'cikarang', 'bekasi', 'tangerang'];
  const comingSoonAreas = ['cikarang', 'karawang', 'karang baru'];
  
  if (availableAreas.includes(area)) {
    result.innerHTML = '<div class="alert alert-success">✓ Wilayah Anda tersedia! Silakan daftar untuk instalasi.</div>';
  } else if (comingSoonAreas.includes(area)) {
    result.innerHTML = '<div class="alert alert-warning">⚠ Wilayah akan segera tersedia. Daftarkan diri untuk prioritas!</div>';
  } else {
    result.innerHTML = '<div class="alert alert-info">ℹ Wilayah belum tersedia. Hubungi kami untuk info lebih lanjut.</div>';
  }
}

// ===== FORM VALIDATION =====
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;
  
  let isValid = true;
  const inputs = form.querySelectorAll('[required]');
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = 'var(--danger)';
      isValid = false;
    } else {
      input.style.borderColor = 'var(--border-color)';
    }
  });
  
  return isValid;
}

// ===== FAQ SEARCH =====
function searchFAQ() {
  const searchInput = document.getElementById('faq-search');
  const query = searchInput.value.toLowerCase();
  const faqItems = document.querySelectorAll('.accordion-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.accordion-header h4').textContent.toLowerCase();
    const answer = item.querySelector('.accordion-body').textContent.toLowerCase();
    
    if (question.includes(query) || answer.includes(query)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// ===== PRINT INVOICE =====
function printInvoice(invoiceId) {
  const invoice = getInvoices().find(i => i.id === invoiceId);
  if (!invoice) return;
  
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice ${invoice.id}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        .header { text-align: center; margin-bottom: 40px; }
        .invoice-title { font-size: 24px; font-weight: bold; }
        .detail { margin: 20px 0; }
        .label { font-weight: bold; }
        .total { font-size: 20px; font-weight: bold; margin-top: 20px; }
        .status { padding: 5px 10px; background: ${invoice.status === 'Lunas' ? '#00c896' : '#f5a623'}; color: white; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="invoice-title">INVOICE</div>
        <div>${invoice.id}</div>
      </div>
      <div class="detail">
        <div><span class="label">Bulan:</span> ${invoice.month}</div>
        <div><span class="label">Jumlah:</span> Rp ${invoice.amount.toLocaleString('id-ID')}</div>
        <div><span class="label">Jatuh Tempo:</span> ${invoice.dueDate}</div>
        <div><span class="label">Status:</span> <span class="status">${invoice.status}</span></div>
      </div>
      <div class="total">
        Total: Rp ${invoice.amount.toLocaleString('id-ID')}
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

// ===== EXPORT TO PDF (Simple) =====
function exportToPDF(elementId, filename) {
  // Simple PDF export using browser print
  const element = document.getElementById(elementId);
  const printWindow = window.open('', '_blank');
  printWindow.document.write(element.innerHTML);
  printWindow.document.close();
  printWindow.print();
}

// ===== ANIMATE ON SCROLL =====
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in, .slide-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translate(0)';
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ===== NOTIFICATION =====
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `alert alert-${type}`;
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.top = '100px';
  notification.style.right = '20px';
  notification.style.zIndex = '9999';
  notification.style.minWidth = '300px';
  notification.style.animation = 'slideIn 0.3s ease';
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// ===== COUNTDOWN TIMER =====
function startCountdown(duration, display) {
  let timer = duration, hours, minutes, seconds;
  
  const interval = setInterval(() => {
    hours = parseInt(timer / 3600, 10);
    minutes = parseInt((timer % 3600) / 60, 10);
    seconds = parseInt(timer % 60, 10);
    
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    display.textContent = hours + ':' + minutes + ':' + seconds;
    
    if (--timer < 0) {
      clearInterval(interval);
      display.textContent = 'EXPIRED';
    }
  }, 1000);
}

// Initialize countdown if exists
document.addEventListener('DOMContentLoaded', () => {
  const countdownDisplay = document.getElementById('countdown');
  if (countdownDisplay) {
    // 24 hours countdown
    startCountdown(86400, countdownDisplay);
  }
});

