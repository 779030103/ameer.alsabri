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
    ========================== */

    function closeMenu() {

        if (!mainNav || !menuToggle) {
            return;
        }

        mainNav.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        body.classList.remove(
            "menu-open"
        );
    }


    function toggleMenu() {

        if (!mainNav || !menuToggle) {
            return;
        }

        const isOpen =
            mainNav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        body.classList.toggle(
            "menu-open",
            isOpen
        );
    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            toggleMenu
        );

    }


    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


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

            if (
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        }
    );


    /* =========================
       ACTIVE NAVIGATION
    ========================== */

    if (
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            const id =
                                entry.target.id;

                            navLinks.forEach(
                                (link) => {

                                    const active =
                                        link.getAttribute(
                                            "href"
                                        ) === `#${id}`;

                                    link.classList.toggle(
                                        "active",
                                        active
                                    );

                                }
                            );

                        }
                    );

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",
                    threshold: 0
                }
            );


        sections.forEach(
            (section) => {

                sectionObserver.observe(
                    section
                );

            }
        );

    }


    /* =========================
       REVEAL ANIMATIONS
    ========================== */

    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: .12
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "is-visible"
                );

            }
        );

    }


    /* =========================
       EXPERTISE DATA
    ========================== */

    const expertiseData = {

        law: {

            index: "01",

            title:
                "القانون والعلاقات العامة",

            description:
                "خبرة واهتمام بالمجالات القانونية والعلاقات العامة وإدارة التفاوض والوساطة والصلح وفض النزاعات.",

            points: [
                "الاستشارات القانونية",
                "العلاقات العامة",
                "التفاوض",
                "الوساطة",
                "التحكيم والصلح",
                "فض المنازعات"
            ]

        },


        business: {

            index: "02",

            title:
                "ريادة الأعمال",

            description:
                "بناء وإدارة الأفكار والمشاريع وربط الجوانب القانونية والتجارية والتقنية لصناعة أعمال قابلة للنمو.",

            points: [
                "تطوير المشاريع",
                "نماذج الأعمال",
                "الإدارة",
                "التسويق",
                "الشراكات",
                "النمو"
            ]

        },


        tech: {

            index: "03",

            title:
                "التقنية والمعلومات",

            description:
                "العمل على تطوير الحلول والمنصات والأنظمة الرقمية وربط التقنية باحتياجات الأعمال والمستخدمين.",

            points: [
                "تطوير الأنظمة",
                "تطبيقات الويب",
                "التطبيقات الرقمية",
                "الذكاء الاصطناعي",
                "الأتمتة",
                "الحلول السحابية"
            ]

        },


        cyber: {

            index: "04",

            title:
                "الأمن السيبراني",

            description:
                "اهتمام متخصص بأمن المعلومات وحماية الأنظمة والبيانات وفهم المخاطر الرقمية والتهديدات السيبرانية.",

            points: [
                "أمن المعلومات",
                "حماية البيانات",
                "تحليل المخاطر",
                "أمن الأنظمة",
                "الخصوصية",
                "الأمن الرقمي"
            ]

        },


        mechatronics: {

            index: "05",

            title:
                "هندسة الميكاترونكس",

            description:
                "ربط الهندسة والأنظمة الذكية والبرمجيات والإلكترونيات لبناء حلول تقنية متكاملة.",

            points: [
                "الأنظمة الذكية",
                "الإلكترونيات",
                "التحكم",
                "الأتمتة",
                "الأنظمة المدمجة",
                "الهندسة"
            ]

        },


        commerce: {

            index: "06",

            title:
                "التجارة الإلكترونية",

            description:
                "تطوير وإدارة مشاريع التجارة الإلكترونية وبناء تجارب رقمية تجمع بين التقنية والتسويق وإدارة الأعمال.",

            points: [
                "المتاجر الإلكترونية",
                "التسويق الرقمي",
                "إدارة المنتجات",
                "تجربة المستخدم",
                "الأتمتة",
                "النمو الرقمي"
            ]

        }

    };


    const expertiseTabs =
        Array.from(
            document.querySelectorAll(
                ".expertise-tab"
            )
        );

    const expertiseTitle =
        document.getElementById(
            "expertiseTitle"
        );

    const expertiseDescription =
        document.getElementById(
            "expertiseDescription"
        );

    const expertisePoints =
        document.getElementById(
            "expertisePoints"
        );

    const displayIndex =
        document.querySelector(
            ".display-index"
        );


    function showExpertise(
        key
    ) {

        const data =
            expertiseData[key];

        if (!data) {
            return;
        }


        if (expertiseTitle) {

            expertiseTitle.textContent =
                data.title;

        }


        if (expertiseDescription) {

            expertiseDescription.textContent =
                data.description;

        }


        if (displayIndex) {

            displayIndex.textContent =
                data.index;

        }


        if (expertisePoints) {

            expertisePoints.innerHTML =
                data.points
                    .map(
                        (point) =>
                            `<span>${point}</span>`
                    )
                    .join("");

        }


        expertiseTabs.forEach(
            (tab) => {

                const isActive =
                    tab.dataset.expertise === key;

                tab.classList.toggle(
                    "active",
                    isActive
                );

                tab.setAttribute(
                    "aria-selected",
                    String(isActive)
                );

            }
        );

    }


    expertiseTabs.forEach(
        (tab) => {

            tab.addEventListener(
                "click",
                () => {

                    showExpertise(
                        tab.dataset.expertise
                    );

                }
            );

        }
    );


    showExpertise("law");


    /* =========================
       BACK TO TOP
    ========================== */

    function updateBackTop() {

        if (!backTop) {
            return;
        }

        if (
            window.scrollY >
            window.innerHeight * .65
        ) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    }


    if (backTop) {

        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateBackTop,
        {
            passive: true
        }
    );


    updateBackTop();


    /* =========================
       CLOSE MOBILE MENU ON RESIZE
    ========================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 760
            ) {
                closeMenu();
            }

        },
        {
            passive: true
        }
    );


    /* =========================
       KEYBOARD ACCESSIBILITY
    ========================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {
                closeMenu();
            }

        }
    );


    /* =========================
       IMAGE SAFETY
    ========================== */

    const profileImage =
        document.querySelector(
            ".portrait-frame img"
        );

    if (profileImage) {

        profileImage.addEventListener(
            "error",
            () => {

                profileImage.style.opacity =
                    "0";

            }
        );

    }


    /* =========================
       DYNAMIC PROFILE METADATA
    ========================== */

    const fullName =
        "امير الدين غمدان الصبري";


    const authorMeta =
        document.querySelector(
            'meta[name="author"]'
        );

    if (authorMeta) {

        authorMeta.setAttribute(
            "content",
            fullName
        );

    }


    const descriptionMeta =
        document.querySelector(
            'meta[name="description"]'
        );

    if (descriptionMeta) {

        descriptionMeta.setAttribute(
            "content",
            `${fullName} — مستشار قانوني وعلاقات عامة، رائد أعمال يمني، وخبير متعدد التخصصات في التقنية والمعلومات والأمن السيبراني وهندسة الميكاترونكس والتجارة الإلكترونية.`
        );

    }


    document.title =
        `${fullName} | المستشار ورائد الأعمال`;


    /* =========================
       SMOOTH INTERNAL LINKS
    ========================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    (event) => {

                        const href =
                            link.getAttribute(
                                "href"
                            );

                        if (
                            !href ||
                            href === "#"
                        ) {
                            return;
                        }

                        const target =
                            document.querySelector(
                                href
                            );

                        if (!target) {
                            return;
                        }

                        event.preventDefault();

                        const headerHeight =
                            document
                                .querySelector(
                                    ".site-header"
                                )
                                ?.offsetHeight || 0;

                        const targetTop =
                            target.getBoundingClientRect()
                                .top
                            +
                            window.scrollY
                            -
                            headerHeight
                            -
                            10;

                        window.scrollTo({
                            top: targetTop,
                            behavior: "smooth"
                        });

                    }
                );

            }
        );


    /* =========================
       INITIAL STATE
    ========================== */

    requestAnimationFrame(
        () => {

            document.body.classList.add(
                "page-ready"
            );

        }
    );

});
