document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    const numWaves = 5;
    const numPoints = 1000;
    let time = 0;

    function createColorGradient(t) {
        const r = Math.sin(t * 0.5) * 127 + 128;
        const g = Math.sin(t * 0.5 + 2) * 127 + 128;
        const b = Math.sin(t * 0.5 + 4) * 127 + 128;
        return `rgba(${r}, ${g}, ${b}, 0.5)`;
    }

    function drawWave(amplitude, frequency, phase, color) {
        ctx.beginPath();
        for (let i = 0; i < numPoints; i++) {
            const x = (i / numPoints) * canvas.width;
            const y = canvas.height / 2 + 
                      amplitude * Math.sin(frequency * x + phase) *
                      Math.sin(x * 0.01 + time * 0.1) * // Add fractal-like modulation
                      (1 + 0.3 * Math.sin(x * 0.05 + time * 0.2)); // Add subtle variation
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing

        for (let i = 0; i < numWaves; i++) {
            const amplitude = 50 + 30 * Math.sin(time * 0.1 + i);
            const frequency = 0.01 + 0.005 * Math.sin(time * 0.05 + i * 0.5);
            const phase = time * 0.5 + i * Math.PI / 3;
            const color = createColorGradient(time * 0.1 + i);
            drawWave(amplitude, frequency, phase, color);
        }

        time += 0.05;
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', resizeCanvas);
});

// JavaScript: Change header styles on scroll
window.addEventListener('scroll', function() {
    var header = document.querySelector('header'); // Adjust the selector as needed
    var headerElements = header.querySelectorAll('*'); // Selects all child elements within the header

    if (window.scrollY > 50) { // Threshold value, adjust as needed
        header.style.backgroundColor = '#fff'; // Change header background to white
        headerElements.forEach(function(element) {
            element.style.color = '#222'; // Change text color of all elements to #222
        });
    } else {
        header.style.backgroundColor = ''; // Revert header background to original
        headerElements.forEach(function(element) {
            element.style.color = ''; // Revert text color of all elements to original
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
});