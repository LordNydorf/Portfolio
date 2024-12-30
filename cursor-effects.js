class ParticleEffect {
  constructor() {
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.isActive = false;
    
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Style canvas
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    
    document.body.appendChild(this.canvas);
    
    this.resizeCanvas();
    this.setupEventListeners();
    this.animate();
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  setupEventListeners() {
    window.addEventListener('resize', () => this.resizeCanvas());
    
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      
      // Add new particles on mouse move
      if (this.isActive) {
        this.addParticle();
      }
    });
    
    document.addEventListener('mouseenter', () => {
      this.isActive = true;
    });
    
    document.addEventListener('mouseleave', () => {
      this.isActive = false;
    });
  }
  
  addParticle() {
    const theme = document.documentElement.getAttribute('data-theme');
    const particle = {
      x: this.mouse.x,
      y: this.mouse.y,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
      life: 1,
      color: theme === 'dark' ? '255, 255, 255' : '0, 132, 227'
    };
    this.particles.push(particle);
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      p.life -= 0.02;
      p.x += p.speedX;
      p.y += p.speedY;
      p.size -= 0.1;
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color}, ${p.life})`;
      this.ctx.fill();
      
      if (p.size <= 0.3 || p.life <= 0) {
        this.particles.splice(i, 1);
        i--;
      }
    }
    
    requestAnimationFrame(() => this.animate());
  }
}

// Magnetic effect for interactive elements
class MagneticEffect {
  constructor() {
    this.magneticElements = document.querySelectorAll('.magnetic');
    this.setupMagneticEffect();
  }
  
  setupMagneticEffect() {
    this.magneticElements.forEach(elem => {
      elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const maxDistance = Math.max(rect.width, rect.height);
        
        if (distance < maxDistance) {
          const pull = 0.3; // Strength of the magnetic effect
          const moveX = (distanceX / maxDistance) * pull * 30;
          const moveY = (distanceY / maxDistance) * pull * 30;
          
          elem.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      });
      
      elem.addEventListener('mouseleave', () => {
        elem.style.transform = 'translate(0px, 0px)';
      });
    });
  }
}

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ParticleEffect();
  new MagneticEffect();
});