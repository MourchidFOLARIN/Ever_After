/* ═══════════════════════════════════════════════════════════
   Ever After Events — Before/After Scenography Slider (JS)
   Interactive Drag & Touch Slider Logic
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const baContainers = document.querySelectorAll('.luxury-before-after-container');
    if (baContainers.length === 0) return;

    baContainers.forEach(container => {
        const beforeImgUrl = container.dataset.beforeImg || 'https://i.pinimg.com/736x/2a/c5/fa/2ac5fa9b4a1dcdb537b63916935aea85.jpg';
        const afterImgUrl = container.dataset.afterImg || 'https://i.pinimg.com/736x/3a/d7/67/3ad76785781b738f2348a21368a0283e.jpg';
        const titleFr = container.dataset.titleFr || 'La Métamorphose Scénographique';
        const titleEn = container.dataset.titleEn || 'Scenographic Metamorphosis';

        container.innerHTML = `
            <div class="before-after-container">
                <div style="text-align: center; margin-bottom: 3rem;">
                    <p class="editorial-subtitle" style="color: var(--color-gold);" data-fr="Savoir-Faire & Vision" data-en="Craftsmanship & Vision">Savoir-Faire & Vision</p>
                    <h2 class="editorial-title" style="color: var(--color-bg-light);" data-fr="${titleFr}" data-en="${titleEn}">${titleFr}</h2>
                    <p style="max-width: 600px; margin: 1rem auto 0; color: rgba(255,255,255,0.7); font-size: 0.95rem;" data-fr="Glissez le curseur pour découvrir la transformation d'un espace brut en un sanctuaire féerique." data-en="Slide the cursor to reveal the transformation of a raw venue into a magical sanctuary.">Glissez le curseur pour découvrir la transformation d'un espace brut en un sanctuaire féerique.</p>
                </div>

                <div class="ba-slider-wrapper">
                    <!-- After Image (Full background) -->
                    <img src="${afterImgUrl}" alt="Décoration de mariage scénographiée par Ever After Events" class="ba-img-after">
                    
                    <!-- Before Image (Clipped layer) -->
                    <div class="ba-img-before-wrapper">
                        <img src="${beforeImgUrl}" alt="Lieu brut avant décoration" class="ba-img-before">
                    </div>

                    <!-- Labels -->
                    <span class="ba-label ba-label-before" data-fr="Espace Brut" data-en="Raw Venue">Espace Brut</span>
                    <span class="ba-label ba-label-after" data-fr="Signature Ever After" data-en="Ever After Signature">Signature Ever After</span>

                    <!-- Slider Handle -->
                    <div class="ba-handle">
                        <div class="ba-handle-button">↔</div>
                    </div>
                </div>
            </div>
        `;

        const wrapper = container.querySelector('.ba-slider-wrapper');
        const beforeWrapper = container.querySelector('.ba-img-before-wrapper');
        const beforeImg = container.querySelector('.ba-img-before');
        const handle = container.querySelector('.ba-handle');

        let isDragging = false;

        function updateSliderWidth() {
            if (wrapper && beforeImg) {
                beforeImg.style.width = `${wrapper.getBoundingClientRect().width}px`;
            }
        }

        window.addEventListener('resize', updateSliderWidth);
        updateSliderWidth();
        setTimeout(updateSliderWidth, 100);

        function setPosition(x) {
            const rect = wrapper.getBoundingClientRect();
            let offsetX = x - rect.left;
            if (offsetX < 0) offsetX = 0;
            if (offsetX > rect.width) offsetX = rect.width;

            const percentage = (offsetX / rect.width) * 100;
            beforeWrapper.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
        }

        function onMove(e) {
            if (!isDragging) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            setPosition(clientX);
        }

        function startDrag(e) {
            isDragging = true;
            onMove(e);
        }

        function stopDrag() {
            isDragging = false;
        }

        wrapper.addEventListener('mousedown', startDrag);
        wrapper.addEventListener('touchstart', startDrag, { passive: true });

        window.addEventListener('mousemove', onMove);
        window.addEventListener('touchmove', onMove, { passive: true });

        window.addEventListener('mouseup', stopDrag);
        window.addEventListener('touchend', stopDrag);
    });

    // Re-apply translation if language toggles
    if (window.applyLanguage) {
        window.applyLanguage(document.documentElement.getAttribute('lang') || 'fr');
    }
});
