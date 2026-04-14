import { products, categories, testimonials } from './data/products.js';

// ============================================================
// STATE
// ============================================================
const state = {
  cart: JSON.parse(localStorage.getItem('lh_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('lh_wishlist') || '[]'),
  activeFilter: 'all',
  visibleCount: 8,
  heroIndex: 0,
  testIndex: 0,
  heroTimer: null,
};

// ============================================================
// UTILS
// ============================================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

function saveCart() { localStorage.setItem('lh_cart', JSON.stringify(state.cart)); }
function saveWishlist() { localStorage.setItem('lh_wishlist', JSON.stringify(state.wishlist)); }

function animateCount(el) {
  const target = +el.dataset.count;
  let start = 0;
  const duration = 2000;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target >= 1000 ? target.toLocaleString() + '+' : target + (el.nextElementSibling?.textContent.includes('%') ? '' : '');
  };
  requestAnimationFrame(step);
}

function showToast(message, icon = 'fa-check-circle', color = 'var(--clr-accent)') {
  const container = $('#toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderLeftColor = color;
  toast.innerHTML = `<i class="fas ${icon}" style="color:${color}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

function starHTML(rating) {
  let s = '';
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) s += '<i class="fas fa-star"></i>';
    else if (rating >= i - 0.5) s += '<i class="fas fa-star-half-alt"></i>';
    else s += '<i class="far fa-star"></i>';
  }
  return s;
}

// ============================================================
// CURSOR
// ============================================================
function initCursor() {
  const cursor = $('#cursor');
  const follower = $('#cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverables = 'a, button, [role="button"], .product-card, .category-card, input';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverables)) {
      cursor.classList.add('cursor--hover');
      follower.classList.add('cursor-follower--hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverables)) {
      cursor.classList.remove('cursor--hover');
      follower.classList.remove('cursor-follower--hover');
    }
  });
}

// ============================================================
// PRELOADER
// ============================================================
function initPreloader() {
  const preloader = $('#preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      initAOS();
    }, 2200);
  });
}

// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
  const navbar = $('#navbar');
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  const mobileOverlay = $('#mobile-overlay');
  const mobileClose = $('#mobile-close');
  const links = $$('.navbar__link, .mobile-menu__link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
  });

  [mobileClose, mobileOverlay].forEach(el => el.addEventListener('click', closeMobile));
  links.forEach(link => link.addEventListener('click', () => { closeMobile(); }));

  function closeMobile() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
  }

  function updateActiveLink() {
    const sections = ['home', 'products', 'categories', 'about', 'contact'];
    const scrollY = window.scrollY + 100;
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const link = $(`.navbar__link[data-section="${id}"]`);
      if (!link) return;
      if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
        $$('.navbar__link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }
}

// ============================================================
// SEARCH
// ============================================================
function initSearch() {
  const toggle = $('#search-toggle');
  const overlay = $('#search-overlay');
  const closeBtn = $('#search-close');
  const input = $('#search-input');
  const results = $('#search-results');

  toggle.addEventListener('click', () => { overlay.classList.add('open'); input.focus(); });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  function close() { overlay.classList.remove('open'); input.value = ''; results.innerHTML = ''; }

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    const found = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    results.innerHTML = found.length
      ? found.slice(0, 6).map(p => `
          <div class="search-result-item" data-id="${p.id}">
            <div class="search-result-item__icon" style="background:${p.color}22;color:${p.color}"><i class="fas ${p.icon}"></i></div>
            <div class="search-result-item__info">
              <h4>${p.name}</h4>
              <p>$${p.price.toLocaleString()} · ${p.category.replace('-', ' ')}</p>
            </div>
            <i class="fas fa-arrow-right" style="color:var(--clr-text-muted);font-size:0.8rem;margin-left:auto"></i>
          </div>`).join('')
      : `<div style="text-align:center;color:var(--clr-text-muted);padding:30px">No products found for "<strong>${q}</strong>"</div>`;
    $$('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = +item.dataset.id;
        close();
        openModal(id);
      });
    });
  });
}

// ============================================================
// CART
// ============================================================
function initCart() {
  const cartToggle = $('#cart-toggle');
  const cartClose = $('#cart-close');
  const cartDrawer = $('#cart-drawer');
  const cartOverlay = $('#cart-overlay');
  const wishlistToggle = $('#wishlist-toggle');
  const wishlistClose = $('#wishlist-close');
  const wishlistDrawer = $('#wishlist-drawer');
  const checkoutBtn = $('#checkout-btn');

  cartToggle.addEventListener('click', () => { cartDrawer.classList.add('open'); cartOverlay.classList.add('open'); });
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  wishlistToggle.addEventListener('click', () => { wishlistDrawer.classList.add('open'); cartOverlay.classList.add('open'); });
  wishlistClose.addEventListener('click', closeWishlist);
  checkoutBtn.addEventListener('click', () => showToast('Checkout coming soon! 🛒', 'fa-info-circle', 'var(--clr-accent-3)'));

  function closeCart() { cartDrawer.classList.remove('open'); cartOverlay.classList.remove('open'); }
  function closeWishlist() { wishlistDrawer.classList.remove('open'); cartOverlay.classList.remove('open'); }

  renderCart();
  renderWishlist();
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const existing = state.cart.find(i => i.id === id);
  if (existing) { existing.qty++; } else { state.cart.push({ id, qty: 1 }); }
  saveCart();
  renderCart();
  showToast(`"${product.name}" added to cart`, 'fa-shopping-bag', 'var(--clr-accent)');
}

function removeFromCart(id) {
  state.cart = state.cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function changeQty(id, delta) {
  const item = state.cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCart();
}

function renderCart() {
  const body = $('#cart-items');
  const totalEl = $('#cart-total');
  const count = $('#cart-count');
  const total = state.cart.reduce((acc, i) => {
    const p = products.find(x => x.id === i.id);
    return acc + (p ? p.price * i.qty : 0);
  }, 0);
  const totalQty = state.cart.reduce((a, i) => a + i.qty, 0);
  count.textContent = totalQty;
  totalEl.textContent = '$' + total.toLocaleString('en', { minimumFractionDigits: 2 });

  if (state.cart.length === 0) {
    body.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-bag"></i><h4>Your cart is empty</h4><p>Start adding some luxurious items!</p></div>`;
    return;
  }
  body.innerHTML = state.cart.map(item => {
    const p = products.find(x => x.id === item.id);
    if (!p) return '';
    return `<div class="cart-item">
      <div class="cart-item__icon" style="background:${p.color}22;color:${p.color}"><i class="fas ${p.icon}"></i></div>
      <div class="cart-item__info">
        <div class="cart-item__name">${p.name}</div>
        <div class="cart-item__price">$${(p.price * item.qty).toLocaleString()}</div>
        <div class="cart-item__actions">
          <div class="cart-item__qty">
            <button class="cart-item__qty-btn" onclick="changeQty(${p.id}, -1)"><i class="fas fa-minus"></i></button>
            <span class="cart-item__qty-num">${item.qty}</span>
            <button class="cart-item__qty-btn" onclick="changeQty(${p.id}, 1)"><i class="fas fa-plus"></i></button>
          </div>
          <button class="cart-item__remove" onclick="removeFromCart(${p.id})"><i class="fas fa-trash"></i> Remove</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ============================================================
// WISHLIST
// ============================================================
function toggleWishlist(id) {
  const idx = state.wishlist.indexOf(id);
  const product = products.find(p => p.id === id);
  if (idx === -1) {
    state.wishlist.push(id);
    showToast(`"${product?.name}" added to wishlist`, 'fa-heart', 'var(--clr-accent-2)');
  } else {
    state.wishlist.splice(idx, 1);
    showToast(`"${product?.name}" removed from wishlist`, 'fa-heart-broken', 'var(--clr-text-muted)');
  }
  saveWishlist();
  renderWishlist();
  renderProducts();
}

function renderWishlist() {
  const body = $('#wishlist-items');
  const count = $('#wishlist-count');
  count.textContent = state.wishlist.length;

  if (state.wishlist.length === 0) {
    body.innerHTML = `<div class="cart-empty"><i class="fas fa-heart"></i><h4>No items in wishlist</h4><p>Save your favourite products here!</p></div>`;
    return;
  }
  body.innerHTML = state.wishlist.map(id => {
    const p = products.find(x => x.id === id);
    if (!p) return '';
    return `<div class="cart-item">
      <div class="cart-item__icon" style="background:${p.color}22;color:${p.color}"><i class="fas ${p.icon}"></i></div>
      <div class="cart-item__info">
        <div class="cart-item__name">${p.name}</div>
        <div class="cart-item__price">$${p.price.toLocaleString()}</div>
        <div class="cart-item__actions">
          <button class="btn btn--primary" style="padding:8px 16px;font-size:0.8rem" onclick="addToCart(${p.id})">Add to Cart</button>
          <button class="cart-item__remove" onclick="toggleWishlist(${p.id})"><i class="fas fa-times"></i></button>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ============================================================
// CATEGORIES
// ============================================================
function renderCategories() {
  const grid = $('#categories-grid');
  grid.innerHTML = categories.map((cat, i) => `
    <div class="category-card" style="--category-color:${cat.color}" data-aos="fade-up" data-aos-delay="${i * 80}">
      <div class="category-card__icon" style="color:${cat.color}"><i class="fas ${cat.icon}"></i></div>
      <div class="category-card__info">
        <h3>${cat.name}</h3>
        <span>${cat.count} Products</span>
      </div>
      <div class="category-card__arrow"><i class="fas fa-arrow-right"></i></div>
    </div>`).join('');

  $$('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.querySelector('.category-card__info h3').textContent.toLowerCase().replace(' ', '-');
      const match = categories.find(c => c.name.toLowerCase() === card.querySelector('h3').textContent.toLowerCase());
      if (match) {
        state.activeFilter = match.id;
        renderProducts();
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        $$('.filter-btn').forEach(b => b.classList.remove('active'));
        const btn = $(`.filter-btn[data-filter="${match.id}"]`);
        if (btn) btn.classList.add('active');
      }
    });
  });
}

// ============================================================
// PRODUCTS
// ============================================================
function renderFilters() {
  const container = $('#product-filters');
  const allCategories = ['all', ...new Set(products.map(p => p.category))];
  container.innerHTML = allCategories.map(cat => `
    <button class="filter-btn ${cat === state.activeFilter ? 'active' : ''}" data-filter="${cat}">
      ${cat === 'all' ? 'All Products' : cat.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
    </button>`).join('');
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeFilter = btn.dataset.filter;
      state.visibleCount = 8;
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts();
    });
  });
}

function renderProducts() {
  const grid = $('#products-grid');
  const loadMoreBtn = $('#load-more-btn');
  const filtered = state.activeFilter === 'all' ? products : products.filter(p => p.category === state.activeFilter);
  const visible = filtered.slice(0, state.visibleCount);

  grid.innerHTML = visible.map((p, i) => {
    const wishlisted = state.wishlist.includes(p.id);
    const badgeClass = p.badge?.toLowerCase() === 'sale' ? 'sale' : p.badge?.toLowerCase() === 'new' ? 'new' : p.badge?.toLowerCase() === 'premium' ? 'premium' : '';
    return `
    <div class="product-card" data-id="${p.id}" style="animation-delay:${i * 0.05}s">
      <div class="product-card__image" style="background:linear-gradient(135deg,${p.color}18,${p.color}08)">
        ${p.badge ? `<span class="product-card__badge ${badgeClass}">${p.badge}</span>` : ''}
        <i class="fas ${p.icon} product-card__image-icon" style="color:${p.color}"></i>
        <div class="product-card__image-overlay">
          <button class="product-action-btn" title="Quick View" onclick="openModal(${p.id})"><i class="fas fa-eye"></i></button>
          <button class="product-action-btn ${wishlisted ? 'wishlisted' : ''}" title="Wishlist" onclick="toggleWishlist(${p.id})"><i class="fas fa-heart"></i></button>
        </div>
      </div>
      <div class="product-card__body">
        <div class="product-card__category">${p.category.replace('-', ' ')}</div>
        <div class="product-card__name">${p.name}</div>
        <div class="product-card__rating">
          <span class="product-card__stars">${starHTML(p.rating)}</span>
          <span class="product-card__reviews">(${p.reviews})</span>
        </div>
        <div class="product-card__footer">
          <div class="product-card__price">
            <span class="product-card__price-current">$${p.price.toLocaleString()}</span>
            ${p.originalPrice ? `<span class="product-card__price-original">$${p.originalPrice.toLocaleString()}</span>` : ''}
          </div>
          <button class="product-card__add-btn" onclick="addToCart(${p.id})" title="Add to cart"><i class="fas fa-plus"></i></button>
        </div>
      </div>
    </div>`;
  }).join('');

  loadMoreBtn.style.display = visible.length < filtered.length ? 'inline-flex' : 'none';
}

function initLoadMore() {
  $('#load-more-btn').addEventListener('click', () => {
    state.visibleCount += 4;
    renderProducts();
  });
}

// ============================================================
// TESTIMONIALS
// ============================================================
function renderTestimonials() {
  const track = $('#testimonials-track');
  track.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-card__quote">"</div>
      <div class="testimonial-card__header">
        <div class="testimonial-card__avatar" style="background:${t.color}">${t.avatar}</div>
        <div class="testimonial-card__info"><h4>${t.name}</h4><span>${t.role}</span></div>
      </div>
      <div class="testimonial-card__stars">${starHTML(t.rating)}</div>
      <p class="testimonial-card__text">${t.text}</p>
    </div>`).join('');

  const prev = $('#test-prev');
  const next = $('#test-next');
  let current = 0;
  const cardWidth = 380 + 24;

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, testimonials.length - 1));
    track.style.transform = `translateX(-${current * cardWidth}px)`;
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));

  // Auto-scroll
  setInterval(() => goTo(current < testimonials.length - 1 ? current + 1 : 0), 5000);
}

// ============================================================
// HERO SLIDER
// ============================================================
function initHero() {
  const slides = $$('.hero__slide');
  const dots = $$('.hero__dot');
  const prevBtn = $('#hero-prev');
  const nextBtn = $('#hero-next');

  function goToSlide(idx) {
    slides[state.heroIndex].classList.remove('active');
    dots[state.heroIndex].classList.remove('active');
    state.heroIndex = (idx + slides.length) % slides.length;
    slides[state.heroIndex].classList.add('active');
    dots[state.heroIndex].classList.add('active');
  }

  prevBtn.addEventListener('click', () => { goToSlide(state.heroIndex - 1); resetTimer(); });
  nextBtn.addEventListener('click', () => { goToSlide(state.heroIndex + 1); resetTimer(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goToSlide(i); resetTimer(); }));

  function resetTimer() {
    clearInterval(state.heroTimer);
    state.heroTimer = setInterval(() => goToSlide(state.heroIndex + 1), 5000);
  }
  resetTimer();
}

// ============================================================
// PRODUCT MODAL
// ============================================================
function openModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const modal = $('#product-modal');
  const overlay = $('#modal-overlay');
  const content = $('#modal-content');
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;

  content.innerHTML = `
    <div class="modal-content">
      <div class="modal-icon-wrap" style="background:linear-gradient(135deg,${p.color}22,${p.color}0a)">
        <i class="fas ${p.icon}" style="color:${p.color};filter:drop-shadow(0 0 20px ${p.color}80)"></i>
      </div>
      <div class="modal-info">
        <div class="modal-info__tag">${p.category.replace('-', ' ')}</div>
        <h2 class="modal-info__name">${p.name}</h2>
        <div class="modal-info__rating">
          <span class="modal-info__stars">${starHTML(p.rating)}</span>
          <span class="modal-info__reviews">${p.rating} · ${p.reviews} reviews</span>
          ${discount ? `<span style="background:var(--clr-accent-2);color:#fff;padding:2px 10px;border-radius:100px;font-size:0.75rem;font-weight:700;margin-left:8px">-${discount}%</span>` : ''}
        </div>
        <div class="modal-info__price">
          <span class="modal-info__price-current">$${p.price.toLocaleString()}</span>
          ${p.originalPrice ? `<span class="modal-info__price-original">$${p.originalPrice.toLocaleString()}</span>` : ''}
        </div>
        <p class="modal-info__desc">${p.description}</p>
        <div class="modal-info__features">
          <h4>Key Features</h4>
          <ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
        </div>
        <div class="modal-info__actions">
          <button class="btn btn--primary btn--lg" onclick="addToCart(${p.id});closeModal()"><i class="fas fa-shopping-bag"></i> Add to Cart</button>
          <button class="btn btn--outline" onclick="toggleWishlist(${p.id})"><i class="fas fa-heart"></i></button>
        </div>
      </div>
    </div>`;

  modal.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  $('#product-modal').classList.remove('open');
  $('#modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function initModal() {
  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-overlay').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

// ============================================================
// STATS COUNTER
// ============================================================
function initStats() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $$('[data-count]').forEach(animateCount);
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  const statsSection = document.querySelector('.stats');
  if (statsSection) observer.observe(statsSection);
}

// ============================================================
// AOS (Animate On Scroll)
// ============================================================
function initAOS() {
  const elements = $$('[data-aos]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = +(entry.target.dataset.aosDelay || 0);
        setTimeout(() => entry.target.classList.add('aos-animate'), delay);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  elements.forEach(el => observer.observe(el));
}

// ============================================================
// NEWSLETTER
// ============================================================
function initNewsletter() {
  const form = $('#newsletter-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (input.value) {
      showToast('You\'ve subscribed! Welcome to LuxeHome 🎉', 'fa-paper-plane', 'var(--clr-accent)');
      input.value = '';
    }
  });
}

// ============================================================
// PARALLAX
// ============================================================
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero__bg.active .hero__bg');
    if (hero) hero.style.transform = `translateY(${scrollY * 0.3}px)`;
  });
}

// ============================================================
// GLOBAL EXPORTS (for inline event handlers)
// ============================================================
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeQty = changeQty;
window.toggleWishlist = toggleWishlist;
window.openModal = openModal;
window.closeModal = closeModal;

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursor();
  initNavbar();
  initSearch();
  initCart();
  initHero();
  initModal();
  initStats();
  initNewsletter();
  renderCategories();
  renderFilters();
  renderProducts();
  renderTestimonials();
  initLoadMore();
});
