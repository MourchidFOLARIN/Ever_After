/* ═══════════════════════════════════════════════════════════
   Ever After Events — Client VIP Portal Modal (JS)
   Client Space Authentication & Dashboard Logic
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const portalHTML = `
        <div class="portal-modal-overlay" id="clientPortalModal" aria-hidden="true">
            <div class="portal-modal-card">
                <button class="portal-modal-close" id="portalModalClose" aria-label="Fermer">✕</button>

                <!-- Step 1: Login Form -->
                <div id="portalLoginStep">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <p class="editorial-subtitle" style="color: var(--color-gold);" data-fr="Espace Mariés Privé" data-en="Private Couples Space">Espace Mariés Privé</p>
                        <h2 class="vip-modal-title" data-fr="Connexion Espace VIP" data-en="VIP Space Login">Connexion Espace VIP</h2>
                        <p style="font-size: 0.88rem; color: var(--color-gray, #666);" data-fr="Entrez votre code d'accès personnel pour suivre l'avancement de votre événement." data-en="Enter your personal access code to track your event progress.">Entrez votre code d'accès personnel pour suivre l'avancement de votre événement.</p>
                    </div>

                    <form id="portalLoginForm">
                        <div class="vip-form-group">
                            <input type="text" class="vip-input" id="portalAccessCode" placeholder="Code d'accès (Ex: VIP2026)" value="EVERAFTER2026" required>
                        </div>
                        <button type="submit" class="vip-submit-btn" data-fr="Accéder à Mon Espace Mariés" data-en="Access My Couples Portal">Accéder à Mon Espace Mariés</button>
                    </form>
                </div>

                <!-- Step 2: Client Dashboard Preview -->
                <div class="portal-dashboard-view" id="portalDashboardStep">
                    <span class="portal-stat-badge" data-fr="Compte VIP Actif — Mariage dans 84 Jours" data-en="VIP Account Active — Wedding in 84 Days">Compte VIP Actif — Mariage dans 84 Jours</span>
                    <h3 class="vip-modal-title" data-fr="Bienvenue, Sophie & Julien" data-en="Welcome, Sophie & Julien">Bienvenue, Sophie & Julien</h3>
                    <p style="font-size: 0.9rem; color: var(--color-gray, #666);" data-fr="Suivi en temps réel de votre célébration au Château de Vaux-le-Vicomte." data-en="Real-time tracking of your celebration at Vaux-le-Vicomte Castle.">Suivi en temps réel de votre célébration au Château de Vaux-le-Vicomte.</p>

                    <ul class="portal-timeline-list">
                        <li>
                            <span data-fr="Validation Scénographique Florale" data-en="Floral Scenography Approval">Validation Scénographique Florale</span>
                            <strong style="color: var(--color-gold);" data-fr="Validé ✓" data-en="Approved ✓">Validé ✓</strong>
                        </li>
                        <li>
                            <span data-fr="Dégustation & Menu Traiteur VIP" data-en="Tasting & VIP Catering Menu">Dégustation & Menu Traiteur VIP</span>
                            <strong style="color: var(--color-gold);" data-fr="Validé ✓" data-en="Approved ✓">Validé ✓</strong>
                        </li>
                        <li>
                            <span data-fr="Répétition Générale & Planning Jour J" data-en="Rehearsal & D-Day Timeline">Répétition Générale & Planning Jour J</span>
                            <strong style="color: #581825;" data-fr="En Cours" data-en="In Progress">En Cours</strong>
                        </li>
                    </ul>

                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <a href="contact.html" class="vip-submit-btn" style="flex: 1; text-align: center; text-decoration: none;" data-fr="Contacter Ma Directrice de Projet" data-en="Contact My Project Director">Contacter Ma Directrice de Projet</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', portalHTML);

    const modal = document.getElementById('clientPortalModal');
    const closeBtn = document.getElementById('portalModalClose');
    const loginForm = document.getElementById('portalLoginForm');
    const loginStep = document.getElementById('portalLoginStep');
    const dashboardStep = document.getElementById('portalDashboardStep');

    function openPortal() {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        loginStep.style.display = 'block';
        dashboardStep.classList.remove('active');

        if (window.applyLanguage) {
            window.applyLanguage(document.documentElement.getAttribute('lang') || 'fr');
        }
    }

    function closePortal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }

    closeBtn.addEventListener('click', closePortal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closePortal();
    });

    // Attach open portal triggers to any links with class .btn-open-portal
    document.querySelectorAll('.btn-open-portal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openPortal();
        });
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginStep.style.display = 'none';
        dashboardStep.classList.add('active');
    });
});
