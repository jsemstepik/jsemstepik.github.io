document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            initAnimations();
            initTerminal();
        }, 500);
    }, 1500);

    // Language switcher
    const languageSwitcher = document.getElementById('languageSwitcher');
    const englishContent = document.getElementById('englishContent');
    const czechContent = document.getElementById('czechContent');
    
    languageSwitcher.addEventListener('click', function() {
        if (englishContent.style.display !== 'none') {
            englishContent.style.display = 'none';
            czechContent.style.display = 'block';
            languageSwitcher.classList.add('active');
            languageSwitcher.innerHTML = '<i class="fas fa-language"></i><span>English</span>';
            document.documentElement.lang = 'cs';
        } else {
            englishContent.style.display = 'block';
            czechContent.style.display = 'none';
            languageSwitcher.classList.remove('active');
            languageSwitcher.innerHTML = '<i class="fas fa-language"></i><span>Česky</span>';
            document.documentElement.lang = 'en';
        }
    });

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

function initAnimations() {
    // Animate stats counters
    animateValue('coffeeCounter', 0, 127, 2000);
    animateValue('projectCounter', 0, 15, 1500);
    animateValue('codeCounter', 0, 5000, 2500);

    // Animate skill levels
    document.querySelectorAll('.skill-level').forEach(el => {
        const level = el.getAttribute('data-level');
        el.style.width = '0';
        setTimeout(() => {
            el.style.width = level + '%';
        }, 500);
    });

    // Animate learning progress
    document.querySelectorAll('.learning-progress').forEach(el => {
        const target = el.getAttribute('data-target');
        const percentElement = el.parentElement.querySelector('.learning-percent');
        
        el.style.width = '0';
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.style.width = current + '%';
            percentElement.textContent = Math.floor(current) + '%';
        }, 20);
    });
}

function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function initTerminal() {
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');
    
    const commands = {
        'help': 'Available commands: about, projects, skills, contact, clear',
        'about': 'I\'m Štěpán, a 13-year-old developer from Czech Republic. I love coding, gaming and everything tech!',
        'projects': 'Check out my projects above or visit my GitHub: https://github.com/jsemstepik',
        'skills': 'My skills include: HTML, CSS, JavaScript, Unity, Blender and more!',
        'contact': 'You can reach me via email: stepan.semrad@centrum.cz',
        'clear': () => { terminalOutput.innerHTML = ''; return ''; },
        'secret': '01010100 01101000 01100001 01101110 01101011 01110011 00100000 01100110 01101111 01110010 00100000 01110110 01101001 01110011 01101001 01110100 01101001 01101110 01100111 00100001'
    };
    
    terminalInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = terminalInput.value.toLowerCase().trim();
            terminalInput.value = '';
            
            // Add command to output
            const commandElement = document.createElement('div');
            commandElement.textContent = '> ' + command;
            terminalOutput.appendChild(commandElement);
            
            // Process command
            const responseElement = document.createElement('div');
            if (commands[command]) {
                if (typeof commands[command] === 'function') {
                    commands[command]();
                } else {
                    responseElement.textContent = commands[command];
                    terminalOutput.appendChild(responseElement);
                }
            } else if (command) {
                responseElement.textContent = 'Command not found. Type "help" for available commands.';
                terminalOutput.appendChild(responseElement);
            }
            
            // Scroll to bottom
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });
    
    // Matrix rain effect
    const chars = "01";
    const matrixRain = document.getElementById('matrixRain');
    
    function createMatrixStream() {
        const stream = document.createElement('div');
        stream.style.position = 'absolute';
        stream.style.top = '-50px';
        stream.style.left = Math.random() * 100 + 'vw';
        stream.style.color = 'var(--matrix-green)';
        stream.style.fontSize = (10 + Math.random() * 10) + 'px';
        stream.style.opacity = Math.random() * 0.5;
        stream.style.fontFamily = 'monospace';
        stream.style.whiteSpace = 'nowrap';
        stream.style.writingMode = 'vertical-rl';
        stream.style.textOrientation = 'mixed';
        
        let content = '';
        for (let i = 0; i < 20; i++) {
            content += chars.charAt(Math.floor(Math.random() * chars.length)) + '<br>';
        }
        
        stream.innerHTML = content;
        matrixRain.appendChild(stream);
        
        let pos = -50;
        const speed = 2 + Math.random() * 3;
        
        const fall = setInterval(() => {
            pos += speed;
            stream.style.top = pos + 'px';
            
            if (pos > window.innerHeight) {
                clearInterval(fall);
                stream.remove();
            }
        }, 30);
    }
    
    // Reduce matrix rain intensity on mobile
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    setInterval(createMatrixStream, isMobile ? 300 : 100);
    
    // Glitch effect intensity
    document.addEventListener('mousemove', (e) => {
        const glitch = document.querySelector('.glitch');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        glitch.style.opacity = 0.05 + (x * 0.1);
        glitch.style.animationDuration = 3 + (y * 7) + 's';
    });
    
    // Easter egg
    console.log('%c Looking for easter eggs? Try typing "secret" in the terminal!', 'color: #00ff4c; font-family: monospace;');
}
