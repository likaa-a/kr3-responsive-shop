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

const collectionTabs = Array.from(document.querySelectorAll('[data-collection-tab]'));
const homeProducts = Array.from(document.querySelectorAll('[data-home-product]'));

collectionTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const selectedGroup = tab.dataset.collectionTab;
    collectionTabs.forEach((item) => {
      item.setAttribute('aria-selected', String(item === tab));
    });
    homeProducts.forEach((product) => {
      const groups = (product.dataset.groups || '').split(' ');
      product.hidden = !groups.includes(selectedGroup);
    });
  });
});

const newsletterForm = document.querySelector('[data-newsletter-form]');
const newsletterStatus = document.querySelector('[data-newsletter-status]');

newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!newsletterForm.checkValidity()) {
    newsletterForm.reportValidity();
    return;
  }
  if (newsletterStatus) {
    newsletterStatus.hidden = false;
    newsletterStatus.textContent = 'Спасибо. Приглашение в закрытый список отправлено.';
  }
  newsletterForm.reset();
});

const strapImage = document.querySelector('[data-strap-image]');
const strapStatus = document.querySelector('[data-strap-status]');
const strapOptions = document.querySelectorAll('input[name="strap"]');
const strapVariants = {
  green: {
    src: 'images/heritage-noir-720.jpg',
    srcset: 'images/heritage-noir-360.jpg 360w, images/heritage-noir-720.jpg 720w',
    alt: 'Механические часы Heritage Noir с чёрным циферблатом, открытым балансом и зелёным кожаным ремешком',
    label: 'зелёная кожа'
  },
  black: {
    src: 'images/heritage-noir-black-leather.png',
    srcset: '',
    alt: 'Механические часы Heritage Noir с чёрным циферблатом, открытым балансом и чёрным кожаным ремешком',
    label: 'чёрная кожа'
  },
  steel: {
    src: 'images/heritage-noir-steel.png',
    srcset: '',
    alt: 'Механические часы Heritage Noir с чёрным циферблатом, открытым балансом и стальным браслетом',
    label: 'стальной браслет'
  }
};

if (strapImage && strapOptions.length > 0) {
  let strapRequest = 0;
  let strapAnimation = null;
  let activeIndex = Array.from(strapOptions).findIndex((option) => option.checked);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const strapMedia = strapImage.closest('.product-detail__media');

  const applyStrapVariant = (variant) => {
    strapImage.removeAttribute('srcset');
    strapImage.src = variant.src;
    if (variant.srcset) strapImage.srcset = variant.srcset;
    strapImage.alt = variant.alt;
    if (strapStatus) strapStatus.textContent = `Выбран вариант: ${variant.label}`;
  };

  const animateStrapChange = async (variant, direction, request, nextIndex) => {
    strapAnimation?.cancel();
    strapImage.classList.add('is-flipping');

    if (typeof strapImage.animate !== 'function') {
      applyStrapVariant(variant);
      activeIndex = nextIndex;
      strapImage.classList.remove('is-flipping');
      strapMedia?.removeAttribute('aria-busy');
      return;
    }

    const isReduced = reducedMotion.matches;
    const outgoingFrames = isReduced
      ? [{ opacity: 1 }, { opacity: 0.35 }]
      : [
          { transform: 'perspective(1200px) rotateY(0deg) scale(1)', opacity: 1 },
          { transform: `perspective(1200px) rotateY(${direction * -82}deg) scale(0.975)`, opacity: 0.35 }
        ];

    strapImage.style.transformOrigin = direction > 0 ? 'left center' : 'right center';
    strapAnimation = strapImage.animate(outgoingFrames, {
      duration: isReduced ? 90 : 130,
      easing: 'cubic-bezier(0.77, 0, 0.175, 1)',
      fill: 'forwards'
    });

    try {
      await strapAnimation.finished;
    } catch {
      return;
    }
    if (request !== strapRequest) return;

    strapAnimation.cancel();
    applyStrapVariant(variant);
    activeIndex = nextIndex;

    const incomingFrames = isReduced
      ? [{ opacity: 0.35 }, { opacity: 1 }]
      : [
          { transform: `perspective(1200px) rotateY(${direction * 82}deg) scale(0.975)`, opacity: 0.35 },
          { transform: 'perspective(1200px) rotateY(0deg) scale(1)', opacity: 1 }
        ];

    strapImage.style.transformOrigin = direction > 0 ? 'right center' : 'left center';
    strapAnimation = strapImage.animate(incomingFrames, {
      duration: isReduced ? 120 : 170,
      easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
      fill: 'forwards'
    });

    try {
      await strapAnimation.finished;
    } catch {
      return;
    }
    if (request !== strapRequest) return;

    strapAnimation.cancel();
    strapAnimation = null;
    strapImage.style.removeProperty('transform-origin');
    strapImage.classList.remove('is-flipping');
    strapMedia?.removeAttribute('aria-busy');
  };

  strapOptions.forEach((option, nextIndex) => {
    option.addEventListener('change', () => {
      if (!option.checked) return;
      const variant = strapVariants[option.value];
      if (!variant) return;

      const request = ++strapRequest;
      const direction = nextIndex >= activeIndex ? 1 : -1;
      strapAnimation?.cancel();
      strapAnimation = null;
      strapImage.style.removeProperty('transform-origin');
      strapImage.classList.remove('is-flipping');
      strapMedia?.setAttribute('aria-busy', 'true');
      const preload = new Image();
      preload.addEventListener('load', () => {
        if (request !== strapRequest) return;
        animateStrapChange(variant, direction, request, nextIndex);
      }, { once: true });
      preload.addEventListener('error', () => {
        if (request !== strapRequest) return;
        strapMedia?.removeAttribute('aria-busy');
      }, { once: true });
      preload.src = variant.src;
    });
  });
}

const reviewTrack = document.querySelector('[data-review-track]');
const reviewPrev = document.querySelector('[data-review-prev]');
const reviewNext = document.querySelector('[data-review-next]');
const reviewStatus = document.querySelector('[data-review-status]');

if (reviewTrack && reviewPrev && reviewNext) {
  const reviewCards = Array.from(reviewTrack.querySelectorAll('.testimonial-card'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let scrollFrame = 0;

  const getReviewMetrics = () => {
    const firstCard = reviewCards[0];
    const gap = Number.parseFloat(getComputedStyle(reviewTrack).columnGap) || 0;
    const step = firstCard ? firstCard.getBoundingClientRect().width + gap : reviewTrack.clientWidth;
    const visible = Math.max(1, Math.round((reviewTrack.clientWidth + gap) / step));
    const start = Math.min(reviewCards.length - 1, Math.max(0, Math.round(reviewTrack.scrollLeft / step)));
    return { step, visible, start };
  };

  const updateReviewControls = () => {
    const { visible, start } = getReviewMetrics();
    const atStart = reviewTrack.scrollLeft <= 2;
    const atEnd = reviewTrack.scrollLeft >= reviewTrack.scrollWidth - reviewTrack.clientWidth - 2;
    reviewPrev.disabled = atStart;
    reviewNext.disabled = atEnd;
    if (reviewStatus) {
      const end = Math.min(reviewCards.length, start + visible);
      reviewStatus.textContent = `Показаны отзывы ${start + 1}–${end} из ${reviewCards.length}`;
    }
  };

  const moveReviews = (direction) => {
    const { step } = getReviewMetrics();
    reviewTrack.scrollBy({
      left: direction * step,
      behavior: reducedMotion.matches ? 'auto' : 'smooth'
    });
  };

  reviewPrev.addEventListener('click', () => moveReviews(-1));
  reviewNext.addEventListener('click', () => moveReviews(1));
  reviewTrack.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      moveReviews(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  reviewTrack.addEventListener('scroll', () => {
    window.cancelAnimationFrame(scrollFrame);
    scrollFrame = window.requestAnimationFrame(updateReviewControls);
  }, { passive: true });
  window.addEventListener('resize', updateReviewControls);
  updateReviewControls();
}

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
const successDialog = document.getElementById('success-dialog');
const successDialogClose = document.querySelector('[data-success-close]');
let dialogTrigger = null;
let successReturnFocus = null;

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

function closeSuccessDialog() {
  if (!successDialog) return;
  successDialog.close();
  document.body.classList.remove('dialog-open');
  successReturnFocus?.focus();
}

function openSuccessDialog(form) {
  if (!successDialog) return;
  successReturnFocus = dialogTrigger || form.querySelector('input, select, textarea');
  if (orderDialog?.open) orderDialog.close();
  successDialog.showModal();
  document.body.classList.add('dialog-open');
}

successDialogClose?.addEventListener('click', closeSuccessDialog);
successDialog?.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeSuccessDialog();
});
successDialog?.addEventListener('click', (event) => {
  if (event.target === successDialog) closeSuccessDialog();
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
    form.reset();
    requiredFields.forEach((field) => field.removeAttribute('aria-invalid'));
    syncSubmit();
    openSuccessDialog(form);
  });

  form.addEventListener('reset', () => {
    requiredFields.forEach((field) => field.removeAttribute('aria-invalid'));
    form.querySelectorAll('.form-error').forEach((error) => { error.hidden = true; });
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
