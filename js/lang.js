function applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-fr][data-en]').forEach(el => {
        const translation = el.getAttribute(`data-${lang}`);
        if (translation !== null) {
            // Check if element was processed by split-word reveal animation
            if (el.querySelector('.reveal-wrapper')) {
                const words = translation.trim().split(/\s+/);
                el.innerHTML = words.map(word => {
                    return `<span class="reveal-wrapper" style="display: inline-block; overflow: hidden; vertical-align: top; padding-bottom: 0.1em;">
                        <span class="reveal-inner" style="display: inline-block; will-change: transform, opacity; transform: translateY(0%); opacity: 1;">
                            ${word}&nbsp;
                        </span>
                    </span>`;
                }).join('');
            } else if (el.children.length === 0) {
                el.textContent = translation;
            } else {
                // Try to update only the text node if possible, or support basic html
                el.innerHTML = translation;
            }
        }
    });

    // Update placeholder/labels if any
    document.querySelectorAll('input[data-placeholder-fr], textarea[data-placeholder-fr]').forEach(el => {
        const placeholderVal = el.getAttribute(`data-placeholder-${lang}`);
        if (placeholderVal) {
            el.setAttribute('placeholder', placeholderVal);
        }
    });

    // Update button appearance
    const langToggleDesktop = document.getElementById('langToggleDesktop');
    const langToggleMobile = document.getElementById('langToggleMobile');
    if (langToggleDesktop) {
        langToggleDesktop.textContent = lang === 'fr' ? 'EN' : 'FR';
        langToggleDesktop.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer en Français');
    }
    if (langToggleMobile) {
        langToggleMobile.textContent = lang === 'fr' ? 'EN' : 'FR';
        langToggleMobile.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer en Français');
    }
    localStorage.setItem('preferredLang', lang);
}
// Expose the function globally so other scripts (like chatbot.js) can call it.
window.applyLanguage = applyLanguage;

document.addEventListener('DOMContentLoaded', () => {
    const langToggleDesktop = document.getElementById('langToggleDesktop');
    const langToggleMobile = document.getElementById('langToggleMobile');
    let currentLang = localStorage.getItem('preferredLang') || 'fr';

    if (langToggleDesktop) {
        langToggleDesktop.addEventListener('click', () => {
            currentLang = currentLang === 'fr' ? 'en' : 'fr';
            applyLanguage(currentLang);
        });
    }

    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', () => {
            currentLang = currentLang === 'fr' ? 'en' : 'fr';
            applyLanguage(currentLang);
        });
    }

    // Apply language on load
    applyLanguage(currentLang);
});
