// IIFE to avoid global scope pollution and improve performance
(function() {
  'use strict';

  // Only execute when DOM is ready
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function() {
    // DOM elements cache
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;
    
    // Mobile menu toggle function
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

    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Mobile menu toggle
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', toggleMobileMenu);
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', function(event) {
        if (!mobileMenuButton.contains(event.target) && 
            !mobileMenu.contains(event.target) && 
            !mobileMenu.classList.contains('hidden')) {
          toggleMobileMenu();
        }
      });
      
      // Close mobile menu when menu item is clicked
      const mobileMenuItems = mobileMenu.querySelectorAll('a');
      mobileMenuItems.forEach(item => {
        item.addEventListener('click', toggleMobileMenu);
      });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(event) {
        event.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Close mobile menu if open
          if (!mobileMenu.classList.contains('hidden')) {
            toggleMobileMenu();
          }
          
          // Calculate position
          const offset = 60;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Відправляється...';
        }
        
        // Form data processing
        setTimeout(() => {
          alert("Дякуємо за вашу заявку! Ми зв'яжемося з вами найближчим часом.");
          contactForm.reset();
          
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Відправити заявку';
          }
        }, 1000);
      });
      
      // Phone number formatting
      const phoneInput = document.getElementById('phone');
      if (phoneInput) {
        phoneInput.addEventListener('input', function(event) {
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
        });
      }
    }
  });
})();
