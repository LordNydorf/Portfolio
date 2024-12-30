// Theme switcher functionality
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeButtonText(theme);
}

function rotateTheme() {
  const themes = ['light', 'dark', 'system'];
  const currentTheme = localStorage.getItem('theme') || 'system';
  const currentIndex = themes.indexOf(currentTheme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];
  
  if (nextTheme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', systemTheme);
  } else {
    document.documentElement.setAttribute('data-theme', nextTheme);
  }
  
  localStorage.setItem('theme', nextTheme);
  updateThemeButtonText(nextTheme);
}

function updateThemeButtonText(theme) {
  const button = document.querySelector('.theme-switch');
  const themes = {
    'light': '☀️ Light',
    'dark': '🌙 Dark',
    'system': '💻 System'
  };
  button.textContent = themes[theme];
}

// Initialize theme
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'system';
  
  if (savedTheme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', systemTheme);
  } else {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
  
  updateThemeButtonText(savedTheme);
}

// Scroll animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  
  // Initialize animations
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Add smooth scrolling to navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (localStorage.getItem('theme') === 'system') {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  }
});