// Animaciones especiales para fechas festivas

// Efecto de nieve para Navidad
function startSnowAnimation() {
    const snowContainer = document.getElementById('snow-effect');
    snowContainer.innerHTML = '';
    
    // Crear copos de nieve
    for (let i = 0; i < 50; i++) {
        createSnowflake(snowContainer);
    }
    
    // Agregar mensaje especial
    const message = document.createElement('div');
    message.style.position = 'absolute';
    message.style.top = '20%';
    message.style.left = '50%';
    message.style.transform = 'translateX(-50%)';
    message.style.color = '#fff';
    message.style.fontSize = '1.5rem';
    message.style.fontWeight = 'bold';
    message.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
    message.style.zIndex = '1000';
    message.style.textAlign = 'center';
    message.style.backgroundColor = 'rgba(230, 57, 70, 0.8)';
    message.style.padding = '10px 20px';
    message.style.borderRadius = '10px';
    message.innerHTML = '¡Feliz Navidad! ❄️❤️';
    
    snowContainer.appendChild(message);
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transition = 'opacity 1s';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 1000);
    }, 5000);
}

function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '❄️';
    snowflake.style.position = 'absolute';
    snowflake.style.fontSize = Math.random() * 20 + 10 + 'px';
    snowflake.style.opacity = Math.random() * 0.5 + 0.5;
    snowflake.style.top = '-50px';
    snowflake.style.left = Math.random() * 100 + '%';
    
    // Animación
    const animationDuration = Math.random() * 5 + 5;
    const horizontalMovement = Math.random() * 100 - 50;
    
    snowflake.style.animation = `
        fall ${animationDuration}s linear infinite,
        sway ${animationDuration * 2}s ease-in-out infinite
    `;
    
    // Definir keyframes dinámicamente
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fall {
            to {
                transform: translateY(calc(100vh + 50px)) translateX(${horizontalMovement}px);
            }
        }
        @keyframes sway {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(${horizontalMovement/2}px); }
        }
    `;
    
    document.head.appendChild(styleSheet);
    container.appendChild(snowflake);
    
    // Eliminar copo después de que termine su animación
    setTimeout(() => {
        if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
        }
        if (styleSheet.parentNode) {
            styleSheet.parentNode.removeChild(styleSheet);
        }
    }, animationDuration * 1000);
}

// Efecto de fuegos artificiales para Año Nuevo
function startFireworksAnimation() {
    const fireworksContainer = document.getElementById('fireworks-effect');
    fireworksContainer.innerHTML = '';
    
    // Crear múltiples fuegos artificiales
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createFirework(fireworksContainer);
        }, i * 500);
    }
    
    // Agregar mensaje especial
    const message = document.createElement('div');
    message.style.position = 'absolute';
    message.style.top = '20%';
    message.style.left = '50%';
    message.style.transform = 'translateX(-50%)';
    message.style.color = '#FFD700';
    message.style.fontSize = '1.8rem';
    message.style.fontWeight = 'bold';
    message.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)';
    message.style.zIndex = '1000';
    message.style.textAlign = 'center';
    message.style.backgroundColor = 'rgba(29, 53, 87, 0.9)';
    message.style.padding = '15px 30px';
    message.style.borderRadius = '15px';
    message.innerHTML = '¡Feliz Año Nuevo! 🎆🎇';
    
    fireworksContainer.appendChild(message);
    
    // Continuar con más fuegos artificiales
    setInterval(() => {
        if (Math.random() > 0.7) {
            createFirework(fireworksContainer);
        }
    }, 1000);
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transition = 'opacity 1s';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 1000);
    }, 5000);
}

function createFirework(container) {
    const firework = document.createElement('div');
    firework.style.position = 'absolute';
    firework.style.width = '4px';
    firework.style.height = '4px';
    firework.style.borderRadius = '50%';
    firework.style.backgroundColor = getRandomColor();
    firework.style.left = Math.random() * 100 + '%';
    firework.style.top = Math.random() * 50 + 20 + '%';
    
    container.appendChild(firework);
    
    // Explosión
    const particles = 30;
    const explosionDuration = 1000;
    
    for (let i = 0; i < particles; i++) {
        setTimeout(() => {
            createParticle(container, firework.offsetLeft, firework.offsetTop);
        }, 50);
    }
    
    // Eliminar fuego artificial principal
    setTimeout(() => {
        if (firework.parentNode) {
            firework.parentNode.removeChild(firework);
        }
    }, explosionDuration);
}

function createParticle(container, x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '3px';
    particle.style.height = '3px';
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = getRandomColor();
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    container.appendChild(particle);
    
    // Animación de partícula
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 3 + 2;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    const duration = 1000;
    
    let startTime = null;
    
    function animateParticle(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = elapsed / duration;
        
        if (progress < 1) {
            particle.style.left = (x + vx * elapsed * 0.1) + 'px';
            particle.style.top = (y + vy * elapsed * 0.1) + 'px';
            particle.style.opacity = 1 - progress;
            requestAnimationFrame(animateParticle);
        } else {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }
    }
    
    requestAnimationFrame(animateParticle);
}

function getRandomColor() {
    const colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', 
                    '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE',
                    '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Efecto de corazones para días especiales
function startHeartsAnimation() {
    const heartsContainer = document.getElementById('hearts-effect');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createHeart(heartsContainer);
        }, i * 200);
    }
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = Math.random() * 30 + 20 + 'px';
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    heart.style.bottom = '-50px';
    heart.style.left = Math.random() * 100 + '%';
    
    container.appendChild(heart);
    
    // Animación
    const animationDuration = Math.random() * 4 + 3;
    const horizontalMovement = Math.random() * 100 - 50;
    
    heart.style.animation = `
        rise ${animationDuration}s ease-in forwards,
        heartSway ${animationDuration * 1.5}s ease-in-out infinite
    `;
    
    // Definir keyframes dinámicamente
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes rise {
            to {
                transform: translateY(calc(-100vh - 100px)) translateX(${horizontalMovement}px);
                opacity: 0;
            }
        }
        @keyframes heartSway {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(${horizontalMovement/3}px); }
        }
    `;
    
    document.head.appendChild(styleSheet);
    
    // Eliminar corazón después de que termine su animación
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
        if (styleSheet.parentNode) {
            styleSheet.parentNode.removeChild(styleSheet);
        }
    }, animationDuration * 1000);
}

// Inicializar animaciones en fechas especiales
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const monthDayKey = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    if (monthDayKey === '12-24' || monthDayKey === '12-25') {
        // Iniciar nieve para Navidad
        setTimeout(startSnowAnimation, 1500);
    } else if (monthDayKey === '12-31' || monthDayKey === '01-01') {
        // Iniciar fuegos artificiales para Año Nuevo
        setTimeout(startFireworksAnimation, 1500);
    } else if (Math.random() > 0.7) {
        // Ocasionalmente mostrar corazones en días normales
        setTimeout(startHeartsAnimation, 3000);
    }
});