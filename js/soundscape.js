/* ═══════════════════════════════════════════════════════════
   Ever After Events — Luxury Soundscape Player (JS)
   Discreet Audio Experience Logic
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // Royalty-free romantic piano & cello ambient audio track
    const audioUrl = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3';

    const widgetHTML = `
        <div class="soundscape-widget" id="soundscapeWidget" title="Activer l'ambiance sonore">
            <button class="soundscape-btn" id="soundscapeBtn" aria-label="Audio">▶</button>
            <div class="soundscape-eq">
                <span></span><span></span><span></span><span></span>
            </div>
            <span class="soundscape-text" id="soundscapeText" data-fr="Ambiance Sonore" data-en="Soundscape">Ambiance Sonore</span>
            <audio id="soundscapeAudio" loop preload="none">
                <source src="${audioUrl}" type="audio/mpeg">
            </audio>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    const widget = document.getElementById('soundscapeWidget');
    const btn = document.getElementById('soundscapeBtn');
    const audio = document.getElementById('soundscapeAudio');
    audio.volume = 0.35; // Gentle volume for luxury experience

    let isPlaying = false;

    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            widget.classList.remove('playing');
            btn.textContent = '▶';
        } else {
            audio.play().then(() => {
                isPlaying = true;
                widget.classList.add('playing');
                btn.textContent = '❚❚';
            }).catch(() => {
                console.log('Audio autoplay prevented by browser interaction policy');
            });
        }
    }

    widget.addEventListener('click', togglePlay);

    if (window.applyLanguage) {
        window.applyLanguage(document.documentElement.getAttribute('lang') || 'fr');
    }
});
