"use strict";

/* =========================================================
   AMEER.SYS // PRESENTATION ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const sections = Array.from(
        document.querySelectorAll(".page-section")
    );

    const navLinks = Array.from(
        document.querySelectorAll(".nav-link")
    );

    const sectionLinks = Array.from(
        document.querySelectorAll("[data-section-link]")
    );

    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");

    const clock = document.getElementById("live-clock");
    const connectionStatus = document.getElementById("connection-status");

    const previousButton = document.getElementById("prev-slide");
    const nextButton = document.getElementById("next-slide");

    const slideIndicator = document.getElementById("slide-indicator");
    const slideDots = document.getElementById("slide-dots");

    const palette = document.getElementById("command-palette");
    const paletteInput = document.getElementById("palette-input");
    const paletteResults = document.getElementById("palette-results");

    const terminalForm = document.getElementById("terminal-form");
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");

    const cpuValue = document.getElementById("cpu-value");
    const cpuBar = document.getElementById("cpu-bar");
    const cpuState = document.getElementById("cpu-state");

    const ramValue = document.getElementById("ram-value");
    const ramBar = document.getElementById("ram-bar");
    const ramState = document.getElementById("ram-state");

    const networkState = document.getElementById("network-state");
    const networkDetail = document.getElementById("network-detail");

    const systemLog = document.getElementById("system-log");

    const sectionData = [
        {
            id: "home",
            title: "الرئيسية",
            code: "01",
            description: "AMEER.SYS // Cyber Engineering"
        },
        {
            id: "identity",
            title: "الهوية",
            code: "02",
            description: "Identity Profile"
        },
        {
            id: "capabilities",
            title: "القدرات",
            code: "03",
            description: "Engineering Capabilities"
        },
        {
            id: "projects",
            title: "المشاريع",
            code: "04",
            description: "Project Command Center"
        },
        {
            id: "ops-center",
            title: "العمليات",
            code: "05",
            description: "Cyber Ops Center"
        },
        {
            id: "lab",
            title: "المختبر",
            code: "06",
            description: "Cyber Engineering Lab"
        },
        {
            id: "terminal",
            title: "Terminal",
            code: "07",
            description: "AMEER.SYS Terminal"
        }
    ];

    let currentIndex = 0;
    let wheelLocked = false;

    let touchStartX = 0;
    let touchStartY = 0;

    let telemetryTimer = null;
    let logTimer = null;


    /* =====================================================
       CLOCK
    ===================================================== */

    function updateClock() {

        if (!clock) {
            return;
        }

        const now = new Date();

        clock.textContent = now.toLocaleTimeString(
            "en-GB",
            {
                hour12: false
            }
        );
    }

    updateClock();
    setInterval(updateClock, 1000);


    /* =====================================================
       CONNECTION STATUS
    ===================================================== */

    function updateConnectionStatus() {

        if (!connectionStatus) {
            return;
        }

        if (navigator.onLine) {
            connectionStatus.textContent = "ONLINE";
            connectionStatus.style.color = "";
        } else {
            connectionStatus.textContent = "OFFLINE";
            connectionStatus.style.color = "var(--danger)";
        }
    }

    window.addEventListener("online", updateConnectionStatus);
    window.addEventListener("offline", updateConnectionStatus);

    updateConnectionStatus();


    /* =====================================================
       PRESENTATION
    ===================================================== */

    function normalizeSectionIndex(index) {

        if (index < 0) {
            return sections.length - 1;
        }

        if (index >= sections.length) {
            return 0;
        }

        return index;
    }


    function getIndexFromHash() {

        const hash = window.location.hash.replace("#", "");

        const index = sections.findIndex(
            section => section.id === hash
        );

        return index >= 0 ? index : 0;
    }


    function updateNavigation() {

        const currentSection = sections[currentIndex];

        if (!currentSection) {
            return;
        }

        navLinks.forEach(link => {

            const active =
                link.dataset.section === currentSection.id;

            link.classList.toggle("active", active);

            if (active) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });


        if (slideIndicator) {

            const currentNumber = String(
                currentIndex + 1
            ).padStart(2, "0");

            const totalNumber = String(
                sections.length
            ).padStart(2, "0");

            slideIndicator.innerHTML = `
                <span>${currentNumber}</span>
                <i>/</i>
                <span>${totalNumber}</span>
            `;
        }


        document.querySelectorAll(".slide-dot")
            .forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

                dot.setAttribute(
                    "aria-current",
                    index === currentIndex ? "true" : "false"
                );
            });
    }


    function activateSection(index, updateHash = true) {

        currentIndex = normalizeSectionIndex(index);

        sections.forEach((section, sectionIndex) => {

            const active = sectionIndex === currentIndex;

            section.classList.toggle("active", active);

            if (active) {
                section.removeAttribute("aria-hidden");
            } else {
                section.setAttribute("aria-hidden", "true");
            }
        });

        updateNavigation();

        closeMobileMenu();

        if (updateHash) {

            const targetHash =
                `#${sections[currentIndex].id}`;

            if (window.location.hash !== targetHash) {

                history.pushState(
                    null,
                    "",
                    targetHash
                );
            }
        }

        if (sections[currentIndex].id === "terminal") {

            window.setTimeout(() => {
                terminalInput?.focus();
            }, 300);
        }
    }


    function goTo(index) {

        activateSection(index, true);
    }


    function nextSection() {

        goTo(currentIndex + 1);
    }


    function previousSection() {

        goTo(currentIndex - 1);
    }


    /* =====================================================
       SLIDE DOTS
    ===================================================== */

    function buildSlideDots() {

        if (!slideDots) {
            return;
        }

        slideDots.innerHTML = "";

        sections.forEach((section, index) => {

            const button =
                document.createElement("button");

            button.type = "button";
            button.className = "slide-dot";

            button.title =
                sectionData[index]?.title ||
                section.id;

            button.setAttribute(
                "aria-label",
                `الانتقال إلى ${sectionData[index]?.title || section.id}`
            );

            button.addEventListener(
                "click",
                () => goTo(index)
            );

            slideDots.appendChild(button);
        });
    }


    buildSlideDots();


    /* =====================================================
       NAVIGATION
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const id = link.dataset.section;

            const index = sections.findIndex(
                section => section.id === id
            );

            if (index >= 0) {
                goTo(index);
            }
        });
    });


    sectionLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const id =
                link.dataset.sectionLink;

            const index = sections.findIndex(
                section => section.id === id
            );

            if (index >= 0) {
                goTo(index);
            }
        });
    });


    previousButton?.addEventListener(
        "click",
        previousSection
    );

    nextButton?.addEventListener(
        "click",
        nextSection
    );


    window.addEventListener(
        "popstate",
        () => {
            activateSection(
                getIndexFromHash(),
                false
            );
        }
    );


    window.addEventListener(
        "hashchange",
        () => {
            activateSection(
                getIndexFromHash(),
                false
            );
        }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function closeMobileMenu() {

        if (!mainNav || !menuToggle) {
            return;
        }

        mainNav.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }


    menuToggle?.addEventListener(
        "click",
        () => {

            const isOpen =
                mainNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                mainNav &&
                menuToggle &&
                mainNav.classList.contains("open") &&
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMobileMenu();
            }
        }
    );


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const tag =
                event.target?.tagName?.toLowerCase();

            const typing =
                tag === "input" ||
                tag === "textarea" ||
                tag === "select";

            if (
                event.key === "ArrowDown" ||
                event.key === "PageDown"
            ) {

                if (!typing) {
                    event.preventDefault();
                    nextSection();
                }

                return;
            }


            if (
                event.key === "ArrowUp" ||
                event.key === "PageUp"
            ) {

                if (!typing) {
                    event.preventDefault();
                    previousSection();
                }

                return;
            }


            if (event.key === "Home" && !typing) {

                event.preventDefault();
                goTo(0);

                return;
            }


            if (event.key === "End" && !typing) {

                event.preventDefault();
                goTo(sections.length - 1);

                return;
            }


            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                openPalette();
            }


            if (event.key === "Escape") {

                closePalette();
                closeMobileMenu();
            }
        }
    );


    /* =====================================================
       WHEEL NAVIGATION
    ===================================================== */

    window.addEventListener(
        "wheel",
        event => {

            if (
                window.innerWidth <= 900 &&
                event.target.closest(".page-section") &&
                event.target.closest(".page-section").scrollHeight >
                event.target.closest(".page-section").clientHeight
            ) {
                return;
            }

            if (wheelLocked) {
                return;
            }

            if (Math.abs(event.deltaY) < 25) {
                return;
            }

            wheelLocked = true;

            if (event.deltaY > 0) {
                nextSection();
            } else {
                previousSection();
            }

            window.setTimeout(
                () => {
                    wheelLocked = false;
                },
                650
            );
        },
        {
            passive: true
        }
    );


    /* =====================================================
       TOUCH / SWIPE
    ===================================================== */

    main?.addEventListener(
        "touchstart",
        event => {

            const touch = event.changedTouches[0];

            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        },
        {
            passive: true
        }
    );


    main?.addEventListener(
        "touchend",
        event => {

            const touch = event.changedTouches[0];

            const deltaX =
                touch.clientX - touchStartX;

            const deltaY =
                touch.clientY - touchStartY;

            const horizontal =
                Math.abs(deltaX) >
                Math.abs(deltaY);

            if (!horizontal) {
                return;
            }

            if (Math.abs(deltaX) < 55) {
                return;
            }

            if (deltaX < 0) {
                nextSection();
            } else {
                previousSection();
            }
        },
        {
            passive: true
        }
    );


    /* =====================================================
       TELEMETRY
    ===================================================== */

    function randomBetween(min, max) {

        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min;
    }


    function updateTelemetry() {

        if (!cpuValue || !ramValue) {
            return;
        }

        const cpu =
            randomBetween(8, 42);

        const ram =
            randomBetween(48, 72);

        cpuValue.textContent =
            `${cpu}%`;

        ramValue.textContent =
            `${ram}%`;

        cpuBar.style.width =
            `${cpu}%`;

        ramBar.style.width =
            `${ram}%`;

        cpuState.textContent =
            cpu > 35 ? "BUSY" : "NORMAL";

        ramState.textContent =
            ram > 68 ? "HIGH" : "STABLE";
    }


    updateTelemetry();

    telemetryTimer =
        window.setInterval(
            updateTelemetry,
            2200
        );


    /* =====================================================
       NETWORK INFO
    ===================================================== */

    function updateNetworkInfo() {

        if (!networkState || !networkDetail) {
            return;
        }

        if (!navigator.onLine) {

            networkState.textContent = "OFFLINE";
            networkState.style.color =
                "var(--danger)";

            networkDetail.textContent =
                "CHANNEL // DISCONNECTED";

            return;
        }

        networkState.textContent = "SECURE";
        networkState.style.color =
            "var(--green)";

        const connection =
            navigator.connection ||
            navigator.mozConnection ||
            navigator.webkitConnection;

        if (
            connection &&
            connection.effectiveType
        ) {

            networkDetail.textContent =
                `CHANNEL // ${connection.effectiveType.toUpperCase()}`;

        } else {

            networkDetail.textContent =
                "CHANNEL // ENCRYPTED";
        }
    }


    updateNetworkInfo();

    window.addEventListener(
        "online",
        updateNetworkInfo
    );

    window.addEventListener(
        "offline",
        updateNetworkInfo
    );


    /* =====================================================
       SYSTEM LOG
    ===================================================== */

    const logMessages = [
        ["[SYSTEM]", "Presentation engine synchronized."],
        ["[NETWORK]", "Network interface status refreshed."],
        ["[SECURITY]", "Threat monitoring module active."],
        ["[ENGINE]", "Cyber engineering environment ready."],
        ["[SYSTEM]", "Telemetry cycle completed."],
        ["[SECURITY]", "No simulated threats detected."]
    ];

    let logIndex = 0;


    function addSystemLog() {

        if (!systemLog) {
            return;
        }

        const [type, message] =
            logMessages[logIndex];

        logIndex =
            (logIndex + 1) %
            logMessages.length;

        const row =
            document.createElement("p");

        const typeElement =
            document.createElement("span");

        typeElement.textContent =
            type;

        row.appendChild(typeElement);

        row.append(
            document.createTextNode(
                ` ${message}`
            )
        );

        systemLog.appendChild(row);

        while (
            systemLog.children.length > 7
        ) {
            systemLog.removeChild(
                systemLog.firstElementChild
            );
        }
    }


    logTimer =
        window.setInterval(
            addSystemLog,
            4200
        );


    /* =====================================================
       COMMAND PALETTE
    ===================================================== */

    let paletteSelection = 0;


    function renderPaletteResults(
        query = ""
    ) {

        if (!paletteResults) {
            return;
        }

        const normalized =
            query.trim().toLowerCase();

        const results =
            sectionData.filter(item => {

                return (
                    item.title.toLowerCase().includes(normalized) ||
                    item.description.toLowerCase().includes(normalized) ||
                    item.id.toLowerCase().includes(normalized)
                );
            });

        paletteResults.innerHTML = "";

        paletteSelection = 0;

        results.forEach(
            (item, index) => {

                const button =
                    document.createElement("button");

                button.type = "button";
                button.className =
                    "palette-item";

                if (index === 0) {
                    button.classList.add("selected");
                }

                const title =
                    document.createElement("strong");

                title.textContent =
                    item.title;

                const code =
                    document.createElement("span");

                code.textContent =
                    item.code;

                button.appendChild(title);
                button.appendChild(code);

                button.addEventListener(
                    "click",
                    () => {

                        const sectionIndex =
                            sections.findIndex(
                                section =>
                                    section.id === item.id
                            );

                        if (sectionIndex >= 0) {
                            goTo(sectionIndex);
                            closePalette();
                        }
                    }
                );

                paletteResults.appendChild(
                    button
                );
            }
        );
    }


    function openPalette() {

        if (!palette) {
            return;
        }

        palette.hidden = false;

        renderPaletteResults();

        window.setTimeout(
            () => {
                paletteInput?.focus();
            },
            50
        );
    }


    function closePalette() {

        if (!palette) {
            return;
        }

        palette.hidden = true;

        if (paletteInput) {
            paletteInput.value = "";
        }
    }


    paletteInput?.addEventListener(
        "input",
        event => {

            renderPaletteResults(
                event.target.value
            );
        }
    );


    paletteInput?.addEventListener(
        "keydown",
        event => {

            const items =
                Array.from(
                    paletteResults.querySelectorAll(
                        ".palette-item"
                    )
                );

            if (!items.length) {
                return;
            }

            if (event.key === "ArrowDown") {

                event.preventDefault();

                paletteSelection =
                    Math.min(
                        paletteSelection + 1,
                        items.length - 1
                    );
            }

            if (event.key === "ArrowUp") {

                event.preventDefault();

                paletteSelection =
                    Math.max(
                        paletteSelection - 1,
                        0
                    );
            }

            if (event.key === "Enter") {

                event.preventDefault();

                items[
                    paletteSelection
                ]?.click();

                return;
            }

            items.forEach(
                (item, index) => {

                    item.classList.toggle(
                        "selected",
                        index === paletteSelection
                    );
                }
            );
        }
    );


    document.querySelectorAll(
        "[data-close-palette]"
    ).forEach(element => {

        element.addEventListener(
            "click",
            closePalette
        );
    });


    /* =====================================================
       TERMINAL
    ===================================================== */

    const terminalCommands = {

        help: () => [
            "Available commands:",
            "about    → identity profile",
            "skills   → engineering capabilities",
            "projects → project list",
            "status   → system status",
            "contact  → contact information",
            "clear    → clear terminal"
        ],

        about: () => [
            "AMEER.SYS",
            "Cyber Engineering / Digital Systems",
            "Cybersecurity × Mechatronics × IT"
        ],

        skills: () => [
            "CYBERSECURITY",
            "MECHATRONICS",
            "IT SYSTEMS",
            "NETWORK SECURITY",
            "NIST MINDSET",
            "DIGITAL ENGINEERING"
        ],

        projects: () => [
            "PROJ-001 // ICS SHIELD",
            "PROJ-002 // CYBER-MECH"
        ],

        status: () => [
            `SYSTEM: ONLINE`,
            `NETWORK: ${navigator.onLine ? "ONLINE" : "OFFLINE"}`,
            "SECURITY: ACTIVE",
            "THREAT LEVEL: LOW",
            "ENVIRONMENT: SIMULATED"
        ],

        contact: () => [
            "Public contact endpoint is not configured.",
            "Add your preferred contact information to index.html."
        ]
    };


    function addTerminalLine(
        text,
        className = ""
    ) {

        const line =
            document.createElement("div");

        if (className) {
            line.className = className;
        }

        line.textContent = text;

        terminalOutput.appendChild(line);

        terminalOutput.scrollTop =
            terminalOutput.scrollHeight;
    }


    function runCommand(command) {

        const normalized =
            command.trim().toLowerCase();

        if (!normalized) {
            return;
        }

        addTerminalLine(
            `ameer@sys:~$ ${command}`,
            "terminal-green"
        );

        if (normalized === "clear") {

            terminalOutput.innerHTML = "";

            return;
        }


        if (terminalCommands[normalized]) {

            const result =
                terminalCommands[normalized]();

            result.forEach(
                line => addTerminalLine(line)
            );

            return;
        }


        addTerminalLine(
            `command not found: ${command}`
        );

        addTerminalLine(
            "Type 'help' for available commands."
        );
    }


    terminalForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const command =
                terminalInput.value;

            runCommand(command);

            terminalInput.value = "";
        }
    );


    document.querySelectorAll(
        "[data-command]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const command =
                    button.dataset.command;

                if (terminalInput) {
                    terminalInput.value =
                        command;

                    terminalInput.focus();
                }

                runCommand(command);

                if (terminalInput) {
                    terminalInput.value = "";
                }
            }
        );
    });


    /* =====================================================
       INITIALIZE
    ===================================================== */

    activateSection(
        getIndexFromHash(),
        false
    );

    window.addEventListener(
        "beforeunload",
        () => {

            if (telemetryTimer) {
                clearInterval(telemetryTimer);
            }

            if (logTimer) {
                clearInterval(logTimer);
            }
        }
    );

});
