/* =========================================================
   VIRTUAL GENIE AI
   Interaction & Animation System
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {
            preloader.classList.add("loaded");
        }, 900);

    });


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");

    if (cursor && follower && window.matchMedia("(pointer: fine)").matches) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let followerX = mouseX;
        let followerY = mouseY;

        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

        });


        const animateCursor = () => {

            followerX += (mouseX - followerX) * 0.13;
            followerY += (mouseY - followerY) * 0.13;

            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;

            requestAnimationFrame(animateCursor);

        };

        animateCursor();


        const hoverTargets = document.querySelectorAll(
            "a, button, .call-card, .knowledge-card, .industry"
        );

        hoverTargets.forEach((element) => {

            element.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-hover");
            });

            element.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-hover");
            });

        });

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton = document.querySelector(".menu-toggle");
    const header = document.querySelector(".site-header");
    const menuLinks = document.querySelectorAll(".nav-links a");

    if (menuButton) {

        menuButton.addEventListener("click", () => {

            const active = header.classList.toggle("menu-active");

            document.body.classList.toggle("menu-open", active);

        });

    }


    menuLinks.forEach((link) => {

        link.addEventListener("click", () => {

            header.classList.remove("menu-active");
            document.body.classList.remove("menu-open");

        });

    });


    /* =====================================================
       SCROLL REVEALS
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


    revealElements.forEach((element, index) => {

        element.style.transitionDelay = `${Math.min(index * 0.035, 0.25)}s`;

        revealObserver.observe(element);

    });


    /* =====================================================
       NUMBER COUNTERS
    ===================================================== */

    const counters = document.querySelectorAll(".counter");

    const animateCounter = (element) => {

        const target = parseFloat(element.dataset.target);
        const decimal = element.dataset.decimal === "true";

        const duration = 1600;
        const startTime = performance.now();

        const update = (currentTime) => {

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const eased =
                1 - Math.pow(1 - progress, 4);

            const value = target * eased;

            if (decimal) {
                element.textContent = value.toFixed(1);
            } else {
                element.textContent = Math.round(value);
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }

        };

        requestAnimationFrame(update);

    };


    const counterObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: .6
        }
    );


    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    const magneticElements = document.querySelectorAll(".magnetic");

    if (window.matchMedia("(pointer: fine)").matches) {

        magneticElements.forEach((element) => {

            element.addEventListener("mousemove", (event) => {

                const rect = element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                element.style.transform =
                    `translate(${x * .13}px, ${y * .13}px)`;

            });


            element.addEventListener("mouseleave", () => {

                element.style.transform =
                    "translate(0, 0)";

            });

        });

    }


    /* =====================================================
       DEMO BUTTON
    ===================================================== */

    const demoButton = document.getElementById("demoButton");

    if (demoButton) {

        let active = false;

        demoButton.addEventListener("click", () => {

            active = !active;

            demoButton.classList.toggle("active", active);

            const label =
                demoButton.querySelector("span:last-child");

            if (active) {

                label.textContent =
                    "Conversation active";

            } else {

                label.textContent =
                    "Start conversation";

            }

        });

    }


    /* =====================================================
       PARALLAX HERO
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    const heroOrbits =
        document.querySelectorAll(".hero-orbit");

    if (
        heroVisual &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        document.addEventListener("mousemove", (event) => {

            const x =
                (event.clientX / window.innerWidth - .5);

            const y =
                (event.clientY / window.innerHeight - .5);

            heroVisual.style.transform =
                `translate(${x * 10}px, ${y * 10}px)`;

            heroOrbits.forEach((orbit, index) => {

                const multiplier =
                    index === 0 ? 12 : -8;

                orbit.style.transform =
                    `translate(${x * multiplier}px, ${y * multiplier}px)`;

            });

        });

    }


    /* =====================================================
       ACTIVE NAV ON SCROLL
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navAnchors =
        document.querySelectorAll(".nav-links a");

    const navObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    navAnchors.forEach((anchor) => {

                        anchor.classList.remove("active");

                        if (
                            anchor.getAttribute("href") ===
                            `#${entry.target.id}`
                        ) {

                            anchor.classList.add("active");

                        }

                    });

                });

            },
            {
                threshold: .35
            }
        );

    sections.forEach((section) => {
        navObserver.observe(section);
    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

        anchor.addEventListener("click", (event) => {

            const targetId =
                anchor.getAttribute("href");

            if (targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       WAVEFORM RANDOMIZATION
    ===================================================== */

    const waveBars =
        document.querySelectorAll(
            ".waveform span, .big-wave span"
        );

    waveBars.forEach((bar) => {

        const randomDelay =
            Math.random() * 1.2;

        const randomDuration =
            .6 + Math.random() * .8;

        bar.style.animationDelay =
            `-${randomDelay}s`;

        bar.style.animationDuration =
            `${randomDuration}s`;

    });


    /* =====================================================
       SCROLL VELOCITY MARQUEE
    ===================================================== */

    const marquee =
        document.querySelector(".marquee-track");

    let lastScroll = window.scrollY;
    let velocity = 0;

    window.addEventListener(
        "scroll",
        () => {

            const current =
                window.scrollY;

            velocity =
                current - lastScroll;

            lastScroll = current;

            if (marquee) {

                const speed =
                    Math.max(
                        20,
                        Math.min(80, 35 + Math.abs(velocity) * 2)
                    );

                marquee.style.animationDuration =
                    `${speed}s`;

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       INDUSTRY HOVER
    ===================================================== */

    document.querySelectorAll(".industry").forEach((item) => {

        item.addEventListener("mouseenter", () => {

            item.querySelector(".industry-arrow")
                ?.animate(
                    [
                        {
                            transform: "translate(0, 0)"
                        },
                        {
                            transform: "translate(6px, -6px)"
                        }
                    ],
                    {
                        duration: 400,
                        fill: "forwards",
                        easing: "cubic-bezier(.16,1,.3,1)"
                    }
                );

        });

    });


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            header?.classList.remove("menu-active");
            document.body.classList.remove("menu-open");

        }

    });

});
