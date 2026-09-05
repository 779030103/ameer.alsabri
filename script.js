(() => {
    "use strict";


    /* =====================================================
       DOM
    ====================================================== */

    const nav = document.getElementById("main-nav");
    const menuToggle = document.getElementById("menu-toggle");

    const sections = [
        ...document.querySelectorAll(".page-section")
    ];

    const navLinks = [
        ...document.querySelectorAll(".nav-link")
    ];

    const clock = document.getElementById("live-clock");

    const commandPalette =
        document.getElementById("command-palette");

    const paletteInput =
        document.getElementById("palette-input");

    const paletteClose =
        document.getElementById("palette-close");

    const terminalForm =
        document.getElementById("terminal-form");

    const terminalInput =
        document.getElementById("terminal-input");

    const terminalOutput =
        document.getElementById("terminal-output");

    const systemLog =
        document.getElementById("system-log");


    /* =====================================================
       CLOCK
    ====================================================== */

    function updateClock() {

        if (!clock) return;

        const now = new Date();

        clock.textContent =
            now.toLocaleTimeString("en-GB", {
                hour12: false
            });
    }

    updateClock();

    setInterval(updateClock, 1000);


    /* =====================================================
       NAVIGATION
    ====================================================== */

    function showSection(sectionId, updateHash = true) {

        const target =
            document.getElementById(sectionId);

        if (!target) {
            return;
        }

        sections.forEach(section => {
            section.classList.toggle(
                "active",
                section.id === sectionId
            );
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.dataset.section === sectionId
            );
        });

        if (updateHash) {
            history.replaceState(
                null,
                "",
                `#${sectionId}`
            );
        }

        closeMobileMenu();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    function getInitialSection() {

        const hash =
            window.location.hash.replace("#", "");

        const valid =
            sections.some(
                section => section.id === hash
            );

        return valid ? hash : "home";
    }


    function initializeNavigation() {

        showSection(
            getInitialSection(),
            false
        );

        navLinks.forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    showSection(
                        link.dataset.section
                    );
                }
            );

        });


        document
            .querySelectorAll("[data-section-link]")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        showSection(
                            link.dataset.sectionLink
                        );
                    }
                );

            });


        window.addEventListener(
            "hashchange",
            () => {
                showSection(
                    getInitialSection(),
                    false
                );
            }
        );
    }


    initializeNavigation();


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    function closeMobileMenu() {

        if (!nav || !menuToggle) {
            return;
        }

        nav.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    nav.classList.toggle("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );
            }
        );

    }


    /* =====================================================
       SIMULATED TELEMETRY
    ====================================================== */

    const cpuValue =
        document.getElementById("cpu-value");

    const ramValue =
        document.getElementById("ram-value");

    const cpuBar =
        document.getElementById("cpu-bar");

    const ramBar =
        document.getElementById("ram-bar");

    const cpuState =
        document.getElementById("cpu-state");

    const ramState =
        document.getElementById("ram-state");


    function randomBetween(min, max) {

        return Math.floor(
            Math.random() *
            (max - min + 1)
        ) + min;
    }


    function updateTelemetry() {

        const cpu =
            randomBetween(8, 36);

        const ram =
            randomBetween(48, 74);


        if (cpuValue) {
            cpuValue.textContent =
                `${cpu}%`;
        }

        if (ramValue) {
            ramValue.textContent =
                `${ram}%`;
        }

        if (cpuBar) {
            cpuBar.style.width =
                `${cpu}%`;
        }

        if (ramBar) {
            ramBar.style.width =
                `${ram}%`;
        }


        if (cpuState) {

            cpuState.textContent =
                cpu > 30
                    ? "ELEVATED"
                    : "NORMAL";
        }


        if (ramState) {

            ramState.textContent =
                ram > 70
                    ? "HIGH"
                    : "STABLE";
        }

    }


    updateTelemetry();

    setInterval(
        updateTelemetry,
        2200
    );


    /* =====================================================
       SYSTEM LOG
    ====================================================== */

    const logs = [
        "[MONITOR] Telemetry cycle completed.",
        "[SECURITY] No critical anomalies detected.",
        "[NETWORK] Secure channel remains active.",
        "[ENGINE] Cyber-mechatronic subsystem synchronized.",
        "[SYSTEM] Monitoring modules operational.",
        "[ACCESS] Public profile interface ready."
    ];

    let logIndex = 0;


    function appendSystemLog() {

        if (!systemLog) {
            return;
        }

        const p =
            document.createElement("p");

        const label =
            document.createElement("span");

        label.textContent =
            logs[logIndex].split("]")[0] + "]";

        const message =
            logs[logIndex]
                .substring(
                    logs[logIndex].indexOf("]") + 1
                )
                .trim();

        p.appendChild(label);

        p.appendChild(
            document.createTextNode(
                ` ${message}`
            )
        );

        systemLog.appendChild(p);

        while (
            systemLog.children.length > 8
        ) {
            systemLog.removeChild(
                systemLog.firstElementChild
            );
        }

        logIndex =
            (logIndex + 1) % logs.length;
    }


    setInterval(
        appendSystemLog,
        4500
    );


    /* =====================================================
       COMMAND PALETTE
    ====================================================== */

    function openPalette() {

        if (!commandPalette) {
            return;
        }

        commandPalette.classList.add("open");

        commandPalette.setAttribute(
            "aria-hidden",
            "false"
        );

        if (paletteInput) {

            paletteInput.value = "";

            setTimeout(
                () => paletteInput.focus(),
                50
            );
        }
    }


    function closePalette() {

        if (!commandPalette) {
            return;
        }

        commandPalette.classList.remove("open");

        commandPalette.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                openPalette();

            }


            if (event.key === "Escape") {
                closePalette();
            }

        }
    );


    if (paletteClose) {

        paletteClose.addEventListener(
            "click",
            closePalette
        );

    }


    const paletteBackdrop =
        document.querySelector(".palette-backdrop");

    if (paletteBackdrop) {

        paletteBackdrop.addEventListener(
            "click",
            closePalette
        );

    }


    document
        .querySelectorAll(
            "[data-command-section]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showSection(
                        button.dataset.commandSection
                    );

                    closePalette();
                }
            );

        });


    /* =====================================================
       PALETTE SEARCH
    ====================================================== */

    if (paletteInput) {

        paletteInput.addEventListener(
            "input",
            () => {

                const query =
                    paletteInput.value
                        .trim()
                        .toLowerCase();

                document
                    .querySelectorAll(
                        "#palette-results button"
                    )
                    .forEach(button => {

                        const text =
                            button.textContent
                                .toLowerCase();

                        button.hidden =
                            query.length > 0 &&
                            !text.includes(query);
                    });

            }
        );

    }


    /* =====================================================
       TERMINAL
    ====================================================== */

    const terminalCommands = {

        help() {

            return [
                "Available commands:",
                "",
                "help      → Show available commands",
                "about     → About the engineer",
                "skills    → Display technical domains",
                "projects  → Open project center",
                "status    → Display system status",
                "contact   → Contact information",
                "clear     → Clear terminal"
            ];

        },


        about() {

            return [
                "IDENTITY: AMEER AL-DIN AL-SABRI",
                "ROLE: CYBER ENGINEER",
                "FOCUS: CYBERSECURITY / MECHATRONICS / IT",
                "MODE: ENGINEERING & RESEARCH"
            ];

        },


        skills() {

            return [
                "CYBERSECURITY",
                "NETWORK SECURITY",
                "IT SYSTEMS",
                "MECHATRONICS",
                "ROBOTICS",
                "INDUSTRIAL SECURITY",
                "SYSTEM ENGINEERING"
            ];

        },


        projects() {

            showSection("projects");

            return [
                "Opening PROJECT COMMAND CENTER..."
            ];

        },


        status() {

            return [
                "SYSTEM        : ONLINE",
                "NETWORK       : SECURE",
                "SECURITY      : ACTIVE",
                "THREAT LEVEL  : LOW",
                "ENVIRONMENT   : SIMULATED",
                "CORE          : AMEER.SYS v2.0"
            ];

        },


        contact() {

            return [
                "CONTACT MODULE",
                "",
                "Use the public contact channels",
                "configured for the portfolio."
            ];

        },


        clear() {

            if (terminalOutput) {
                terminalOutput.innerHTML = "";
            }

            return [];

        }

    };


    function writeTerminalLine(
        text,
        type = "normal"
    ) {

        if (!terminalOutput) {
            return;
        }

        const p =
            document.createElement("p");

        if (type === "command") {

            const strong =
                document.createElement("strong");

            strong.textContent = text;

            p.appendChild(strong);

        } else {

            p.textContent = text;

        }

        terminalOutput.appendChild(p);

        terminalOutput.scrollTop =
            terminalOutput.scrollHeight;
    }


    function executeCommand(command) {

        const normalized =
            command
                .trim()
                .toLowerCase();

        if (!normalized) {
            return;
        }

        writeTerminalLine(
            `> ${command}`,
            "command"
        );


        const action =
            terminalCommands[normalized];


        if (!action) {

            writeTerminalLine(
                `Command not found: ${command}`
            );

            writeTerminalLine(
                "Type 'help' to list available commands."
            );

            return;
        }


        const result =
            action();


        if (Array.isArray(result)) {

            result.forEach(line => {

                writeTerminalLine(line);

            });

        }

    }


    if (terminalForm) {

        terminalForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                if (!terminalInput) {
                    return;
                }

                const command =
                    terminalInput.value;

                terminalInput.value = "";

                executeCommand(command);
            }
        );

    }


    /* =====================================================
       TERMINAL QUICK COMMANDS
    ====================================================== */

    document
        .querySelectorAll(".terminal-hints span")
        .forEach(hint => {

            hint.addEventListener(
                "click",
                () => {

                    if (!terminalInput) {
                        return;
                    }

                    terminalInput.value =
                        hint.textContent;

                    terminalInput.focus();

                }
            );

        });


    /* =====================================================
       INITIAL FOCUS
    ====================================================== */

    window.addEventListener(
        "load",
        () => {

            const initial =
                getInitialSection();

            if (initial === "terminal") {

                setTimeout(
                    () => {

                        if (terminalInput) {
                            terminalInput.focus();
                        }

                    },
                    300
                );

            }

        }
    );


})();
