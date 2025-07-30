// Esperar a que termine la animación de entrada
setTimeout(() => {
  startFireworks();
  showImagesOneByOne();
  audio.loop = true;
  audio.play().catch((error) => {
    console.error("Error al reproducir el audio:", error);
    audio.currentTime = 0; // Reiniciar el audio
  });
}, 1500); // Inicia los fuegos luego de 3s

function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  resizeCanvas();

  const particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);

  function createParticle(x, y) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 5 + 2;
    return {
      x,
      y,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      life: 100,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    };
  }

  function explode() {
    const x = Math.random() * canvas.width;
    const y = (Math.random() * canvas.height) / 2;
    for (let i = 0; i < 50; i++) {
      particles.push(createParticle(x, y));
    }
  }

  function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.dx;
      p.y += p.dy;
      p.dy += 0.05; // gravedad
      p.life--;
      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
  }

  function loop() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(loop);
  }

  setInterval(explode, 800);
  loop();
}

const imagePaths = Array.from(
  { length: 10 },
  (_, i) => `assets/img/tapia ${i + 1}.jpg`
);
const imageSequenceContainer = document.getElementById("image-sequence");

const animations = ["fadeZoomIn", "slideInLeft", "rotateIn"];

function showImagesOneByOne() {
  let index = 0;

  function showNextImage() {
    if (index >= imagePaths.length) {
      index = 0; // Reiniciar el índice si se han mostrado todas las imágenes
    }

    const img = document.createElement("img");
    img.src = imagePaths[index];
    img.className = "sequence-img";
    const anim = animations[index % animations.length]; // O usa animación aleatoria
    img.style.animation = `${anim} 1s ease forwards`;

    imageSequenceContainer.innerHTML = ""; // Reemplazar la imagen anterior
    imageSequenceContainer.appendChild(img);

    index++;
    setTimeout(showNextImage, 2500); // 2.5 segundos entre imágenes
  }

  showNextImage();
}

const audio = new Audio("assets/audio/usrr.mp3");
audio.loop = true;
audio.play().catch((error) => {
  console.error("Error al reproducir el audio:", error);
});
const stopMusic = document.getElementById("stop-music");
stopMusic.addEventListener("click", () => {
  audio.pause();
  console.log("Música detenida");
  audio.currentTime = 0; // Reiniciar el audio
});
const startMusic = document.getElementById("start-music");
startMusic.addEventListener("click", () => {
  audio.play().catch((error) => {
    audio.currentTime = 0; // Reiniciar el audio
    console.error("Error al reproducir el audio:", error);
  });
  console.log("Música iniciada");
});
// Iniciar las imágenes un poco después del inicio
