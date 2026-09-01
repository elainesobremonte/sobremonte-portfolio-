/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */
const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 30) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
}, { passive: true });

/* =====================================================
   MOBILE MENU
===================================================== */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

/* =====================================================
   NAVIGATION ACTIVE STATE
===================================================== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navAnchors.forEach(anchor => {
                anchor.classList.remove('active');
                if (anchor.getAttribute('href') === `#${sectionId}`) {
                    anchor.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('load', updateActiveNav);

/* =====================================================
   PROJECT DATA
===================================================== */
const projects = {
    swinewatch: {
        category: 'CAPSTONE PROJECT',
        title: 'SwineWatch: Surveillance and Alert System for Early Signs of African Swine Fever in Pigs Using Machine Learning',
        image: './assets/projects/swinewatch.jpg',
        role: 'Project Manager',
        description: 'A surveillance and alert system for early signs of African Swine Fever in pigs using machine learning, thermal imaging, and camera-based monitoring.',
        problem: 'African Swine Fever poses a significant threat to the swine industry. Early detection is critical but challenging with traditional monitoring methods.',
        solution: 'Developed an automated monitoring system using thermal imaging and computer vision to detect early signs of ASF in pigs through behavior analysis, temperature monitoring, and skin condition classification.',
        roleDetail: 'Led a team in designing and implementing the full system. Coordinated hardware integration (Raspberry Pi 4, Pi Camera V3, MLX90640, SIM800L), oversaw YOLOv8 implementation for pig detection and classification, and managed the end-to-end development process.',
        technologies: ['Python', 'YOLOv8', 'Raspberry Pi', 'MLX90640', 'Firebase', 'Flask', 'SIM800L', 'Pi Camera V3']
    },
    mosquito: {
        category: 'MACHINE LEARNING',
        title: 'AI-Powered Mosquito Species Classifier',
        image: './assets/projects/mosquito.jpg',
        role: 'Project Manager',
        description: 'An AI system using recorded mosquito wingbeat signals for automated species identification.',
        problem: 'Mosquito-borne diseases require accurate species identification for effective control measures. Traditional identification methods are time-consuming and require expert knowledge.',
        solution: 'Developed a machine learning system using ResNet18 transfer learning on recorded wingbeat audio signals. The system processes wingbeat data and classifies mosquito species in real-time through an integrated GUI.',
        roleDetail: 'Led the project team in developing the end-to-end solution. Coordinated the MATLAB and ResNet18 implementation, managed data preprocessing, model training and evaluation, and integrated the GUI interface for the prediction system.',
        technologies: ['Python', 'ResNet18', 'MATLAB', 'Signal Processing', 'Transfer Learning']
    },
    internship: {
        category: 'INTERNSHIP',
        title: 'Engineering Dashboards',
        image: './assets/projects/internship.jpg',
        role: 'Frontend Developer',
        description: 'Engineering dashboards for breakdowns, downtime, cycle time, and capacity monitoring. My role focused on frontend development and data visualization.',
        problem: 'Engineering teams lacked clear visibility into equipment performance, downtime patterns, and capacity utilization, making data-driven decision-making difficult.',
        solution: 'Developed interactive dashboards using HTML, CSS, JavaScript, and Chart.js that visualize key engineering metrics. The dashboards enable real-time monitoring of breakdowns, downtime analysis, cycle time tracking, and capacity planning.',
        roleDetail: 'Focused on frontend development, implementing responsive dashboard layouts, data visualization components with Chart.js, and integrating Excel-based data sources for real-time updates.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Chart.js', 'Excel', 'Data Visualization']
    }
};

/* =====================================================
   PROJECT SLIDER
===================================================== */
document.querySelectorAll('.project-slider').forEach(slider => {
    const track = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelector('.slider-dots');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');

    if (slides.length <= 1) {
        prevBtn?.remove();
        nextBtn?.remove();
        dots?.remove();
        return;
    }

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create dots
    if (dots) {
        dots.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dots.appendChild(dot);
        }
    }

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        if (dots) {
            dots.querySelectorAll('span').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
    }

    prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));
});

/* =====================================================
   MODAL ELEMENTS
===================================================== */
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.querySelector('.modal-overlay');
const modalImage = document.getElementById('modalImage');
const modalCategory = document.getElementById('modalCategory');
const modalRole = document.getElementById('modalRole');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalProblem = document.getElementById('modalProblem');
const modalSolution = document.getElementById('modalSolution');
const modalRoleDetail = document.getElementById('modalRoleDetail');
const modalTech = document.getElementById('modalTech');

/* =====================================================
   OPEN PROJECT
===================================================== */
const projectButtons = document.querySelectorAll('.project-link');

projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectName = button.dataset.project;
        const project = projects[projectName];

        if (!project) return;

        modalImage.src = project.image;
        modalImage.alt = project.title;
        modalCategory.textContent = project.category;
        modalRole.textContent = project.role || '';
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalProblem.textContent = project.problem || 'Information not available.';
        modalSolution.textContent = project.solution || 'Information not available.';
        modalRoleDetail.textContent = project.roleDetail || 'Information not available.';

        modalTech.innerHTML = '';
        project.technologies.forEach(tech => {
            const tag = document.createElement('span');
            tag.textContent = tech;
            modalTech.appendChild(tag);
        });

        modal.classList.add('active');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';

        modal.querySelector('.modal-container').scrollTop = 0;
    });
});

/* =====================================================
   CLOSE MODAL
===================================================== */
function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
}

modalClose?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

/* =====================================================
   HERO GEOMETRIC MOUSE INTERACTION
===================================================== */
const heroGeometric = document.getElementById('heroGeometric');

if (heroGeometric) {
    document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const rings = heroGeometric.querySelectorAll('.geo-ring');
        rings.forEach((ring, i) => {
            const factor = (i + 1) * 8;
            ring.style.transform = `translate(-50%, -50%) rotate(${x * factor}deg) scale(${1 + y * 0.05})`;
        });

        const dots = heroGeometric.querySelectorAll('.geo-dot');
        dots.forEach((dot, i) => {
            const factor = (i + 1) * 15;
            dot.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });

    document.querySelector('.hero')?.addEventListener('mouseleave', () => {
        const rings = heroGeometric.querySelectorAll('.geo-ring');
        rings.forEach((ring) => {
            ring.style.transform = 'translate(-50%, -50%) rotate(0deg) scale(1)';
        });

        const dots = heroGeometric.querySelectorAll('.geo-dot');
        dots.forEach((dot) => {
            dot.style.transform = 'translate(0, 0)';
        });
    });
}

/* =====================================================
   SCROLL REVEAL
===================================================== */
const revealElements = document.querySelectorAll(
    '.section-label, .about-headline, .about-body, ' +
    '.work-header, .featured-project, .project-card, ' +
    '.experience-headline, .experience-item, ' +
    '.skills-headline, .skill-group, ' +
    '.certifications-headline, .certification-item, ' +
    '.contact-content'
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    }
);

revealElements.forEach((element, index) => {
    element.classList.add('reveal');
    if (index > 0) {
        element.style.transitionDelay = `${Math.min(index * 0.05, 0.3)}s`;
    }
    revealObserver.observe(element);
});

// Staggered children for skill tags
document.querySelectorAll('.skill-group, .project-tech, .experience-tags').forEach(group => {
    group.classList.add('reveal-stagger');
    revealObserver.observe(group);
});

/* =====================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        if (targetId === '#' || !targetId) return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();

            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* =====================================================
   THROTTLE
===================================================== */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

const throttledUpdateNav = throttle(updateActiveNav, 100);
window.addEventListener('scroll', throttledUpdateNav, { passive: true });

console.log('%c👋 Hey there, recruiter!', 'font-size: 20px; font-weight: bold; color: #4F46E5;');
console.log('%cThanks for checking out my portfolio. Feel free to reach out!', 'font-size: 14px; color: #6B6B7A;');