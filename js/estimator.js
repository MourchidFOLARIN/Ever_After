/* ═══════════════════════════════════════════════════════════
   Ever After Events — Luxury Experience Estimator (JS)
   Interactive Configurator Logic
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const estimatorContainer = document.getElementById('luxury-estimator-container');
    if (!estimatorContainer) return;

    let currentStep = 1;
    const selections = {
        venue: { id: 'chateau', nameFr: 'Château ou Domaine de Prestige', nameEn: 'Prestige Château or Estate', basePrice: 25000 },
        guests: { id: 'moyen', countTextFr: '50 à 150 Invités', countTextEn: '50 to 150 Guests', multiplier: 1.5 },
        decor: { id: 'haute_couture', nameFr: 'Haute Couture & Féerie', nameEn: 'Haute Couture & Fairytale', price: 18000 },
        extras: []
    };

    // Render Estimator HTML
    estimatorContainer.innerHTML = `
        <div class="estimator-card">
            <div class="estimator-header">
                <p class="editorial-subtitle" data-fr="Configurateur Sur-Mesure" data-en="Bespoke Configurator">Configurateur Sur-Mesure</p>
                <h2 class="editorial-title" data-fr="Simulez Votre Expérience d'Exception" data-en="Estimate Your Luxury Experience">Simulez Votre Expérience d'Exception</h2>
                <div class="estimator-steps-progress">
                    <div class="est-step-dot active" data-step="1">1</div>
                    <div class="est-step-line"></div>
                    <div class="est-step-dot" data-step="2">2</div>
                    <div class="est-step-line"></div>
                    <div class="est-step-dot" data-step="3">3</div>
                    <div class="est-step-line"></div>
                    <div class="est-step-dot" data-step="4">4</div>
                </div>
            </div>

            <!-- STEP 1: Venue / Destination -->
            <div class="estimator-step-content active" id="est-step-1">
                <h3 class="est-step-title" data-fr="1. Choisissez votre lieu d'exception" data-en="1. Choose your exceptional venue">1. Choisissez votre lieu d'exception</h3>
                <p class="est-step-subtitle" data-fr="Le cadre de votre union donnera le ton de votre célébration." data-en="The backdrop of your union will set the tone of your celebration.">Le cadre de votre union donnera le ton de votre célébration.</p>
                <div class="est-options-grid">
                    <div class="est-option-card selected" data-type="venue" data-id="chateau" data-price="25000" data-fr-title="Château / Domaine" data-en-title="Château / Estate">
                        <div class="est-icon">🏰</div>
                        <h4 class="est-card-title" data-fr="Château & Domaine" data-en="Château & Estate">Château & Domaine</h4>
                        <p class="est-card-desc" data-fr="Demeures historiques, parcs à la française et architecture grandiose." data-en="Historic manors, French gardens, and magnificent architecture.">Demeures historiques, parcs à la française et architecture grandiose.</p>
                    </div>
                    <div class="est-option-card" data-type="venue" data-id="lake" data-price="35000" data-fr-title="Villa au bord du Lac" data-en-title="Lakefront Villa">
                        <div class="est-icon">🌅</div>
                        <h4 class="est-card-title" data-fr="Lac de Côme & Côte" data-en="Lake Como & Coast">Lac de Côme & Côte</h4>
                        <p class="est-card-desc" data-fr="Villas d'exception au fil de l'eau et terrasses panoramiques." data-en="Exceptional waterfront villas and panoramic terraces.">Villas d'exception au fil de l'eau et terrasses panoramiques.</p>
                    </div>
                    <div class="est-option-card" data-type="venue" data-id="island" data-price="45000" data-fr-title="Île Privée / Destination" data-en-title="Private Island / Resort">
                        <div class="est-icon">🏝️</div>
                        <h4 class="est-card-title" data-fr="Île Privée & Exotique" data-en="Private Island & Resort">Île Privée & Exotique</h4>
                        <p class="est-card-desc" data-fr="Célébration exclusive sous les tropiques avec hébergement réservé." data-en="Exclusive tropical celebration with private resort booking.">Célébration exclusive sous les tropiques avec hébergement réservé.</p>
                    </div>
                </div>
            </div>

            <!-- STEP 2: Guest Count -->
            <div class="estimator-step-content" id="est-step-2">
                <h3 class="est-step-title" data-fr="2. Nombre d'invités pressentis" data-en="2. Estimated Guest Count">2. Nombre d'invités pressentis</h3>
                <p class="est-step-subtitle" data-fr="La dimension de la réception définit l'échelle logistique." data-en="The scale of your reception defines the logistical scope.">La dimension de la réception définit l'échelle logistique.</p>
                <div class="est-options-grid">
                    <div class="est-option-card" data-type="guests" data-id="intime" data-mult="1.0" data-fr-title="Intime (Moins de 50)" data-en-title="Intimate (Under 50)">
                        <div class="est-icon">✨</div>
                        <h4 class="est-card-title" data-fr="Célébration Intime" data-en="Intimate Celebration">Célébration Intime</h4>
                        <p class="est-card-desc" data-fr="Jusqu'à 50 invités privilégiés pour une expérience ultra-exclusive." data-en="Up to 50 VIP guests for an ultra-exclusive gathering.">Jusqu'à 50 invités privilégiés pour une expérience ultra-exclusive.</p>
                    </div>
                    <div class="est-option-card selected" data-type="guests" data-id="moyen" data-mult="1.5" data-fr-title="Prestige (50 à 150)" data-en-title="Prestige (50 to 150)">
                        <div class="est-icon">🥂</div>
                        <h4 class="est-card-title" data-fr="Prestige (50 - 150)" data-en="Prestige (50 - 150)">Prestige (50 - 150)</h4>
                        <p class="est-card-desc" data-fr="Équilibre parfait entre féerie, élégance et ambiance festive." data-en="Perfect balance between fairytale elegance and festive celebration.">Équilibre parfait entre féerie, élégance et ambiance festive.</p>
                    </div>
                    <div class="est-option-card" data-type="guests" data-id="grand" data-mult="2.2" data-fr-title="Grandeur (Plus de 150)" data-en-title="Grandeur (Over 150)">
                        <div class="est-icon">👑</div>
                        <h4 class="est-card-title" data-fr="Majestueux (> 150)" data-en="Grandeur (> 150)">Majestueux (> 150)</h4>
                        <p class="est-card-desc" data-fr="Réception d'envergure internationale avec logistique haut de gamme." data-en="International scale reception with high-end logistical mastery.">Réception d'envergure internationale avec logistique haut de gamme.</p>
                    </div>
                </div>
            </div>

            <!-- STEP 3: Scenography & Design -->
            <div class="estimator-step-content" id="est-step-3">
                <h3 class="est-step-title" data-fr="3. Niveau de Scénographie & Ambiance" data-en="3. Scenography & Design Level">3. Niveau de Scénographie & Ambiance</h3>
                <p class="est-step-subtitle" data-fr="Personnalisez la richesse visuelle de votre événement." data-en="Customize the visual richness of your event.">Personnalisez la richesse visuelle de votre événement.</p>
                <div class="est-options-grid">
                    <div class="est-option-card" data-type="decor" data-id="minimaliste" data-price="10000" data-fr-title="Épuré & Élégant" data-en-title="Minimalist & Elegant">
                        <div class="est-icon">🕯️</div>
                        <h4 class="est-card-title" data-fr="Épuré & Raffiné" data-en="Minimalist & Refined">Épuré & Raffiné</h4>
                        <p class="est-card-desc" data-fr="Design floral sobre, bougies romantiques et art de la table épuré." data-en="Subtle floral design, romantic candles, and refined tableware.">Design floral sobre, bougies romantiques et art de la table épuré.</p>
                    </div>
                    <div class="est-option-card selected" data-type="decor" data-id="haute_couture" data-price="18000" data-fr-title="Haute Couture & Féerie" data-en-title="Haute Couture & Fairytale">
                        <div class="est-icon">🌸</div>
                        <h4 class="est-card-title" data-fr="Haute Couture" data-en="Haute Couture">Haute Couture</h4>
                        <p class="est-card-desc" data-fr="Arches florales majestueuses, éclairage scénique et papeterie sur-mesure." data-en="Majestic floral arches, theatrical lighting, and bespoke stationery.">Arches florales majestueuses, éclairage scénique et papeterie sur-mesure.</p>
                    </div>
                    <div class="est-option-card" data-type="decor" data-id="spectaculaire" data-price="32000" data-fr-title="Palatial & Immersion Totale" data-en-title="Palatial & Full Immersion">
                        <div class="est-icon">💎</div>
                        <h4 class="est-card-title" data-fr="Immersion Palatiale" data-en="Palatial Immersion">Immersion Palatiale</h4>
                        <p class="est-card-desc" data-fr="Création de décors éphémères complets, cascades de fleurs et feux d'artifice." data-en="Complete bespoke set build, floral waterfalls, and fireworks display.">Création de décors éphémères complets, cascades de fleurs et feux d'artifice.</p>
                    </div>
                </div>
            </div>

            <!-- STEP 4: Results & Bespoke Summary -->
            <div class="estimator-step-content" id="est-step-4">
                <div class="est-summary-box">
                    <p class="editorial-subtitle" style="color: var(--color-gold);" data-fr="Votre Estimation Personnalisée" data-en="Your Bespoke Estimate">Votre Estimation Personnalisée</p>
                    <h3 class="est-summary-title" data-fr="Une Expérience Conçue Pour Vous" data-en="An Experience Designed For You">Une Expérience Conçue Pour Vous</h3>
                    <div class="est-amount-badge" id="est-total-display">65 000 € — 85 000 €</div>
                    <ul class="est-details-list" id="est-summary-items">
                        <!-- Populated dynamically -->
                    </ul>
                    <a href="contact.html" id="btn-est-book" class="btn-primary" style="padding: 1.25rem 3rem;" data-fr="Réserver cet événement avec la conciergerie" data-en="Book this event with Concierge">Réserver cet événement avec la conciergerie</a>
                </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="est-actions">
                <button type="button" class="btn-est-prev" id="btn-est-prev" style="visibility: hidden;" data-fr="Étape Précédente" data-en="Previous Step">Étape Précédente</button>
                <button type="button" class="btn-est-next" id="btn-est-next" data-fr="Étape Suivante" data-en="Next Step">Étape Suivante <span class="btn-icon">→</span></button>
            </div>
        </div>
    `;

    // DOM Elements
    const stepContents = estimatorContainer.querySelectorAll('.estimator-step-content');
    const stepDots = estimatorContainer.querySelectorAll('.est-step-dot');
    const btnNext = estimatorContainer.querySelector('#btn-est-next');
    const btnPrev = estimatorContainer.querySelector('#btn-est-prev');
    const optionCards = estimatorContainer.querySelectorAll('.est-option-card');
    const totalDisplay = estimatorContainer.querySelector('#est-total-display');
    const summaryItems = estimatorContainer.querySelector('#est-summary-items');
    const btnBook = estimatorContainer.querySelector('#btn-est-book');

    // Handle Option Selection
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.type;
            const parentStep = card.closest('.estimator-step-content');
            parentStep.querySelectorAll(`.est-option-card[data-type="${type}"]`).forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            if (type === 'venue') {
                selections.venue = {
                    id: card.dataset.id,
                    nameFr: card.getAttribute('data-fr-title'),
                    nameEn: card.getAttribute('data-en-title'),
                    basePrice: parseFloat(card.dataset.price)
                };
            } else if (type === 'guests') {
                selections.guests = {
                    id: card.dataset.id,
                    countTextFr: card.getAttribute('data-fr-title'),
                    countTextEn: card.getAttribute('data-en-title'),
                    multiplier: parseFloat(card.dataset.mult)
                };
            } else if (type === 'decor') {
                selections.decor = {
                    id: card.dataset.id,
                    nameFr: card.getAttribute('data-fr-title'),
                    nameEn: card.getAttribute('data-en-title'),
                    price: parseFloat(card.dataset.price)
                };
            }
            calculateTotal();
        });
    });

    function calculateTotal() {
        const base = (selections.venue.basePrice + selections.decor.price) * selections.guests.multiplier;
        const minVal = Math.round(base);
        const maxVal = Math.round(base * 1.25);
        totalDisplay.textContent = `${minVal.toLocaleString('fr-FR')} € — ${maxVal.toLocaleString('fr-FR')} €`;

        const lang = document.documentElement.getAttribute('lang') || 'fr';
        const isFr = lang === 'fr';

        summaryItems.innerHTML = `
            <li>📍 ${isFr ? selections.venue.nameFr : selections.venue.nameEn}</li>
            <li>👥 ${isFr ? selections.guests.countTextFr : selections.guests.countTextEn}</li>
            <li>✨ ${isFr ? selections.decor.nameFr : selections.decor.nameEn}</li>
        `;
    }

    function updateStepUI() {
        stepContents.forEach((content, index) => {
            if (index + 1 === currentStep) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        stepDots.forEach((dot, index) => {
            const stepNum = index + 1;
            if (stepNum === currentStep) {
                dot.classList.add('active');
                dot.classList.remove('completed');
            } else if (stepNum < currentStep) {
                dot.classList.remove('active');
                dot.classList.add('completed');
            } else {
                dot.classList.remove('active', 'completed');
            }
        });

        // Prev Button
        if (currentStep > 1) {
            btnPrev.style.visibility = 'visible';
        } else {
            btnPrev.style.visibility = 'hidden';
        }

        // Next Button text
        const lang = document.documentElement.getAttribute('lang') || 'fr';
        if (currentStep === 3) {
            btnNext.innerHTML = lang === 'fr' ? `Voir le récapitulatif <span class="btn-icon">→</span>` : `View Summary <span class="btn-icon">→</span>`;
            btnNext.style.display = 'inline-flex';
        } else if (currentStep === 4) {
            btnNext.style.display = 'none';
        } else {
            btnNext.innerHTML = lang === 'fr' ? `Étape Suivante <span class="btn-icon">→</span>` : `Next Step <span class="btn-icon">→</span>`;
            btnNext.style.display = 'inline-flex';
        }

        if (currentStep === 4) {
            calculateTotal();
        }
    }

    btnNext.addEventListener('click', () => {
        if (currentStep < 4) {
            currentStep++;
            updateStepUI();
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepUI();
        }
    });

    // Preset pre-filled selections into contact form when clicking book button
    btnBook.addEventListener('click', () => {
        localStorage.setItem('estimatedVenue', selections.venue.id);
        localStorage.setItem('estimatedGuests', selections.guests.id);
    });

    // Re-apply translation if language toggles
    if (window.applyLanguage) {
        window.applyLanguage(document.documentElement.getAttribute('lang') || 'fr');
    }

    calculateTotal();
});
