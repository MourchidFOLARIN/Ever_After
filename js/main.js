document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Expose lenis globally for ScrollTrigger sync
    window.lenis = lenis;

    // 2. Header Scroll Transition
    const header = document.querySelector('.site-header');
    const checkScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once in case page starts scrolled

    // 3. Mobile Menu Navigation
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            if (isOpen) {
                // Prevent body scroll
                document.body.style.overflow = 'hidden';
                lenis.stop();
            } else {
                // Restore body scroll
                document.body.style.overflow = '';
                lenis.start();
            }
        });

        // Close mobile menu on clicking any link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                lenis.start();
            });
        });
    }

    // 4. Highlight Active Navigation Links
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 5. Input Field Animation Helper (ensure labels don't override values)
    const inputs = document.querySelectorAll('.rsvp-input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.placeholder = '';
        });
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.placeholder = ' ';
            }
        });
        
        // Initial check for prefilled values
        if (input.value !== '') {
            input.placeholder = '';
        }
    });
});
