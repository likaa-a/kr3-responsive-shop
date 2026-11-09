document.documentElement.classList.add('js');

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav.hidden = isOpen;
  });

  const desktopQuery = window.matchMedia('(min-width: 768px)');
  const syncNavigation = () => {
    if (desktopQuery.matches) {
      siteNav.hidden = false;
      navToggle.setAttribute('aria-expanded', 'true');
    } else {
      siteNav.hidden = true;
      navToggle.setAttribute('aria-expanded', 'false');
    }
  };

  desktopQuery.addEventListener('change', syncNavigation);
  syncNavigation();
}

const revealElements = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-in'));
}

const heroModels = {
  heritage: {
    name: 'Heritage Noir',
    price: '286 000 ₽',
    src: 'images/heritage-noir-720.jpg',
    srcset: 'images/heritage-noir-360.jpg 360w, images/heritage-noir-720.jpg 720w',
    alt: 'Механические часы Heritage Noir со стальным корпусом и зелёным кожаным ремешком'
  },
  reserve: {
    name: 'Réserve Ivoire',
    price: '312 000 ₽',
    src: 'images/reserve-ivoire-720.jpg',
    srcset: 'images/reserve-ivoire-360.jpg 360w, images/reserve-ivoire-720.jpg 720w',
    alt: 'Механические часы Réserve Ivoire со светлым циферблатом и чёрным ремешком'
  },
  integral: {
    name: 'Intégral Bleu',
    price: '398 000 ₽',
    src: 'images/integral-bleu-720.jpg',
    srcset: 'images/integral-bleu-360.jpg 360w, images/integral-bleu-720.jpg 720w',
    alt: 'Механические часы Intégral Bleu с синим циферблатом и стальным браслетом'
  }
};

const heroImage = document.getElementById('hero-product-image');
const heroName = document.getElementById('hero-model-name');
const heroPrice = document.getElementById('hero-model-price');
const heroSources = document.querySelectorAll('[data-hero-source]');

document.querySelectorAll('[data-model]').forEach((button) => {
  button.addEventListener('click', () => {
    const model = heroModels[button.dataset.model];
    if (!model || !heroImage || !heroName || !heroPrice) return;

    document.querySelectorAll('[data-model]').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    heroSources.forEach((source) => source.removeAttribute('srcset'));
    heroImage.src = model.src;
    heroImage.srcset = model.srcset;
    heroImage.sizes = '(max-width: 899px) 100vw, 62vw';
    heroImage.alt = model.alt;
    heroName.textContent = model.name;
    heroPrice.textContent = model.price;
  });
});

const filtersForm = document.querySelector('[data-filters-form]');
const catalogCards = Array.from(document.querySelectorAll('[data-product-card]'));
const resultsStatus = document.getElementById('catalog-results');

function updateCatalog() {
  if (!filtersForm || catalogCards.length === 0) return;
  const checkedMaterials = Array.from(filtersForm.querySelectorAll('input[name="material"]:checked'))
    .map((input) => input.value);
  const minPrice = Number(filtersForm.elements['price-from'].value) || 0;
  const maxPrice = Number(filtersForm.elements['price-to'].value) || Number.POSITIVE_INFINITY;
  let visibleCount = 0;

  catalogCards.forEach((card) => {
    const matchesMaterial = checkedMaterials.length === 0 || checkedMaterials.includes(card.dataset.material);
    const price = Number(card.dataset.price);
    const isVisible = matchesMaterial && price >= minPrice && price <= maxPrice;
    card.classList.toggle('is-filtered-out', !isVisible);
    visibleCount += Number(isVisible);
  });

  if (resultsStatus) {
    resultsStatus.textContent = `Найдено моделей: ${visibleCount}`;
  }
}

if (filtersForm) {
  filtersForm.addEventListener('input', updateCatalog);
  filtersForm.addEventListener('submit', (event) => {
    event.preventDefault();
    updateCatalog();
  });
  filtersForm.addEventListener('reset', () => window.setTimeout(updateCatalog, 0));
  updateCatalog();
}

const orderDialog = document.getElementById('order-dialog');
const dialogClose = document.querySelector('[data-dialog-close]');
let dialogTrigger = null;

document.querySelectorAll('[data-open-dialog]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!orderDialog) return;
    dialogTrigger = button;
    const productField = orderDialog.querySelector('[name="product"]');
    if (productField && button.dataset.product) productField.value = button.dataset.product;
    orderDialog.showModal();
    document.body.classList.add('dialog-open');
  });
});

function closeDialog() {
  if (!orderDialog) return;
  orderDialog.close();
  document.body.classList.remove('dialog-open');
  dialogTrigger?.focus();
}

dialogClose?.addEventListener('click', closeDialog);
orderDialog?.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeDialog();
});
orderDialog?.addEventListener('click', (event) => {
  if (event.target === orderDialog) closeDialog();
});

function validateField(field) {
  const error = document.getElementById(`${field.id}-error`);
  const isValid = field.checkValidity();
  if (isValid) {
    field.removeAttribute('aria-invalid');
    if (error) error.hidden = true;
  } else {
    field.setAttribute('aria-invalid', 'true');
    if (error) {
      error.textContent = field.validationMessage;
      error.hidden = false;
    }
  }
  return isValid;
}

document.querySelectorAll('form[data-order-form]').forEach((form) => {
  const requiredFields = Array.from(form.querySelectorAll('[required]'));
  const submitButton = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[data-form-status]');

  const syncSubmit = () => {
    if (submitButton) submitButton.disabled = !form.checkValidity();
  };

  requiredFields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.hasAttribute('aria-invalid')) validateField(field);
      syncSubmit();
    });
    field.addEventListener('change', syncSubmit);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const firstInvalid = requiredFields.find((field) => !validateField(field));
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }
    if (status) {
      status.hidden = false;
      status.textContent = 'Заявка принята. Консьерж свяжется с вами в течение рабочего часа.';
      status.focus();
    }
    form.reset();
    requiredFields.forEach((field) => field.removeAttribute('aria-invalid'));
    syncSubmit();
  });

  form.addEventListener('reset', () => {
    requiredFields.forEach((field) => field.removeAttribute('aria-invalid'));
    form.querySelectorAll('.form-error').forEach((error) => { error.hidden = true; });
    if (status) status.hidden = true;
    window.setTimeout(syncSubmit, 0);
  });

  syncSubmit();
});

const productFromQuery = new URLSearchParams(window.location.search).get('product');
const orderProduct = document.getElementById('order-product');
if (productFromQuery && orderProduct) {
  const matchingOption = Array.from(orderProduct.options).find((option) => option.value === productFromQuery);
  if (matchingOption) orderProduct.value = productFromQuery;
  orderProduct.dispatchEvent(new Event('change', { bubbles: true }));
}

const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  const updateBackToTop = () => {
    backToTop.hidden = window.scrollY < 650;
  };
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
}
