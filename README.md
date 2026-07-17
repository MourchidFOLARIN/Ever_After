# Ever After Events - Site Officiel Premium

Bienvenue sur le dépôt officiel d'**Ever After Events**, une agence internationale d'organisation, de décoration et de coordination de mariages et réceptions de luxe.

Ce projet a été conçu selon les plus hauts standards esthétiques contemporains (Awwwards, Dior, Apple, Vogue) pour offrir une expérience utilisateur mémorable, émotionnelle et haut de gamme.

---

## 1. Technologies & Dépendances

Afin de garantir une intégration fluide sans processus de compilation lourd, le site utilise des ressources servies par des serveurs CDN rapides et sécurisés :
*   **Lenis Smooth Scroll v1.0.34** : Défilement fluide et sensation de légèreté.
*   **GSAP (GreenSock Animation Platform) v3.12.5** : Moteur d'animation ultra-performant.
*   **GSAP ScrollTrigger v3.12.5** : Animations déclenchées lors du défilement et effets de parallaxe.
*   **Swiper.js v11.0.0** : Slider moderne et tactile pour les témoignages.
*   **Lucide Icons** : Pack d'icônes vectorielles épurées.
*   **Google Fonts** :
    *   *Cormorant Garamond* (Serif luxueux pour les grands titres).
    *   *Plus Jakarta Sans* (Sans-serif géométrique et lisible pour le texte).

---

## 2. Structure du Projet

```
c:\Users\Mourchid\Desktop\After/
├── index.html          # Accueil (Cinematic, Stats, Avis)
├── services.html       # Services & Scénographie (Timeline, FAQ)
├── portfolio.html      # Portfolio (Masonry filtrable, Récits de mariages)
├── about.html          # L'Agence (Message de la fondatrice, Valeurs, Histoire)
├── contact.html        # Contact RSVP (Formulaire de conciergerie, WhatsApp, Carte Vendôme)
├── css/
│   ├── main.css        # Base, variables de couleurs, polices et classes de boutons
│   ├── nav.css         # Barre de navigation glassmorphic et pied de page
│   └── pages.css       # Style du Hero vidéo, des grilles de cartes et formulaires
├── js/
│   ├── main.js         # Initialisation Lenis, gestion du défilement et menu mobile
│   └── animations.js   # Timelines GSAP, split-text, parallaxe et lightbox
├── images/             # Photographies de luxe générées pour le projet
├── robots.txt          # Paramétrage SEO des moteurs de recherche
└── sitemap.xml         # Liste des URLs indexables
```

---

## 3. Direction Artistique & Prompts de Génération

Toutes les images présentes dans le dossier `/images/` ont été générées via une intelligence artificielle créative haut de gamme. Voici les prompts originaux utilisés pour obtenir ce rendu éditorial :

### Vidéo Hero Cinematic (10-15s en boucle)
> **Prompt recommandé pour la génération vidéo :**
> *`A cinematic 4K 60FPS loop of a luxury wedding reception during golden hour. Slow panning motion of a grand floral arch decorated with white and powder-pink roses, flickering luxury candles on a long wooden table, crystal chandeliers hanging from tree branches. Tiny floating gold dust particles in the warm sunlight, soft wind blowing bridal veil in a dreamy, romantic atmosphere, octane render, Vogue Weddings style --ar 16:9`*

### Photographies du Portfolio & des Services
*   **Hero Fallback (`images/hero_fallback.png`)** : 
    *`A cinematic high-end wedding couple at sunset golden hour, standing under a massive arch of white and powder-pink roses, French chateau in background, shallow depth of field, Sony A7R V, 85mm lens, luxury editorial photography, 8k --ar 16:9`*
*   **Wedding Planning (`images/service_planning.png`)** : 
    *`An elegant bride getting her gown adjusted by a stylist in a luxurious bright Parisian suite, soft morning light, editorial styling, Vogue wedding style, realistic human emotion, 8k --ar 4:5`*
*   **Scénographie & Table (`images/service_design.png`)** : 
    *`Close-up of a lavish luxury wedding table setting, crystal champagne flutes, gold cutlery, white roses and candles, soft glowing bokeh, warm sunset lighting, editorial style, 8k --ar 4:5`*
*   **Coordinatrice Jour J & Portrait (`images/service_coordination.png` / `founder.png`)** : 
    *`An elegant female wedding planner holding a folder, standing discreetly in a grand ballroom decorated with hanging crystal chandeliers and flower arrangements, luxury, 8k --ar 4:5`*
*   **Château de Vaux-le-Vicomte (`images/portfolio_paris.png`)** : 
    *`Luxury wedding reception at a grand French chateau, thousands of glowing candles, fireworks in the dark sky, elegant couple walking down the garden path, editorial photography, 8k --ar 16:9`*
*   **Villa d'Este Côme (`images/portfolio_como.png` / `portfolio_amalfi.png`)** : 
    *`A spectacular floral ceremony setup on a terrace overlooking Lake Como, white stone balustrade, soft evening golden hour light, high society wedding, editorial, 8k --ar 16:9`*

---

## 4. Exécution du Projet

Le projet est entièrement statique et s'exécute directement dans n'importe quel navigateur sans outil de build requis.

1.  Ouvrez le dossier parent dans **VS Code**.
2.  Installez l'extension **Live Server** si ce n'est pas déjà fait.
3.  Faites un clic droit sur `index.html` et sélectionnez **Open with Live Server**.
4.  L'application s'ouvre sur `http://127.0.0.1:5500/index.html`.
