self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('everafter-v1').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './services.html',
        './portfolio.html',
        './about.html',
        './contact.html',
        './css/main.css',
        './css/nav.css',
        './css/pages.css',
        './css/lang.css',
        './css/chatbot.css',
        './css/formWizard.css',
        './js/main.js',
        './js/animations.js',
        './js/lang.js',
        './js/chatbot.js',
        './js/tracking.js',
        './manifest.json'
      ]).catch(function(err) {
        console.warn('Service Worker cache.addAll pre-fetch error:', err);
      });
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
