/* =========================================================
   BEC V1 — Main JavaScript (corrected)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");

    function hideLoader() {
        if (pageLoader) pageLoader.classList.add("loaded");
    }

    // If page is already loaded, hide immediately
    if (document.readyState === "complete") {
        setTimeout(hideLoader, 400);
    } else {
        window.addEventListener("load", () => {
            setTimeout(hideLoader, 400);
        });
    }

    // Safety net — always hide after 4s
    setTimeout(hideLoader, 4000);


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.getElementById("siteHeader");
    const backTop = document.getElementById("backTop");

    function handleScroll() {
        const y = window.scrollY;

        if (y > 50) header.classList.add("scrolled");
        else header.classList.remove("scrolled");

        if (y > 700) backTop.classList.add("visible");
        else backTop.classList.remove("visible");
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    function closeMenu() {
        mobileMenu.classList.remove("open");
        menuToggle.classList.remove("active");
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");
        menuToggle.classList.toggle("active", isOpen);
        document.body.classList.toggle("menu-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close when any mobile menu link is clicked
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Close on Escape key
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
            closeMenu();
        }
    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters = document.querySelectorAll(".counter");

    function animateCounter(element) {
        const target = Number(element.dataset.target);
        const plain  = element.dataset.format === "plain";
        const duration = 1800;
        const startTime = performance.now();

        function update(now) {
            const elapsed  = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3);
            const value    = Math.floor(eased * target);

            element.textContent = plain
                ? String(value)
                : value.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = plain
                    ? String(target)
                    : target.toLocaleString();
            }
        }

        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(c => counterObserver.observe(c));


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    backTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    /* =====================================================
       SMOOTH INTERNAL LINKS (with header offset)
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            const id = link.getAttribute("href");
            if (!id || id === "#") return;

            const target = document.querySelector(id);
            if (!target) return;

            e.preventDefault();

            const headerHeight = header.offsetHeight;
            const top =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({ top, behavior: "smooth" });
        });
    });


    /* =====================================================
       IMAGE ERROR FALLBACK
    ===================================================== */

    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", () => {
            img.style.display = "none";
            if (img.parentElement) {
                img.parentElement.classList.add("image-fallback");
            }
        });
    });


    /* =====================================================
       ACTIVE NAVIGATION (scroll spy)
    ===================================================== */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".desktop-nav a");

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const id = entry.target.id;

            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + id
                );
            });
        });
    }, { rootMargin: "-40% 0px -50% 0px" });

    sections.forEach(section => sectionObserver.observe(section));

});
