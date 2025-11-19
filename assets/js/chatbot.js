// ============================================
// JAFF STUDIO - AI CHATBOT
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

        this.init();
    }

    init() {
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

        // Welcome message
        setTimeout(() => {
            this.addMessage('Hello! 👋 Welcome to Jaff Studio! I\'m here to help you with our services. How can I assist you today?', 'bot');
            this.showQuickOptions();
        }, 1000);
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
                <button class="quick-option-btn" data-action="services">Our Services</button>
                <button class="quick-option-btn" data-action="pricing">Pricing</button>
                <button class="quick-option-btn" data-action="portfolio">Portfolio</button>
                <button class="quick-option-btn" data-action="booking">Book a Consultation</button>
                <button class="quick-option-btn" data-action="contact">Contact Us</button>
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
        const responses = {
            services: 'Our Services:\n\n🌐 Web Development - Custom websites and web applications\n🤖 AI Solutions - Chatbots and intelligent automation\n💳 POS Systems - Modern point-of-sale solutions\n📱 Social Media Management - Complete digital presence\n\nWant to learn more about any specific service?',
            pricing: 'Our Pricing:\n\n💎 Premium Package - $999/month (Complete digital solution)\n⭐ Professional Package - $599/month (Advanced features)\n📦 Starter Package - $299/month (Essential services)\n\nWould you like to discuss which package fits your needs?',
            portfolio: 'Check out our Portfolio page to see our latest projects! We\'ve worked with clients across various industries including e-commerce, hospitality, and professional services.\n\nVisit: jaffstudio.com/portfolio.html',
            booking: 'Great! I can help you schedule a consultation. Visit our booking page to choose a convenient time:\n\njaffstudio.com/booking.html\n\nOr would you like me to collect your details and have our team reach out to you?',
            contact: 'Contact Information:\n\n📧 Email: contact@jaffstudio.com\n📱 Phone: +41 (0) 44 123 4567\n📍 Address: Bahnhofstrasse 123, 8001 Zürich, Switzerland\n\nFeel free to reach out anytime!'
        };

        // Add user message
        const optionTexts = {
            services: 'Our Services',
            pricing: 'Pricing',
            portfolio: 'Portfolio',
            booking: 'Book a Consultation',
            contact: 'Contact Us'
        };
        this.addMessage(optionTexts[action], 'user');

        // Show typing and response
        this.showTyping();
        setTimeout(() => {
            this.hideTyping();
            this.addMessage(responses[action], 'bot');

            // Ask for email after showing service info
            if (!this.userEmail && !this.askedForEmail) {
                this.askedForEmail = true;
                setTimeout(() => {
                    this.showTyping();
                    setTimeout(() => {
                        this.hideTyping();
                        this.addMessage('I\'d love to send you more information! May I have your email address?', 'bot');
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
                <input type="email" id="chatEmailInput" placeholder="your.email@example.com" style="padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border-color); background: rgba(255, 255, 255, 0.05); color: var(--white); font-family: inherit;">
                <button id="chatEmailSubmit" class="btn btn-primary" style="width: 100%; padding: 0.8rem;">Submit Email</button>
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
                    this.addMessage('Thank you! We\'ve received your email and will be in touch soon. Is there anything else I can help you with?', 'bot');
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
                this.addMessage('Thank you! We\'ve received your email and will be in touch soon. Is there anything else I can help you with?', 'bot');
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
                        this.addMessage('I\'d love to send you more information! May I have your email address?', 'bot');
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

    // AI Response Logic
    getAIResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Services
        if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('what can you')) {
            return 'We offer comprehensive digital solutions:\n\n🌐 Web Development - Custom websites & applications\n🤖 AI Solutions - Chatbots & automation\n💳 POS Systems - Modern point-of-sale\n📱 Social Media - Complete management\n\nWhich service interests you most?';
        }

        // Pricing
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
            return 'Our packages start at $299/month for essentials, $599/month for professional features, and $999/month for our premium complete solution. Each can be customized to your needs. Would you like detailed pricing information?';
        }

        // Contact
        if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
            return 'You can reach us at:\n\n📧 contact@jaffstudio.com\n📱 +41 (0) 44 123 4567\n📍 Bahnhofstrasse 123, 8001 Zürich, Switzerland\n\nOr visit our contact page for a form!';
        }

        // Portfolio
        if (lowerMessage.includes('portfolio') || lowerMessage.includes('project') || lowerMessage.includes('example') || lowerMessage.includes('work')) {
            return 'We\'ve completed amazing projects across various industries! Check out our portfolio at jaffstudio.com/portfolio.html to see our latest work. Would you like me to tell you about a specific project type?';
        }

        // Booking
        if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('schedule') || lowerMessage.includes('meet')) {
            return 'I\'d be happy to help you schedule a consultation! Visit jaffstudio.com/booking.html to choose a convenient time, or I can collect your information and have our team reach out. What works best for you?';
        }

        // Greetings
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return 'Hello! 👋 Great to hear from you! I\'m here to help with any questions about Jaff Studio\'s services. What would you like to know?';
        }

        // Thank you
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return 'You\'re very welcome! 😊 Is there anything else I can help you with today?';
        }

        // Default response
        return 'That\'s a great question! I\'d love to give you detailed information. You can also contact our team directly at contact@jaffstudio.com or fill out our contact form for personalized assistance!';
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIAssistant();
});
