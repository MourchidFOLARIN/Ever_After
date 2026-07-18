/* ═══════════════════════════════════════════════════════════
   Ever After Events — Custom Event Tracking for Analytics
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // Helper function to send event to Google Analytics
    function trackEvent(eventName, eventCategory, eventLabel) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, {
                'event_category': eventCategory,
                'event_label': eventLabel
            });
        } else {
            console.log(`Analytics event (not sent): ${eventName}, ${eventCategory}, ${eventLabel}`);
        }
    }

    // 1. Track "Prendre RDV" clicks
    document.querySelectorAll('a[href="contact.html"]').forEach(el => {
        if (el.textContent.toLowerCase().includes('rdv') || el.textContent.toLowerCase().includes('book')) {
            el.addEventListener('click', () => {
                trackEvent('click_cta', 'Booking', 'Main CTA');
            });
        }
    });

    // 2. Track specific service clicks from the services page
    document.querySelectorAll('.service-block a, .service-card a').forEach(el => {
        el.addEventListener('click', () => {
            const serviceTitle = el.closest('.service-block, .service-card').querySelector('h3').textContent;
            trackEvent('click_service', 'Services', serviceTitle);
        });
    });

    // 3. Track social media clicks in the footer
    document.querySelectorAll('.social-icons-footer a').forEach(el => {
        el.addEventListener('click', () => {
            const socialPlatform = el.getAttribute('aria-label');
            trackEvent('click_social', 'Footer Socials', socialPlatform);
        });
    });

    // 4. Track chatbot open
    const chatbotToggle = document.getElementById('chatbot-toggle');
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            trackEvent('open_chatbot', 'Engagement', 'Chatbot');
        });
    }
});