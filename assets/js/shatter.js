document.addEventListener("DOMContentLoaded", function() {

    // --- 1. LOAD THE FONT (NEW: IBM Plex Mono) ---
    // We inject this link so the browser downloads the font immediately
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400&display=swap';
    document.head.appendChild(fontLink);

    // --- 2. SETUP THE "NEW REALITY" ---
    const backgroundLayer = document.createElement('div');
    backgroundLayer.id = 'formless-contact';
    backgroundLayer.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        display: flex; flex-direction: column; justify-content: center; align-items: center;
        background: #fff; z-index: 0; text-align: center;
        /* NEW: Using IBM Plex Mono */
        font-family: 'IBM Plex Mono', monospace; 
        color: #111;
    `;
    
    // !!! EDIT THIS SECTION WITH YOUR REAL INFO !!!
    backgroundLayer.innerHTML = `
        <div style="max-width: 600px; padding: 20px;">
            <h2 style="font-weight: 300; letter-spacing: 2px; margin-bottom: 30px; font-size: 1.5rem;">douglas lavin</h2>
            
            <p style="margin: 8px 0; font-size: 1rem; font-weight: 400;">email: [lavin@mailbox.org]</p>
            <p style="margin: 8px 0; font-size: 1rem; font-weight: 400;">sms: [+447514822013]</p>
            
            <p style="margin-top: 40px; font-size: 0.75rem; color: #999;">(redirecting in 9 seconds...)</p>
        </div>
    `;
    document.body.prepend(backgroundLayer);

    // --- 3. TARGET THE CONTENT ---
    const content = document.querySelector('.wrapper') || document.querySelector('section') || document.body.children[1];
    
    if(content) {
        content.style.position = 'relative';
        content.style.zIndex = '10';
        content.style.background = 'white'; 
        content.style.minHeight = '100vh'; 
        content.style.transition = 'transform 0.1s';
        
        // Tremble effect
        content.addEventListener('mousemove', () => {
             content.style.transform = `translate(${Math.random() - 0.5}px, ${Math.random() - 0.5}px)`;
        });

        // --- 4. THE TRIGGER ---
        content.addEventListener('click', function(e) {
            if(content.classList.contains('exploding')) return;
            content.classList.add('exploding');

            // AUDIO
            try {
                const audio = new Audio('assets/audio/shatter.mp3');
                audio.volume = 0.8;
                audio.play().catch(e => console.log("Audio silent"));
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
                const density = 20; 
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
                        
                        // Physics: Swarm
                        const duration = 1.5 + Math.random(); 
                        shard.style.transition = `transform ${duration}s cubic-bezier(0.1, 0.9, 0.2, 1)`; 
                        
                        const ctx = shard.getContext('2d');
                        ctx.drawImage(canvas, x * width, y * height, width, height, 0, 0, width, height);
                        container.appendChild(shard);

                        // Physics: Scatter
                        const centerX = canvas.width / 2;
                        const distX = (x * width) - centerX;
                        const spreadX = distX * (1 + Math.random() * 2); 
                        
                        const floor = window.innerHeight;
                        const landY = floor - (Math.random() * 200) - 50; 
                        const rotate = (Math.random() - 0.5) * 720; 

                        requestAnimationFrame(() => {
                            shard.style.transform = `translate3d(${spreadX}px, ${landY - (y*height)}px, 0) rotate(${rotate}deg)`;
                        });
                    }
                }

                // NEW: REDIRECT TO FOG (7 Seconds)
                setTimeout(() => {
                    window.location.href = "https://formlessfog.org";
                }, 9260); 
            });
        });
    }
});
