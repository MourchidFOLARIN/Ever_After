function applyLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-fr][data-en]').forEach(el => {
        const translation = el.getAttribute(`data-${lang}`);
        if (translation !== null) {
            // If the element has kids but we just want to replace text, or if it is purely text
            if (el.children.length === 0) {
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
    const langToggle = document.getElementById('langToggle');
    const langToggleMobile = document.getElementById('langToggleMobile');
    if (langToggle) {
        langToggle.textContent = lang === 'fr' ? 'EN' : 'FR';
        langToggle.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer en Français');
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
    const langToggle = document.getElementById('langToggle');
    const langToggleMobile = document.getElementById('langToggleMobile');
    let currentLang = localStorage.getItem('preferredLang') || 'fr';
    if (langToggle) {
        langToggle.addEventListener('click', () => {
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
