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
       PROFILE ENHANCEMENTS
    ========================= */

    function applyProfileEnhancements() {

        const fullName =
            "امير الدين غمدان الصبري";


        /* =========================
           UPDATE PERSONAL NAME
        ========================= */

        const heroTitle =
            document.getElementById("hero-title");

        if (heroTitle) {

            heroTitle.textContent =
                fullName;

            heroTitle.setAttribute(
                "aria-label",
                fullName
            );

        }


        /* Header brand */

        const brandName =
            document.querySelector(
                ".brand-copy strong"
            );

        if (brandName) {
            brandName.textContent =
                fullName;
        }


        const brand =
            document.querySelector(".brand");

        if (brand) {

            brand.setAttribute(
                "aria-label",
                `${fullName} - الرئيسية`
            );

        }


        /* Portrait alt text */

        const portraitImage =
            document.querySelector(
                ".portrait-frame img"
            );

        if (portraitImage) {

            portraitImage.alt =
                `صورة شخصية لـ ${fullName}`;

        }


        /* =========================
           PROFESSIONAL ROLE
        ========================= */

        const heroRole =
            document.querySelector(
                ".hero-role"
            );

        if (heroRole) {

            heroRole.innerHTML = `
                <span class="role-line">
                    <span class="role-accent">
                        مستشار قانوني وعلاقات عامة
                    </span>

                    <span
                        class="role-separator"
                        aria-hidden="true"
                    >
                        ✦
                    </span>

                    <span class="role-accent role-accent-second">
                        رائد أعمال يمني
                    </span>
                </span>
            `;

        }


        /* =========================
           VERIFICATION BADGE
        ========================= */

        const portraitFrame =
            document.querySelector(
                ".portrait-frame"
            );

        if (
            portraitFrame &&
            !portraitFrame.querySelector(
                ".verification-badge"
            )
        ) {

            const badge =
                document.createElement("span");

            badge.className =
                "verification-badge";

            badge.setAttribute(
                "aria-label",
                "شارة توثيق الهوية الرقمية"
            );

            badge.setAttribute(
                "title",
                "توثيق الهوية الرقمية"
            );

            badge.innerHTML = `
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path
                        d="M12 2.5
                           14.1 4.1
                           16.7 3.8
                           18.1 6
                           20.4 7.2
                           20.1 9.8
                           21.5 12
                           20.1 14.2
                           20.4 16.8
                           18.1 18
                           16.7 20.2
                           14.1 19.9
                           12 21.5
                           9.9 19.9
                           7.3 20.2
                           5.9 18
                           3.6 16.8
                           3.9 14.2
                           2.5 12
                           3.9 9.8
                           3.6 7.2
                           5.9 6
                           7.3 3.8
                           9.9 4.1
                           12 2.5Z"
                    />

                    <path
                        class="badge-check"
                        d="M7.8 12.3
                           10.5 15
                           16.4 9.1"
                    />
                </svg>
            `;

            portraitFrame.appendChild(
                badge
            );

        }


        /* =========================
           REMOVE CONTACT INTERFACE
        ========================= */

        const contactSection =
            document.getElementById("contact");

        if (contactSection) {

            contactSection.remove();

        }


        document
            .querySelectorAll(
                '.nav-link[href="#contact"]'
            )
            .forEach((link) => {

                link.remove();

            });


        /* =========================
           UPDATE DOCUMENT METADATA
        ========================= */

        document.title =
            `${fullName} | المستشار ورائد الأعمال`;


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


        const ogTitle =
            document.querySelector(
                'meta[property="og:title"]'
            );

        if (ogTitle) {

            ogTitle.setAttribute(
                "content",
                `${fullName} | المستشار ورائد الأعمال`
            );

        }


        const twitterTitle =
            document.querySelector(
                'meta[name="twitter:title"]'
            );

        if (twitterTitle) {

            twitterTitle.setAttribute(
                "content",
                `${fullName} | المستشار ورائد الأعمال`
            );

        }


        /* =========================
           VISUAL CSS ENHANCEMENTS
        ========================= */

        const enhancementStyle =
            document.createElement("style");

        enhancementStyle.id =
            "profile-enhancement-styles";

        enhancementStyle.textContent = `

            /* =========================
               FULL NAME
            ========================= */

            .hero h1 {
                font-size:
                    clamp(
                        24px,
                        7.6vw,
                        52px
                    ) !important;

                line-height: 1.12 !important;

                white-space: nowrap !important;

                letter-spacing:
                    -0.045em !important;

                width: 100%;

                max-width: 100%;

                overflow: visible;

                text-wrap: nowrap;
            }


            /* =========================
               PROFESSIONAL ROLE
            ========================= */

            .hero-role {
                margin:
                    16px 0 13px !important;

                font-size:
                    clamp(
                        16px,
                        3.5vw,
                        24px
                    ) !important;

                line-height: 1.65 !important;

                color:
                    #e8eef0 !important;
            }


            .role-line {
                display: inline-flex;

                align-items: center;

                justify-content: center;

                flex-wrap: wrap;

                gap: 9px;

                padding:
                    7px 13px;

                border:
                    1px solid
                    rgba(216,181,106,.28);

                border-radius: 999px;

                background:
                    linear-gradient(
                        135deg,
                        rgba(216,181,106,.08),
                        rgba(109,225,210,.045)
                    );

                box-shadow:
                    0 12px 35px
                    rgba(0,0,0,.16);

                backdrop-filter:
                    blur(10px);

                -webkit-backdrop-filter:
                    blur(10px);
            }


            .role-accent {
                color:
                    var(--gold2);

                font-weight: 700;

                text-shadow:
                    0 0 22px
                    rgba(240,211,148,.12);
            }


            .role-accent-second {
                color:
                    #f1f5f5;
            }


            .role-separator {
                display: inline-flex;

                align-items: center;

                justify-content: center;

                color:
                    var(--cyan);

                font-size: .72em;

                text-shadow:
                    0 0 14px
                    rgba(109,225,210,.5);

                animation:
                    roleGlow 2.8s
                    ease-in-out infinite;
            }


            @keyframes roleGlow {

                0%,
                100% {
                    opacity: .72;

                    transform:
                        scale(1);
                }

                50% {
                    opacity: 1;

                    transform:
                        scale(1.12);
                }

            }


            /* =========================
               VERIFICATION BADGE
            ========================= */

            .verification-badge {
                position: absolute;

                z-index: 8;

                top: 13px;

                right: 13px;

                width: 42px;

                height: 42px;

                display: grid;

                place-items: center;

                border-radius: 50%;

                background:
                    linear-gradient(
                        145deg,
                        #1688ff,
                        #0967d8
                    );

                border:
                    3px solid
                    rgba(7,11,18,.88);

                box-shadow:
                    0 7px 22px
                    rgba(0,92,210,.42),

                    0 0 0 1px
                    rgba(255,255,255,.2);

                transform:
                    translateZ(0);

                transition:
                    transform .25s ease,
                    box-shadow .25s ease;
            }


            .verification-badge:hover {
                transform:
                    scale(1.08)
                    rotate(4deg);

                box-shadow:
                    0 10px 28px
                    rgba(0,92,210,.55),

                    0 0 0 1px
                    rgba(255,255,255,.28);
            }


            .verification-badge svg {
                width: 27px;

                height: 27px;

                display: block;

                overflow: visible;
            }


            .verification-badge svg > path:first-child {
                fill: #1688ff;
            }


            .verification-badge .badge-check {
                fill: none;

                stroke: #fff;

                stroke-width: 2.7;

                stroke-linecap: round;

                stroke-linejoin: round;
            }


            /* =========================
               BETTER READABILITY
            ========================= */

            .hero-description {
                font-size:
                    clamp(
                        14px,
                        2.9vw,
                        17px
                    ) !important;

                line-height:
                    2 !important;

                max-width:
                    700px !important;
            }


            .section-lead {
                font-size:
                    clamp(
                        14px,
                        2.6vw,
                        17px
                    ) !important;

                line-height:
                    1.95 !important;
            }


            .statement-card p {
                font-size:
                    clamp(
                        16px,
                        2.8vw,
                        20px
                    ) !important;

                line-height:
                    1.95 !important;
            }


            .principle p {
                font-size:
                    clamp(
                        14px,
                        2.5vw,
                        16px
                    ) !important;

                line-height:
                    1.9 !important;
            }


            .journey-card p {
                font-size:
                    clamp(
                        14px,
                        2.5vw,
                        16px
                    ) !important;

                line-height:
                    1.9 !important;
            }


            .vision-banner p {
                font-size:
                    clamp(
                        14px,
                        2.5vw,
                        17px
                    ) !important;

                line-height:
                    1.95 !important;
            }


            .expertise-display p {
                font-size:
                    clamp(
                        14px,
                        2.6vw,
                        17px
                    ) !important;

                line-height:
                    1.95 !important;
            }


            /* =========================
               MOBILE OPTIMIZATION
            ========================= */

            @media (max-width: 520px) {

                .hero h1 {
                    font-size:
                        clamp(
                            22px,
                            7.5vw,
                            36px
                        ) !important;

                    letter-spacing:
                        -0.055em !important;
                }


                .hero-role {
                    font-size:
                        clamp(
                            14px,
                            3.7vw,
                            18px
                        ) !important;
                }


                .role-line {
                    gap: 6px;

                    padding:
                        6px 10px;

                    max-width:
                        calc(100vw - 28px);
                }


                .verification-badge {
                    width: 39px;

                    height: 39px;

                    top: 11px;

                    right: 11px;
                }


                .verification-badge svg {
                    width: 25px;

                    height: 25px;
                }

            }


            @media (max-width: 420px) {

                .hero h1 {
                    font-size:
                        clamp(
                            20px,
                            7.25vw,
                            31px
                        ) !important;

                    letter-spacing:
                        -0.06em !important;
                }


                .hero-description {
                    font-size:
                        14px !important;
                }


                .role-line {
                    gap: 5px;

                    padding:
                        5px 8px;
                }


                .verification-badge {
                    width: 36px;

                    height: 36px;

                    top: 9px;

                    right: 9px;

                    border-width: 2px;
                }


                .verification-badge svg {
                    width: 23px;

                    height: 23px;
                }

            }


            /* =========================
               REDUCED MOTION
            ========================= */

            @media (
                prefers-reduced-motion: reduce
            ) {

                .role-separator {
                    animation: none;
                }


                .verification-badge {
                    transition: none;
                }

            }

        `;

        document.head.appendChild(
            enhancementStyle
        );

    }


    applyProfileEnhancements();


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

            label:
                "LAW · PUBLIC RELATIONS",

            title:
                "القانون والعلاقات العامة",

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

            label:
                "ENTREPRENEURSHIP",

            title:
                "ريادة الأعمال",

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

            label:
                "TECHNOLOGY · INFORMATION",

            title:
                "التقنية والمعلومات",

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

            label:
                "CYBERSECURITY",

            title:
                "الأمن السيبراني",

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

            label:
                "MECHATRONICS ENGINEERING",

            title:
                "هندسة الميكاترونكس",

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

            label:
                "E-COMMERCE",

            title:
                "التجارة الإلكترونية",

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
            "change",
            viewportChanged
        );

    }


    /* INITIAL */

    showExpertise("law");

    updateBackTop();

});
