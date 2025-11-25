document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined') {

        // Initial Fade In Sequence - Slower, heavier
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } }); // Power2 is smoother/heavier than Power3

        // Left Panel Elements
        tl.from("#left-panel .brand-row", {
            y: 30,
            opacity: 0,
            duration: 1.2
        })
            .from("#left-panel h1", {
                y: 40,
                opacity: 0,
                duration: 1.4
            }, "-=1.0")
            .from("#left-panel p", {
                y: 30,
                opacity: 0,
                duration: 1.2
            }, "-=1.0")
            .from("#left-panel .stats-row", {
                y: 30,
                opacity: 0,
                duration: 1.2
            }, "-=1.0");

        // Right Panel Elements
        tl.from("#right-panel section", {
            y: 50,
            opacity: 0,
            duration: 1.5,
            stagger: 0.25
        }, "-=0.8");

        // Mouse Parallax for Background Gradients - Very subtle
        const rightPanel = document.getElementById('right-panel');

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 15; // Reduced movement range
            const y = (e.clientY / window.innerHeight - 0.5) * 15;

            // Move gradient blobs
            gsap.to('.bg-blob', {
                x: x,
                y: y,
                duration: 3, // Slower follow
                ease: "power1.out"
            });

            // Subtle tilt for glass panel content on desktop only
            if (window.innerWidth > 1024) {
                const tiltX = (e.clientX / window.innerWidth - 0.5) * 3; // Reduced tilt
                const tiltY = (e.clientY / window.innerHeight - 0.5) * 3;

                gsap.to('.glass-content', {
                    x: -tiltX,
                    y: -tiltY,
                    duration: 2,
                    ease: "power1.out"
                });
            }
        });
    }
});
