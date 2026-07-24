/* ═══════════════════════════════════════════════════════════
   Ever After Events — Moodboard Creator (JS)
   Bespoke Interactive Palette Logic
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const mbContainer = document.getElementById('luxury-moodboard-container');
    if (!mbContainer) return;

    const palettes = [
        {
            id: 'rose_gold',
            titleFr: 'Rose Poudré & Or Champenoise',
            titleEn: 'Powder Rose & Champagne Gold',
            colors: ['#F7E7E6', '#E2C2C0', '#D4AF37', '#FAF6F0'],
            images: [
                'https://i.pinimg.com/736x/3a/d7/67/3ad76785781b738f2348a21368a0283e.jpg',
                'https://i.pinimg.com/736x/c4/71/96/c47196360e02fb57d1464100ee91ddc7.jpg',
                'https://i.pinimg.com/736x/2a/c5/fa/2ac5fa9b4a1dcdb537b63916935aea85.jpg'
            ]
        },
        {
            id: 'emerald_green',
            titleFr: 'Feuillage Verdoyant & Blanc Pur',
            titleEn: 'Verdant Foliage & Pure White',
            colors: ['#2D4A3E', '#8FA89B', '#FFFFFF', '#D4AF37'],
            images: [
                'https://i.pinimg.com/736x/b5/7f/82/b57f82b29b6a5901a81945f2332aa225.jpg',
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80'
            ]
        },
        {
            id: 'royal_velvet',
            titleFr: 'Bordeaux Velours & Nuit Étoilée',
            titleEn: 'Velvet Burgundy & Starlit Night',
            colors: ['#581825', '#800020', '#111111', '#C5A880'],
            images: [
                'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=600&q=80'
            ]
        }
    ];

    let selectedPalette = palettes[0];

    mbContainer.innerHTML = `
        <div class="moodboard-card">
            <div style="text-align: center; margin-bottom: 3rem;">
                <p class="editorial-subtitle" data-fr="Inspiration Sur-Mesure" data-en="Bespoke Inspiration">Inspiration Sur-Mesure</p>
                <h2 class="editorial-title" data-fr="Générez Votre Moodboard de Rêve" data-en="Generate Your Dream Moodboard">Générez Votre Moodboard de Rêve</h2>
                <p style="font-size: 0.95rem; color: var(--color-gray, #666); max-width: 600px; margin: 0.5rem auto 0;" data-fr="Choisissez l'harmonie chromatique qui fera vibrez la scénographie de votre jour J." data-en="Choose the chromatic harmony that will bring your wedding day design to life.">Choisissez l'harmonie chromatique qui fera vibrez la scénographie de votre jour J.</p>
            </div>

            <div class="mood-palettes-grid">
                ${palettes.map((p, idx) => `
                    <div class="mood-palette-card ${idx === 0 ? 'selected' : ''}" data-id="${p.id}">
                        <div class="mood-swatches">
                            ${p.colors.map(c => `<span class="mood-swatch" style="background-color: ${c};"></span>`).join('')}
                        </div>
                        <h4 style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--color-dark);" data-fr="${p.titleFr}" data-en="${p.titleEn}">${p.titleFr}</h4>
                    </div>
                `).join('')}
            </div>

            <div style="text-align: center; margin-top: 1.5rem;">
                <button type="button" class="btn-primary" id="btnGenerateMoodboard" style="padding: 1.1rem 2.8rem;" data-fr="Révéler Mon Moodboard Inspirant" data-en="Reveal My Inspiration Moodboard">Révéler Mon Moodboard Inspirant</button>
            </div>

            <div class="moodboard-result-grid active" id="mbResultGrid">
                ${selectedPalette.images.map(img => `
                    <div class="mb-item">
                        <img src="${img}" alt="Inspiration mariage Haute Couture">
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const cards = mbContainer.querySelectorAll('.mood-palette-card');
    const resultGrid = mbContainer.querySelector('#mbResultGrid');
    const generateBtn = mbContainer.querySelector('#btnGenerateMoodboard');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            const id = card.dataset.id;
            selectedPalette = palettes.find(p => p.id === id);
        });
    });

    generateBtn.addEventListener('click', () => {
        resultGrid.innerHTML = selectedPalette.images.map(img => `
            <div class="mb-item">
                <img src="${img}" alt="Inspiration mariage Haute Couture">
            </div>
        `).join('');
        resultGrid.classList.add('active');
    });

    if (window.applyLanguage) {
        window.applyLanguage(document.documentElement.getAttribute('lang') || 'fr');
    }
});
