document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('heroVideo');
    if (video) {
        const triggerFallback = () => {
            console.warn('Hero video failed to load, switching to fallback image.');
            const poster = video.getAttribute('poster');
            if (poster) {
                const img = document.createElement('img');
                img.src = poster;
                img.alt = 'Ever After Events - Wedding Reception';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.position = 'absolute';
                img.style.top = '0';
                img.style.left = '0';
                
                const container = video.parentElement;
                if (container) {
                    container.appendChild(img);
                    video.remove();
                }
            }
        };

        // Listen to error on video or source
        video.addEventListener('error', triggerFallback);
        const sources = video.querySelectorAll('source');
        sources.forEach(src => {
            src.addEventListener('error', triggerFallback);
        });
    }
});
