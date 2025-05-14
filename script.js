// IIFE to avoid global scope pollution and improve performance
(function() {
  'use strict';

  // Cache DOM elements for better performance
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const body = document.body;
  
  // Function to toggle mobile menu with improved performance
  function toggleMobileMenu(event) {
    if (event) {
      event.stopPropagation();
    }
    
    const isHidden = mobileMenu.classList.contains('hidden');
    
    // Set ARIA attributes for accessibility
    mobileMenuButton.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
      body.style.overflow = 'hidden';

      mobileMenuButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      `;
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      body.style.overflow = '';

      mobileMenuButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    }
  }

  // Close menu when clicking outside
  function handleDocumentClick(event) {
    if (!mobileMenuButton.contains(event.target) && 
        !mobileMenu.contains(event.target) && 
        !mobileMenu.classList.contains('hidden')) {
      toggleMobileMenu();
    }
  }

  // Handle form submissions with better performance
  function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Disable button to prevent multiple submissions
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Відправляється...';
    }

    // Create FormData object for sending
    const formData = new FormData(form);
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    // Simulate server delay (would be replaced with actual server request)
    setTimeout(() => {
      alert("Дякуємо за вашу заявку! Ми зв'яжемося з вами найближчим часом.");
      form.reset();
      
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Відправити заявку';
      }
    }, 1000);
  }

  // Format phone number for better UX
  function formatPhoneNumber(event) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      if (value.length <= 3) {
        value = value;
      } else if (value.length <= 6) {
        value = value.slice(0, 3) + '-' + value.slice(3);
      } else if (value.length <= 10) {
        value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
      } else {
        value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
      }
    }
    
    event.target.value = value;
  }

  // Smooth scroll implementation with better performance
  function handleSmoothScroll(event) {
    event.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Close mobile menu if open
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
      }

      // Calculate position with offset for fixed headers
      const offset = 60;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  // Enhance accessibility by making interactive elements more accessible
  function enhanceAccessibility() {
    // Add role="button" to clickable elements
    document.querySelectorAll('a[href], button').forEach(el => {
      if (!el.hasAttribute('role')) {
        el.setAttribute('role', 'button');
      }
    });
  }
  
  // Add mobile bottom navigation
  function addBottomNav() {
    if (document.querySelector('.mobile-bottom-nav') || window.innerWidth > 576) {
      return;
    }
    
    const bottomNav = document.createElement('div');
    bottomNav.className = 'mobile-bottom-nav';
    bottomNav.innerHTML = `
      <a href="./index.html" aria-label="Головна сторінка">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span>Головна</span>
      </a>
      <a href="./about-us.html" aria-label="Про нас">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>Про нас</span>
      </a>
      <a href="./achievements.html" aria-label="Досягнення">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
        <span>Досягнення</span>
      </a>
      <a href="#signup-form" aria-label="Контакти">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        <span>Контакти</span>
      </a>
    `;
    
    document.body.appendChild(bottomNav);
  }

  // Event delegation for better performance - attach events only when DOM is ready
  function init() {
    // Mobile menu toggle
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener('click', toggleMobileMenu);
      document.addEventListener('click', handleDocumentClick);
      
      // Close mobile menu when menu item is clicked
      const mobileMenuItems = mobileMenu.querySelectorAll('a');
      mobileMenuItems.forEach(item => {
        item.addEventListener('click', toggleMobileMenu);
      });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll);
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', handleFormSubmission);
      
      // Phone number formatting
      const phoneInput = document.getElementById('phone');
      if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
      }
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Enhance accessibility
    enhanceAccessibility();
    
    // Only add bottom nav on small screens
    if (window.innerWidth <= 576) {
      addBottomNav();
    }
    
    // Optimize images - apply lazy loading where needed and convert to next-gen formats
    document.addEventListener('DOMContentLoaded', function() {
      if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading available
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
          // Ensure all images have width and height set to avoid layout shifts
          if (!img.getAttribute('width') || !img.getAttribute('height')) {
            img.setAttribute('width', img.width || 300);
            img.setAttribute('height', img.height || 200);
          }
        });
      } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyLoadScript = document.createElement('script');
        lazyLoadScript.src = 'https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js';
        lazyLoadScript.defer = true;
        lazyLoadScript.onload = function() {
          const observer = lozad();
          observer.observe();
        };
        document.head.appendChild(lazyLoadScript);
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
