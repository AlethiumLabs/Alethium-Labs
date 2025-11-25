document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set canvas size
  const updateSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  updateSize();
  window.addEventListener('resize', updateSize);

  // Floating particles
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 3 + 1;

      // Alethium brand colors
      const colors = [
        'rgba(99, 102, 241, 0.6)',   // Indigo - Primary
        'rgba(6, 182, 212, 0.6)',    // Cyan - Secondary
        'rgba(249, 115, 22, 0.6)',   // Orange - Accent
        'rgba(16, 185, 129, 0.6)',   // Emerald - Supporting
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update(mouseX, mouseY) {
      // Mouse repulsion
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const force = (150 - distance) / 150;
        this.vx += (dx / distance) * force * 0.5;
        this.vy += (dy / distance) * force * 0.5;
      }

      // Apply velocity
      this.x += this.vx;
      this.y += this.vy;

      // Friction
      this.vx *= 0.95;
      this.vy *= 0.95;

      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Keep in bounds
      this.x = Math.max(0, Math.min(canvas.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height, this.y));
    }

    draw() {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  // Create particles
  const particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }

  // Mouse tracking
  let mouseX = -1000;
  let mouseY = -1000;

  const handleMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  window.addEventListener('mousemove', handleMouseMove);

  // Animation loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach(particle => {
      particle.update(mouseX, mouseY);
      particle.draw();
    });

    // Draw connections
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - distance / 120)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  };

  animate();
});
