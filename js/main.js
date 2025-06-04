document.addEventListener('DOMContentLoaded', () => {
    // Inizializzazione delle particelle
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });

    // Riduci la distanza di repulse su mobile
    if (window.innerWidth <= 900) {
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            window.pJSDom[0].pJS.interactivity.modes.repulse.distance = 60;
        }
    }

    // Animazioni allo scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(element => {
        observer.observe(element);
    });

    // === Impostazioni: popup e controllo velocità particelle ===
    const settingsBtn = document.getElementById('settings-btn');
    const settingsPopup = document.getElementById('settings-popup');
    const speedInput = document.getElementById('particle-speed');
    const speedValue = document.getElementById('speed-value');
    const resetBtn = document.getElementById('reset-btn');

    // Mostra/nascondi popup impostazioni
    if (settingsBtn && settingsPopup) {
        settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsPopup.classList.toggle('active');
        });
        // Chiudi popup cliccando fuori
        document.addEventListener('click', (e) => {
            if (!settingsPopup.contains(e.target) && e.target !== settingsBtn) {
                settingsPopup.classList.remove('active');
            }
        });
    }

    // Aggiorna valore visualizzato
    if (speedInput && speedValue) {
        speedInput.addEventListener('input', () => {
            speedValue.textContent = speedInput.value;
            // Aggiorna velocità particelle in tempo reale
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                window.pJSDom[0].pJS.particles.move.speed = Number(speedInput.value);
            }
        });
    }

    // Reset particelle: velocità e numero al default
    if (resetBtn && speedInput && speedValue) {
        resetBtn.addEventListener('click', () => {
            speedInput.value = 6;
            speedValue.textContent = 6;
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                const pJS = window.pJSDom[0].pJS;
                pJS.particles.move.speed = 6;
                pJS.particles.number.value = 80;
                if (typeof pJS.fn.particlesRefresh === 'function') {
                    pJS.fn.particlesRefresh();
                }
            }
        });
    }

    // Imposta valore iniziale
    if (speedInput && speedValue) {
        speedValue.textContent = speedInput.value;
    }

    // Gestione cambio colore pagina (temi) + custom color sempre visibile
    const colorRadios = document.querySelectorAll('input[name="page-color"]');
    const customPageInput = document.getElementById('page-custom-color');
    const customPageLabel = document.querySelector('.color-section .custom-color-label');
    colorRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            document.body.classList.remove(
                'theme-default',
                'theme-dark',
                'theme-solarized',
                'theme-green',
                'theme-pink'
            );
            document.body.style.background = "";
            document.body.style.color = "";
            if (customPageInput) customPageInput.classList.remove('active');
            if (customPageLabel) customPageLabel.classList.remove('active');
            switch (radio.value) {
                case 'dark':
                    document.body.classList.add('theme-dark');
                    break;
                case 'solarized':
                    document.body.classList.add('theme-solarized');
                    break;
                case 'green':
                    document.body.classList.add('theme-green');
                    break;
                case 'pink':
                    document.body.classList.add('theme-pink');
                    break;
                default:
                    document.body.classList.add('theme-default');
            }
        });
    });

    // Cambia colore pagina custom in tempo reale e deseleziona radio
    if (customPageInput) {
        function activateCustomPageColor() {
            document.body.classList.remove(
                'theme-default',
                'theme-dark',
                'theme-solarized',
                'theme-green',
                'theme-pink'
            );
            document.body.style.background = customPageInput.value;
            document.body.style.color = "#fff";
            colorRadios.forEach(radio => radio.checked = false);
            customPageInput.classList.add('active');
            if (customPageLabel) customPageLabel.classList.add('active');
        }
        customPageInput.addEventListener('input', activateCustomPageColor);
        customPageInput.addEventListener('click', activateCustomPageColor);

        // Attiva custom anche cliccando sulla label "Personalizzato"
        if (customPageLabel) {
            customPageLabel.addEventListener('click', () => {
                customPageInput.focus();
                activateCustomPageColor();
            });
        }
    }
    // Imposta il tema iniziale
    document.body.classList.add('theme-default');

    // Gestione cambio colore particelle + custom color sempre visibile
    const particlesColorRadios = document.querySelectorAll('input[name="particles-color"]');
    const customColorInput = document.getElementById('particles-custom-color');
    const customParticlesLabel = document.querySelector('.particles-section .custom-color-label');

    function setParticlesColor(color) {
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            const pJS = window.pJSDom[0].pJS;
            pJS.particles.color.value = color;
            pJS.particles.line_linked.color = color;
            if (typeof pJS.fn.particlesRefresh === 'function') {
                pJS.fn.particlesRefresh();
            }
        }
    }

    particlesColorRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            setParticlesColor(radio.value);
            if (customColorInput) customColorInput.classList.remove('active');
            if (customParticlesLabel) customParticlesLabel.classList.remove('active');
        });
    });

    if (customColorInput) {
        function activateCustomParticlesColor() {
            setParticlesColor(customColorInput.value);
            particlesColorRadios.forEach(radio => radio.checked = false);
            customColorInput.classList.add('active');
            if (customParticlesLabel) customParticlesLabel.classList.add('active');
        }
        customColorInput.addEventListener('input', activateCustomParticlesColor);
        customColorInput.addEventListener('click', activateCustomParticlesColor);

        // Attiva custom anche cliccando sulla label "Personalizzato"
        if (customParticlesLabel) {
            customParticlesLabel.addEventListener('click', () => {
                customColorInput.focus();
                activateCustomParticlesColor();
            });
        }
    }

    // Impedisci che cliccando la label della sezione attivi l'input color
    document.querySelectorAll('.color-label').forEach(label => {
        label.addEventListener('mousedown', e => e.preventDefault());
        label.addEventListener('click', e => e.preventDefault());
    });

    // Cookie helpers
    function setCookie(name, value, days = 365) {
        const d = new Date();
        d.setTime(d.getTime() + (days*24*60*60*1000));
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
    }
    function getCookie(name) {
        const v = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return v ? decodeURIComponent(v.pop()) : null;
    }

    // Cookie consent check
    let cookiesAccepted = getCookie('cookies_accepted') === 'yes';

    // Salva scelta tema pagina
    function savePageColorCookie() {
        if (!cookiesAccepted) return;
        // Salva radio selezionato o custom
        let selected = Array.from(colorRadios).find(r => r.checked);
        if (selected) {
            setCookie('page_color_radio', selected.value);
            setCookie('page_custom_color', customPageInput.value);
        } else {
            setCookie('page_color_radio', 'custom');
            setCookie('page_custom_color', customPageInput.value);
        }
    }
    // Salva scelta colore particelle
    function saveParticlesColorCookie() {
        if (!cookiesAccepted) return;
        let selected = Array.from(particlesColorRadios).find(r => r.checked);
        if (selected) {
            setCookie('particles_color_radio', selected.value);
            setCookie('particles_custom_color', customColorInput.value);
        } else {
            setCookie('particles_color_radio', 'custom');
            setCookie('particles_custom_color', customColorInput.value);
        }
    }

    // Aggiorna cookie su cambio colore pagina
    colorRadios.forEach(radio => {
        radio.addEventListener('change', savePageColorCookie);
    });
    if (customPageInput) {
        customPageInput.addEventListener('input', savePageColorCookie);
        customPageInput.addEventListener('click', savePageColorCookie);
    }

    // Aggiorna cookie su cambio colore particelle
    particlesColorRadios.forEach(radio => {
        radio.addEventListener('change', saveParticlesColorCookie);
    });
    if (customColorInput) {
        customColorInput.addEventListener('input', saveParticlesColorCookie);
        customColorInput.addEventListener('click', saveParticlesColorCookie);
    }

    // Cookie banner semplice (solo se non già accettato)
    if (!cookiesAccepted) {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div style="padding:14px 18px;display:flex;align-items:center;gap:18px;justify-content:space-between;">
                <span style="font-size:1em;">This site uses cookies to save your color preferences.</span>
                <button id="accept-cookies" style="background:#2563eb;color:#fff;border:none;padding:8px 18px;border-radius:8px;cursor:pointer;font-weight:bold;">Accept</button>
            </div>
        `;
        banner.style.position = 'fixed';
        banner.style.bottom = '18px';
        banner.style.left = '50%';
        banner.style.transform = 'translateX(-50%)';
        banner.style.background = 'rgba(20,30,60,0.97)';
        banner.style.border = '1.5px solid #2563eb';
        banner.style.borderRadius = '12px';
        banner.style.boxShadow = '0 2px 16px rgba(24,60,120,0.18)';
        banner.style.zIndex = '9999';
        document.body.appendChild(banner);

        document.getElementById('accept-cookies').onclick = function() {
            setCookie('cookies_accepted', 'yes', 365);
            cookiesAccepted = true;
            banner.remove();
            // Salva subito i colori correnti
            savePageColorCookie();
            saveParticlesColorCookie();
        };
    }

    // Applica preferenze salvate se i cookie sono accettati
    if (cookiesAccepted) {
        // Pagina
        const savedPageRadio = getCookie('page_color_radio');
        const savedPageCustom = getCookie('page_custom_color');
        if (savedPageRadio) {
            let radio = Array.from(colorRadios).find(r => r.value === savedPageRadio);
            if (radio) {
                radio.checked = true;
                radio.dispatchEvent(new Event('change'));
            } else if (savedPageRadio === 'custom' && customPageInput && savedPageCustom) {
                customPageInput.value = savedPageCustom;
                customPageInput.classList.add('active');
                if (customPageLabel) customPageLabel.classList.add('active');
                customPageInput.dispatchEvent(new Event('input'));
            }
        }
        if (savedPageRadio === 'custom' && customPageInput && savedPageCustom) {
            customPageInput.value = savedPageCustom;
            customPageInput.classList.add('active');
            if (customPageLabel) customPageLabel.classList.add('active');
            customPageInput.dispatchEvent(new Event('input'));
        }
        // Particelle
        const savedParticlesRadio = getCookie('particles_color_radio');
        const savedParticlesCustom = getCookie('particles_custom_color');
        if (savedParticlesRadio) {
            let radio = Array.from(particlesColorRadios).find(r => r.value === savedParticlesRadio);
            if (radio) {
                radio.checked = true;
                radio.dispatchEvent(new Event('change'));
            } else if (savedParticlesRadio === 'custom' && customColorInput && savedParticlesCustom) {
                customColorInput.value = savedParticlesCustom;
                customColorInput.classList.add('active');
                if (customParticlesLabel) customParticlesLabel.classList.add('active');
                customColorInput.dispatchEvent(new Event('input'));
            }
        }
        if (savedParticlesRadio === 'custom' && customColorInput && savedParticlesCustom) {
            customColorInput.value = savedParticlesCustom;
            customColorInput.classList.add('active');
            if (customParticlesLabel) customParticlesLabel.classList.add('active');
            customColorInput.dispatchEvent(new Event('input'));
        }
    }
});
