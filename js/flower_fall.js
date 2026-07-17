// flower_fall.js – déclenche une pluie de confettis roses (fleurs) avec canvas-confetti
function startFlowerRain(){
  const duration = 5000; // 5 secondes
  const end = Date.now() + duration;
  (function frame(){
    confetti({
      particleCount: 3,
      startVelocity: 30,
      spread: 70,
      colors: ["#ffb7c5","#ff69b4","#ff1493"],
      origin: { x: Math.random(), y: 0 },
      ticks: 200,
      gravity: 0.5,
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

document.addEventListener('DOMContentLoaded', startFlowerRain);
