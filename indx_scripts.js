document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const fadeElems = document.querySelectorAll('.product-card, .benefit-item, .about-item');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeInUp');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(elem => fadeObserver.observe(elem));

    // Parallax effect for hero section
    const hero = document.querySelector('#hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

    // Sticky header
    const header = document.querySelector('header');
    const headerObserver = new IntersectionObserver(
        ([e]) => e.target.classList.toggle('is-pinned', e.intersectionRatio < 1),
        { threshold: [1] }
    );

    headerObserver.observe(header);

    // Form submission for newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        // Here you would typically send this to your server
        console.log(`Subscribed with email: ${email}`);
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });

    // Testimonial carousel (if multiple testimonials)
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showNextTestimonial() {
        testimonials[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }

    if (testimonials.length > 1) {
        setInterval(showNextTestimonial, 5000); // Change testimonial every 5 seconds
    }

    // Interactive product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.03)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});