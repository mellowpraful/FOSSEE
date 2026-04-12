/**
 * Mobile-First Enhancement JavaScript
 * Handles bottom navigation, mobile features, and interactions
 */

(function() {
    'use strict';

    // ============================================
    // BOTTOM NAVIGATION DETECTION & SETUP
    // ============================================

    function initMobileBottomNav() {
        const isMobile = window.innerWidth <= 768;
        const navbar = document.querySelector('.navbar');
        
        if (isMobile && navbar) {
            navbar.classList.add('mobile-hidden');
        }
        
        updateActiveNavItem();
    }

    function updateActiveNavItem() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.mobile-bottom-nav a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (currentPath.includes(href) || 
                (href === '/' && currentPath === '/workshop/'))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // ============================================
    // RESPONSIVE TABLE TO CARD CONVERSION
    // ============================================

    function convertTableToCards() {
        const tables = document.querySelectorAll('table');
        
        tables.forEach(table => {
            if (window.innerWidth <= 768) {
                convertSingleTableToCards(table);
            } else {
                // Show table on desktop
                table.style.display = 'table';
            }
        });
    }

    function convertSingleTableToCards(table) {
        const rows = table.querySelectorAll('tbody tr');
        const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
        
        rows.forEach((row, index) => {
            const cells = row.querySelectorAll('td');
            const card = document.createElement('div');
            card.className = 'table-card';
            
            let cardHTML = '';
            cells.forEach((cell, cellIndex) => {
                const label = headers[cellIndex] || '';
                cardHTML += `
                    <div class="table-card-row">
                        <div class="table-card-label">${label}</div>
                        <div class="table-card-value">${cell.innerHTML}</div>
                    </div>
                `;
            });
            
            card.innerHTML = cardHTML;
            row.parentNode.insertBefore(card, row);
        });
        
        table.style.display = 'none';
    }

    // ============================================
    // LAZY IMAGE LOADING
    // ============================================

    function initLazyImages() {
        const images = document.querySelectorAll('img:not([loading="lazy"])');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        }
    }

    // ============================================
    // PULL-TO-REFRESH FUNCTIONALITY
    // ============================================

    function initPullToRefresh() {
        const container = document.querySelector('.base-content');
        if (!container) return;

        let startY = 0;
        let currentY = 0;
        let isPulling = false;

        container.addEventListener('touchstart', function(e) {
            if (window.scrollY === 0) {
                startY = e.touches[0].clientY;
                isPulling = true;
            }
        });

        container.addEventListener('touchmove', function(e) {
            if (!isPulling) return;
            
            currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            if (diff > 0 && diff < 100) {
                container.style.transform = `translateY(${diff}px)`;
            }
        });

        container.addEventListener('touchend', function() {
            if (currentY - startY > 60) {
                location.reload();
            }
            container.style.transform = 'translateY(0)';
            isPulling = false;
        });
    }

    // ============================================
    // TOUCH-FRIENDLY INTERACTIONS
    // ============================================

    function initTouchInteractions() {
        const buttons = document.querySelectorAll('button, a.btn, .btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            btn.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // ============================================
    // SWIPE GESTURES FOR CARDS
    // ============================================

    function initSwipeGestures() {
        const cards = document.querySelectorAll('[data-swipeable="true"]');
        let touchStartX = 0;
        let touchEndX = 0;

        cards.forEach(card => {
            card.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, false);

            card.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe(card);
            }, false);
        });

        function handleSwipe(card) {
            if (touchEndX < touchStartX - 50) {
                // Swiped left
                card.classList.add('swiped-left');
            }
            if (touchEndX > touchStartX + 50) {
                // Swiped right
                card.classList.remove('swiped-left');
            }
        }
    }

    // ============================================
    // FLOATING ACTION BUTTON (FAB)
    // ============================================

    function initFloatingActionButton() {
        const fab = document.getElementById('fab-primary-action');
        if (!fab) return;

        let lastScrollTop = 0;
        const content = document.querySelector('.base-content');

        if (content) {
            content.addEventListener('scroll', () => {
                const scrollTop = content.scrollTop;

                if (scrollTop > lastScrollTop) {
                    // Scrolling down - hide FAB
                    fab.style.opacity = '0.5';
                    fab.style.pointerEvents = 'none';
                } else {
                    // Scrolling up - show FAB
                    fab.style.opacity = '1';
                    fab.style.pointerEvents = 'auto';
                }

                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            });
        }
    }

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================

    function initKeyboardNavigation() {
        // Tab through buttons with better focus handling
        document.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                const focused = document.activeElement;
                if (focused && focused.tagName === 'BUTTON') {
                    focused.click();
                }
            }
        });
    }

    // ============================================
    // FORM VALIDATION WITH VISUAL FEEDBACK
    // ============================================

    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const inputs = this.querySelectorAll('input, textarea, select');
                
                inputs.forEach(input => {
                    if (!input.value && input.required) {
                        e.preventDefault();
                        input.classList.add('invalid');
                        showErrorMessage(input, 'This field is required');
                    } else {
                        input.classList.remove('invalid');
                        removeErrorMessage(input);
                    }
                });
            });
        });
    }

    function showErrorMessage(input, message) {
        const existing = input.parentElement.querySelector('.error-message');
        if (existing) return;

        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.setAttribute('role', 'alert');
        input.parentElement.appendChild(error);
    }

    function removeErrorMessage(input) {
        const error = input.parentElement.querySelector('.error-message');
        if (error) error.remove();
    }

    // ============================================
    // SKELETON LOADER
    // ============================================

    function showSkeletonLoader(container) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-card';
        skeleton.innerHTML = `
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text" style="width: 80%;"></div>
        `;
        container.appendChild(skeleton);
    }

    function removeSkeletonLoader(container) {
        const skeleton = container.querySelector('.skeleton-card');
        if (skeleton) skeleton.remove();
    }

    // ============================================
    // RESIZE OBSERVER FOR RESPONSIVE CHANGES
    // ============================================

    function initResponsiveObserver() {
        if (!('ResizeObserver' in window)) return;

        const observer = new ResizeObserver(() => {
            if (window.innerWidth > 768) {
                // Switch to desktop mode
                document.querySelectorAll('.mobile-bottom-nav').forEach(nav => {
                    nav.style.display = 'none';
                });
            } else {
                // Switch to mobile mode
                document.querySelectorAll('.mobile-bottom-nav').forEach(nav => {
                    nav.style.display = 'flex';
                });
                convertTableToCards();
            }
        });

        observer.observe(document.body);
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Initialize all features
        initMobileBottomNav();
        convertTableToCards();
        initLazyImages();
        initTouchInteractions();
        initSwipeGestures();
        initFloatingActionButton();
        initKeyboardNavigation();
        initFormValidation();
        initResponsiveObserver();

        // Reinitialize on window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                initMobileBottomNav();
                convertTableToCards();
                updateActiveNavItem();
            }, 250);
        });

        // Update active nav item on page load
        updateActiveNavItem();
    }

    // Start when DOM is ready
    if (document.readyState !== 'loading') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }

})();
