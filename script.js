document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC DATA INJECTION
  initDynamicData();

  // 2. PARTICLE BACKGROUND CANVAS
  initParticleBackground();

  // 3. TYPEWRITER EFFECT
  initTypewriter();

  // 4. NAVIGATION & MOBILE MENU
  initNavigation();

  // 5. PROJECTS SEARCH & FILTER
  initProjectsFilter();

  // 6. TIMELINE TABS
  initTimelineTabs();

  // 7. THEME SWITCHER
  initThemeSwitcher();

  // 8. CUSTOM CURSOR
  initCustomCursor();

  // 9. SCROLL ACTIONS & PROGRESS
  initScrollEffects();

  // 10. CONTACT FORM VALIDATION & TOASTS
  initContactForm();

  // 11. PROJECT DETAIL MODAL
  initProjectModal();

  // 12. SCROLL REVEAL ANIMATIONS
  initScrollReveal();
});

/* ==========================================================================
   1. DYNAMIC DATA INJECTION
   ========================================================================== */
function initDynamicData() {
  if (typeof portfolioData === 'undefined') return;

  // Set hero social links
  const heroSocials = document.querySelector('.hero-socials');
  if (heroSocials) {
    heroSocials.innerHTML = `
      <a href="${portfolioData.personal.github}" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github"></i></a>
      <a href="${portfolioData.personal.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
      <a href="mailto:${portfolioData.personal.email}" aria-label="Email"><i class="far fa-envelope"></i></a>
    `;
  }

  // Render Skills
  renderSkills('all');

  // Render Projects
  renderProjects();

  // Render Timeline
  renderTimeline('all');

  // Render Services
  const servicesGrid = document.getElementById('services-grid');
  if (servicesGrid) {
    servicesGrid.innerHTML = portfolioData.services.map((service, idx) => `
      <div class="service-card glass-card reveal-element" style="transition-delay: ${idx * 0.1}s">
        <div class="service-icon-wrapper">
          <i class="${service.icon}"></i>
        </div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      </div>
    `).join('');
  }
}

function renderSkills(categoryFilter = 'all') {
  const skillsList = document.getElementById('skills-list');
  if (!skillsList || typeof portfolioData === 'undefined') return;

  const filteredSkills = categoryFilter === 'all'
    ? portfolioData.skills
    : portfolioData.skills.filter(skill => skill.category === categoryFilter);

  skillsList.innerHTML = filteredSkills.map(skill => `
    <div class="skill-bar-wrapper" data-category="${skill.category}">
      <div class="skill-info">
        <span class="skill-name">${skill.name}</span>
        <span class="skill-pct">${skill.level}%</span>
      </div>
      <div class="skill-track">
        <div class="skill-fill" style="width: 0%;" data-level="${skill.level}"></div>
      </div>
    </div>
  `).join('');

  // Animate skill bars in shortly after rendering
  setTimeout(() => {
    const fills = skillsList.querySelectorAll('.skill-fill');
    fills.forEach(fill => {
      const level = fill.getAttribute('data-level');
      fill.style.width = `${level}%`;
    });
  }, 100);
}

function renderProjects(filterCategory = 'All', searchQuery = '') {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid || typeof portfolioData === 'undefined') return;

  // Filter logic
  let filtered = portfolioData.projects;

  if (filterCategory !== 'All') {
    filtered = filtered.filter(p => p.category === filterCategory);
  }

  if (searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tech.some(t => t.toLowerCase().includes(query))
    );
  }

  if (filtered.length === 0) {
    projectsGrid.innerHTML = `
      <div class="no-projects-msg">
        <i class="fas fa-search-minus"></i>
        <p>No projects match your criteria. Try adjusting your search or filters!</p>
      </div>
    `;
    return;
  }

  projectsGrid.innerHTML = filtered.map((project, index) => `
    <div class="project-card glass-card reveal-element" data-index="${portfolioData.projects.indexOf(project)}" style="transition-delay: ${index * 0.05}s">
      <div class="project-image-wrapper">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="project-image-overlay"></div>
        <span class="project-category">${project.category}</span>
      </div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tech.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        <div class="project-actions">
          ${project.githubLink && project.githubLink !== '#' ? `
            <a href="${project.githubLink}" target="_blank" rel="noopener" class="btn-card btn-card-secondary project-card-action" aria-label="View Code on GitHub">
              <i class="fab fa-github"></i> Code
            </a>
          ` : ''}
          ${project.liveLink && project.liveLink !== '#' ? `
            <a href="${project.liveLink}" target="_blank" rel="noopener" class="btn-card btn-card-primary project-card-action" aria-label="${project.liveLink.endsWith('.pdf') ? 'View PDF document' : 'View Live Demo'}">
              <i class="${project.liveLink.endsWith('.pdf') ? 'fas fa-file-pdf' : 'fas fa-external-link-alt'}"></i> ${project.liveLink.endsWith('.pdf') ? 'PDF' : 'Live'}
            </a>
          ` : (project.videoLink ? `
            <button class="btn-card btn-card-primary btn-card-demo" aria-label="View Project Demo">
              <i class="fas fa-play"></i> Demo
            </button>
          ` : '')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderTimeline(typeFilter = 'all') {
  const container = document.getElementById('timeline-container');
  if (!container || typeof portfolioData === 'undefined') return;

  const filteredTimeline = typeFilter === 'all'
    ? portfolioData.timeline
    : portfolioData.timeline.filter(item => item.type === typeFilter);

  if (filteredTimeline.length === 0) {
    container.innerHTML = `<p class="no-timeline">No records found.</p>`;
    return;
  }

  container.innerHTML = filteredTimeline.map((item, idx) => `
    <div class="timeline-item ${item.type === 'education' ? 'edu' : 'exp'} reveal-element" style="transition-delay: ${idx * 0.1}s">
      <div class="timeline-dot"></div>
      <div class="timeline-card glass-card">
        <div class="timeline-meta">
          <span class="timeline-type-badge">${item.type === 'education' ? 'Education' : 'Experience'}</span>
          <span class="timeline-duration"><i class="far fa-calendar-alt"></i> ${item.duration}</span>
        </div>
        <h3>${item.role}</h3>
        <div class="timeline-org">${item.organization}</div>
        <p>${item.description}</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   2. PARTICLE BACKGROUND CANVAS
   ========================================================================== */
function initParticleBackground() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  // Handle canvas sizing
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Mouse interactivity tracking
  const mouse = {
    x: null,
    y: null,
    radius: 120
  };

  const heroSection = document.getElementById('hero');
  heroSection.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  heroSection.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle representation
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.size = Math.random() * 2.5 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
    }

    draw() {
      // Get theme colors to shade particles
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? 'rgba(34, 211, 238, 0.4)' : 'rgba(2, 132, 199, 0.4)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update() {
      // Repel from mouse logic
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          // Calculate force multiplier
          let maxForce = 5;
          let force = (mouse.radius - distance) / mouse.radius;
          let directionX = forceDirectionX * force * maxForce;
          let directionY = forceDirectionY * force * maxForce;
          
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Slowly drift back to default movement
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 15;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 15;
          }
        }
      }

      // Drift particle
      this.x += this.vx;
      this.y += this.vy;
      
      // Update base positions
      this.baseX += this.vx;
      this.baseY += this.vy;

      // Handle screen boundaries wrap-around
      if (this.x < 0) { this.x = canvas.width; this.baseX = this.x; }
      if (this.x > canvas.width) { this.x = 0; this.baseX = this.x; }
      if (this.y < 0) { this.y = canvas.height; this.baseY = this.y; }
      if (this.y > canvas.height) { this.y = 0; this.baseY = this.y; }
    }
  }

  // Build particles array
  const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 18000));
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Draw connecting lines between close particles
  function connectParticles() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const lineColor = isDark ? 'rgba(34, 211, 238, 0.04)' : 'rgba(2, 132, 199, 0.05)';
    const maxDistance = 100;

    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1 - (dist / maxDistance);
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Main animation frame loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    connectParticles();
    animationFrameId = requestAnimationFrame(animate);
  }

  // Start loop
  animate();

  // Clean up canvas tracking on page reload/resize to prevent memory leaks
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationFrameId);
  });
}

/* ==========================================================================
   3. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const textEl = document.getElementById('typewriter');
  if (!textEl || typeof portfolioData === 'undefined') return;

  const words = portfolioData.personal.titles;
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Remove character
      textEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40; // Delete speed is faster
    } else {
      // Add character
      textEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100; // Natural typing speed
    }

    // Word completed typing
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at full word
    } 
    // Word fully deleted
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  }

  // Kick off typewriter
  setTimeout(type, 1000);
}

/* ==========================================================================
   4. NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !menu) return;

  // Toggle dropdown drawer
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('active');
    
    // Change icon representation
    const icon = toggleBtn.querySelector('i');
    if (menu.classList.contains('active')) {
      icon.className = 'fas fa-times';
    } else {
      icon.className = 'fas fa-bars';
    }
  });

  // Close drawer on link selection
  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('active') && !menu.contains(e.target) && !toggleBtn.contains(e.target)) {
      menu.classList.remove('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    }
  });
}

/* ==========================================================================
   5. PROJECTS SEARCH & FILTER
   ========================================================================== */
function initProjectsFilter() {
  const searchInput = document.getElementById('project-search');
  const clearBtn = document.getElementById('search-clear-btn');
  const filterPills = document.querySelectorAll('.filter-pill');
  const skillCategoryTabs = document.querySelectorAll('.skill-tab');

  let activeCategory = 'All';
  let searchQuery = '';

  if (!searchInput) return;

  // Dynamic input triggers
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    
    // Show/hide clear search trigger
    if (searchQuery.length > 0) {
      clearBtn.style.display = 'block';
    } else {
      clearBtn.style.display = 'none';
    }
    
    filterAndReRender();
  });

  // Clear search selection
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearBtn.style.display = 'none';
    filterAndReRender();
    searchInput.focus();
  });

  // Tag filter selection
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      
      activeCategory = pill.getAttribute('data-filter');
      filterAndReRender();
    });
  });

  // About Section skill tabs filter
  skillCategoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillCategoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const category = tab.getAttribute('data-category');
      renderSkills(category);
    });
  });

  function filterAndReRender() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    // Apply grid fade animation
    projectsGrid.style.opacity = '0';
    projectsGrid.style.transform = 'translateY(10px)';
    projectsGrid.style.transition = 'opacity 0.2s, transform 0.2s';

    setTimeout(() => {
      renderProjects(activeCategory, searchQuery);
      initScrollReveal(); // Reinitialize observers for newly rendered cards
      
      projectsGrid.style.opacity = '1';
      projectsGrid.style.transform = 'translateY(0)';
    }, 200);
  }
}

/* ==========================================================================
   6. TIMELINE TABS
   ========================================================================== */
function initTimelineTabs() {
  const tabs = document.querySelectorAll('.timeline-tab-btn');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabValue = tab.getAttribute('data-tab');
      
      const container = document.getElementById('timeline-container');
      if (container) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(10px)';
        container.style.transition = 'opacity 0.2s, transform 0.2s';
        
        setTimeout(() => {
          renderTimeline(tabValue);
          initScrollReveal(); // Reinitialize reveals
          
          container.style.opacity = '1';
          container.style.transform = 'translateY(0)';
        }, 200);
      }
    });
  });
}

/* ==========================================================================
   7. THEME SWITCHER
   ========================================================================== */
function initThemeSwitcher() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // Retrieve saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  // Toggle on click
  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Briefly pulse the body colors
    document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
  });

  function updateThemeIcon(theme) {
    const icon = toggleBtn.querySelector('i');
    if (!icon) return;

    if (theme === 'dark') {
      icon.className = 'fas fa-sun';
      icon.style.color = '#ffd43b'; // Sun Yellow
    } else {
      icon.className = 'fas fa-moon';
      icon.style.color = ''; // Default light theme color
    }
  }
}

/* ==========================================================================
   8. CUSTOM CURSOR
   ========================================================================== */
function initCustomCursor() {
  const outer = document.querySelector('.custom-cursor-outer');
  const inner = document.querySelector('.custom-cursor-inner');
  
  if (!outer || !inner) return;

  // Track position
  window.addEventListener('mousemove', (e) => {
    outer.style.left = `${e.clientX}px`;
    outer.style.top = `${e.clientY}px`;
    
    inner.style.left = `${e.clientX}px`;
    inner.style.top = `${e.clientY}px`;
  });

  // Track hover animations
  const hoverables = 'a, button, input, textarea, .project-card, .timeline-tab-btn, .filter-pill, .skill-tab';
  
  function applyCursorEvents() {
    const elements = document.querySelectorAll(hoverables);
    elements.forEach(el => {
      // Remove any existing event listeners to avoid duplicates
      el.removeEventListener('mouseenter', hoverIn);
      el.removeEventListener('mouseleave', hoverOut);
      
      // Bind hover triggers
      el.addEventListener('mouseenter', hoverIn);
      el.addEventListener('mouseleave', hoverOut);
    });
  }

  function hoverIn() {
    document.body.classList.add('cursor-hover');
  }

  function hoverOut() {
    document.body.classList.remove('cursor-hover');
  }

  applyCursorEvents();

  // Re-observe and apply cursor events dynamically on grid re-renders
  const observer = new MutationObserver(applyCursorEvents);
  observer.observe(document.body, { childList: true, subtree: true });
}

/* ==========================================================================
   9. SCROLL ACTIONS & PROGRESS
   ========================================================================== */
function initScrollEffects() {
  const header = document.querySelector('header');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section.scroll-spy, header, section#hero');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // 1. Update progress bar width
    const scrollPct = (scrollTop / docHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = `${scrollPct}%`;

    // 2. Shrink and solidify header background
    if (header) {
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // 3. Show/hide back to top shortcut button
    if (backToTop) {
      if (scrollTop > 500) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    }

    // 4. ScrollSpy: active navigation node highlights
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // Padding offset
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Back to top click behavior
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   10. CONTACT FORM VALIDATION & TOASTS
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');

  // Listen to input changes to clear error statuses in real time
  const inputs = [nameInput, emailInput, subjectInput, messageInput];
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      validateField(input);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    let isFormValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      const submitBtn = document.getElementById('form-submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;
      
      const targetEmail = (typeof portfolioData !== 'undefined' && portfolioData.personal && portfolioData.personal.email) 
        ? portfolioData.personal.email 
        : 'kimheangtkd@gmail.com';

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            _subject: `Portfolio Contact: ${subjectInput.value.trim()}`,
            message: messageInput.value.trim()
          })
        });

        const data = await response.json();

        if (response.ok && (data.success === 'true' || data.success === true)) {
          showToast('Message sent successfully! I will get back to you shortly.', 'success');
          form.reset();
          inputs.forEach(input => {
            input.parentNode.classList.remove('invalid');
          });
        } else if (data.message && data.message.includes('Activation')) {
          showToast('First-time activation required! Please check kimheangtkd@gmail.com (and Spam folder) to click "Activate Form".', 'error');
        } else if (data.message && data.message.includes('HTML files')) {
          showToast('FormSubmit requires hosting (e.g. GitHub Pages) or a local web server (http://localhost).', 'error');
        } else {
          showToast(data.message || 'Failed to send message. Please try again.', 'error');
        }
      } catch (error) {
        console.error('Contact form submission error:', error);
        showToast('Unable to send message. Please check your network connection.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    } else {
      showToast('Please correct validation errors in the form.', 'error');
    }
  });

  function validateField(input) {
    const formGroup = input.parentNode;
    let isValid = true;

    if (input.required && input.value.trim() === '') {
      isValid = false;
    } else if (input.type === 'email') {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      isValid = emailPattern.test(input.value.trim());
    }

    if (isValid) {
      formGroup.classList.remove('invalid');
    } else {
      formGroup.classList.add('invalid');
    }

    return isValid;
  }
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
  toast.innerHTML = `
    <i class="fas ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.add('active');
  }, 10);

  // Clear toast after timeout
  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4000);
}

/* ==========================================================================
   11. PROJECT DETAIL MODAL
   ========================================================================== */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = modal ? modal.querySelector('.modal-close-btn') : null;
  const backdrop = modal ? modal.querySelector('.modal-backdrop') : null;

  if (!modal || !closeBtn || !backdrop || typeof portfolioData === 'undefined') return;

  // Delegate grid clicks
  document.addEventListener('click', (e) => {
    // If the click is on a direct link button inside the card, do not open the modal
    if (e.target.closest('.project-card-action')) {
      return;
    }
    
    const card = e.target.closest('.project-card');
    if (card) {
      const index = parseInt(card.getAttribute('data-index'), 10);
      if (!isNaN(index)) {
        openModal(portfolioData.projects[index]);
      }
    }
  });

  // Close triggers
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function openModal(project) {
    const mImg = document.getElementById('modal-project-img');
    const mVideo = document.getElementById('modal-project-video');
    const mCat = document.getElementById('modal-project-category');
    const mTitle = document.getElementById('modal-project-title');
    const mDesc = document.getElementById('modal-project-desc');
    const mTags = document.getElementById('modal-project-tags');
    const mLive = document.getElementById('modal-live-link');
    const mGit = document.getElementById('modal-github-link');

    // Populate data fields
    mImg.src = project.image;
    mImg.alt = project.title;
    mCat.textContent = project.category;
    mTitle.textContent = project.title;
    mDesc.textContent = project.description;
    
    mTags.innerHTML = project.tech.map(t => `<span class="project-tag">${t}</span>`).join('');
    
    // Handle video player visibility and source
    if (mVideo) {
      if (project.videoLink) {
        mVideo.src = project.videoLink;
        mVideo.style.display = 'block';
        mImg.style.display = 'none';
        mVideo.load();
        mVideo.play().catch(err => console.log('Auto-play blocked or failed:', err));
      } else {
        mVideo.src = '';
        mVideo.style.display = 'none';
        mImg.style.display = 'block';
      }
    }

    // Hide/show links if present
    if (project.liveLink && project.liveLink !== '#') {
      mLive.href = project.liveLink;
      mLive.style.display = 'inline-flex';
      if (project.liveLink.endsWith('.pdf')) {
        mLive.innerHTML = `View PDF <i class="fas fa-file-pdf icon-right"></i>`;
      } else {
        mLive.innerHTML = `Live Demo <i class="fas fa-external-link-alt icon-right"></i>`;
      }
    } else {
      mLive.style.display = 'none';
    }

    if (project.githubLink && project.githubLink !== '#') {
      mGit.href = project.githubLink;
      mGit.style.display = 'inline-flex';
    } else {
      mGit.style.display = 'none';
    }

    // Toggle styling
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scroll
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    const mVideo = document.getElementById('modal-project-video');
    if (mVideo) {
      mVideo.pause();
      mVideo.src = '';
    }
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Resume scrolling
    modal.setAttribute('aria-hidden', 'true');
  }
}

/* ==========================================================================
   12. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-element');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Trigger once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully in view
    });

    elements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    elements.forEach(el => el.classList.add('revealed'));
  }
}
