/* /script.js */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    const navLinks =
        Array.from(
            document.querySelectorAll(".nav-link")
        );

    const sections =
        Array.from(
            document.querySelectorAll("main section[id]")
        );

    const revealElements =
        Array.from(
            document.querySelectorAll(".reveal")
        );

    const backTop =
        document.getElementById("backTop");


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

        menuToggle.innerHTML =
            "<span>×</span>";

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

        menuToggle.innerHTML =
            "<span>☰</span>";

        body.classList.remove("menu-open");
    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            () => {

                if (
                    mainNav.classList.contains("open")
                ) {
                    closeMenu();
                } else {
                    openMenu();
                }

            }
        );

    }


    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


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

    function setActiveLink(id) {

        navLinks.forEach((link) => {

            const target =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === `#${id}`
            );

        });

    }


    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {
                            setActiveLink(
                                entry.target.id
                            );
                        }

                    });

                },
                {
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
       REVEAL ANIMATION
    ========================= */

    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
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
                    rootMargin:
                        "0px 0px -50px 0px",
                    threshold: .08
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
       INTERACTIVE EXPERTISE
    ========================= */

    const expertiseData = {

        law: {
            number: "01",
            label: "LAW · PUBLIC RELATIONS",
            title: "القانون والعلاقات العامة",
            text:
                "مستشار قانوني وعلاقات عامة، مع اهتمام بفهم الأبعاد القانونية والإدارية وبناء التواصل المهني والعلاقات التي تدعم الأعمال والمشروعات.",
            tags: [
                "استشارات",
                "علاقات عامة",
                "تواصل مهني"
            ]
        },

        business: {
            number: "02",
            label: "ENTREPRENEURSHIP",
            title: "ريادة الأعمال",
            text:
                "رائد أعمال يمني مهتم بتحويل الأفكار إلى مشاريع ومنتجات وخدمات عملية، مع التركيز على القيمة والاستدامة وفهم احتياجات السوق.",
            tags: [
                "مشاريع",
                "ابتكار",
                "تطوير أعمال"
            ]
        },

        tech: {
            number: "03",
            label: "TECHNOLOGY · INFORMATION",
            title: "التقنية والمعلومات",
            text:
                "اهتمام وخبرة في بناء الحلول الرقمية والتعامل مع التقنية والمعلومات بطريقة عملية، مع التركيز على سهولة الاستخدام والكفاءة.",
            tags: [
                "حلول رقمية",
                "تقنية معلومات",
                "أنظمة"
            ]
        },

        cyber: {
            number: "04",
            label: "CYBERSECURITY",
            title: "الأمن السيبراني",
            text:
                "خبرة واهتمام بالمجال الأمني والتقني، وفهم مبادئ حماية الأنظمة والمعلومات والتعامل المسؤول مع المخاطر الرقمية.",
            tags: [
                "أمن معلومات",
                "حماية",
                "وعي رقمي"
            ]
        },

        mechatronics: {
            number: "05",
            label: "MECHATRONICS ENGINEERING",
            title: "هندسة الميكاترونكس",
            text:
                "منظور هندسي يجمع بين الأنظمة الميكانيكية والإلكترونية والتحكم والبرمجة، مع اهتمام بتحويل الأفكار الهندسية إلى حلول عملية.",
            tags: [
                "هندسة",
                "تحكم",
                "أنظمة"
            ]
        },

        commerce: {
            number: "06",
            label: "E-COMMERCE",
            title: "التجارة الإلكترونية",
            text:
                "ناشط في مجال التجارة الإلكترونية ومهتم ببناء التجارب الرقمية التي تربط المنتجات والعملاء والتقنية بطريقة بسيطة وفعالة.",
            tags: [
                "متاجر رقمية",
                "تجارة إلكترونية",
                "تجربة العملاء"
            ]
        }

    };


    const tabs =
        Array.from(
            document.querySelectorAll(
                ".expertise-tab"
            )
        );

    const displayNumber =
        document.getElementById(
            "displayNumber"
        );

    const displayLabel =
        document.getElementById(
            "displayLabel"
        );

    const displayTitle =
        document.getElementById(
            "displayTitle"
        );

    const displayText =
        document.getElementById(
            "displayText"
        );

    const displayTags =
        document.getElementById(
            "displayTags"
        );

    const displayLine =
        document.querySelector(
            ".display-line span"
        );


    function showExpertise(key) {

        const data =
            expertiseData[key];

        if (!data) {
            return;
        }


        tabs.forEach((tab) => {

            const active =
                tab.dataset.expertise === key;

            tab.classList.toggle(
                "active",
                active
            );

            tab.setAttribute(
                "aria-selected",
                String(active)
            );

        });


        if (displayNumber) {
            displayNumber.textContent =
                data.number;
        }

        if (displayLabel) {
            displayLabel.textContent =
                data.label;
        }

        if (displayTitle) {
            displayTitle.textContent =
                data.title;
        }

        if (displayText) {

            displayText.textContent =
                data.text;

        }

        if (displayTags) {

            displayTags.innerHTML =
                data.tags
                    .map(
                        (tag) =>
                            `<span>${tag}</span>`
                    )
                    .join("");

        }

        if (displayLine) {

            const percentage =
                (Number(data.number) / 6) * 100;

            displayLine.style.width =
                `${percentage}%`;

        }

    }


    tabs.forEach((tab) => {

        tab.addEventListener(
            "click",
            () => {

                showExpertise(
                    tab.dataset.expertise
                );

            }
        );

    });


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

                const reduced =
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches;

                window.scrollTo({
                    top: 0,
                    behavior:
                        reduced
                            ? "auto"
                            : "smooth"
                });

            }
        );

    }


    /* =========================
       RESPONSIVE SAFETY
    ========================= */

    const breakpoint =
        window.matchMedia(
            "(max-width: 800px)"
        );


    function viewportChanged(event) {

        if (!event.matches) {
            closeMenu();
        }

    }


    if (
        typeof breakpoint.addEventListener ===
        "function"
    ) {

        breakpoint.addEventListener(
            "change",
            viewportChanged
        );

    } else if (
        typeof breakpoint.addListener ===
        "function"
    ) {

        breakpoint.addListener(
            viewportChanged
        );

    }


    /* INITIAL */

    showExpertise("law");

    updateBackTop();

});
