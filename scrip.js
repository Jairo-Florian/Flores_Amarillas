document.addEventListener('DOMContentLoaded', () => {
  
  // Elementos DOM
  const cardWrapper = document.getElementById('cardWrapper');
  const bouquetContainer = document.getElementById('bouquetContainer');
  const modalOverlay = document.getElementById('modalOverlay');
  const btnDedicatoria = document.getElementById('btnDedicatoria');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnAcceptModal = document.getElementById('btnAcceptModal');
  const btnEfecto = document.getElementById('btnEfecto');
  const particlesContainer = document.getElementById('particles');

  // 1. Generar Partículas Doradas Flotantes
  function createParticles() {
    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.random() * 6 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 8 + 4}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particlesContainer.appendChild(particle);
    }
  }
  createParticles();

  // 2. Efecto de Inclinación 3D (Tilt Effect) al mover el cursor
  document.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    
    cardWrapper.style.transform = `rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`;
  });

  // Restaurar posición cuando el ratón sale de la pantalla
  document.addEventListener('mouseleave', () => {
    cardWrapper.style.transform = `rotateY(0deg) rotateX(0deg)`;
  });

  // 3. Abrir y Cerrar Modal de Dedicatoria
  btnDedicatoria.addEventListener('click', () => {
    modalOverlay.classList.add('active');
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
  };

  btnCloseModal.addEventListener('click', closeModal);
  btnAcceptModal.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // 4. Lanzar Confeti de Flores y Colores Dorados
  function triggerConfetti() {
    if (typeof confetti === 'function') {
      // Ráfaga 1: Dorado y Amarillo
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffd700', '#ffa500', '#ffffff', '#fff3a0']
      });

      // Ráfaga 2: Lado Izquierdo
      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#ffd700', '#4caf50', '#ffffff']
        });
      }, 150);

      // Ráfaga 3: Lado Derecho
      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#ffd700', '#ffb733', '#ffffff']
        });
      }, 300);
    }
  }

  btnEfecto.addEventListener('click', triggerConfetti);
  bouquetContainer.addEventListener('click', triggerConfetti);

});

// Lógica de Música Automática + Controles
const bgMusic = document.getElementById('bgMusic');
const btnMusic = document.getElementById('btnMusic');
const musicText = document.getElementById('musicText');
const musicIcon = btnMusic.querySelector('i');

// Función para poner el botón en estado "Reproduciendo"
function setPlayingState() {
  btnMusic.classList.add('playing');
  musicIcon.className = 'fa-solid fa-pause';
  musicText.textContent = 'Pausar';
}

// Función para poner el botón en estado "Pausado"
function setPausedState() {
  btnMusic.classList.remove('playing');
  musicIcon.className = 'fa-solid fa-music';
  musicText.textContent = 'Música';
}

// Intentar reproducir automáticamente al cargar
function playAudio() {
  bgMusic.play().then(() => {
    setPlayingState();
  }).catch((error) => {
    console.log("Autoplay bloqueado por el navegador. Se iniciará en la primera interacción.");
    
    // Si el navegador lo bloqueó, reproducir en la primera interacción (clic o toque)
    const startAudioOnInteraction = () => {
      bgMusic.play().then(() => {
        setPlayingState();
      });
      // Remover los escuchadores de evento una vez activado
      document.removeEventListener('click', startAudioOnInteraction);
      document.removeEventListener('touchstart', startAudioOnInteraction);
    };

    document.addEventListener('click', startAudioOnInteraction);
    document.addEventListener('touchstart', startAudioOnInteraction);
  });
}

// Ejecutar el intento de reproducción al iniciar
playAudio();

// Evento del botón manual (Reproducir / Pausar)
btnMusic.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita interferencias con el listener global
  if (bgMusic.paused) {
    bgMusic.play();
    setPlayingState();
  } else {
    bgMusic.pause();
    setPausedState();
  }
});