document.addEventListener("DOMContentLoaded", function() {

    // --- 1. SETUP THE "NEW REALITY" (Hidden Background) ---
    const backgroundLayer = document.createElement('div');
    backgroundLayer.id = 'formless-contact';
    backgroundLayer.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        display: flex; flex-direction: column; justify-content: center; align-items: center;
        background: #fff; z-index: 0; text-align: center;
        font-family: 'Courier New', Courier, monospace; color: #111;
    `;
    
    // !!! EDIT THIS SECTION WITH YOUR REAL INFO !!!
    backgroundLayer.innerHTML = `
        <div style="max-width: 600px; padding: 20px;">
            <h2 style="font-weight: normal; letter-spacing: 4px; margin-bottom: 40px; font-size: 2rem;">DOUGLAS LAVIN</h2>
            <p style="margin: 10px 0; font-size: 1.2rem;">email: [Your Email Here]</p>
            <p style="margin: 10px 0; font-size: 1.2rem;">sms: [Your Phone Number]</p>
            <p style="margin-top: 40px; font-size: 0.8rem; color: #999;">(Redirecting to the fog in 12 seconds...)</p>
        </div>
    `;
    document.body.prepend(backgroundLayer);

    // --- 2. TARGET THE CONTENT ---
    // We try to grab the specific wrapper, or fallback to the second body element
    const content = document.querySelector('.wrapper') || document.querySelector('section') || document.body.children[1];
    
    if(content) {
        content.style.position = 'relative';
        content.style.zIndex = '10';
        content.style.background = 'white'; 
        content.style.minHeight = '100vh'; 
        content.style.transition = 'transform 0.1s';
        
        // Tremble effect on mouseover
        content.addEventListener('mousemove', () => {
             content.style.transform = `translate(${Math.random() - 0.5}px, ${Math.random() - 0.5}px)`;
        });

        // --- 3. THE TRIGGER ---
        content.addEventListener('click', function(e) {
            if(content.classList.contains('exploding')) return;
            content.classList.add('exploding');

            // AUDIO (Placeholder: Will fail silently if file is missing)
            try {
                const audio = new Audio('assets/audio/shatter.mp3');
                audio.volume = 0.8;
                audio.play().catch(e => console.log("Audio not ready yet"));
            } catch(err) { }

            // CAPTURE & STORM
            html2canvas(content, {scale: 1}).then(canvas => {
                // Hide original
                content.style.opacity = '0';
                content.style.pointerEvents = 'none';

                // Container
                const container = document.createElement('div');
                container.style.position = 'absolute';
                container.style.top = '0'; container.style.left = '0';
                container.style.width = '100%'; container.style.height = '100%';
                container.style.zIndex = '20';
                container.style.overflow = 'hidden';
                container.style.pointerEvents = 'none';
                document.body.appendChild(container);

                // PIXEL STORM SETTINGS
                const density = 20; // 20x20 grid = 400 particles (Best balance of Klee-visuals vs Performance)
                const width = canvas.width / density;
                const height = canvas.height / density;

                for(let x = 0; x < density; x++) {
                    for(let y = 0; y < density; y++) {
                        
                        const shard = document.createElement('canvas');
                        shard.width = width;
                        shard.height = height;
                        shard.style.position = 'absolute';
                        shard.style.left = (x * width) + 'px';
                        shard.style.top = (y * height) + 'px';
                        
                        // Physics: "Swarm" style
                        // Random delay (stagger) creates the fluid feeling
                        const duration = 1.5 + Math.random(); 
                        shard.style.transition = `transform ${duration}s cubic-bezier(0.1, 0.9, 0.2, 1)`; // "Pop" out then slow down
                        
                        const ctx = shard.getContext('2d');
                        ctx.drawImage(canvas, x * width, y * height, width, height, 0, 0, width, height);
                        container.appendChild(shard);

                        // --- CALCULATE SCATTER TRAJECTORY ---
                        
                        // 1. Explode OUT from center
                        const centerX = canvas.width / 2;
                        const distX = (x * width) - centerX;
                        const spreadX = distX * (1 + Math.random() * 2); // Blow outward
                        
                        // 2. Fall DOWN to floor
                        const floor = window.innerHeight;
                        const landY = floor - (Math.random() * 200) - 50; // Debris pile at bottom

                        // 3. Rotate wildly
                        const rotate = (Math.random() - 0.5) * 720; 

                        // Trigger animation next frame
                        requestAnimationFrame(() => {
                            shard.style.transform = `translate3d(${spreadX}px, ${landY - (y*height)}px, 0) rotate(${rotate}deg)`;
                            // NO FADE OUT. DEBRIS REMAINS.
                        });
                    }
                }

                // REDIRECT TO FOG
                setTimeout(() => {
                    window.location.href = "http://formlessfog.org";
                }, 12000); 
            });
        });
    }
});
