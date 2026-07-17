// ============================================================
// Ever After Events — Core Animations (GSAP + ScrollTrigger)
// ============================================================

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // 1. Modern Lenis + GSAP ScrollTrigger Sync
    // Using requestAnimationFrame loop pattern (compatible with all Lenis v1 versions)
    function initScrollTriggerWithLenis() {
        if (window.lenis) {
            // Tell ScrollTrigger to use lenis scroll position
            gsap.ticker.add((time) => {
                window.lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
            
            // Update ScrollTrigger on each lenis scroll event
            window.lenis.on('scroll', () => {
                ScrollTrigger.update();
            });
        }
        // Always refresh after setup
        ScrollTrigger.refresh();
    }

    // Delay slightly so main.js Lenis init completes first
    setTimeout(initScrollTriggerWithLenis, 50);

    // 2. Custom Luxury Cursor (Desktop only)
    if (window.innerWidth > 1024) {
        const cursorDot = document.createElement('div');
        cursorDot.id = 'cursor-dot';
        cursorDot.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 8px; height: 8px;
            background: #C5A880;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease, transform 0.15s ease;
        `;
        
        const cursorRing = document.createElement('div');
        cursorRing.id = 'cursor-ring';
        cursorRing.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 36px; height: 36px;
            border: 1px solid rgba(197, 168, 128, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorRing);
        
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });
        
        // Smooth ring follow
        function animateRing() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();
        
        // Enlarge ring on hoverable elements
        const hoverables = document.querySelectorAll('a, button, .gallery-item, .service-card, .faq-trigger');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(2.5)';
                cursorDot.style.background = 'rgba(197, 168, 128, 0.6)';
                cursorRing.style.transform = 'translate(-50%, -50%) scale(1.8)';
                cursorRing.style.borderColor = 'rgba(197, 168, 128, 0.8)';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.background = '#C5A880';
                cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorRing.style.borderColor = 'rgba(197, 168, 128, 0.5)';
            });
        });
        
        // Hide default cursor
        document.body.style.cursor = 'none';
        document.querySelectorAll('a, button').forEach(el => el.style.cursor = 'none');
    }

    // 3. Custom Split-Word Text Reveal Effect (Awwwards Style)
    const splitTextElements = document.querySelectorAll('.editorial-title, .brand-statement-text, .split-reveal');
    splitTextElements.forEach(el => {
        const originalText = el.textContent.trim();
        const words = originalText.split(/\s+/);
        
        el.innerHTML = words.map(word => {
            return `<span class="reveal-wrapper" style="display: inline-block; overflow: hidden; vertical-align: top; padding-bottom: 0.1em;">
                <span class="reveal-inner" style="display: inline-block; will-change: transform, opacity;">
                    ${word}&nbsp;
                </span>
            </span>`;
        }).join('');

        // Set initial state
        gsap.set(el.querySelectorAll('.reveal-inner'), {
            y: '105%',
            opacity: 0,
        });
        
        // Trigger reveal when scrolling into viewport
        gsap.to(el.querySelectorAll('.reveal-inner'), {
            scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none"
            },
            y: '0%',
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.06
        });
    });

    // 4. Subtitle elegant reveal
    const subtitles = document.querySelectorAll('.editorial-subtitle');
    subtitles.forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 20, letterSpacing: '0.5em' },
            {
                opacity: 1,
                y: 0,
                letterSpacing: '0.25em',
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // 5. Staggered Fade-up reveals for cards and content blocks
    const fadeUpElements = document.querySelectorAll('.service-card, .gallery-filters, .rsvp-form-container, .contact-channels, .timeline-step');
    fadeUpElements.forEach((el) => {
        gsap.fromTo(el, 
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 92%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Services grid staggered
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        const cards = servicesGrid.querySelectorAll('.service-card');
        gsap.fromTo(cards,
            { opacity: 0, y: 80 },
            {
                opacity: 1,
                y: 0,
                duration: 1.1,
                ease: "power4.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: servicesGrid,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    }

    // Editorial content blocks
    const editorialBlocks = document.querySelectorAll('.editorial-content-block, .editorial-img-wrapper');
    editorialBlocks.forEach((el) => {
        const isImg = el.classList.contains('editorial-img-wrapper');
        gsap.fromTo(el,
            { opacity: 0, x: isImg ? -40 : 40 },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        gsap.fromTo(faqItems,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.12,
                scrollTrigger: {
                    trigger: '.faq-accordion',
                    start: "top 88%",
                    toggleActions: "play none none none"
                }
            }
        );

        // FAQ Accordion Click Logic
        faqItems.forEach(item => {
            const trigger = item.querySelector('.faq-trigger');
            const panel = item.querySelector('.faq-panel');
            
            if (trigger && panel) {
                trigger.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close other open panels first
                    faqItems.forEach(other => {
                        if (other !== item) {
                            other.classList.remove('active');
                            const otherPanel = other.querySelector('.faq-panel');
                            if (otherPanel) otherPanel.style.maxHeight = null;
                            const trigger = other.querySelector('.faq-trigger');
                            if (trigger) trigger.setAttribute('aria-expanded', 'false');
                        }
                    });

                    if (isActive) {
                        item.classList.remove('active');
                        panel.style.maxHeight = null;
                        trigger.setAttribute('aria-expanded', 'false');
                    } else {
                        item.classList.add('active');
                        panel.style.maxHeight = panel.scrollHeight + "px";
                        trigger.setAttribute('aria-expanded', 'true');
                    }
                    
                    setTimeout(() => ScrollTrigger.refresh(), 450);
                });
            }
        });
    }

    // 6. Parallax Scroll Effect for images
    const parallaxImages = document.querySelectorAll('.editorial-img-wrapper img, .service-card-img img');
    parallaxImages.forEach(img => {
        gsap.fromTo(img, 
            { yPercent: -8 },
            {
                yPercent: 8,
                ease: "none",
                scrollTrigger: {
                    trigger: img.closest('.editorial-img-wrapper, .service-card-img'),
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            }
        );
    });

    // 7. Stat Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const targetValue = parseInt(stat.getAttribute('data-target'), 10);
        const suffix = stat.getAttribute('data-suffix') || '';
        let obj = { val: 0 };
        
        gsap.to(obj, {
            scrollTrigger: {
                trigger: stat,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            val: targetValue,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: () => {
                stat.textContent = Math.floor(obj.val) + suffix;
            }
        });
    });

    // 8. Stats section horizontal line reveal
    const statItems = document.querySelectorAll('.stat-item');
    gsap.fromTo(statItems,
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.stats-grid',
                start: "top 88%",
                toggleActions: "play none none none"
            }
        }
    );

    // 9. Testimonials Swiper Carousel Initialization
    const swiperContainer = document.querySelector('.reviews-carousel');
    if (swiperContainer && typeof Swiper !== 'undefined') {
        new Swiper('.reviews-carousel', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 50,
            speed: 900,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-nav-next',
                prevEl: '.swiper-nav-prev',
            },
            effect: 'fade',
            fadeEffect: { crossFade: true }
        });
    }

    // 10. Masonry Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filterVal = btn.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    const itemCat = item.getAttribute('data-category');
                    const shouldShow = filterVal === 'all' || itemCat === filterVal;
                    
                    if (shouldShow) {
                        item.style.display = 'block';
                        gsap.fromTo(item,
                            { opacity: 0, scale: 0.92 },
                            { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out", clearProps: "transform" }
                        );
                    } else {
                        gsap.to(item, {
                            opacity: 0,
                            scale: 0.88,
                            duration: 0.35,
                            ease: "power2.in",
                            onComplete: () => { item.style.display = 'none'; }
                        });
                    }
                });
                
                setTimeout(() => ScrollTrigger.refresh(), 450);
            });
        });
    }

    // 11. Gallery Lightbox Modal
    const lightbox = document.getElementById('lightboxModal');
    if (lightbox) {
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                    gsap.set(lightbox, { opacity: 0, pointerEvents: 'auto' });
                    lightbox.classList.add('active');
                    gsap.to(lightbox, { opacity: 1, duration: 0.4, ease: "power2.out" });
                    gsap.fromTo(lightboxImg,
                        { scale: 0.9, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
                    );
                    if (window.lenis) window.lenis.stop();
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        const closeLightbox = () => {
            gsap.to(lightbox, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    lightbox.classList.remove('active');
                    lightbox.style.pointerEvents = 'none';
                    lightboxImg.src = '';
                }
            });
            if (window.lenis) window.lenis.start();
            document.body.style.overflow = '';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
        });
    }

    // 12. Magnetic Button Hover effect
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .social-icon-btn, .swiper-nav-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
        });
    });

    // 13. Hero Entrance Animation (on index page)
    const heroBadge = document.querySelector('.hero-badge');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCtas = document.querySelector('.hero-ctas');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (heroTitle) {
        const tl = gsap.timeline({ delay: 0.3 });
        
        if (heroBadge) tl.fromTo(heroBadge, 
            { opacity: 0, y: -20, scale: 0.9 }, 
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
        );
        
        tl.fromTo(heroTitle, 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 1.4, ease: "power4.out" }, 
            heroBadge ? "-=0.6" : "+=0"
        );
        
        if (heroSubtitle) tl.fromTo(heroSubtitle, 
            { opacity: 0, y: 25 }, 
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 
            "-=0.9"
        );
        
        if (heroCtas) tl.fromTo(Array.from(heroCtas.children), 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.18 }, 
            "-=0.8"
        );
        
        if (scrollIndicator) tl.fromTo(scrollIndicator, 
            { opacity: 0 }, 
            { opacity: 1, duration: 1, ease: "power2.out" }, 
            "-=0.4"
        );
    }

    // 13.5. Subpage Hero Entrance Animation
    const subpageHero = document.querySelector('.subpage-hero');
    if (subpageHero) {
        const subSubtitle = subpageHero.querySelector('.editorial-subtitle');
        const subTitle = subpageHero.querySelector('.editorial-title');
        const subDesc = subpageHero.querySelector('p');
        const subScrollIndicator = subpageHero.querySelector('.scroll-indicator');
        
        const tlSub = gsap.timeline({ delay: 0.2 });
        
        if (subSubtitle) tlSub.fromTo(subSubtitle, 
            { opacity: 0, y: -20, scale: 0.9 }, 
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
        );
        
        if (subTitle) tlSub.fromTo(subTitle, 
            { opacity: 0, y: 40 }, 
            { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }, 
            "-=0.5"
        );
        
        if (subDesc) tlSub.fromTo(subDesc, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 
            "-=0.7"
        );
        
        if (subScrollIndicator) tlSub.fromTo(subScrollIndicator, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.8, ease: "power2.out" }, 
            "-=0.4"
        );
    }


    // 14. Footer Reveal
    const footerCols = document.querySelectorAll('.footer-col-brand, .footer-col-links, .footer-col-contact');
    gsap.fromTo(footerCols,
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.site-footer',
                start: "top 90%",
                toggleActions: "play none none none"
            }
        }
    );

    // 15. Gallery items entrance animation
    gsap.fromTo(galleryItems,
        { opacity: 0, y: 50, scale: 0.95 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
                trigger: '.masonry-grid',
                start: "top 88%",
                toggleActions: "play none none none"
            }
        }
    );

});
