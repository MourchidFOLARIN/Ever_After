/* ═══════════════════════════════════════════════════════════
   Ever After Events — Interactive Portfolio Filter (JS)
   Filter Logic & Category Filtering
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn, .portfolio-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length === 0 || galleryItems.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.filter;

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            galleryItems.forEach(item => {
                const itemCat = item.dataset.category || '';
                if (category === 'all' || itemCat === category || itemCat.includes(category)) {
                    item.classList.remove('filter-hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.classList.add('filter-hidden');
                }
            });
        });
    });

    if (window.applyLanguage) {
        window.applyLanguage(document.documentElement.getAttribute('lang') || 'fr');
    }
});
