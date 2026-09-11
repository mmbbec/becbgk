document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Page Loader
    const loader = document.getElementById('pageLoader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 800);
        }, 500);
    });

    // 2. Sticky Header
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Reveal on Scroll Observer
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a counter, start counting
                if (entry.target.classList.contains('counter')) {
                    startCounter(entry.target);
                }
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal, .counter').forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Counter Logic
    function startCounter(el) {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText;
        const speed = 2000 / target; // Adjust timing

        if (count < target) {
            el.innerText = Math.ceil(count + (target / 100));
            setTimeout(() => startCounter(el), 30);
        } else {
            el.innerText = target;
        }
    }

    // 5. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !expanded);
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = expanded ? 'auto' : 'hidden';
    });

    // 6. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
