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
            this.addMessage('Hello! 👋 I\'m your AI assistant. How can I help you today?', 'bot');
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
                this.addMessage(`Thank you! I've saved your email: ${this.userEmail}. Our team will reach out to you soon! How else can I help you today?`, 'bot');
            }, 1000);
            return;
        }

        // Show typing indicator
        this.showTyping();

        // Simulate AI response (you can replace this with actual AI API call)
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
                        this.addMessage('By the way, if you\'d like us to follow up with you, please share your email address. We\'ll send you more information and exclusive offers! 📧', 'bot');
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
        content.textContent = text;

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

    // AI Response Logic (Replace with actual API call to OpenAI, Claude, etc.)
    getAIResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Services related
        if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
            return 'We offer Web Development, AI Solutions, POS Systems, and Social Media Management. Which service interests you?';
        }

        if (lowerMessage.includes('web dev') || lowerMessage.includes('website')) {
            return 'Our web development services include custom websites, e-commerce platforms, progressive web apps, and more. Would you like to see our portfolio or get a quote?';
        }

        if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
            return 'We specialize in AI solutions including machine learning models, chatbots, computer vision, and NLP. We can help automate your business processes!';
        }

        if (lowerMessage.includes('pos') || lowerMessage.includes('point of sale')) {
            return 'Our POS systems are cloud-based, feature-rich, and perfect for retail. They include inventory management, analytics, and multi-store support.';
        }

        if (lowerMessage.includes('social media') || lowerMessage.includes('marketing')) {
            return 'We manage your entire social media presence - content creation, posting, engagement, analytics, and paid advertising. Growing brands is what we do best!';
        }

        // Pricing related
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
            return 'Our pricing starts at $999 for starter packages. We also offer Professional ($2,999) and custom Enterprise solutions. Would you like to discuss your specific needs?';
        }

        // Contact related
        if (lowerMessage.includes('contact') || lowerMessage.includes('phone')) {
            return 'You can reach us at contact@jaffstudio.com or call +1 (555) 123-4567. You can also fill out our contact form and we\'ll get back to you within 24 hours!';
        }

        // Email capture
        if (lowerMessage.includes('email') && !this.userEmail) {
            return 'Great! Please share your email address and I\'ll make sure our team follows up with you. Just type it in the chat! 📧';
        }

        // Portfolio/Projects
        if (lowerMessage.includes('portfolio') || lowerMessage.includes('project') || lowerMessage.includes('example')) {
            return 'We\'ve completed 500+ projects! Check out our portfolio page to see e-commerce platforms, AI chatbots, POS systems, and successful social media campaigns. Want me to show you specific examples?';
        }

        // Team related
        if (lowerMessage.includes('team') || lowerMessage.includes('who are you')) {
            return 'We\'re a team of 50+ experts including developers, designers, AI specialists, and marketing professionals. All dedicated to delivering premium solutions!';
        }

        // Timeline related
        if (lowerMessage.includes('how long') || lowerMessage.includes('timeline') || lowerMessage.includes('time')) {
            return 'Project timelines vary: Simple websites take 2-4 weeks, professional projects 4-8 weeks, and enterprise solutions 8-16 weeks. We can provide a detailed timeline after discussing your needs.';
        }

        // Greetings
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return 'Hello! Great to hear from you! How can I assist you today? Feel free to ask about our services, pricing, or anything else!';
        }

        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return 'You\'re very welcome! Is there anything else I can help you with?';
        }

        // Default response
        return 'That\'s a great question! I\'d love to give you detailed information. You can also contact our team directly at contact@jaffstudio.com or fill out our contact form for personalized assistance!';
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIAssistant();
});
