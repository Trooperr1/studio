// ============================================
// JAFF STUDIO - AI CHATBOT (Multi-language)
// ============================================

class AIAssistant {
    constructor() {
        this.chatWidget = document.getElementById('chat-widget');
        this.chatToggle = document.getElementById('chat-toggle');
        this.chatClose = document.getElementById('chat-close');
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.chatSend = document.getElementById('chat-send');
        this.isOpen = false;
        this.messageCount = 0;
        this.userEmail = null;
        this.askedForEmail = false;
        this.currentLang = getCurrentLanguage();

        this.init();
    }

    init() {
        // Update UI language
        this.updateLanguage();

        // Toggle chat window
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.chatClose.addEventListener('click', () => this.toggleChat());

        // Send message on button click
        this.chatSend.addEventListener('click', () => this.sendMessage());

        // Send message on Enter key
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Listen for language changes
        window.addEventListener('languageChanged', (e) => {
            this.currentLang = e.detail.language;
            this.updateLanguage();
        });

        // Welcome message
        setTimeout(() => {
            this.addMessage(getTranslation('chatbot.greeting', this.currentLang), 'bot');
            this.showQuickOptions();
        }, 1000);
    }

    updateLanguage() {
        // Update chat header
        const headerTitle = document.querySelector('.chat-header-text h3');
        const headerStatus = document.querySelector('.chat-header-text p');

        if (headerTitle) {
            headerTitle.textContent = getTranslation('chatbot.title', this.currentLang);
        }
        if (headerStatus) {
            const statusSpan = headerStatus.querySelector('.chat-status');
            if (statusSpan) {
                headerStatus.innerHTML = `<span class="chat-status"></span>${getTranslation('chatbot.status', this.currentLang)}`;
            }
        }

        // Update input placeholder
        if (this.chatInput) {
            this.chatInput.placeholder = getTranslation('chatbot.placeholder', this.currentLang);
        }
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.chatWidget.classList.add('open');
            this.chatToggle.classList.add('hidden');
            this.chatInput.focus();
        } else {
            this.chatWidget.classList.remove('open');
            this.chatToggle.classList.remove('hidden');
        }
    }

    showQuickOptions() {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'chat-message bot-message quick-options';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';

        const content = document.createElement('div');
        content.className = 'message-content';

        const buttonsHTML = `
            <div style="display: grid; gap: 0.5rem; margin-top: 0.5rem;">
                <button class="quick-option-btn" data-action="services">${getTranslation('chatbot.options.services', this.currentLang)}</button>
                <button class="quick-option-btn" data-action="pricing">${getTranslation('chatbot.options.pricing', this.currentLang)}</button>
                <button class="quick-option-btn" data-action="portfolio">${getTranslation('chatbot.options.portfolio', this.currentLang)}</button>
                <button class="quick-option-btn" data-action="booking">${getTranslation('chatbot.options.booking', this.currentLang)}</button>
                <button class="quick-option-btn" data-action="contact">${getTranslation('chatbot.options.contact', this.currentLang)}</button>
            </div>
        `;

        content.innerHTML = buttonsHTML;
        optionsDiv.appendChild(avatar);
        optionsDiv.appendChild(content);

        this.chatMessages.appendChild(optionsDiv);

        // Add click handlers
        const buttons = content.querySelectorAll('.quick-option-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                this.handleQuickOption(action);
            });
        });

        this.scrollToBottom();
    }

    handleQuickOption(action) {
        // Add user message
        const optionText = getTranslation(`chatbot.options.${action}`, this.currentLang);
        this.addMessage(optionText, 'user');

        // Show typing and response
        this.showTyping();
        setTimeout(() => {
            this.hideTyping();
            const response = getTranslation(`chatbot.responses.${action}`, this.currentLang);
            this.addMessage(response, 'bot');

            // Ask for email after showing service info
            if (!this.userEmail && !this.askedForEmail) {
                this.askedForEmail = true;
                setTimeout(() => {
                    this.showTyping();
                    setTimeout(() => {
                        this.hideTyping();
                        this.addMessage(getTranslation('chatbot.emailCapture', this.currentLang), 'bot');
                        this.showEmailForm();
                    }, 1000);
                }, 2000);
            }
        }, 1000);
    }

    showEmailForm() {
        const formDiv = document.createElement('div');
        formDiv.className = 'chat-message bot-message email-form';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';

        const content = document.createElement('div');
        content.className = 'message-content';

        const formHTML = `
            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
                <input type="email" id="chatEmailInput" placeholder="${getTranslation('chatbot.emailPlaceholder', this.currentLang)}" style="padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border-color); background: rgba(255, 255, 255, 0.05); color: var(--white); font-family: inherit;">
                <button id="chatEmailSubmit" class="btn btn-primary" style="width: 100%; padding: 0.8rem;">${getTranslation('chatbot.emailSubmit', this.currentLang)}</button>
            </div>
        `;

        content.innerHTML = formHTML;
        formDiv.appendChild(avatar);
        formDiv.appendChild(content);

        this.chatMessages.appendChild(formDiv);

        // Add submit handler
        const emailInput = content.querySelector('#chatEmailInput');
        const submitBtn = content.querySelector('#chatEmailSubmit');

        submitBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();
            if (this.isValidEmail(email)) {
                this.userEmail = email;
                formDiv.remove();
                this.addMessage(email, 'user');
                this.showTyping();
                setTimeout(() => {
                    this.hideTyping();
                    this.addMessage(getTranslation('chatbot.emailSuccess', this.currentLang), 'bot');
                }, 1000);
            } else {
                emailInput.style.borderColor = '#f44336';
                setTimeout(() => {
                    emailInput.style.borderColor = 'var(--border-color)';
                }, 2000);
            }
        });

        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });

        this.scrollToBottom();
        emailInput.focus();
    }

    sendMessage() {
        const message = this.chatInput.value.trim();
        if (message === '') return;

        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        this.messageCount++;

        // Check if message contains an email
        if (!this.userEmail && this.isValidEmail(message)) {
            this.userEmail = message;
            this.showTyping();
            setTimeout(() => {
                this.hideTyping();
                this.addMessage(getTranslation('chatbot.emailSuccess', this.currentLang), 'bot');
            }, 1000);
            return;
        }

        // Show typing indicator
        this.showTyping();

        // Get AI response
        setTimeout(() => {
            this.hideTyping();
            const response = this.getAIResponse(message);
            this.addMessage(response, 'bot');

            // Ask for email after 3 messages if not provided
            if (!this.userEmail && !this.askedForEmail && this.messageCount >= 3) {
                this.askedForEmail = true;
                setTimeout(() => {
                    this.showTyping();
                    setTimeout(() => {
                        this.hideTyping();
                        this.addMessage(getTranslation('chatbot.emailCapture', this.currentLang), 'bot');
                        this.showEmailForm();
                    }, 1000);
                }, 2000);
            }
        }, 1000 + Math.random() * 1000);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'bot' ? '🤖' : '👤';

        const content = document.createElement('div');
        content.className = 'message-content';

        // Support line breaks
        content.innerHTML = text.replace(/\n/g, '<br>');

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = '<span></span><span></span><span></span>';

        typingDiv.appendChild(avatar);
        typingDiv.appendChild(content);

        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    // AI Response Logic (with multi-language support)
    getAIResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Check for keywords in multiple languages
        const serviceKeywords = ['service', 'dienstleistung', 'prestation'];
        const webKeywords = ['web', 'website', 'site'];
        const aiKeywords = ['ai', 'artificial intelligence', 'künstliche intelligenz', 'intelligence artificielle'];
        const priceKeywords = ['price', 'cost', 'preis', 'kosten', 'prix', 'coût'];
        const contactKeywords = ['contact', 'kontakt', 'phone', 'telefon', 'téléphone'];
        const greetings = ['hello', 'hi', 'hey', 'hallo', 'bonjour', 'salut'];

        // Services
        if (serviceKeywords.some(keyword => lowerMessage.includes(keyword))) {
            return getTranslation('chatbot.responses.services', this.currentLang);
        }

        // Pricing
        if (priceKeywords.some(keyword => lowerMessage.includes(keyword))) {
            return getTranslation('chatbot.responses.pricing', this.currentLang);
        }

        // Contact
        if (contactKeywords.some(keyword => lowerMessage.includes(keyword))) {
            return getTranslation('chatbot.responses.contact', this.currentLang);
        }

        // Portfolio
        if (lowerMessage.includes('portfolio') || lowerMessage.includes('project') || lowerMessage.includes('example') || lowerMessage.includes('beispiel') || lowerMessage.includes('exemple')) {
            return getTranslation('chatbot.responses.portfolio', this.currentLang);
        }

        // Booking
        if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('termin') || lowerMessage.includes('rendez-vous')) {
            return getTranslation('chatbot.responses.booking', this.currentLang);
        }

        // Greetings
        if (greetings.some(greeting => lowerMessage.includes(greeting))) {
            return getTranslation('chatbot.greeting', this.currentLang);
        }

        // Default response based on language
        const defaultResponses = {
            en: 'That\'s a great question! I\'d love to give you detailed information. You can also contact our team directly at contact@jaffstudio.com or fill out our contact form for personalized assistance!',
            fr: 'C\'est une excellente question ! J\'aimerais vous donner des informations détaillées. Vous pouvez également contacter notre équipe directement à contact@jaffstudio.com ou remplir notre formulaire de contact pour une assistance personnalisée !',
            de: 'Das ist eine großartige Frage! Ich würde Ihnen gerne detaillierte Informationen geben. Sie können unser Team auch direkt unter contact@jaffstudio.com kontaktieren oder unser Kontaktformular ausfüllen, um persönliche Unterstützung zu erhalten!'
        };

        return defaultResponses[this.currentLang] || defaultResponses.en;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIAssistant();
});
