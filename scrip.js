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
document.addEventListener('DOMContentLoaded', () => {
  
  // Elementos DOM
  const bouquetImg = document.getElementById('bouquetImg');
  const bouquetCard = document.querySelector('.bouquet-card');
  const modalOverlay = document.getElementById('modalOverlay');
  const btnDedicatoria = document.getElementById('btnDedicatoria');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnAcceptModal = document.getElementById('btnAcceptModal');
  const btnEfecto = document.getElementById('btnEfecto');
  const bouquetContainer = document.getElementById('bouquetContainer');
  const particlesContainer = document.getElementById('particles');

  // Elementos de Audio
  const bgMusic = document.getElementById('bgMusic');
  const btnMusic = document.getElementById('btnMusic');
  const musicText = document.getElementById('musicText');
  const musicIcon = btnMusic ? btnMusic.querySelector('i') : null;

  // 1. Partículas Doradas
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

  // 2. Movimiento 3D Exclusivo para la Foto
  if (bouquetCard && bouquetImg) {
    bouquetCard.addEventListener('mousemove', (e) => {
      const rect = bouquetCard.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);
      
      const xAxis = x / 12;
      const yAxis = -y / 12;
      
      bouquetImg.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.08) translateY(-10px)`;
    });

    bouquetCard.addEventListener('mouseleave', () => {
      bouquetImg.style.transform = `rotateY(0deg) rotateX(0deg) scale(1) translateY(0px)`;
    });
  }

  // 3. Sistema de Reproducción Automática de Música en la Primera Interacción
  let isPlaying = false;

  function updateMusicUI(playing) {
    isPlaying = playing;
    if (!btnMusic) return;
    
    if (playing) {
      btnMusic.classList.add('playing');
      if (musicIcon) musicIcon.className = 'fa-solid fa-pause';
      if (musicText) musicText.textContent = 'Pausar';
    } else {
      btnMusic.classList.remove('playing');
      if (musicIcon) musicIcon.className = 'fa-solid fa-music';
      if (musicText) musicText.textContent = 'Música';
    }
  }

  function startAudio() {
    if (bgMusic && !isPlaying) {
      bgMusic.play().then(() => {
        updateMusicUI(true);
        // Desactivar los escuchadores globales una vez que ya inició el audio
        document.removeEventListener('click', startAudio);
        document.removeEventListener('touchstart', startAudio);
      }).catch(err => {
        console.log("Esperando interacción del usuario para audio...");
      });
    }
  }

  // Intenta reproducir al cargar
  startAudio();

  // Si el navegador lo bloqueó, reproducirá al tocar o hacer clic en cualquier lado
  document.addEventListener('click', startAudio, { once: false });
  document.addEventListener('touchstart', startAudio, { once: false });

  // Botón Manual de Música (Pausar / Reproducir)
  if (btnMusic && bgMusic) {
    btnMusic.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita conflictos con el listener global
      if (bgMusic.paused) {
        bgMusic.play();
        updateMusicUI(true);
      } else {
        bgMusic.pause();
        updateMusicUI(false);
      }
    });
  }

  // 4. Modal de Dedicatoria
  if (btnDedicatoria) {
    btnDedicatoria.addEventListener('click', (e) => {
      e.stopPropagation();
      startAudio(); // Inicia la música si aún no había sonado
      modalOverlay.classList.add('active');
    });
  }

  const closeModal = () => modalOverlay.classList.remove('active');
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if (btnAcceptModal) btnAcceptModal.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // 5. Confeti de Flores
  function triggerConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffd700', '#ffa500', '#ffffff', '#fff3a0']
      });
    }
  }

  if (btnEfecto) {
    btnEfecto.addEventListener('click', (e) => {
      e.stopPropagation();
      startAudio();
      triggerConfetti();
    });
  }
  
  if (bouquetContainer) {
    bouquetContainer.addEventListener('click', (e) => {
      e.stopPropagation();
      startAudio();
      triggerConfetti();
    });
  }

});