document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    initNeuralNetwork();
    initNavbar();
    initMobileMenu();
    initTypingEffect();
    initTypewriterSubtitle();
    initCounters();
    initScrollReveal();
    initFilters();
    initBentoGlow();
    initSmoothScroll();
    initActiveNav();
    initSkillBars();
});

/* ===========================
   NEURAL NETWORK BACKGROUND
   =========================== */
function initNeuralNetwork() {
    const canvas = document.getElementById('neuralBg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, nodes, mouse;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    mouse = { x: width / 2, y: height / 2 };
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    const NODE_COUNT = Math.min(Math.floor((width * height) / 25000), 80);
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 2 + 1,
    });
}

/* ===========================
   SKILL BARS ANIMATION
   =========================== */
function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width;
                bar.style.width = width + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    bars.forEach(bar => observer.observe(bar));
}

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Update positions
        for (const n of nodes) {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > width) n.vx *= -1;
            if (n.y < 0 || n.y > height) n.vy *= -1;

            // Subtle mouse attraction
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
                n.x += dx * 0.0008;
                n.y += dy * 0.0008;
            }
        }

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const alpha = (1 - dist / 150) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Draw nodes
        for (const n of nodes) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 240, 255, 0.25)';
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }
    draw();
}

/* ===========================
   NAVBAR
   =========================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

/* ===========================
   MOBILE MENU
   =========================== */
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    btn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        btn.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('open');
            btn.classList.remove('open');
        });
    });
}

/* ===========================
   TYPING EFFECT
   =========================== */
function initTypingEffect() {
    const el = document.getElementById('heroTyping');
    if (!el) return;
    const phrases = [
        'build_ai_systems()',
        'train_transformers()',
        'deploy_rag_pipelines()',
        'solve_real_problems()',
        'optimize_with_llms()',
        'code_intelligence()'
    ];
    let pi = 0, ci = 0, deleting = false;

    function type() {
        const current = phrases[pi];
        if (!deleting) {
            el.textContent = current.slice(0, ++ci);
            if (ci === current.length) {
                deleting = true;
                setTimeout(type, 2000);
                return;
            }
            setTimeout(type, 80);
        } else {
            el.textContent = current.slice(0, --ci);
            if (ci === 0) {
                deleting = false;
                pi = (pi + 1) % phrases.length;
            }
            setTimeout(type, 40);
        }
    }
    type();
}

/* ===========================
   TYPEWRITER SUBTITLE
   =========================== */
function initTypewriterSubtitle() {
    const el = document.getElementById('typewriterSubtitle');
    if (!el) return;
    const phrases = [
        'AI Engineer',
        'LLM Builder',
        'RAG Architect',
        'Multi-Agent Systems',
        'Transformer Fine-Tuner',
        'Production AI'
    ];
    let pi = 0, ci = 0, deleting = false;

    function type() {
        const current = phrases[pi];
        if (!deleting) {
            el.textContent = current.slice(0, ++ci);
            if (ci === current.length) {
                deleting = true;
                setTimeout(type, 2500);
                return;
            }
            setTimeout(type, 90);
        } else {
            el.textContent = current.slice(0, --ci);
            if (ci === 0) {
                deleting = false;
                pi = (pi + 1) % phrases.length;
            }
            setTimeout(type, 45);
        }
    }
    type();
}

/* ===========================
   COUNTER ANIMATION
   =========================== */
function initCounters() {
    const counters = document.querySelectorAll('.counter-num');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const isDecimal = el.dataset.decimal === 'true';
                const target = parseFloat(el.dataset.target);
                let current = 0;
                const duration = 1500;
                const steps = 60;
                const increment = target / steps;
                const interval = duration / steps;

                const timer = setInterval(() => {
                    current = Math.min(current + increment, target);
                    if (isDecimal) {
                        el.textContent = current.toFixed(3);
                    } else {
                        el.textContent = Math.round(current);
                    }
                    if (current >= target) {
                        el.textContent = isDecimal ? target.toFixed(3) : target;
                        clearInterval(timer);
                    }
                }, interval);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

/* ===========================
   SCROLL REVEAL
   =========================== */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 60);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));
}

/* ===========================
   PROJECT FILTERS
   =========================== */
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.bento-card[data-category]');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            cards.forEach(card => {
                const categories = card.dataset.category;
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    requestAnimationFrame(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

/* ===========================
   BENTO CARD GLOW FOLLOW
   =========================== */
function initBentoGlow() {
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });
}

/* ===========================
   SMOOTH SCROLL
   =========================== */
function initSmoothScroll() {
    const navbar = document.getElementById('navbar');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - navbar.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===========================
   ACTIVE NAV LINK
   =========================== */
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('nav-active');
            }
        });
    });
}
