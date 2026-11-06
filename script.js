// --- 1. Navegación por teclado (Flecha Izquierda / Derecha) ---
document.addEventListener('keydown', (e) => {
    const btnNext = document.getElementById('next-page');
    const btnPrev = document.getElementById('prev-page');

    if (e.key === 'ArrowRight' && btnNext) {
        window.location.href = btnNext.href;
    } else if (e.key === 'ArrowLeft' && btnPrev) {
        window.location.href = btnPrev.href;
    }
});

// --- 2. Fondo Animado Estilo PlayStation 4 (Ondas Fluidas 2D) ---
window.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('bg-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'bg-canvas';
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Configuración de las ondas fluidas estilo PS4 (Dynamic Wave Lines)
    const waves = [
        { yOffset: 0.3, amplitude: 60, frequency: 0.002, speed: 0.015, color: 'rgba(56, 189, 248, 0.25)' },  // Azul PS
        { yOffset: 0.5, amplitude: 90, frequency: 0.0015, speed: 0.01, color: 'rgba(168, 85, 247, 0.2)' },   // Púrpura suave
        { yOffset: 0.7, amplitude: 75, frequency: 0.0025, speed: 0.02, color: 'rgba(14, 165, 233, 0.15)' }   // Cian profundo
    ];

    // Partículas de luz flotantes dispersas (polvo estelar de PS4)
    const particles = [];
    for (let i = 0; i < 35; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            speedY: -Math.random() * 0.4 - 0.1,
            alpha: Math.random() * 0.6 + 0.2
        });
    }

    let time = 0;

    function animate() {
        time += 1;

        // Fondo degradado azul oscuro corporativo/gaming característico de PS4
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#040d1a');
        bgGrad.addColorStop(0.5, '#091833');
        bgGrad.addColorStop(1, '#02060d');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // --- DIBUJAR ONDAS FLUIDAS ---
        waves.forEach(wave => {
            ctx.beginPath();
            ctx.moveTo(0, height * wave.yOffset);

            for (let x = 0; x < width; x += 15) {
                const y = height * wave.yOffset + 
                          Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
                          Math.cos(x * 0.001 - time * 0.005) * (wave.amplitude / 2);
                ctx.lineTo(x, y);
            }

            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();

            ctx.fillStyle = wave.color;
            ctx.fill();
        });

        // --- DIBUJAR PARTÍCULAS FLOTANTES ---
        particles.forEach(p => {
            p.y += p.speedY;
            if (p.y < 0) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#38bdf8';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        requestAnimationFrame(animate);
    }

    animate();
});