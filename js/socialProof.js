/* ═══════════════════════════════════════════════════════════
   Ever After Events — Social Proof Notification (JS)
   Discreet Luxury Toast Logic
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const notifications = [
        {
            fr: "Un couple de Zurich vient de réserver une consultation VIP pour un mariage au Lac de Côme.",
            en: "A couple from Zurich just booked a VIP consultation for a Lake Como wedding.",
            timeFr: "Il y a 12 min",
            timeEn: "12 mins ago"
        },
        {
            fr: "Nouvelle réservation confirmée pour une célébration au Château de Vaux-le-Vicomte.",
            en: "New booking confirmed for a celebration at Vaux-le-Vicomte Castle.",
            timeFr: "Il y a 34 min",
            timeEn: "34 mins ago"
        },
        {
            fr: "Un projet de mariage sur île privée en Côte d'Azur est en cours d’étude.",
            en: "A private island wedding project on the French Riviera is currently under study.",
            timeFr: "Il y a 1 heure",
            timeEn: "1 hour ago"
        }
    ];

    const toastHTML = `
        <div class="social-proof-toast" id="socialProofToast">
            <button class="social-proof-close" id="socialProofClose">✕</button>
            <div class="social-proof-icon">💎</div>
            <div class="social-proof-content">
                <span class="social-proof-time" id="socialProofTime">Il y a 12 min</span>
                <p id="socialProofText"></p>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', toastHTML);

    const toast = document.getElementById('socialProofToast');
    const timeEl = document.getElementById('socialProofTime');
    const textEl = document.getElementById('socialProofText');
    const closeBtn = document.getElementById('socialProofClose');

    let currentIndex = 0;
    let toastInterval;

    function showNotification() {
        const notif = notifications[currentIndex];
        const lang = document.documentElement.getAttribute('lang') || 'fr';
        const isFr = lang === 'fr';

        timeEl.textContent = isFr ? notif.timeFr : notif.timeEn;
        textEl.textContent = isFr ? notif.fr : notif.en;

        toast.classList.add('active');

        setTimeout(() => {
            toast.classList.remove('active');
        }, 6000);

        currentIndex = (currentIndex + 1) % notifications.length;
    }

    // Initial show after 8s, then cycle every 22s
    setTimeout(() => {
        showNotification();
        toastInterval = setInterval(showNotification, 22000);
    }, 8000);

    closeBtn.addEventListener('click', () => {
        toast.classList.remove('active');
        clearInterval(toastInterval);
    });
});
