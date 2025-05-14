// Mobile menu toggle and touch optimizations
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu functionality with improved touch handling
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const body = document.body;

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isMenuButton = mobileMenuButton.contains(event.target);
    const isMenuContent = mobileMenu.contains(event.target);
    
    if (!isMenuButton && !isMenuContent && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      
      // Change back to menu icon
      mobileMenuButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
      
      // Re-enable scrolling
      body.style.overflow = '';
    }
  });

  mobileMenuButton.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent the document click event from firing
    
    // Toggle the 'hidden' class
    if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
      
      // Disable scrolling when menu is open
      body.style.overflow = 'hidden';

      // Change the menu icon to X
      mobileMenuButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      `;
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      
      // Re-enable scrolling
      body.style.overflow = '';

      // Change back to menu icon
      mobileMenuButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    }
  });

  // Close mobile menu when menu item is clicked
  const mobileMenuItems = mobileMenu.querySelectorAll('a');
  mobileMenuItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      
      // Re-enable scrolling
      body.style.overflow = '';
      
      // Change back to menu icon
      mobileMenuButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    });
  });

  // Form submission with mobile optimizations
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    // Auto-format phone number for better mobile experience
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', function(e) {
        // Format phone number 
        let value = e.target.value.replace(/\D/g, '');
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
        e.target.value = value;
      });
    }

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Disable form submission button to prevent double submissions
      const submitButton = contactForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Відправляється...';
      }

      // Get form data
      const formData = new FormData(contactForm);
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });

      // Here you would typically send the data to your server
      console.log('Form data:', formDataObj);

      // Simulate server delay for better UX feedback
      setTimeout(() => {
        // Show success message
        alert("Дякуємо за вашу заявку! Ми зв'яжемося з вами найближчим часом.");

        // Reset form
        contactForm.reset();
        
        // Re-enable submit button
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Відправити заявку';
        }
      }, 1000);
    });
  }

  // Set current year in footer
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Make phone numbers clickable
  const makePhoneNumbersClickable = () => {
    // Find all phone number elements that should be clickable
    const phoneElements = document.querySelectorAll('.phone-number');
    phoneElements.forEach(element => {
      const phoneNumber = element.textContent.trim().replace(/[^\d+]/g, '');
      if (phoneNumber) {
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel:${phoneNumber}`;
        phoneLink.className = element.className;
        phoneLink.textContent = element.textContent;
        element.parentNode.replaceChild(phoneLink, element);
      }
    });
  };
  makePhoneNumbersClickable();

  // Fix for touch delay on mobile devices
  const removeTouchDelay = () => {
    // Add role="button" to clickable elements for better accessibility
    document.querySelectorAll('a[href], button').forEach(el => {
      if (!el.hasAttribute('role')) {
        el.setAttribute('role', 'button');
      }
    });
  };
  removeTouchDelay();

  // Smooth scroll for anchor links with improved mobile experience
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('flex');
          body.style.overflow = '';
        }

        // Offset for fixed headers
        const offset = 60; // Adjust based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // Add bottom navigation for mobile
  const addBottomNav = () => {
    // Check if mobile bottom nav already exists
    if (document.querySelector('.mobile-bottom-nav')) return;

    const bottomNav = document.createElement('div');
    bottomNav.className = 'mobile-bottom-nav';
    bottomNav.innerHTML = `
      <a href="./index.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span>Головна</span>
      </a>
      <a href="./about-us.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>Про нас</span>
      </a>
      <a href="./achievements.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
        <span>Досягнення</span>
      </a>
      <a href="#signup-form">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        <span>Контакти</span>
      </a>
    `;
    document.body.appendChild(bottomNav);
  };
  
  // Only add bottom nav on small screens
  if (window.innerWidth <= 576) {
    addBottomNav();
  }
  
  // Handle resize events to show/hide bottom nav
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 576) {
      addBottomNav();
    } else {
      const bottomNav = document.querySelector('.mobile-bottom-nav');
      if (bottomNav) {
        bottomNav.style.display = 'none';
      }
    }
  });

  // Optimize gallery images for mobile and prevent frames
  const optimizeGalleryForMobile = () => {
    // Check if we're on mobile
    const isMobile = window.innerWidth < 576;
    
    // Adjust gallery container heights for proper aspect ratio
    if (isMobile) {
      // Mobile adjustments - taller containers for better visibility
      document.querySelectorAll('.gallery-main-image').forEach(container => {
        container.style.height = '300px';
      });
      
      document.querySelectorAll('.gallery-side-images > div').forEach(container => {
        container.style.height = '250px';
      });
    } else {
      // Desktop - reset to default values
      document.querySelectorAll('.gallery-main-image').forEach(container => {
        container.style.height = '500px';
      });
      
      document.querySelectorAll('.gallery-side-images > div').forEach(container => {
        container.style.height = '240px';
      });
    }
    
    // Make sure all images fill their containers
    document.querySelectorAll('.gallery-image').forEach(img => {
      // Add loading="lazy" for better performance
      img.setAttribute('loading', 'lazy');
    });
  };
  
  // Run once on load
  optimizeGalleryForMobile();
  
  // And whenever window resizes
  window.addEventListener('resize', optimizeGalleryForMobile);

  // Also handle orientation change for mobile devices
  window.addEventListener('orientationchange', function() {
    // Short delay to allow the orientation change to complete
    setTimeout(function() {
      optimizeGalleryForMobile();
    }, 200);
  });
});
