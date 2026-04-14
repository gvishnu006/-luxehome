/* ============================================
   LUXEHOME — Interactive JavaScript
   ============================================ */

// ==========================================
// Product Data
// ==========================================
const products = [
  {
    id: 1,
    name: "Scandinavian Lounge Sofa",
    category: "furniture",
    price: 2499,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop&q=80",
    badge: "sale",
    rating: 4.9,
    reviews: 234
  },
  {
    id: 2,
    name: "Smart Espresso Machine Pro",
    category: "appliance",
    price: 899,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=400&fit=crop&q=80",
    badge: "new",
    rating: 4.8,
    reviews: 187
  },
  {
    id: 3,
    name: "Artisan Pendant Light Set",
    category: "lighting",
    price: 649,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop&q=80",
    badge: "trending",
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "Walnut Dining Table",
    category: "furniture",
    price: 1899,
    originalPrice: 2200,
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&h=400&fit=crop&q=80",
    badge: "sale",
    rating: 4.9,
    reviews: 312
  },
  {
    id: 5,
    name: "Robotic Vacuum Cleaner X1",
    category: "appliance",
    price: 599,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&h=400&fit=crop&q=80",
    badge: "new",
    rating: 4.6,
    reviews: 289
  },
  {
    id: 6,
    name: "Ceramic Vase Collection",
    category: "decor",
    price: 189,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500&h=400&fit=crop&q=80",
    badge: null,
    rating: 4.8,
    reviews: 98
  },
  {
    id: 7,
    name: "Memory Foam King Bed",
    category: "furniture",
    price: 3299,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&h=400&fit=crop&q=80",
    badge: "sale",
    rating: 4.9,
    reviews: 445
  },
  {
    id: 8,
    name: "Smart Air Purifier Elite",
    category: "appliance",
    price: 449,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=400&fit=crop&q=80",
    badge: "trending",
    rating: 4.7,
    reviews: 201
  },
  {
    id: 9,
    name: "Nordic Floor Lamp",
    category: "lighting",
    price: 349,
    originalPrice: 429,
    image: "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=500&h=400&fit=crop&q=80",
    badge: "sale",
    rating: 4.5,
    reviews: 134
  },
  {
    id: 10,
    name: "Woven Wall Tapestry",
    category: "decor",
    price: 259,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop&q=80",
    badge: "new",
    rating: 4.8,
    reviews: 76
  },
  {
    id: 11,
    name: "Marble Console Table",
    category: "furniture",
    price: 1299,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&h=400&fit=crop&q=80",
    badge: "trending",
    rating: 4.6,
    reviews: 167
  },
  {
    id: 12,
    name: "Crystal Chandelier Luxe",
    category: "lighting",
    price: 1599,
    originalPrice: 1899,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop&q=80",
    badge: "sale",
    rating: 4.9,
    reviews: 89
  }
];

// ==========================================
// Global State
// ==========================================
let cart = [];
let currentFilter = 'all';
let testimonialIndex = 0;

// ==========================================
// DOM Ready
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCustomCursor();
  initNavigation();
  initMobileMenu();
  initSearch();
  initCart();
  initThemeToggle();
  initHeroParticles();
  initHero3DCard();
  initCounters();
  initProducts();
  initProductFilters();
  initTestimonialsSlider();
  initScrollAnimations();
  initMagneticButtons();
  initParallax();
  initBackToTop();
  initForms();
});

// ==========================================
// Preloader
// ==========================================
function initPreloader() {
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2200);
  });
  // Fallback
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 4000);
}

// ==========================================
// Custom Cursor
// ==========================================
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  
  if (window.innerWidth <= 768) return;
  
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });
  
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  
  // Hover effects
  const hoverTargets = document.querySelectorAll('a, button, .product-card, .category-card, .feature-card, input, textarea');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('cursor-hover');
      ring.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('cursor-hover');
      ring.classList.remove('cursor-hover');
    });
  });
}

// ==========================================
// Navigation
// ==========================================
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Active link highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  });
  
  // Smooth scroll on click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ==========================================
// Mobile Menu
// ==========================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 300);
      }
    });
  });
}

// ==========================================
// Search
// ==========================================
function initSearch() {
  const searchBtn = document.getElementById('search-btn');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  searchBtn.addEventListener('click', () => {
    searchModal.classList.add('open');
    setTimeout(() => searchInput.focus(), 400);
  });
  
  searchClose.addEventListener('click', () => {
    searchModal.classList.remove('open');
    searchInput.value = '';
    searchResults.innerHTML = '';
  });
  
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove('open');
      searchInput.value = '';
      searchResults.innerHTML = '';
    }
  });
  
  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('open')) {
      searchModal.classList.remove('open');
      searchInput.value = '';
      searchResults.innerHTML = '';
    }
  });
  
  // Search functionality
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }
    
    const results = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    );
    
    searchResults.innerHTML = results.map(p => `
      <div class="search-result-item" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" />
        <div class="sr-info">
          <h4>${p.name}</h4>
          <span>$${p.price.toLocaleString()}</span>
        </div>
      </div>
    `).join('');
    
    if (results.length === 0) {
      searchResults.innerHTML = '<p style="padding:1rem;text-align:center;color:var(--text-muted);">No results found</p>';
    }
    
    // Click on result => add to cart
    searchResults.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const productId = parseInt(item.dataset.id);
        addToCart(productId);
        searchModal.classList.remove('open');
        searchInput.value = '';
        searchResults.innerHTML = '';
      });
    });
  });
}

// ==========================================
// Cart
// ==========================================
function initCart() {
  const cartBtn = document.getElementById('cart-btn');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close');
  
  cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  
  const closeCart = () => {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };
  
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  
  updateCartUI();
  showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  updateCartUI();
}

function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  const cartFooter = document.getElementById('cart-footer');
  const cartCount = document.getElementById('cart-count');
  const cartTotalPrice = document.getElementById('cart-total-price');
  
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  cartCount.textContent = totalQty;
  cartCount.classList.toggle('show', totalQty > 0);
  
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p>Your cart is empty</p>
      </div>
    `;
    cartFooter.style.display = 'none';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <span class="cart-item-price">$${(item.price * item.qty).toLocaleString()}</span>
          <div class="cart-item-qty">
            <button onclick="updateCartQty(${item.id}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="updateCartQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
    `).join('');
    cartFooter.style.display = 'block';
    cartTotalPrice.textContent = '$' + totalPrice.toLocaleString();
  }
}

// ==========================================
// Theme Toggle
// ==========================================
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('luxehome-theme');
  
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  
  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    
    if (newTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    
    localStorage.setItem('luxehome-theme', newTheme);
  });
}

// ==========================================
// Hero Particles
// ==========================================
function initHeroParticles() {
  const container = document.getElementById('hero-particles');
  const count = 20;
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = (2 + Math.random() * 4) + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = (4 + Math.random() * 6) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.opacity = 0.1 + Math.random() * 0.4;
    container.appendChild(particle);
  }
}

// ==========================================
// Hero 3D Card
// ==========================================
function initHero3DCard() {
  const card = document.getElementById('hero-3d-card');
  if (!card || window.innerWidth <= 768) return;
  
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / centerY * -8;
    const rotateY = (x - centerX) / centerX * 8;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
}

// ==========================================
// Animated Counters
// ==========================================
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let countersStarted = false;
  
  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      const duration = 2000;
      const start = performance.now();
      
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased);
        
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }
      
      requestAnimationFrame(update);
    });
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });
  
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) observer.observe(statsSection);
}

// ==========================================
// Products
// ==========================================
function initProducts() {
  renderProducts(products);
}

function renderProducts(productList) {
  const grid = document.getElementById('products-grid');
  
  grid.innerHTML = productList.map((p, index) => `
    <div class="product-card reveal-up" style="--delay:${0.1 + index * 0.05}s" data-category="${p.category}">
      <div class="product-image-wrapper">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge ${p.badge}">${p.badge}</span>` : ''}
        <button class="product-wishlist" onclick="this.classList.toggle('active')" aria-label="Add to Wishlist">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <div class="product-quick-add">
          <button class="quick-add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-price-row">
          <span class="product-price">
            $${p.price.toLocaleString()}
            ${p.originalPrice ? `<span class="original-price">$${p.originalPrice.toLocaleString()}</span>` : ''}
          </span>
          <div class="product-rating">
            ★ ${p.rating}
            <span>(${p.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  
  // Re-observe for reveal
  initScrollAnimations();
}

// ==========================================
// Product Filters
// ==========================================
function initProductFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      currentFilter = filter;
      
      const grid = document.getElementById('products-grid');
      
      // Fade out
      grid.style.opacity = '0';
      grid.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        const filtered = filter === 'all' 
          ? products 
          : products.filter(p => p.category === filter);
        
        renderProducts(filtered);
        
        // Fade in
        requestAnimationFrame(() => {
          grid.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          grid.style.opacity = '1';
          grid.style.transform = 'translateY(0)';
        });
      }, 300);
    });
  });
}

// ==========================================
// Testimonials Slider
// ==========================================
function initTestimonialsSlider() {
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');
  const cards = track.querySelectorAll('.testimonial-card');
  
  let cardsPerView = getCardsPerView();
  let totalSlides = Math.ceil(cards.length / cardsPerView);
  
  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }
  
  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${i === testimonialIndex ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  
  function goToSlide(index) {
    testimonialIndex = Math.max(0, Math.min(index, totalSlides - 1));
    const slideWidth = 100 / cardsPerView;
    track.style.transform = `translateX(-${testimonialIndex * slideWidth * cardsPerView}%)`;
    
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === testimonialIndex);
    });
  }
  
  createDots();
  
  prevBtn.addEventListener('click', () => {
    goToSlide(testimonialIndex - 1);
  });
  
  nextBtn.addEventListener('click', () => {
    goToSlide(testimonialIndex + 1);
  });
  
  // Auto-play
  setInterval(() => {
    const next = (testimonialIndex + 1) % totalSlides;
    goToSlide(next);
  }, 5000);
  
  // Resize handler
  window.addEventListener('resize', () => {
    cardsPerView = getCardsPerView();
    totalSlides = Math.ceil(cards.length / cardsPerView);
    testimonialIndex = 0;
    createDots();
    goToSlide(0);
  });
}

// ==========================================
// Scroll Reveal Animations
// ==========================================
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-up:not(.revealed)');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(el => observer.observe(el));
}

// ==========================================
// Magnetic Buttons
// ==========================================
function initMagneticButtons() {
  if (window.innerWidth <= 768) return;
  
  const buttons = document.querySelectorAll('.magnetic-btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ==========================================
// Parallax Effect
// ==========================================
function initParallax() {
  const parallaxBg = document.querySelector('.parallax-bg');
  if (!parallaxBg) return;
  
  window.addEventListener('scroll', () => {
    const section = parallaxBg.closest('.parallax-banner');
    const rect = section.getBoundingClientRect();
    const speed = 0.3;
    
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const yPos = rect.top * speed;
      parallaxBg.style.transform = `translateY(${yPos}px)`;
    }
  });
}

// ==========================================
// Back to Top
// ==========================================
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==========================================
// Forms
// ==========================================
function initForms() {
  const contactForm = document.getElementById('contact-form');
  const newsletterForm = document.getElementById('newsletter-form');
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Message sent successfully! We\'ll get back to you soon.');
    contactForm.reset();
  });
  
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Successfully subscribed! Welcome to LuxeHome.');
    newsletterForm.reset();
  });
  
  // Checkout
  const checkoutBtn = document.getElementById('checkout-btn');
  checkoutBtn.addEventListener('click', () => {
    showToast('Checkout feature coming soon!');
  });
}

// ==========================================
// Toast Notification
// ==========================================
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  
  toastMessage.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Make cart functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQty = updateCartQty;
