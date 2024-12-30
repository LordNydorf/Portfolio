class DynamicBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Style and add canvas
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '1'; // Increased from 0.7
        this.canvas.style.pointerEvents = 'none';
        
        document.body.prepend(this.canvas);
        
        this.shapes = [];
        this.time = 0;
        
        this.resize();
        this.createShapes();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('scroll', () => this.parallaxEffect());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createShapes();
    }
    
    createShapes() {
        this.shapes = [];
        const numShapes = Math.floor(window.innerWidth * window.innerHeight / 25000);
        
        for (let i = 0; i < numShapes; i++) {
            this.shapes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 60 + 20,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() * 0.02 - 0.01),
                type: Math.floor(Math.random() * 3)  // 0: circle, 1: square, 2: triangle
            });
        }
    }
    
    parallaxEffect() {
        const scrolled = window.pageYOffset;
        this.shapes.forEach(shape => {
            shape.y += scrolled * 0.02;
            
            // Reset position if shape goes off screen
            if (shape.y > this.canvas.height + shape.size) {
                shape.y = -shape.size;
            } else if (shape.y < -shape.size) {
                shape.y = this.canvas.height + shape.size;
            }
        });
    }
    
    drawShape(shape) {
        const theme = document.documentElement.getAttribute('data-theme');
        const isLight = theme !== 'dark';
        
        this.ctx.save();
        this.ctx.translate(shape.x, shape.y);
        this.ctx.rotate(shape.rotation);
        
        const gradient = this.ctx.createLinearGradient(-shape.size/2, -shape.size/2, shape.size/2, shape.size/2);
        
        if (isLight) {
            // Enhanced colors for light mode
            gradient.addColorStop(0, 'rgba(9, 132, 227, 0.15)');  // Brighter blue
            gradient.addColorStop(0.5, 'rgba(0, 184, 148, 0.15)'); // Teal
            gradient.addColorStop(1, 'rgba(108, 92, 231, 0.15)');  // Purple
        } else {
            // Adjusted dark mode colors
            gradient.addColorStop(0, 'rgba(116, 185, 255, 0.12)');
            gradient.addColorStop(0.5, 'rgba(72, 219, 251, 0.12)');
            gradient.addColorStop(1, 'rgba(162, 155, 254, 0.12)');
        }
        
        this.ctx.fillStyle = gradient;
        this.ctx.strokeStyle = isLight ? 'rgba(9, 132, 227, 0.1)' : 'rgba(116, 185, 255, 0.1)';
        this.ctx.lineWidth = 2;
        
        switch(shape.type) {
            case 0: // Circle
                this.ctx.beginPath();
                this.ctx.arc(0, 0, shape.size/2, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.stroke();
                break;
            case 1: // Square
                this.ctx.fillRect(-shape.size/2, -shape.size/2, shape.size, shape.size);
                this.ctx.strokeRect(-shape.size/2, -shape.size/2, shape.size, shape.size);
                break;
            case 2: // Triangle
                this.ctx.beginPath();
                this.ctx.moveTo(-shape.size/2, shape.size/2);
                this.ctx.lineTo(shape.size/2, shape.size/2);
                this.ctx.lineTo(0, -shape.size/2);
                this.ctx.closePath();
                this.ctx.fill();
                this.ctx.stroke();
                break;
        }
        
        this.ctx.restore();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.shapes.forEach(shape => {
            // Update position
            shape.x += shape.speedX;
            shape.y += shape.speedY;
            shape.rotation += shape.rotationSpeed;
            
            // Bounce off walls
            if (shape.x > this.canvas.width + shape.size) shape.x = -shape.size;
            if (shape.x < -shape.size) shape.x = this.canvas.width + shape.size;
            if (shape.y > this.canvas.height + shape.size) shape.y = -shape.size;
            if (shape.y < -shape.size) shape.y = this.canvas.height + shape.size;
            
            this.drawShape(shape);
        });
        
        this.time += 0.01;
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize background when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DynamicBackground();
});