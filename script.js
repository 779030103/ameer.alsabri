/**
 * CORE SYSTEM ENGINE - AMEER AL-SABRI
 * FULL INTEGRATED SYSTEM v15.0
 */

(function() {
    // 1. استدعاء مكتبة الأيقونات (Font Awesome) تلقائياً
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(fontAwesome);

    document.addEventListener('DOMContentLoaded', () => {
        
        // --- 2. نظام التبويبات والتنقل (OS Navigation) ---
        const navItems = document.querySelectorAll('.os-nav-item');
        const sections = document.querySelectorAll('.tab-content');

        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                if(!target) return;

                navItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');

                sections.forEach(sec => {
                    sec.style.display = 'none';
                    sec.classList.remove('active');
                    if(sec.id === target) {
                        sec.style.display = 'block';
                        sec.classList.add('active');
                    }
                });
            });
        });

        // --- 3. بناء الواجهة الرئيسية (Home Section) ---
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            homeSection.innerHTML = `
                <div class="hero-container" style="display: flex; align-items: center; justify-content: space-between; gap: 50px; padding: 40px 0;">
                    <div class="hero-content" style="flex: 1.2; text-align: right;">
                        <div class="badge-tech" style="display: inline-block; padding: 5px 15px; background: rgba(0, 212, 255, 0.1); border: 1px solid var(--clr-primary); color: #00d4ff; font-size: 12px; letter-spacing: 2px; margin-bottom: 20px;">SYSTEM ARCHITECT // AVAILABLE</div>
                        <h1 style="font-size: clamp(2.5rem, 5vw, 4rem); color: #fff; margin-bottom: 15px;">أمير الدين الصبري</h1>
                        <div class="spec-tags" style="display: flex; gap: 15px; margin-bottom: 25px; color: #00d4ff; font-size: 0.9rem;">
                            <span><i class="fas fa-microchip"></i> Mechatronics</span>
                            <span><i class="fas fa-shield-alt"></i> Cybersecurity</span>
                            <span><i class="fas fa-server"></i> IT Expert</span>
                        </div>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #b0b0b0; max-width: 600px; margin-bottom: 35px;">
                            دمج متطور بين الهندسة الميكانيكية والذكاء الرقمي. متخصص في بناء وحماية الأنظمة السيبرانية المادية المتقدمة وفق معايير NIST العالمية.
                        </p>
                        <button class="prime-btn" onclick="document.querySelector('[data-target=projects]').click()" style="background: transparent; border: 1px solid #00d4ff; color: #fff; padding: 12px 35px; cursor: pointer; transition: 0.3s;">
                            استعراض المشاريع
                        </button>
                    </div>

                    <div class="hero-visual" style="flex: 0.8; position: relative; display: flex; justify-content: center;">
                        <div class="main-profile-frame" style="position: relative; width: 280px; height: 330px; background: #050a10; border: 1px solid rgba(0, 212, 255, 0.3); padding: 10px;">
                            <img src="profile.jpg" alt="Ameer Al-Sabri" style="width: 100%; height: 100%; object-fit: cover;" 
                                 onerror="this.src='https://cdn-icons-png.flaticon.com/512/6840/6840478.png'">
                        </div>
                    </div>
                </div>
            `;
        }

        // --- 4. بناء غرفة العمليات (Operations Center) ---
        const opsSection = document.querySelector('#ops-center');
        if (opsSection) {
            opsSection.innerHTML = `
                <div class="dashboard-wrapper">
                    <h2 style="margin-bottom: 20px; border-right: 4px solid var(--clr-primary); padding-right: 15px;">OPERATIONS CONTROL CENTER</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 20px;">
                        <div class="cyber-card">
                            <h4><i class="fas fa-microchip"></i> CPU LOAD</h4>
                            <p id="cpu-val" style="font-family: monospace; font-size: 24px; color: var(--clr-primary); margin-top: 10px;">14%</p>
                        </div>
                        <div class="cyber-card">
                            <h4><i class="fas fa-memory"></i> RAM USAGE</h4>
                            <p id="ram-val" style="font-family: monospace; font-size: 24px; color: var(--clr-secondary); margin-top: 10px;">62%</p>
                        </div>
                    </div>
                </div>
            `;
            // محاكاة تغير المؤشرات
            setInterval(() => {
                const cpu = document.getElementById('cpu-val');
                const ram = document.getElementById('ram-val');
                if(cpu) cpu.innerText = (Math.floor(Math.random() * 15) + 10) + "%";
                if(ram) ram.innerText = (Math.floor(Math.random() * 5) + 60) + "%";
            }, 2000);
        }

        // --- 5. بناء المشاريع (Projects) ---
        const projSection = document.querySelector('#projects');
        if (projSection) {
            projSection.innerHTML = `
                <h2 style="margin-bottom: 30px; border-right: 4px solid var(--clr-primary); padding-right: 15px;">PROJECT LOGS // سجل العمليات الاستراتيجية</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                    <div class="cyber-card">
                        <span style="font-size: 10px; color: #555; font-family: monospace;">ID: PROJ-001</span>
                        <h3 style="margin: 10px 0;">نظام حماية خطوط الإنتاج (ICS Shield)</h3>
                        <p style="color: #b0b0b0; font-size: 0.9rem;">تطوير بروتوكول أمني مخصص لأنظمة التحكم الصناعي لمنع هجمات التلاعب بالبيانات.</p>
                    </div>
                    <div class="cyber-card">
                        <span style="font-size: 10px; color: #555; font-family: monospace;">ID: PROJ-002</span>
                        <h3 style="margin: 10px 0;">الروبوت الأمني الذكي (Cyber-Mech)</h3>
                        <p style="color: #b0b0b0; font-size: 0.9rem;">تصميم ميكانيكي وبرمجي لروبوت متحرك يستخدم الذكاء الاصطناعي لمسح الشبكات.</p>
                    </div>
                </div>
            `;
        }

        // --- 6. بناء المختبر (Lab) ---
        const labSection = document.querySelector('#lab');
        if (labSection) {
            labSection.innerHTML = `
                <h2 style="margin-bottom: 30px; border-right: 4px solid var(--clr-primary); padding-right: 15px;">THE ARCHIVE // الأرشيف التقني والمختبر</h2>
                <div class="cyber-card">
                    <h4 style="color:var(--clr-primary);"><i class="fas fa-flask"></i> أبحاث جارية: تأمين الأذرع الروبوتية الجراحية</h4>
                    <p style="color: #b0b0b0; margin-top: 10px;">دراسة متعمقة في تقليل زمن التأخير (Latency) عند تشفير أوامر الحركة في الروبوتات الحساسة.</p>
                </div>
            `;
        }

        // --- 7. تحديث الساعة الحية ---
        setInterval(() => {
            const time = new Date().toLocaleTimeString('en-GB');
            const clock = document.getElementById('live-clock');
            if(clock) clock.innerText = time;
        }, 1000);
    });
})();
