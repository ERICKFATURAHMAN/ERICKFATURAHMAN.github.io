// Mobile Navigation Logic
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
}

navSlide();

// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

document.addEventListener('mousemove', function(e){
    if(cursor && cursor2) {
        cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
    }
});

// Hover Effect pada clickable elements
const clickableElements = document.querySelectorAll('a, button, .gallery-item');
clickableElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if(cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'rgba(255,255,255,0.1)';
            cursor.style.border = 'none';
        }
    });
    el.addEventListener('mouseleave', () => {
        if(cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '1px solid #fff';
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(button => button.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Input Animation Fix for Pre-filled inputs
const inputs = document.querySelectorAll('.input-group input, .input-group textarea');
inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if(input.value !== "") {
            input.classList.add('has-content');
        } else {
            input.classList.remove('has-content');
        }
    });
});

// Reveal on Scroll Animation
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// Modern Toast Notification Function
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    
    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4000);
}

// Form Handling (AJAX + Toast Notification)
const contactForm = document.querySelector('.contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const action = this.getAttribute('action');

        if(action.includes('EMAIL_ANDA_DISINI')) {
            showToast('Harap ganti Formspree URL terlebih dahulu!', 'error');
            return;
        }

        const button = this.querySelector('button');
        const originalText = button.innerText;
        button.innerText = 'Mengirim...';
        button.disabled = true;

        fetch(action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                showToast('Pesan berhasil terkirim! Gua bakal kabarin secepatnya.', 'success');
                this.reset();
                document.querySelectorAll('.input-group input, .input-group textarea').forEach(input => {
                    input.classList.remove('has-content');
                });
            } else {
                showToast('Oops! Ada masalah saat mengirim pesan.', 'error');
            }
        })
        .catch(error => {
            showToast('Koneksi bermasalah. Coba lagi nanti.', 'error');
        })
        .finally(() => {
            button.innerText = originalText;
            button.disabled = false;
        });
    });
}

// Background Music Logic
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

if(musicBtn && bgMusic) {
    bgMusic.volume = 0.3;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-play"></i>';
            musicBtn.style.animation = 'none';
        } else {
            bgMusic.play().then(() => {
                musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                musicBtn.style.animation = 'spin 4s linear infinite';
            }).catch(e => {
                console.log("Audio play blocked:", e);
                showToast('Klik sekali lagi untuk memutar audio.', 'error');
            });
        }
        isPlaying = !isPlaying;
    });
}

// Modal Logic (Bisa Tampil Gambar & Text)
const modal = document.getElementById("project-modal");
const span = document.getElementsByClassName("close-modal")[0];
const galleryLinks = document.querySelectorAll(".gallery-item .overlay"); 

galleryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.stopPropagation();
        const item = this.parentElement;
        
        // Ambil Data Teks
        const title = item.getAttribute('data-title');
        const cat = item.getAttribute('data-category');
        const desc = item.getAttribute('data-desc');
        const problem = item.getAttribute('data-problem');
        const process = item.getAttribute('data-process');
        const solution = item.getAttribute('data-solution');
        
        // Set Data ke Modal
        document.getElementById('modal-title').innerText = title || "Project Detail";
        document.getElementById('modal-category').innerText = cat ? cat.toUpperCase() : "CASE STUDY";
        document.getElementById('modal-desc').innerText = desc || "Deskripsi proyek belum tersedia.";
        document.getElementById('modal-problem').innerText = problem || "Tantangan yang dihadapi dalam proyek ini...";
        document.getElementById('modal-process').innerText = process || "Proses pengerjaan...";
        document.getElementById('modal-solution').innerText = solution || "Solusi akhir yang diberikan...";
        
        // Handle Gambar Modal
        const modalHero = document.getElementById('modal-img-placeholder');
        const cardImg = item.querySelector('.gallery-img-overlay');

        if (cardImg && cardImg.getAttribute('src')) {
            modalHero.className = 'modal-hero with-img';
            modalHero.innerHTML = `<img src="${cardImg.src}" alt="${title}" class="modal-img-content">`;
        } else {
            const placeholder = item.querySelector('.image-placeholder');
            const gradientClass = placeholder ? Array.from(placeholder.classList).find(cls => cls.startsWith('gradient-')) : null;
            modalHero.innerHTML = '';
            modalHero.className = 'modal-hero';
            if(gradientClass) modalHero.classList.add(gradientClass);
        }
        
        // Buka Modal
        modal.style.display = "block";
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        document.body.style.overflow = 'hidden';
    });
});

if(span) {
    span.onclick = function() {
        closeModal();
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }, 300);
}