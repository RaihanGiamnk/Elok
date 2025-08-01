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
// Drag and drop untuk galeri foto
function initGalleryDrag() {
  const gallery = document.querySelector('.photo-grid');
  if (!gallery) return;

  let draggedItem = null;

  gallery.querySelectorAll('.photo-item').forEach(item => {
    item.draggable = true;
    
    item.addEventListener('dragstart', function() {
      draggedItem = this;
      setTimeout(() => this.style.opacity = '0.4', 0);
    });
    
    item.addEventListener('dragend', function() {
      setTimeout(() => this.style.opacity = '1', 0);
    });
    
    item.addEventListener('dragover', function(e) {
      e.preventDefault();
    });
    
    item.addEventListener('dragenter', function(e) {
      e.preventDefault();
      this.style.border = '2px dashed #ff4757';
    });
    
    item.addEventListener('dragleave', function() {
      this.style.border = 'none';
    });
    
    item.addEventListener('drop', function() {
      this.style.border = 'none';
      if (draggedItem !== this) {
        gallery.insertBefore(draggedItem, this);
      }
    });
  });
}

// Tambahkan di DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  initGalleryDrag();
  
  // Animasi elemen saat scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.timeline-item, .message-card, .photo-item');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Jalankan sekali saat load
});
// Musik otomatis
document.addEventListener('DOMContentLoaded', function() {
    // ... kode yang sudah ada ...
    
    // Musik latar belakang
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    if (bgMusic && musicToggle) {
        // Coba putar musik otomatis (dengan penanganan kebijakan autoplay browser)
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Autoplay dicegah, tampilkan tombol play
                musicToggle.textContent = '🔇 Musik (Klik untuk memutar)';
                musicToggle.style.display = 'block';
            });
        }
        
        // Tombol toggle musik
        musicToggle.addEventListener('click', function() {
            if (bgMusic.paused) {
                bgMusic.play();
                this.textContent = '🔊 Musik';
            } else {
                bgMusic.pause();
                this.textContent = '🔇 Musik';
            }
        });
    }
});
// Simpan status musik saat berpindah halaman
window.addEventListener('beforeunload', function() {
    if (bgMusic) {
        localStorage.setItem('musicPlaying', !bgMusic.paused);
        localStorage.setItem('musicTime', bgMusic.currentTime);
    }
});

// Periksa status musik saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    if (bgMusic) {
        const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
        const savedTime = localStorage.getItem('musicTime');
        
        if (wasPlaying) {
            bgMusic.currentTime = savedTime || 0;
            const playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    musicToggle.textContent = '🔇 Musik (Klik untuk memutar)';
                });
            } else {
                musicToggle.textContent = '🔊 Musik';
            }
        }
    }
});
// Tambahkan di DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  // ... kode yang ada ...
  
  // Efek ketik untuk greeting
  const greeting = document.querySelector('.greeting');
  if (greeting) {
    const text = greeting.textContent;
    greeting.textContent = '';
    
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        greeting.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);
  }
  
  // Animasi hover untuk tombol
  const buttons = document.querySelectorAll('.nav-btn, .back-btn, .btn-home');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.1) rotate(5deg)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1) rotate(0)';
    });
  });
  
  // Efek hover untuk kartu pesan
  const messageCards = document.querySelectorAll('.message-card');
  messageCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 10px 25px rgba(255, 107, 107, 0.3)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
  });
  
  // Efek klik untuk semua tombol
  document.querySelectorAll('button, a[href]').forEach(btn => {
    btn.addEventListener('click', function() {
      createConfetti(20);
    });
  });
});

// Fungsi untuk efek bubble
function createBubbles() {
  const container = document.querySelector('.floating-hearts') || document.body;
  const colors = ['#ff6b6b', '#ff8e8e', '#ff4757', '#ffa502', '#ff6348'];
  
  for (let i = 0; i < 10; i++) {
    const bubble = document.createElement('div');
    bubble.style.position = 'fixed';
    bubble.style.width = (Math.random() * 40 + 20) + 'px';
    bubble.style.height = bubble.style.width;
    bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    bubble.style.left = Math.random() * 100 + 'vw';
    bubble.style.top = '100vh';
    bubble.style.borderRadius = '50%';
    bubble.style.opacity = '0.6';
    bubble.style.zIndex = '0';
    bubble.style.animation = `float-up ${Math.random() * 10 + 5}s linear infinite`;
    bubble.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(bubble);
  }
  
  // Tambahkan style untuk animasi bubble
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes float-up {
      0% {
        transform: translateY(0) scale(0.5);
        opacity: 0;
      }
      10% {
        opacity: 0.6;
      }
      100% {
        transform: translateY(-100vh) scale(1.2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Panggil fungsi bubble
createBubbles();
// Loading screen
document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.createElement('div');
  loadingScreen.className = 'loading-screen';
  loadingScreen.innerHTML = `
    <div class="loading-text">Memuat Kejutan untuk Elok...</div>
    <div class="loading-bar"><div class="loading-progress"></div></div>
  `;
  document.body.prepend(loadingScreen);
  
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.remove();
    }, 1000);
  }, 3000);
  
  // ... kode lainnya ...
});
