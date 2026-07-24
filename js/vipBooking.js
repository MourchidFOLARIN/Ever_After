/* ═══════════════════════════════════════════════════════════
   Ever After Events — VIP Booking Modal (JS)
   Instant Scheduler Logic & Confetti Confirmation
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // Inject VIP Booking Modal HTML into DOM
    const modalHTML = `
        <div class="vip-modal-overlay" id="vipBookingModal" aria-hidden="true">
            <div class="vip-modal-card">
                <button class="vip-modal-close" id="vipModalClose" aria-label="Fermer">✕</button>

                <div id="vipFormStep">
                    <div class="vip-modal-header">
                        <p class="editorial-subtitle" style="color: var(--color-gold);" data-fr="Consultation Privée" data-en="Private Consultation">Consultation Privée</p>
                        <h2 class="vip-modal-title" data-fr="Réservez Votre Entretien VIP" data-en="Book Your VIP Meeting">Réservez Votre Entretien VIP</h2>
                        <p style="font-size: 0.9rem; color: var(--color-gray, #666);" data-fr="Sélectionnez un créneau privilégié avec notre conciergerie." data-en="Select a privileged slot with our concierge service.">Sélectionnez un créneau privilégié avec notre conciergerie.</p>
                    </div>

                    <form id="vipBookingForm">
                        <!-- Mode of Consultation -->
                        <span class="vip-section-label" data-fr="1. Format du Rendez-Vous" data-en="1. Meeting Format">1. Format du Rendez-Vous</span>
                        <div class="vip-mode-grid">
                            <div class="vip-mode-card selected" data-mode="visio">
                                <div class="vip-mode-icon">📹</div>
                                <div class="vip-mode-title" data-fr="Visioconférence HD" data-en="HD Video Call">Visioconférence HD</div>
                            </div>
                            <div class="vip-mode-card" data-mode="whatsapp">
                                <div class="vip-mode-icon">💬</div>
                                <div class="vip-mode-title" data-fr="WhatsApp VIP Direct" data-en="WhatsApp VIP Direct">WhatsApp VIP Direct</div>
                            </div>
                            <div class="vip-mode-card" data-mode="concierge">
                                <div class="vip-mode-icon">📞</div>
                                <div class="vip-mode-title" data-fr="Appel Conciergerie" data-en="Concierge Call">Appel Conciergerie</div>
                            </div>
                        </div>

                        <!-- Date Selection -->
                        <span class="vip-section-label" data-fr="2. Date Souhaitée" data-en="2. Desired Date">2. Date Souhaitée</span>
                        <div class="vip-form-group">
                            <input type="date" class="vip-input" id="vipDateInput" required>
                        </div>

                        <!-- Time Slots -->
                        <span class="vip-section-label" data-fr="3. Créneau Horaire Disponibilité" data-en="3. Available Time Slot">3. Créneau Horaire Disponibilité</span>
                        <div class="vip-slots-grid">
                            <button type="button" class="vip-slot-btn selected" data-time="10:00">10h00</button>
                            <button type="button" class="vip-slot-btn" data-time="11:30">11h30</button>
                            <button type="button" class="vip-slot-btn" data-time="14:30">14h30</button>
                            <button type="button" class="vip-slot-btn" data-time="16:00">16h00</button>
                            <button type="button" class="vip-slot-btn" data-time="17:30">17h30</button>
                        </div>

                        <!-- Client Info -->
                        <span class="vip-section-label" data-fr="4. Vos Coordonnées" data-en="4. Your Contact Details">4. Vos Coordonnées</span>
                        <div class="vip-form-group">
                            <input type="text" class="vip-input" id="vipName" placeholder="Nom & Prénom" data-placeholder-fr="Nom & Prénom" data-placeholder-en="Full Name" required>
                        </div>
                        <div class="vip-form-group">
                            <input type="email" class="vip-input" id="vipEmail" placeholder="Adresse Email" data-placeholder-fr="Adresse Email" data-placeholder-en="Email Address" required>
                        </div>
                        <div class="vip-form-group">
                            <input type="tel" class="vip-input" id="vipPhone" placeholder="Téléphone / WhatsApp" data-placeholder-fr="Téléphone / WhatsApp" data-placeholder-en="Phone / WhatsApp" required>
                        </div>

                        <button type="submit" class="vip-submit-btn" data-fr="Confirmer Mon RDV Privé" data-en="Confirm My Private Appointment">Confirmer Mon RDV Privé</button>
                    </form>
                </div>

                <!-- Success Screen -->
                <div class="vip-success-message" id="vipSuccessStep">
                    <div class="vip-success-icon">✨</div>
                    <h3 class="vip-modal-title" data-fr="Rendez-Vous Confirmé !" data-en="Appointment Confirmed!">Rendez-Vous Confirmé !</h3>
                    <p style="font-size: 1rem; color: var(--color-dark, #111); margin: 1rem 0;" id="vipSuccessSummary"></p>
                    <p style="font-size: 0.9rem; color: var(--color-gray, #666);" data-fr="Un membre de notre équipe VIP vous a envoyé une confirmation. Nous avons hâte d'échanger avec vous." data-en="A member of our VIP concierge team has sent you a confirmation. We look forward to speaking with you.">Un membre de notre équipe VIP vous a envoyé une confirmation. Nous avons hâte d'échanger avec vous.</p>
                    <button type="button" class="vip-submit-btn" id="vipSuccessDone" style="margin-top: 2rem;" data-fr="Fermer" data-en="Close">Fermer</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // DOM Elements
    const modal = document.getElementById('vipBookingModal');
    const closeBtn = document.getElementById('vipModalClose');
    const bookingForm = document.getElementById('vipBookingForm');
    const formStep = document.getElementById('vipFormStep');
    const successStep = document.getElementById('vipSuccessStep');
    const successSummary = document.getElementById('vipSuccessSummary');
    const successDone = document.getElementById('vipSuccessDone');

    const dateInput = document.getElementById('vipDateInput');
    const modeCards = modal.querySelectorAll('.vip-mode-card');
    const slotBtns = modal.querySelectorAll('.vip-slot-btn');

    let selectedMode = 'visio';
    let selectedSlot = '10:00';

    // Default Date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = new Date().toISOString().split('T')[0];

    // Handle Mode selection
    modeCards.forEach(card => {
        card.addEventListener('click', () => {
            modeCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedMode = card.dataset.mode;
        });
    });

    // Handle Slot selection
    slotBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            slotBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedSlot = btn.dataset.time;
        });
    });

    // Open Modal
    function openModal() {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        formStep.style.display = 'block';
        successStep.style.display = 'none';

        if (window.applyLanguage) {
            window.applyLanguage(document.documentElement.getAttribute('lang') || 'fr');
        }
    }

    // Close Modal
    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }

    closeBtn.addEventListener('click', closeModal);
    successDone.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Attach open modal listener to "Prendre RDV" / "Book an Appt" CTAs
    document.querySelectorAll('.btn-primary[href="contact.html"], a.btn-primary[data-fr="Prendre RDV"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // If on contact.html page itself, scroll to form; else open modal
            if (!window.location.pathname.endsWith('contact.html')) {
                e.preventDefault();
                openModal();
            }
        });
    });

    // Handle Form Submit
    bookingForm.addEventListener('click', (e) => {
        if (e.target.classList.contains('vip-submit-btn')) {
            e.preventDefault();
            const name = document.getElementById('vipName').value.trim();
            const email = document.getElementById('vipEmail').value.trim();
            if (!name || !email) {
                alert('Veuillez renseigner votre nom et votre adresse email.');
                return;
            }

            const lang = document.documentElement.getAttribute('lang') || 'fr';
            const isFr = lang === 'fr';

            successSummary.textContent = isFr
                ? `Rendez-vous réservé pour le ${dateInput.value} à ${selectedSlot} (${name})`
                : `Appointment booked for ${dateInput.value} at ${selectedSlot} (${name})`;

            formStep.style.display = 'none';
            successStep.style.display = 'block';

            // Trigger celebration confetti
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }
    });
});
