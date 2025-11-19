// Blog Search and Filter Functionality

// Search functionality
const searchInput = document.getElementById('blogSearch');
const blogCards = document.querySelectorAll('.blog-card');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        blogCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.querySelector('.blog-category').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
}

// Category filter functionality
const categoryButtons = document.querySelectorAll('.category-btn');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = 'rgba(255, 255, 255, 0.05)';
            btn.style.color = 'var(--white)';
            btn.style.border = '1px solid var(--border-color)';
        });

        button.classList.add('active');
        button.style.background = 'var(--white)';
        button.style.color = 'var(--black)';
        button.style.border = 'none';

        const category = button.getAttribute('data-category');

        // Filter blog posts
        blogCards.forEach(card => {
            const cardCategory = card.querySelector('.blog-category').textContent;

            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Social sharing functions
function shareOnFacebook(event) {
    event.preventDefault();
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

function shareOnTwitter(event) {
    event.preventDefault();
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
}

function shareOnLinkedIn(event) {
    event.preventDefault();
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
}

function copyLink(event) {
    event.preventDefault();
    const url = window.location.href;

    // Modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showCopyNotification();
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showCopyNotification();
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        document.body.removeChild(textArea);
    }
}

function showCopyNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = 'Link copied to clipboard!';
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--white);
        color: var(--black);
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Comment form submission
const commentForm = document.getElementById('commentForm');
if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('commentName').value;
        const email = document.getElementById('commentEmail').value;
        const message = document.getElementById('commentMessage').value;

        // Here you would typically send this to a backend
        // For now, we'll just show a success message

        const notification = document.createElement('div');
        notification.textContent = 'Comment submitted successfully!';
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: #4CAF50;
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
        `;

        document.body.appendChild(notification);

        // Reset form
        commentForm.reset();

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    });
}

// Add smooth transitions to cards
blogCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});
