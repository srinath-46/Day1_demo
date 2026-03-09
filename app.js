// --- Data for Teams & Drivers ---
const f1Teams = [
    {
        id: 'redbull',
        name: 'Red Bull Racing',
        base: 'Milton Keynes, UK',
        color: '#3671C6',
        drivers: [
            { name: 'Max Verstappen', number: 1, pts: 400 },
            { name: 'Sergio Perez', number: 11, pts: 250 }
        ],
        stats: { speed: 96, accel: 98, aero: 95 }
    },
    {
        id: 'mercedes',
        name: 'Mercedes-AMG',
        base: 'Brackley, UK',
        color: '#27F4D2',
        drivers: [
            { name: 'George Russell', number: 63, pts: 220 },
            { name: 'Lewis Hamilton', number: 44, pts: 215 }
        ],
        stats: { speed: 92, accel: 90, aero: 93 }
    },
    {
        id: 'ferrari',
        name: 'Scuderia Ferrari',
        base: 'Maranello, Italy',
        color: '#E8002D',
        drivers: [
            { name: 'Charles Leclerc', number: 16, pts: 280 },
            { name: 'Carlos Sainz', number: 55, pts: 260 }
        ],
        stats: { speed: 95, accel: 94, aero: 88 }
    },
    {
        id: 'mclaren',
        name: 'McLaren',
        base: 'Woking, UK',
        color: '#FF8000',
        drivers: [
            { name: 'Lando Norris', number: 4, pts: 290 },
            { name: 'Oscar Piastri', number: 81, pts: 200 }
        ],
        stats: { speed: 93, accel: 91, aero: 96 }
    },
    {
        id: 'astonmartin',
        name: 'Aston Martin',
        base: 'Silverstone, UK',
        color: '#229971',
        drivers: [
            { name: 'Fernando Alonso', number: 14, pts: 180 },
            { name: 'Lance Stroll', number: 18, pts: 60 }
        ],
        stats: { speed: 88, accel: 89, aero: 92 }
    },
    {
        id: 'alpine',
        name: 'Alpine F1 Team',
        base: 'Enstone, UK',
        color: '#FF87BC',
        drivers: [
            { name: 'Pierre Gasly', number: 10, pts: 85 },
            { name: 'Esteban Ocon', number: 31, pts: 80 }
        ],
        stats: { speed: 85, accel: 87, aero: 84 }
    },
    {
        id: 'williams',
        name: 'Williams Racing',
        base: 'Grove, UK',
        color: '#37BEDD',
        drivers: [
            { name: 'Alexander Albon', number: 23, pts: 45 },
            { name: 'Logan Sargeant', number: 2, pts: 5 }
        ],
        stats: { speed: 90, accel: 80, aero: 78 }
    },
    {
        id: 'rb',
        name: 'Visa Cash App RB',
        base: 'Faenza, Italy',
        color: '#1534CC',
        drivers: [
            { name: 'Yuki Tsunoda', number: 22, pts: 35 },
            { name: 'Daniel Ricciardo', number: 3, pts: 25 }
        ],
        stats: { speed: 84, accel: 86, aero: 82 }
    },
    {
        id: 'kicksauber',
        name: 'Kick Sauber',
        base: 'Hinwil, Switzerland',
        color: '#52E252',
        drivers: [
            { name: 'Valtteri Bottas', number: 77, pts: 10 },
            { name: 'Zhou Guanyu', number: 24, pts: 5 }
        ],
        stats: { speed: 82, accel: 80, aero: 75 }
    },
    {
        id: 'haas',
        name: 'Haas F1 Team',
        base: 'Kannapolis, USA',
        color: '#B6BABD',
        drivers: [
            { name: 'Nico Hulkenberg', number: 27, pts: 20 },
            { name: 'Kevin Magnussen', number: 20, pts: 15 }
        ],
        stats: { speed: 83, accel: 85, aero: 79 }
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader & Initialization ---
    const progress = document.getElementById('progress');
    const loader = document.getElementById('loader');

    gsap.to(progress, {
        width: '100%',
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loader.style.display = 'none';
                    initAnimations();
                    initThreeJS();
                }
            });
        }
    });

    // --- Dashboard Setup & Logic ---
    const teamsList = document.getElementById('teams-list');
    
    // Auto-generate buttons
    f1Teams.forEach((team, index) => {
        const btn = document.createElement('button');
        btn.className = `team-btn ${index === 0 ? 'active' : ''}`;
        btn.setAttribute('data-teamid', team.id);
        btn.innerHTML = `<span class="team-color" style="background: ${team.color};"></span> ${team.name}`;
        
        btn.addEventListener('click', () => {
            document.querySelectorAll('.team-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateDashboard(team);
        });
        
        teamsList.appendChild(btn);
    });

    // Initial Dashboard Population
    updateDashboard(f1Teams[0]);

    function updateDashboard(team) {
        // Timeline for smooth unified transition
        const tl = gsap.timeline();
        
        // Outro
        tl.to('.team-info', { opacity: 0, y: 10, duration: 0.2 })
          .call(() => {
              // Swap content
              document.getElementById('display-team-name').textContent = team.name;
              document.getElementById('display-team-base').textContent = `Base: ${team.base}`;
              
              const logoPlaceholder = document.getElementById('team-color-accent');
              logoPlaceholder.style.background = team.color;
              logoPlaceholder.style.boxShadow = `0 0 20px ${team.color}80`;

              // Driver 1
              document.getElementById('driver1-name').textContent = team.drivers[0].name;
              document.getElementById('driver1-num').textContent = team.drivers[0].number;
              document.getElementById('driver1-pts').textContent = team.drivers[0].pts;
              document.getElementById('driver1-num').style.color = team.color;

              // Driver 2
              document.getElementById('driver2-name').textContent = team.drivers[1].name;
              document.getElementById('driver2-num').textContent = team.drivers[1].number;
              document.getElementById('driver2-pts').textContent = team.drivers[1].pts;
              document.getElementById('driver2-num').style.color = team.color;

              // Update Stat colors and reset widths for animation
              ['stat-speed', 'stat-accel', 'stat-aero'].forEach(id => {
                  document.getElementById(id).style.background = team.color;
                  document.getElementById(id).style.boxShadow = `0 0 10px ${team.color}`;
              });
          })
          // Intro
          .to('.team-info', { opacity: 1, y: 0, duration: 0.3 })
          // Animate stat bars
          .to('#stat-speed', { width: `${team.stats.speed}%`, duration: 0.8, ease: "power2.out" }, "-=0.2")
          .to('#stat-accel', { width: `${team.stats.accel}%`, duration: 0.8, ease: "power2.out" }, "-=0.6")
          .to('#stat-aero', { width: `${team.stats.aero}%`, duration: 0.8, ease: "power2.out" }, "-=0.6");
    }

    // --- Hero Animations (GSAP) ---
    function initAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Entrance animation for hero text
        gsap.from('.hero-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
        gsap.from('.hero-subtitle', { y: 20, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
        gsap.from('.cta-btn', { y: 20, opacity: 0, duration: 1, delay: 0.5, ease: 'power3.out' });

        // Floating car animation
        gsap.to('#hero-car', {
            y: -20,
            rotation: 2,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        // Scroll Parallax for Car
        gsap.to('#hero-car', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 100,
            scale: 0.9,
            opacity: 0.5
        });
    }

    // --- Three.js Background Particles ---
    function initThreeJS() {
        const canvas = document.getElementById('bg-canvas');
        const scene = new THREE.Scene();

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Create Particles (Speed lines / Dust)
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
            // Create a tunnel effect
            posArray[i] = (Math.random() - 0.5) * 100;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0xaaaaaa,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) - 0.5;
            mouseY = (event.clientY / window.innerHeight) - 0.5;
        });

        // Animation Loop
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Rotate particles slowly
            particlesMesh.rotation.y = elapsedTime * 0.05;
            particlesMesh.rotation.z = elapsedTime * 0.02;

            // Slight parallax with mouse
            camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
});
