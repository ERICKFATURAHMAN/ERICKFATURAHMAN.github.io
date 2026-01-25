// Mobile Navigation Logic
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Close menu when link is clicked
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
    cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
});

// Efek Hover pada elemen clickable
const clickableElements = document.querySelectorAll('a, button, .gallery-item');

clickableElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.backgroundColor = 'rgba(255,255,255,0.1)';
        cursor.style.border = 'none';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.border = '1px solid #fff';
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                // Animasi fade in simpel
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

// Input Animation Fix for Pre-filled inputs (if any)
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

// Reveal on Scroll Animation (Simple Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-section'); // Add CSS class for transition later if needed
    observer.observe(section);
});

// Form Handling (AJAX)
const contactForm = document.querySelector('.contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const action = this.getAttribute('action'); // Get the Formspree URL from HTML

        // Check if user has updated the URL
        if(action.includes('EMAIL_ANDA_DISINI')) {
            alert('Harap ganti "EMAIL_ANDA_DISINI" di file index.html dengan URL Formspree Anda terlebih dahulu!');
            return;
        }

        const button = this.querySelector('button');
        const originalText = button.innerText;
        button.innerText = 'Mengirim...';
        button.disabled = true;

        fetch(action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Pesan berhasil dikirim! Saya akan segera menghubungi Anda.');
                this.reset();
                // Reset input animations
                document.querySelectorAll('.input-group input, .input-group textarea').forEach(input => {
                    input.classList.remove('has-content');
                });
            } else {
                alert('Oops! Ada masalah saat mengirim pesan Anda.');
            }
        })
        .catch(error => {
            alert('Oops! Terjadi kesalahan koneksi.');
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
    bgMusic.volume = 0.3; // Set initial volume lower

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-play"></i>';
            musicBtn.style.animation = 'none';
        } else {
            bgMusic.play().then(() => {
                musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                // Add simple rotation animation
                musicBtn.style.animation = 'spin 4s linear infinite';
                // Need to add keyframes for spin in CSS or inline
                // Let's just use CSS class toggle if we had one, but inline works for simple logic.
            }).catch(e => {
                console.log("Audio play blocked:", e);
                alert("Klik sekali lagi untuk memutar musik (Browser memblokir autoplay).");
            });
        }
        isPlaying = !isPlaying;
    });
}

// Modal Logic
const modal = document.getElementById("project-modal");
const span = document.getElementsByClassName("close-modal")[0];
const galleryLinks = document.querySelectorAll(".gallery-item .overlay"); 
// Note: Click triggers on overlay

galleryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent bubbling if needed
        const item = this.parentElement; // .gallery-item
        
        // Get Data
        const title = item.getAttribute('data-title');
        const cat = item.getAttribute('data-category');
        const desc = item.getAttribute('data-desc');
        const problem = item.getAttribute('data-problem');
        const process = item.getAttribute('data-process');
        const solution = item.getAttribute('data-solution');
        
        // Get Gradient Class
        const placeholder = item.querySelector('.image-placeholder');
        const gradientClass = Array.from(placeholder.classList).find(cls => cls.startsWith('gradient-'));

        // Populate Modal
        document.getElementById('modal-title').innerText = title || "Project Detail";
        document.getElementById('modal-category').innerText = cat ? cat.toUpperCase() : "CASE STUDY";
        document.getElementById('modal-desc').innerText = desc || "Deskripsi proyek belum tersedia.";
        document.getElementById('modal-problem').innerText = problem || "Tantangan yang dihadapi dalam proyek ini...";
        document.getElementById('modal-process').innerText = process || "Proses pengerjaan...";
        document.getElementById('modal-solution').innerText = solution || "Solusi akhir yang diberikan...";
        
        // Handle Image Placeholder in Modal
        const modalHero = document.getElementById('modal-img-placeholder');
        // Reset classes
        modalHero.className = 'modal-hero'; 
        if(gradientClass) modalHero.classList.add(gradientClass);
        
        // Show Modal
        modal.style.display = "block";
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Disable body scroll
        document.body.style.overflow = 'hidden';
    });
});

// Close Modal
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