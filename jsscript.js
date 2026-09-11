/* =========================================================
   BEC V1
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const pageLoader =
        document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            pageLoader.classList.add("loaded");

        }, 500);

    });



    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.getElementById("siteHeader");

    const backTop =
        document.getElementById("backTop");


    function handleScroll() {

        const scrollPosition =
            window.scrollY;

        if (scrollPosition > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }


        if (scrollPosition > 700) {

            backTop.classList.add("visible");

        } else {

            backTop.classList.remove("visible");

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    handleScroll();



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");


    menuToggle.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("open");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /* Close mobile menu when link clicked */

    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            menuToggle.classList.remove("active");

            document.body.classList.remove(
                "menu-open"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* =====================================================
       COUNTER
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");


    function animateCounter(element) {

        const target =
            Number(element.dataset.target);

        const duration = 1800;

        const startTime =
            performance.now();


        function update(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            /*
             * Ease-out function
             */
            const eased =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.floor(
                    eased * target
                );


            element.textContent =
                value.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                element.textContent =
                    target.toLocaleString();

            }

        }


        requestAnimationFrame(update);

    }


    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.6
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });



    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    targetId === "#" ||
                    targetId === ""
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header.offsetHeight;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            });

        });



    /* =====================================================
       PROGRAMME ROW HOVER EFFECT
    ===================================================== */

    const programmeRows =
        document.querySelectorAll(
            ".programme-row"
        );


    programmeRows.forEach(row => {

        row.addEventListener(
            "mouseenter",
            () => {

                row.style.setProperty(
                    "--row-progress",
                    "1"
                );

            }
        );

        row.addEventListener(
            "mouseleave",
            () => {

                row.style.setProperty(
                    "--row-progress",
                    "0"
                );

            }
        );

    });



    /* =====================================================
       IMAGE ERROR FALLBACK
    ===================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.display = "none";

                image.parentElement.classList.add(
                    "image-fallback"
                );

            }
        );

    });



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a"
        );


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const currentId =
                            entry.target.id;


                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute(
                                    "href"
                                ) ===
                                "#" + currentId
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    }

                });

            },
            {
                rootMargin:
                    "-40% 0px -50% 0px"
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });



    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains("open")
            ) {

                mobileMenu.classList.remove(
                    "open"
                );

                menuToggle.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "menu-open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


});