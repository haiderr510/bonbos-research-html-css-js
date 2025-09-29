// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Enhanced navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add active state to navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    // Function to update active nav link
    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);

    // Add click handlers to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Goal cards animation on scroll
    const goalCards = document.querySelectorAll('.goal-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    goalCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        cardObserver.observe(card);

        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
        });
    });

    // Content cards animation
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        cardObserver.observe(card);
    });

    // Header shadow on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
    });

    // Enhanced CTA button interaction
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            this.style.transform = 'translateY(-2px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
        });
    }

    // Reference links hover effect
    const referenceLinks = document.querySelectorAll('.reference a');
    referenceLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = '#007A3D';
        });

        link.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });

    // Mobile menu enhancement
    function handleMobileNavigation() {
        if (window.innerWidth <= 768) {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.gap = '1rem';
        }
    }

    window.addEventListener('resize', handleMobileNavigation);
    handleMobileNavigation();

    // Add loading animation to page
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';

    setTimeout(() => {
        document.body.style.transition = 'all 0.6s ease-out';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
});