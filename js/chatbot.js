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
                    keys: ['prix', 'tarif', 'budget', 'combien', 'cout', 'coût'],
                    reply: "Chaque célébration Ever After Events est unique et conçue sur-mesure. Le coût dépend du lieu, de la scénographie et du nombre d'invités. Nous vous invitons à réserver une consultation privée pour obtenir un devis personnalisé. 💍"
                },
                {
                    keys: ['service', 'prestation', 'formule', 'absolu', 'esthetique', 'jour j', 'offre'],
                    reply: "Nous proposons 3 formules d'exception :\n\n✦ L'Absolu — Organisation totale A-Z\n✦ L'Esthétique — Conception scénographique & design\n✦ Le Jour J — Coordination le jour de l'événement\n\nTous les détails sont dans la section Services."
                },
                {
                    keys: ['contact', 'adresse', 'telephone', 'téléphone', 'mail', 'email', 'whatsapp', 'bureau', 'paris'],
                    reply: "Nos bureaux sont situés Place Vendôme à Paris (75001). Vous pouvez joindre notre conciergerie VIP au +229 01 42 10 01 56 ou par email à eventafter@gmail.com. 📍"
                },
                {
                    keys: ['fondat', 'hélène', 'helene', 'valois', 'créateur', 'createur', 'equipe', 'équipe'],
                    reply: "Ever After Events a été fondée par Hélène de Valois, directrice artistique passionnée par la création d'instants éternels et de scénographies haut de gamme. ✨"
                },
                {
                    keys: ['destination', 'étranger', 'etranger', 'italie', 'provence', 'côme', 'come', 'amalfi', 'château', 'chateau'],
                    reply: "Nous orchestrons des mariages d'exception en France (Châteaux de la Loire, Provence) et à l'international (Villa d'Este au Lac de Côme, Côte Amalfitaine, Caraïbes). 🌍"
                },
                {
                    keys: ['portfolio', 'photo', 'galerie', 'réalisation', 'realisation', 'mariage'],
                    reply: "Découvrez nos plus belles réalisations dans notre Portfolio. Chaque mariage raconte une histoire unique, sublimée par notre vision artistique. 📸"
                },
                {
                    keys: ['merci', 'parfait', 'super', 'génial', 'genial', 'excellent'],
                    reply: "Merci beaucoup ! N'hésitez pas si vous avez d'autres questions. Nous sommes là pour rendre votre rêve réalité. 💫"
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
                    keys: ['price', 'cost', 'budget', 'rate', 'tariff', 'how much', 'expensive'],
                    reply: "Each Ever After Events celebration is unique and bespoke. The cost depends on the location, design, and number of guests. We invite you to book a private consultation for a personalized estimate. 💍"
                },
                {
                    keys: ['service', 'formula', 'offer', 'package', 'absolu', 'esthetique', 'coordination', 'planning'],
                    reply: "We offer 3 exceptional packages:\n\n✦ L'Absolu — Complete A-Z planning\n✦ L'Esthétique — Scenography & design\n✦ Le Jour J — Day-of coordination\n\nFull details on our Services page."
                },
                {
                    keys: ['contact', 'address', 'phone', 'mail', 'email', 'whatsapp', 'office', 'paris'],
                    reply: "Our offices are at Place Vendôme, Paris (75001). Reach our VIP concierge at +229 01 42 10 01 56 or via email at eventafter@gmail.com. 📍"
                },
                {
                    keys: ['founder', 'helene', 'valois', 'creator', 'team'],
                    reply: "Ever After Events was founded by Hélène de Valois, an artistic director dedicated to creating eternal moments and luxurious scenographies. ✨"
                },
                {
                    keys: ['destination', 'abroad', 'italy', 'provence', 'como', 'amalfi', 'castle', 'chateau', 'international'],
                    reply: "We orchestrate exceptional weddings in France (Loire Valley castles, Provence) and internationally (Villa d'Este in Lake Como, Amalfi Coast, Caribbean). 🌍"
                },
                {
                    keys: ['portfolio', 'photo', 'gallery', 'wedding', 'work', 'project'],
                    reply: "Discover our most beautiful creations in our Portfolio. Each wedding tells a unique story, elevated by our artistic vision. 📸"
                },
                {
                    keys: ['thank', 'perfect', 'great', 'amazing', 'excellent', 'wonderful'],
                    reply: "Thank you so much! Don't hesitate if you have more questions. We're here to make your dream a reality. 💫"
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
