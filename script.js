/* /script.js */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */

    const body = document.body;

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    const navLinks = Array.from(
        document.querySelectorAll(".nav-link")
    );

    const sections = Array.from(
        document.querySelectorAll("main section[id]")
    );

    const revealElements = Array.from(
        document.querySelectorAll(".reveal")
    );

    const backTop = document.getElementById("backTop");
    const currentYear = document.getElementById("currentYear");


    /* =========================
       YEAR
    ========================= */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =========================
       MOBILE MENU
    ========================= */

    function openMenu() {

        if (!mainNav || !menuToggle) {
            return;
        }

        mainNav.classList.add("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "إغلاق القائمة"
        );

        menuToggle.innerHTML = '<span aria-hidden="true">×</span>';

        body.classList.add("menu-open");
    }


    function closeMenu() {

        if (!mainNav || !menuToggle) {
            return;
        }

        mainNav.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "فتح القائمة"
        );

        menuToggle.innerHTML = '<span aria-hidden="true">☰</span>';

        body.classList.remove("menu-open");
    }


    function toggleMenu() {

        if (!mainNav) {
            return;
        }

        if (mainNav.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            toggleMenu
        );
    }


    /* =========================
       CLOSE MENU AFTER CLICK
    ========================= */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    /* =========================
       ESCAPE KEY
    ========================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


    /* =========================
       CLOSE MENU WHEN CLICKING
       OUTSIDE IT
    ========================= */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !mainNav ||
                !menuToggle ||
                !mainNav.classList.contains("open")
            ) {
                return;
            }

            const target = event.target;

            if (
                target instanceof Node &&
                !mainNav.contains(target) &&
                !menuToggle.contains(target)
            ) {
                closeMenu();
            }

        }
    );


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    function setActiveLink(sectionId) {

        navLinks.forEach((link) => {

            const target =
                link.getAttribute("href");

            const isActive =
                target === `#${sectionId}`;

            link.classList.toggle(
                "active",
                isActive
            );

        });
    }


    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            setActiveLink(
                                entry.target.id
                            );

                        }

                    });

                },
                {
                    root: null,

                    rootMargin:
                        "-30% 0px -55% 0px",

                    threshold: 0
                }
            );

        sections.forEach((section) => {

            sectionObserver.observe(section);

        });

    }


    /* =========================
       REVEAL ON SCROLL
    ========================= */

    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    root: null,

                    rootMargin:
                        "0px 0px -50px 0px",

                    threshold: 0.08
                }
            );

        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =========================
       BACK TO TOP
    ========================= */

    function updateBackTop() {

        if (!backTop) {
            return;
        }

        if (window.scrollY > 450) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }
    }


    window.addEventListener(
        "scroll",
        updateBackTop,
        {
            passive: true
        }
    );


    if (backTop) {

        backTop.addEventListener(
            "click",
            () => {

                const reduceMotion =
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches;

                window.scrollTo({
                    top: 0,

                    behavior:
                        reduceMotion
                            ? "auto"
                            : "smooth"
                });

            }
        );

    }


    /* =========================
       RESPONSIVE MENU SAFETY
    ========================= */

    const mobileBreakpoint =
        window.matchMedia("(max-width: 800px)");

    function handleViewportChange(event) {

        if (!event.matches) {
            closeMenu();
        }

    }


    if (
        typeof mobileBreakpoint.addEventListener ===
        "function"
    ) {

        mobileBreakpoint.addEventListener(
            "change",
            handleViewportChange
        );

    } else if (
        typeof mobileBreakpoint.addListener ===
        "function"
    ) {

        mobileBreakpoint.addListener(
            handleViewportChange
        );

    }


    /* =========================
       INITIAL STATE
    ========================= */

    updateBackTop();

});
