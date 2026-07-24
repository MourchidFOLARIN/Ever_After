/* ═══════════════════════════════════════════════════════════
   Ever After Events — Video & Audio Testimonials (JS)
   Interactive Video Testimonials Modal Logic
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    const modalHTML = `
        <div class="testimonial-modal-overlay" id="testimonialVideoModal" aria-hidden="true">
            <div class="testimonial-modal-card">
                <button class="testimonial-modal-close" id="testimonialModalClose" aria-label="Fermer">✕</button>
                <div class="testimonial-video-container">
                    <video id="testimonialVideoPlayer" controls playsinline preload="auto">
                        <source src="" type="video/mp4">
                    </video>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('testimonialVideoModal');
    const player = document.getElementById('testimonialVideoPlayer');
    const closeBtn = document.getElementById('testimonialModalClose');

    function openVideoModal(videoSrc) {
        player.src = videoSrc;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        player.play().catch(e => console.log('Video autoplay prevented', e));
    }

    function closeVideoModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        player.pause();
        player.src = '';
    }

    closeBtn.addEventListener('click', closeVideoModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeVideoModal();
    });

    // Attach listeners to video testimonial badges
    document.querySelectorAll('.review-video-badge').forEach(badge => {
        badge.addEventListener('click', () => {
            const videoUrl = badge.dataset.video || 'https://v1.pinimg.com/videos/mc/720p/fd/2c/7e/fd2c7eb7bb7c38d00f7ab72f9bcec3e4.mp4';
            openVideoModal(videoUrl);
        });
    });

    if (window.applyLanguage) {
        window.applyLanguage(document.documentElement.getAttribute('lang') || 'fr');
    }
});
