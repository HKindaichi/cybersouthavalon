document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Navigation
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    
    // Create an overlay element for clicking outside to close
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.zIndex = '998';
    overlay.style.display = 'none';
    overlay.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(overlay);

    function toggleMenu() {
        const isOpen = mobileNav.classList.contains('open');
        if (isOpen) {
            mobileNav.classList.remove('open');
            overlay.style.display = 'none';
        } else {
            mobileNav.classList.add('open');
            overlay.style.display = 'block';
        }
    }

    mobileToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 3. Smooth Scrolling for anchor links (if CSS scroll-behavior isn't enough)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // 5. Form submission (WhatsApp Redirect)
    const form = document.getElementById('register-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const interest = document.getElementById('interest').value || 'Not specified';
            
            // Format the WhatsApp message
            const message = `*NEW REGISTRATION (AVALON RESIDENCE)*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Interest:* ${interest}\n\n_Sila hubungi saya, saya berminat untuk tahu lebih lanjut!_`;
            
            // Encode the message to be URL safe
            const encodedMessage = encodeURIComponent(message);
            
            // Create the WhatsApp URL
            const whatsappUrl = `https://cybersouthavalon.wasap.my/?text=${encodedMessage}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
            
            // Optional: Show success state briefly
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Redirecting...';
            
            setTimeout(() => {
                btn.textContent = originalText;
                form.reset();
            }, 2000);
        });
    }

    // 6. Hero Auto Slider
    const slides = document.querySelectorAll('#hero-slider .slide');
    if(slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Change every 5 seconds
    }

    // 7. Unit Tabs and Slider Logic
    const unitTabs = document.querySelectorAll('.unit-tab');
    
    // Type A Slider
    const sliderA = document.querySelector('#slider-type-a .slider-wrapper');
    const prevA = document.querySelector('#slider-type-a .prev-slide');
    const nextA = document.querySelector('#slider-type-a .next-slide');
    const slidesA = document.querySelectorAll('#slider-type-a .slider-wrapper img');
    let currentA = 0;
    
    function updateSliderA() {
        sliderA.style.transform = `translateX(-${currentA * 100}%)`;
    }
    
    function nextSlideA() {
        currentA = (currentA + 1) % slidesA.length;
        updateSliderA();
    }
    function prevSlideA() {
        currentA = (currentA - 1 + slidesA.length) % slidesA.length;
        updateSliderA();
    }
    
    if (nextA && prevA) {
        nextA.addEventListener('click', nextSlideA);
        prevA.addEventListener('click', prevSlideA);
    }
    
    // Type C Slider
    const sliderC = document.querySelector('#slider-type-c .slider-wrapper');
    const prevC = document.querySelector('#slider-type-c .prev-slide');
    const nextC = document.querySelector('#slider-type-c .next-slide');
    const slidesC = document.querySelectorAll('#slider-type-c .slider-wrapper img');
    let currentC = 0;
    
    function updateSliderC() {
        sliderC.style.transform = `translateX(-${currentC * 100}%)`;
    }
    
    function nextSlideC() {
        currentC = (currentC + 1) % slidesC.length;
        updateSliderC();
    }
    function prevSlideC() {
        currentC = (currentC - 1 + slidesC.length) % slidesC.length;
        updateSliderC();
    }
    
    if (nextC && prevC) {
        nextC.addEventListener('click', nextSlideC);
        prevC.addEventListener('click', prevSlideC);
    }
    
    // Add Mobile Swipe Support
    function addSwipeSupport(sliderElem, nextCallback, prevCallback) {
        let touchStartX = 0;
        let touchEndX = 0;
        if (!sliderElem) return;
        sliderElem.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
        sliderElem.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            const threshold = 50;
            if (touchEndX < touchStartX - threshold) nextCallback();
            if (touchEndX > touchStartX + threshold) prevCallback();
        }, {passive: true});
    }
    
    addSwipeSupport(sliderA, nextSlideA, prevSlideA);
    addSwipeSupport(sliderC, nextSlideC, prevSlideC);

    unitTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            unitTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.unit-slider').forEach(s => s.classList.remove('active'));

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

});
