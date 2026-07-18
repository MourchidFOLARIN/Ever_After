/* ═══════════════════════════════════════════════════════════
   Ever After Events — Premium Chatbot Widget (JS)
   Dynamically loaded, animated, bilingual support
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    const chatbotContainer = document.getElementById('chatbot-container');
    if (!chatbotContainer) return;

    // Inject Chatbot HTML
    chatbotContainer.innerHTML = `
        <div id="chatbot-toggle" aria-label="Open chat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div id="chatbot-window" aria-hidden="true">
            <div id="chatbot-header">
                <div class="chatbot-title">
                    <div class="chatbot-title-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div>
                        <span class="chatbot-title-text">Ever After</span>
                        <span class="chatbot-title-status" data-fr="Conciergerie en ligne" data-en="Online Concierge">Conciergerie en ligne</span>
                    </div>
                </div>
                <span id="chatbot-close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </span>
            </div>
            <div id="chatbot-messages"></div>
            <div id="chatbot-input">
                <input type="text" data-placeholder-fr="Posez votre question…" data-placeholder-en="Ask your question…" placeholder="Posez votre question…"/>
                <button aria-label="Envoyer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
            </div>
        </div>
    `;

    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.querySelector('#chatbot-input input');
    const chatbotSend = document.querySelector('#chatbot-input button');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // After injecting, check if language needs to be applied immediately
    if (window.applyLanguage) {
        window.applyLanguage(document.documentElement.getAttribute('lang') || 'fr');
    } else {
        console.warn('applyLanguage function not found. Chatbot language may not be initialized correctly.');
    }

    // Re-run Lucide to render icons inside the newly injected HTML
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ── Open / Close with CSS animation ──────────────── */
    chatbotToggle.addEventListener('click', () => {
        const isOpen = chatbotWindow.classList.contains('open');
        if (isOpen) {
            closeChat();
        } else {
            openChat();
        }
    });

    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            closeChat();
        });
    }

    function openChat() {
        chatbotWindow.classList.add('open');
        chatbotWindow.setAttribute('aria-hidden', 'false');
        chatbotInput.focus();
        if (chatbotMessages.children.length === 0) {
            sendWelcomeMessage();
        }
    }

    function closeChat() {
        chatbotWindow.classList.remove('open');
        chatbotWindow.setAttribute('aria-hidden', 'true');
    }

    /* ── Knowledge Base ───────────────────────────────── */
    const knowledgeBase = {
        fr: {
            welcome: "Bonjour ✨ Je suis l'assistant virtuel Ever After. Comment puis-je vous aider aujourd'hui ?",
            defaultResponse: "Je vous remercie pour votre question. Pour obtenir des détails sur-mesure, je vous invite à contacter notre conciergerie au +229 01 42 10 01 56 ou à remplir notre formulaire de contact.",
            placeholder: "Posez votre question…",
            send: "Envoyer",
            keywords: [
                {
                    keys: ['bonjour', 'salut', 'hello', 'coucou', 'comment va tu'],
                    reply: "Bonjour ! Vous êtes au bon endroit. Ever After est le choix idéal pour un mariage exceptionnel et inoubliable. En quoi puis-je vous être utile aujourd'hui ? ☀️"
                },
                {
                    keys: ['prix', 'tarif', 'budget', 'combien', 'cout', 'coût'],
                    reply: "Chaque célébration Ever After Events est unique et conçue sur-mesure. Le coût dépend du lieu, de la scénographie et du nombre d'invités. Nous vous invitons à réserver une consultation privée pour obtenir un devis personnalisé. Ensemble, nous créerons un événement qui respecte vos désirs tout en étant absolument spectaculaire. 💍"
                },
                {
                    keys: ['service', 'prestation', 'formule', 'absolu', 'esthetique', 'jour j', 'offre'],
                    reply: "Nous proposons 3 formules d'exception :\n\n✦ L'Absolu — Organisation totale A-Z\n✦ L'Esthétique — Conception scénographique & design\n✦ Le Jour J — Coordination le jour de l'événement\n\nChacune est pensée pour vous offrir une tranquillité d'esprit absolue et un résultat qui dépassera vos attentes."
                },
                {
                    keys: ['processus', 'organisation', 'comment', 'déroule', 'manière', 'étape', 'phase'],
                    reply: "Notre processus se déroule en 4 phases : Conceptualisation, Planification, Orchestration et L'Apothéose. C'est notre promesse pour une préparation sereine et un jour J absolument parfait."
                },
                {
                    keys: ['rendez-vous', 'rdv', 'réserver', 'reserver', 'consultation', 'booker', 'prendre'],
                    reply: "Pour prendre rendez-vous, nous vous invitons à remplir notre formulaire exclusif sur la page 'Contact'. Un membre de notre équipe vous contactera sous 24h pour planifier votre consultation privée. C'est le premier pas vers une célébration qui marquera les esprits. 📅"
                },
                {
                    keys: ['contact', 'adresse', 'lieu', 'telephone', 'téléphone', 'mail', 'email', 'whatsapp', 'bureau', 'paris'],
                    reply: "Notre agence est basée à Cotonou, au Bénin. Vous pouvez joindre notre conciergerie VIP au +229 01 42 10 01 56 ou par email à eventafter@gmail.com. N'hésitez pas à nous contacter, votre histoire commence ici. 📍"
                },
                {
                    keys: ['fondat', 'hélène', 'helene', 'valois', 'créateur', 'createur', 'equipe', 'équipe'],
                    reply: "Ever After Events a été fondée par Hélène de Valois, une directrice artistique passionnée. C'est sa vision de l'excellence et de l'émotion qui est au cœur de chaque événement que nous créons. ✨"
                },
                {
                    keys: ['destination', 'étranger', 'etranger', 'cotonou', 'porto-novo', 'ouidah', 'abomey', 'parakou', 'bohicon', 'adjaha', 'kandi', 'natitingou', 'italie', 'provence', 'côme', 'amalfi'],
                    reply: "Absolument. Nous organisons des mariages d'exception sur l'ensemble du territoire béninois (Cotonou, Ouidah, Porto-Novo...) ainsi qu'à l'international. Le monde est votre décor, nous nous occupons du reste. 🌍"
                },
                {
                    keys: ['portfolio', 'photo', 'galerie', 'réalisation', 'realisation', 'mariage'],
                    reply: "Découvrez nos plus belles réalisations dans notre Portfolio. Chaque mariage raconte une histoire unique. La vôtre sera la prochaine. 📸"
                },
                {
                    keys: ['merci', 'parfait', 'super', 'génial', 'genial', 'excellent'],
                    reply: "Avec plaisir ! Nous sommes là pour transformer chaque détail de votre rêve en une réalité inoubliable. 💫"
                }
            ]
        },
        en: {
            welcome: "Hello ✨ I am your Ever After virtual assistant. How may I assist you today?",
            defaultResponse: "Thank you for your question. For bespoke details, we invite you to contact our concierge at +229 01 42 10 01 56 or fill out our contact form.",
            placeholder: "Ask your question…",
            send: "Send",
            keywords: [
                {
                    keys: ['hello', 'hi', 'hey', 'greetings'],
                    reply: "Hello! How can I assist you today? ☀️"
                },
                {
                    keys: ['price', 'cost', 'budget', 'rate', 'tariff', 'how much', 'expensive'],
                    reply: "Each Ever After Events celebration is unique and bespoke. The cost depends on the location, design, and number of guests. We invite you to book a private consultation for a personalized estimate. Together, we will create an event that respects your wishes while being absolutely spectacular. 💍"
                },
                {
                    keys: ['service', 'formula', 'offer', 'package', 'absolu', 'esthetique', 'coordination', 'planning'],
                    reply: "We offer 3 exceptional packages:\n\n✦ L'Absolu — Complete A-Z planning\n✦ L'Esthétique — Scenography & design\n✦ Le Jour J — Day-of coordination\n\nEach is designed to offer you absolute peace of mind and a result that will exceed your expectations."
                },
                {
                    keys: ['process', 'organization', 'how', 'steps', 'phases', 'works'],
                    reply: "Our process unfolds in 4 key phases: Conceptualization, Planning, Orchestration, and The Climax. This is our promise for a serene preparation and an absolutely perfect D-day."
                },
                {
                    keys: ['appointment', 'book', 'booking', 'consultation', 'schedule', 'meet'],
                    reply: "To book an appointment, we invite you to fill out our exclusive form on the 'Contact' page. A team member will get back to you within 24 hours to schedule your private consultation. It's the first step towards a celebration that will be remembered. 📅"
                },
                {
                    keys: ['contact', 'address', 'location', 'phone', 'mail', 'email', 'whatsapp', 'office', 'paris'],
                    reply: "Our agency is based in Cotonou, Benin. You can reach our VIP concierge at +229 01 42 10 01 56 or via email at eventafter@gmail.com. Don't hesitate to contact us, your story begins here. 📍"
                },
                {
                    keys: ['founder', 'helene', 'valois', 'creator', 'team'],
                    reply: "Ever After Events was founded by Hélène de Valois, a passionate artistic director. Her vision of excellence and emotion is at the heart of every event we create. ✨"
                },
                {
                    keys: ['destination', 'abroad', 'cotonou', 'porto-novo', 'ouidah', 'abomey', 'parakou', 'bohicon', 'adjaha', 'kandi', 'natitingou', 'italy', 'provence', 'como', 'amalfi', 'international'],
                    reply: "Absolutely. We organize exceptional weddings throughout Benin (Cotonou, Ouidah, Porto-Novo...) as well as internationally. The world is your stage, we'll handle the rest. 🌍"
                },
                {
                    keys: ['portfolio', 'photo', 'gallery', 'wedding', 'work', 'project'],
                    reply: "Discover our most beautiful creations in our Portfolio. Each wedding tells a unique story. Yours will be next. 📸"
                },
                {
                    keys: ['thank', 'perfect', 'great', 'amazing', 'excellent', 'wonderful'],
                    reply: "You're most welcome! We are here to turn every detail of your dream into an unforgettable reality. 💫"
                }
            ]
        }
    };

    /* ── Helpers ───────────────────────────────────────── */
    function getLang() {
        return document.documentElement.getAttribute('lang') || 'fr';
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.textContent = text;
        chatbotMessages.appendChild(msgDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.id = 'typingIndicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        chatbotMessages.appendChild(typing);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    function sendWelcomeMessage() {
        const lang = getLang();
        showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            addMessage(knowledgeBase[lang].welcome, 'bot');
        }, 600);
    }

    /* ── Update placeholders on language change ────────── */
    function updateChatLocale() {
        const lang = getLang();
        const data = knowledgeBase[lang];
        if (data) {
            chatbotInput.setAttribute('placeholder', data.placeholder);
        }
    }

    // Watch for language attribute changes
    const langObserver = new MutationObserver(() => {
        updateChatLocale();
    });
    langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    // Set initial locale
    updateChatLocale();

    /* ── Handle User Input ────────────────────────────── */
    function handleUserInput() {
        const inputVal = chatbotInput.value.trim().toLowerCase();
        if (!inputVal) return;

        addMessage(chatbotInput.value, 'user');
        chatbotInput.value = '';

        const lang = getLang();
        const data = knowledgeBase[lang];
        let reply = '';

        for (const item of data.keywords) {
            const matches = item.keys.some(key => inputVal.includes(key));
            if (matches) {
                reply = item.reply;
                break;
            }
        }

        if (!reply) {
            reply = data.defaultResponse;
        }

        // Show typing indicator then respond
        showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            addMessage(reply, 'bot');
        }, 800 + Math.random() * 400);
    }

    chatbotSend.addEventListener('click', handleUserInput);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
});
