document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts
    createFloatingHearts(15);
    
    // Wish page functionality
    const wishForm = document.querySelector('.wish-form');
    const wishResult = document.querySelector('.wish-result');
    const wishBtn = document.querySelector('.wish-btn');
    
    if (wishBtn) {
        wishBtn.addEventListener('click', function(e) {
            e.preventDefault();
            wishForm.classList.add('hidden');
            wishResult.classList.remove('hidden');
            
            // Create confetti effect
            createConfetti(100);
            
            // Play success sound
            playSuccessSound();
        });
    }
    
    // Photo gallery hover effect
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

function createFloatingHearts(count) {
    const colors = ['#ff6b6b', '#ff8e8e', '#ff4757', '#ffa502', '#ff6348'];
    const container = document.querySelector('.floating-hearts') || document.body;
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.animation = `float-heart ${Math.random() * 10 + 5}s linear infinite`;
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.opacity = '0';
        heart.style.zIndex = '0';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(heart);
    }
}

function createConfetti(count) {
    const colors = ['#ff6b6b', '#ffa502', '#2ed573', '#1e90ff', '#ff4757', '#ff6348'];
    const container = document.querySelector('.floating-hearts') || document.body;
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.zIndex = '10';
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
    
    // Add CSS for confetti animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes confetti-fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function playSuccessSound() {
    // Simple success sound using Web Audio API
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'triangle';
        oscillator.frequency.value = 880;
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.5);
        
        // Second tone
        setTimeout(() => {
            const oscillator2 = audioCtx.createOscillator();
            oscillator2.type = 'triangle';
            oscillator2.frequency.value = 1046.5;
            oscillator2.connect(gainNode);
            
            gainNode.gain.setValueAtTime(0, audioCtx.currentTime + 0.5);
            gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.51);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.0);
            
            oscillator2.start(audioCtx.currentTime + 0.5);
            oscillator2.stop(audioCtx.currentTime + 1.0);
        }, 500);
    } catch (e) {
        console.log('Audio error:', e);
    }
}
// WhatsApp Integration
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const senderName = document.getElementById('senderName').value;
        const wishMessage = document.getElementById('wishMessage').value;
        
        // Format pesan untuk WhatsApp
        const formattedMessage = `Hai Elok! Aku ${senderName} ingin mengucapkan:\n\n${wishMessage}\n\nSelamat ulang tahun! 🎉🎂`;
        
        // Encode pesan untuk URL
        const encodedMessage = encodeURIComponent(formattedMessage);
        
        // Nomor WhatsApp Elok (ganti dengan nomor asli)
        const phoneNumber = '085229691284'; // Contoh: 081234567890
        
        // Buat link WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Buka WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        whatsappForm.reset();
        
        // Tampilkan konfirmasi
        alert('Pesan Anda akan dibuka di WhatsApp. Pastikan nomor Elok sudah benar!');
    });
}