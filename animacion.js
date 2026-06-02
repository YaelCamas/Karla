/* ==========================================================================
   INTERACCIONES Y ANIMACIONES PARA EL CUMPLEAÑOS DE KARLA IVETTE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ELEMENTOS DEL DOM
    const introOverlay = document.getElementById('intro-overlay');
    const btnComenzar = document.getElementById('btn-comenzar');
    const bgAudio = document.getElementById('bg-audio');
    const btnPlayPause = document.getElementById('btn-play-pause');
    const musicIcon = document.getElementById('music-icon');
    const btnAbrazo = document.getElementById('btn-abrazo');
    const hugMessage = document.getElementById('hug-message');
    const particlesContainer = document.getElementById('particles-container');

    // Ajustar volumen inicial de la música de fondo
    bgAudio.volume = 0.4;

    /* ==========================================================================
       1. PANTALLA DE BIENVENIDA & REPRODUCTOR DE AUDIO
       ========================================================================== */
    btnComenzar.addEventListener('click', () => {
        // Desvanecer la pantalla de introducción
        introOverlay.classList.add('hidden');
        
        // Intentar reproducir el audio automáticamente al dar clic
        playMusic();
        
        // Iniciar la lluvia constante de zorritos y detalles
        startParticleRain();
    });

    // Control manual de Play / Pause para la música
    btnPlayPause.addEventListener('click', () => {
        if (bgAudio.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    });

    function playMusic() {
        bgAudio.play().then(() => {
            musicIcon.className = 'fa-solid fa-compact-disc fa-spin'; // Ícono girando
            btnPlayPause.style.background = '#2ec4b6'; // Cambia a verde brillante
        }).catch(error => {
            console.log("El navegador bloqueó la reproducción automática inicial:", error);
        });
    }

    function pauseMusic() {
        bgAudio.pause();
        musicIcon.className = 'fa-solid fa-music'; // Ícono estático
        btnPlayPause.style.background = '#1b4d3e'; // Regresa al verde original
    }

    /* ==========================================================================
       2. DINÁMICA DEL ABRAZO VIRTUAL (DÍA COMPLICADO)
       ========================================================================== */
    btnAbrazo.addEventListener('click', () => {
        // Muestra el hermoso mensaje oculto
        hugMessage.classList.remove('hidden');
        
        // Lanza una ráfaga masiva e instantánea de corazones y dulces por la pantalla
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createSingleParticle(true); // true fuerza a que salgan más corazones/dulces
            }, i * 50);
        }

        // Efecto de deshabilitar el botón suavemente tras el clic
        btnAbrazo.innerHTML = '¡Abrazo Enviado con Éxito! 🥰🍫';
        btnAbrazo.style.background = '#2ec4b6';
        btnAbrazo.style.transform = 'scale(0.95)';
        btnAbrazo.style.pointerEvents = 'none';
    });

    /* ==========================================================================
       3. SISTEMA DE PARTÍCULAS FLOTANTES (Zorritos 🦊 y Detalles)
       ========================================================================== */
    const particlePool = ['🦊', '💚', '✨', '🌸', '🦊', '🍀'];

    function createSingleParticle(isHugBurst = false) {
        if (!particlesContainer) return;

        const particle = document.createElement('span');
        particle.classList.add('particle');
        
        // Si viene del botón de abrazos, prioriza corazones y dulces, si no, usa todo el pool (zorritos)
        if (isHugBurst) {
            const hugPool = ['💚', '🥰', '🍫', '✨', '🍪'];
            particle.innerText = hugPool[Math.floor(Math.random() * hugPool.length)];
        } else {
            particle.innerText = particlePool[Math.floor(Math.random() * particlePool.length)];
        }

        // Configuración de posición y tamaño aleatorio
        const randomLeft = Math.random() * 100; // Posición horizontal (0% a 100%)
        const randomScale = Math.random() * (1.5 - 0.8) + 0.8; // Tamaños variados
        const randomDuration = Math.random() * (8 - 4) + 4; // Velocidades variadas (4s a 8s)

        particle.style.left = `${randomLeft}vw`;
        particle.style.fontSize = `${randomScale}rem`;
        particle.style.animationDuration = `${randomDuration}s`;

        // Añadir al contenedor de fondo
        particlesContainer.appendChild(particle);

        // Destruir la partícula automáticamente cuando termine su animación para no saturar el DOM
        setTimeout(() => {
            particle.remove();
        }, randomDuration * 1000);
    }

    // Generador cíclico de partículas de fondo
    function startParticleRain() {
        // Crea una partícula base cada 600 milisegundos de forma indefinida
        setInterval(() => {
            createSingleParticle(false);
        }, 600);
    }

    /* ==========================================================================
       4. EFECTO SCROLL REVEAL (Aparición elegante al deslizar)
       ========================================================================== */
    const animatedElements = document.querySelectorAll('.transition-up');

    const checkScrollReveal = () => {
        const triggerBottom = (window.innerHeight / 5) * 4.5; // Punto de activación en pantalla

        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('appear'); // Activa la animación CSS
            }
        });
    };

    // Escuchar el evento de scroll en el celular o pc
    window.addEventListener('scroll', checkScrollReveal);
    
    // Ejecutar una vez al inicio por si hay elementos ya visibles en la parte superior
    setTimeout(checkScrollReveal, 500);
});