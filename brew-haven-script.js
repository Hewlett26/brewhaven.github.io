document.addEventListener('DOMContentLoaded', function() {
    
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuGrids = document.querySelectorAll('.menu-grid');
    const contactForm = document.getElementById('contactForm');
    const heroScroll = document.querySelector('.hero-scroll');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Theme Toggle
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeIcon) {
        themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            if (themeIcon) {
                themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
            }
        });
    }
    
    // Custom Cursor - Desktop Only
    const cursorCircle = document.querySelector('.cursor-circle');
    const cursorOrbit = document.querySelector('.cursor-orbit');

    if (cursorCircle && cursorOrbit) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let circleX = mouseX;
        let circleY = mouseY;
        let orbitX = mouseX;
        let orbitY = mouseY;

        const circleSpeed = 0.15;
        const orbitSpeed = 0.08;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            circleX += (mouseX - circleX) * circleSpeed;
            circleY += (mouseY - circleY) * circleSpeed;
            
            orbitX += (mouseX - orbitX) * orbitSpeed;
            orbitY += (mouseY - orbitY) * orbitSpeed;
            
            cursorCircle.style.left = circleX + 'px';
            cursorCircle.style.top = circleY + 'px';
            
            cursorOrbit.style.left = orbitX + 'px';
            cursorOrbit.style.top = orbitY + 'px';
            
            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        const hoverElements = document.querySelectorAll('a, button, .nav-link, .btn, .menu-card, .why-card, .testimonial-card, .gallery-item, input, textarea');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorCircle.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursorCircle.classList.remove('hovering');
            });
        });
    }
    
    // Navbar Scroll Effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Mobile Menu Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Menu Category Tabs
    if (menuTabs.length && menuGrids.length) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.category;
                menuTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                menuGrids.forEach(grid => {
                    if (grid.dataset.category === category) {
                        grid.classList.add('active');
                    } else {
                        grid.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // Active Section Highlighting
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            console.log('Form submitted:', { name, email, subject, message });

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Sent!';
            contactForm.reset();

            setTimeout(() => {
                btn.textContent = originalText;
            }, 3000);
        });
    }
    
    // Hero Scroll Click
    if (heroScroll) {
        heroScroll.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});
