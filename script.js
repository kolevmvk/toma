// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Language toggle functionality
const languageButtons = document.querySelectorAll('.language-toggle button');
const elementsToTranslate = document.querySelectorAll('[data-lang]');

languageButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        languageButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get selected language
        const selectedLang = button.id.split('-')[1];
        
        // Show/hide elements based on language
        elementsToTranslate.forEach(element => {
            if (element.dataset.lang === selectedLang) {
                element.style.display = '';
            } else {
                element.style.display = 'none';
            }
        });
    });
});

// Contact form functionality
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Telegram bot configuration
    const botToken = 'YOUR_BOT_TOKEN'; // Replace with actual bot token
    const chatId = 'YOUR_CHAT_ID'; // Replace with actual chat ID
    
    const message = `
New contact form submission:
Name: ${data.name}
Email: ${data.email}
Message: ${data.message}
    `;
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        });
        
        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending message. Please try again later.');
    }
}); 