document.addEventListener('DOMContentLoaded', function() {
    // Particle background
    initParticleBackground();
    
    // Tab switching
    initTabSwitching();
    
    // Password toggle
    initPasswordToggle();
    
    // Form submission
    initFormSubmission();
  });
  
  // Particle Background
  function initParticleBackground() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }
  
    function initParticles() {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.05), 100);
  
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    }
  
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
  
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
  
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
  
        // Draw connections
        particles.forEach((otherParticle, j) => {
          if (i === j) return;
  
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });
  
      animationFrameId = requestAnimationFrame(drawParticles);
    }
  
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();
  
    // Cleanup function
    return function cleanup() {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }
  
  // Tab Switching
  function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const switchFormLinks = document.querySelectorAll('.switch-form');
  
    // Tab button click
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Update active tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show corresponding form
        if (tabName === 'login') {
          loginForm.classList.add('active');
          signupForm.classList.remove('active');
        } else {
          loginForm.classList.remove('active');
          signupForm.classList.add('active');
        }
      });
    });
  
    // Switch form links
    switchFormLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const formName = link.getAttribute('data-form');
        
        // Click the corresponding tab button
        tabButtons.forEach(btn => {
          if (btn.getAttribute('data-tab') === formName) {
            btn.click();
          }
        });
      });
    });
  }
  
  // Password Toggle
  function initPasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('input');
        const eyeIcon = button.querySelector('.eye-icon');
        const eyeOffIcon = button.querySelector('.eye-off-icon');
        
        if (input.type === 'password') {
          input.type = 'text';
          eyeIcon.classList.add('hidden');
          eyeOffIcon.classList.remove('hidden');
        } else {
          input.type = 'password';
          eyeIcon.classList.remove('hidden');
          eyeOffIcon.classList.add('hidden');
        }
      });
    });
  }
  
  // Form Submission
  function initFormSubmission() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    loginForm.addEventListener('submit', handleFormSubmit);
    signupForm.addEventListener('submit', handleFormSubmit);
    
    function handleFormSubmit(e) {
      e.preventDefault();
      
      const form = e.target;
      const submitButton = form.querySelector('.submit-button');
      const spinner = submitButton.querySelector('.spinner');
      const buttonText = submitButton.querySelector('.button-text');
      
      // Show loading state
      submitButton.disabled = true;
      spinner.classList.remove('hidden');
      buttonText.textContent = form.id === 'login-form' ? 'Logging in...' : 'Creating account...';
      
      // Simulate API call
      setTimeout(() => {
        // Reset form
        submitButton.disabled = false;
        spinner.classList.add('hidden');
        buttonText.textContent = form.id === 'login-form' ? 'Log in' : 'Create account';
        
        // Show success message (in a real app, you'd redirect or show a proper message)
        alert(form.id === 'login-form' ? 'Login successful!' : 'Account created successfully!');
      }, 1500);
    }
  }