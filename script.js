document.addEventListener('DOMContentLoaded', () => {

  /* ============ NAVBAR SCROLL EFFECT ============ */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    handleBackToTop();
    handleActiveNav();
  });

  /* ============ MOBILE MENU ============ */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  /* ============ SMOOTH SCROLL ============ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ============ ACTIVE NAV LINK ON SCROLL ============ */
  const sections = document.querySelectorAll('section, .hero');
  const navItems = document.querySelectorAll('.nav-link');

  function handleActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === '#' + current) {
        item.classList.add('active');
      }
    });
  }

  /* ============ BACK TO TOP ============ */
  const backToTop = document.getElementById('backToTop');

  function handleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ============ TYPING EFFECT ============ */
  const typedEl = document.getElementById('typed');
  const roles = ['Data Analyst',
  'Full Stack Developer'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();

  /* ============ SCROLL REVEAL ANIMATIONS ============ */
  const revealEls = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ============ SKILL BARS ANIMATION ============ */
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const percent = fill.getAttribute('data-percent');
        fill.style.width = percent + '%';
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.4 });

  skillFills.forEach(fill => skillObserver.observe(fill));

  /* ============ MOUSE PARALLAX ON PROFILE IMAGE ============ */
  const heroImageWrap = document.querySelector('.hero-image-wrap');
  const profileImg = document.getElementById('profileImg');

  if (heroImageWrap) {
    heroImageWrap.addEventListener('mousemove', (e) => {
      const rect = heroImageWrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const moveX = (x / rect.width) * 25;
      const moveY = (y / rect.height) * 25;
      profileImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    heroImageWrap.addEventListener('mouseleave', () => {
      profileImg.style.transform = 'translate(0, 0)';
    });
  }

  /* ============ PARALLAX ON HERO TEXT (MOUSE MOVE) ============ */
  const heroText = document.querySelector('.hero-text');
  document.querySelector('.hero').addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    if (heroText) {
      heroText.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }
  });

  /* ============ PROFILE MODAL ============ */
  const profileModal = document.getElementById('profileModal');
  const modalClose = document.getElementById('modalClose');

  function openProfileModal() {
    profileModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProfileModal() {
    profileModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (profileImg) {
    profileImg.addEventListener('click', (e) => {
      e.preventDefault();
      openProfileModal();
    });
  }

  modalClose.addEventListener('click', closeProfileModal);

  profileModal.addEventListener('click', (e) => {
    if (e.target === profileModal) {
      closeProfileModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProfileModal();
      closeCertModal();
    }
  });

  /* ============ CERTIFICATE MODAL ============ */
  const certModal = document.getElementById('certModal');
  const certModalImg = document.getElementById('certModalImg');
  const certModalClose = document.getElementById('certModalClose');
  const viewCertBtns = document.querySelectorAll('.view-cert-btn');

  function openCertModal(imgSrc) {
    certModalImg.src = imgSrc;
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  viewCertBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const imgSrc = btn.getAttribute('data-img');
      openCertModal(imgSrc);
    });
  });

  certModalClose.addEventListener('click', closeCertModal);

  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
      closeCertModal();
    }
  });

  /* ============ PRINT RESUME ============ */
  const printResumeBtn = document.getElementById('printResumeBtn');
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      const printWindow = window.open('resume/Surya_S_Resume.pdf', '_blank');
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      }
    });
  }

  /* ============ CONTACT FORM VALIDATION ============ */
  /* ============ CONTACT FORM WITH EMAILJS ============ */

/* ============ CONTACT FORM WITH EMAILJS ============ */

emailjs.init("lUdpbnOnuT2TKihOX");

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const formSuccess = document.getElementById("formSuccess");

function showError(input, errorId, message) {
  input.classList.add("invalid");
  document.getElementById(errorId).textContent = message;
}

function clearError(input, errorId) {
  input.classList.remove("invalid");
  document.getElementById(errorId).textContent = "";
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  if (nameInput.value.trim() === "") {
    showError(nameInput, "nameError", "Name is required");
    isValid = false;
  } else {
    clearError(nameInput, "nameError");
  }

  if (emailInput.value.trim() === "") {
    showError(emailInput, "emailError", "Email is required");
    isValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, "emailError", "Enter a valid email");
    isValid = false;
  } else {
    clearError(emailInput, "emailError");
  }

  if (subjectInput.value.trim() === "") {
    showError(subjectInput, "subjectError", "Subject is required");
    isValid = false;
  } else {
    clearError(subjectInput, "subjectError");
  }

  if (messageInput.value.trim() === "") {
    showError(messageInput, "messageError", "Message is required");
    isValid = false;
  } else {
    clearError(messageInput, "messageError");
  }

  if (!isValid) return;

  emailjs
    .send("service_j6j4xad", "template_sh1jaio", {
      name: nameInput.value,
      email: emailInput.value,
      title: subjectInput.value,
      message: messageInput.value,
    })
    .then(function () {
      formSuccess.classList.add("show");
      contactForm.reset();

      setTimeout(() => {
        formSuccess.classList.remove("show");
      }, 4000);
    })
    .catch(function (error) {
      console.log(error);
      alert("Failed to send message.");
    });
});

[nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("invalid");
  });
});
  /* ============ PARTICLES CANVAS ============ */
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.5 ? '157, 78, 221' : '58, 134, 255';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${this.color}, 0.8)`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  /* ============ INITIAL CALLS ============ */
  handleBackToTop();
  handleActiveNav();
});