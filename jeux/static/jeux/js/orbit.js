// Jeu de Trajectoire Orbitale - JavaScript CORRIGÉ
class OrbitGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        if (!this.canvas) {
            console.error('Canvas non trouvé !');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // État du jeu
        this.gameRunning = false;
        this.gamePaused = false;
        this.score = 0;
        this.timeLeft = 60;
        this.level = 1;
        this.timer = null;
        
        // Terra (le satellite)
        this.terra = {
            x: this.width / 2,
            y: this.height / 2,
            vx: 0,
            vy: 0,
            radius: 15,
            color: '#4ecdc4'
        };
        
        // Terre (au centre)
        this.earth = {
            x: this.width / 2,
            y: this.height / 2,
            radius: 80,
            color: '#2c5aa0'
        };
        
        // Orbite idéale
        this.idealOrbit = {
            radius: 150,
            centerX: this.width / 2,
            centerY: this.height / 2
        };
        
        // Débris spatiaux
        this.debris = [];
        this.dataPoints = [];
        
        // Contrôles
        this.keys = {};
        
        this.init();
    }
    
    init() {
        console.log('Initialisation du jeu Orbit...');
        this.setupEventListeners();
        this.generateDebris();
        this.generateDataPoints();
        this.gameLoop();
        console.log('Jeu initialisé avec succès');
    }
    
    setupEventListeners() {
        console.log('Configuration des événements...');
        
        // Boutons de contrôle
        const thrustLeft = document.getElementById('thrust-left');
        const thrustRight = document.getElementById('thrust-right');
        const thrustUp = document.getElementById('thrust-up');
        const thrustDown = document.getElementById('thrust-down');
        
        if (thrustLeft) thrustLeft.addEventListener('click', () => this.thrust('left'));
        if (thrustRight) thrustRight.addEventListener('click', () => this.thrust('right'));
        if (thrustUp) thrustUp.addEventListener('click', () => this.thrust('up'));
        if (thrustDown) thrustDown.addEventListener('click', () => this.thrust('down'));
        
        // Contrôles clavier
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning || this.gamePaused) return;
            
            this.keys[e.key] = true;
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.thrust('left');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.thrust('right');
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.thrust('up');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.thrust('down');
                    break;
            }
        });
        
        // Boutons de jeu
        const startBtn = document.getElementById('start-game');
        const pauseBtn = document.getElementById('pause-game');
        const restartBtn = document.getElementById('restart-game');
        
        if (startBtn) startBtn.addEventListener('click', () => this.startGame());
        if (pauseBtn) pauseBtn.addEventListener('click', () => this.togglePause());
        if (restartBtn) restartBtn.addEventListener('click', () => this.restartGame());
        
        console.log('Événements configurés');
    }
    
    startGame() {
        console.log('Démarrage du jeu...');
        this.gameRunning = true;
        this.gamePaused = false;
        this.startTimer();
        
        const startBtn = document.getElementById('start-game');
        const pauseBtn = document.getElementById('pause-game');
        
        if (startBtn) startBtn.disabled = true;
        if (pauseBtn) pauseBtn.disabled = false;
        
        console.log('Jeu démarré');
    }
    
    togglePause() {
        this.gamePaused = !this.gamePaused;
        const pauseBtn = document.getElementById('pause-game');
        if (pauseBtn) {
            pauseBtn.textContent = this.gamePaused ? 'Reprendre' : 'Pause';
        }
    }
    
    restartGame() {
        console.log('Redémarrage du jeu...');
        this.gameRunning = false;
        this.gamePaused = false;
        this.score = 0;
        this.timeLeft = 60;
        this.level = 1;
        
        // Reset Terra position
        this.terra.x = this.width / 2;
        this.terra.y = this.height / 2;
        this.terra.vx = 0;
        this.terra.vy = 0;
        
        this.debris = [];
        this.dataPoints = [];
        
        this.generateDebris();
        this.generateDataPoints();
        
        const startBtn = document.getElementById('start-game');
        const pauseBtn = document.getElementById('pause-game');
        const gameOverEl = document.getElementById('game-over');
        
        if (startBtn) startBtn.disabled = false;
        if (pauseBtn) {
            pauseBtn.disabled = true;
            pauseBtn.textContent = 'Pause';
        }
        if (gameOverEl) gameOverEl.style.display = 'none';
        
        this.updateUI();
        console.log('Jeu redémarré');
    }
    
    thrust(direction) {
        if (!this.gameRunning || this.gamePaused) return;
        
        const thrustPower = 0.3;
        
        switch(direction) {
            case 'left':
                this.terra.vx -= thrustPower;
                break;
            case 'right':
                this.terra.vx += thrustPower;
                break;
            case 'up':
                this.terra.vy -= thrustPower;
                break;
            case 'down':
                this.terra.vy += thrustPower;
                break;
        }
        
        // Limiter la vitesse immédiatement
        const maxSpeed = 2;
        const speed = Math.sqrt(this.terra.vx * this.terra.vx + this.terra.vy * this.terra.vy);
        if (speed > maxSpeed) {
            this.terra.vx = (this.terra.vx / speed) * maxSpeed;
            this.terra.vy = (this.terra.vy / speed) * maxSpeed;
        }
    }
    
    generateDebris() {
        this.debris = [];
        const debrisCount = 2 + this.level;
        
        for (let i = 0; i < debrisCount; i++) {
            let x, y;
            let attempts = 0;
            
            do {
                x = Math.random() * (this.width - 100) + 50;
                y = Math.random() * (this.height - 100) + 50;
                attempts++;
            } while (
                (Math.sqrt((x - this.terra.x) ** 2 + (y - this.terra.y) ** 2) < 80 ||
                 Math.sqrt((x - this.earth.x) ** 2 + (y - this.earth.y) ** 2) < this.earth.radius + 50) &&
                attempts < 30
            );
            
            this.debris.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * (0.5 + this.level * 0.2),
                vy: (Math.random() - 0.5) * (0.5 + this.level * 0.2),
                radius: 6 + Math.random() * 6,
                color: '#ff6b6b'
            });
        }
    }
    
    generateDataPoints() {
        this.dataPoints = [];
        const dataCount = 3 + this.level;
        
        for (let i = 0; i < dataCount; i++) {
            let x, y;
            let attempts = 0;
            
            do {
                x = Math.random() * (this.width - 100) + 50;
                y = Math.random() * (this.height - 100) + 50;
                attempts++;
            } while (
                Math.sqrt((x - this.earth.x) ** 2 + (y - this.earth.y) ** 2) < this.earth.radius + 60 &&
                attempts < 30
            );
            
            this.dataPoints.push({
                x: x,
                y: y,
                radius: 8,
                color: '#ffd700',
                collected: false,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }
    
    update() {
        if (!this.gameRunning || this.gamePaused) return;
        
        // Appliquer la gravité terrestre
        const dx = this.earth.x - this.terra.x;
        const dy = this.earth.y - this.terra.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > this.earth.radius + 10) {
            const gravity = 0.15 / (distance / 100);
            this.terra.vx += (dx / distance) * gravity;
            this.terra.vy += (dy / distance) * gravity;
        }
        
        // Limiter la vitesse
        const maxSpeed = 2.5;
        const speed = Math.sqrt(this.terra.vx * this.terra.vx + this.terra.vy * this.terra.vy);
        if (speed > maxSpeed) {
            this.terra.vx = (this.terra.vx / speed) * maxSpeed;
            this.terra.vy = (this.terra.vy / speed) * maxSpeed;
        }
        
        // Mettre à jour la position de Terra
        this.terra.x += this.terra.vx;
        this.terra.y += this.terra.vy;
        
        // Vérifier les collisions avec les bords
        if (this.terra.x < this.terra.radius || this.terra.x > this.width - this.terra.radius) {
            this.terra.vx *= -0.7;
            this.terra.x = Math.max(this.terra.radius, Math.min(this.width - this.terra.radius, this.terra.x));
        }
        if (this.terra.y < this.terra.radius || this.terra.y > this.height - this.terra.radius) {
            this.terra.vy *= -0.7;
            this.terra.y = Math.max(this.terra.radius, Math.min(this.height - this.terra.radius, this.terra.y));
        }
        
        // Mettre à jour les débris
        this.debris.forEach((debris, index) => {
            debris.x += debris.vx;
            debris.y += debris.vy;
            
            // Rebond sur les bords
            if (debris.x < debris.radius || debris.x > this.width - debris.radius) {
                debris.vx *= -0.8;
                debris.x = Math.max(debris.radius, Math.min(this.width - debris.radius, debris.x));
            }
            if (debris.y < debris.radius || debris.y > this.height - debris.radius) {
                debris.vy *= -0.8;
                debris.y = Math.max(debris.radius, Math.min(this.height - debris.radius, debris.y));
            }
            
            // Vérifier collision avec Terra
            const dx = this.terra.x - debris.x;
            const dy = this.terra.y - debris.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.terra.radius + debris.radius) {
                this.gameOver('Collision avec un débris spatial !');
                return;
            }
        });
        
        // Vérifier collection des données
        this.dataPoints.forEach(point => {
            if (!point.collected) {
                const dx = this.terra.x - point.x;
                const dy = this.terra.y - point.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.terra.radius + point.radius) {
                    point.collected = true;
                    this.score += 20;
                    
                    // Vérifier si toutes les données sont collectées
                    if (this.dataPoints.every(p => p.collected)) {
                        this.levelUp();
                    }
                }
            }
        });
        
        // Vérifier collision avec la Terre
        const earthDx = this.terra.x - this.earth.x;
        const earthDy = this.terra.y - this.earth.y;
        const earthDistance = Math.sqrt(earthDx * earthDx + earthDy * earthDy);
        
        if (earthDistance < this.earth.radius + this.terra.radius) {
            this.gameOver('Collision avec la Terre !');
        }
        
        this.updateUI();
    }
    
    levelUp() {
        this.level++;
        this.score += 100;
        this.timeLeft += 20;
        this.generateDebris();
        this.generateDataPoints();
        
        // Réinitialiser Terra au centre
        this.terra.x = this.width / 2;
        this.terra.y = this.height / 2;
        this.terra.vx = 0;
        this.terra.vy = 0;
    }
    
    gameOver(message) {
        console.log('Game Over:', message);
        this.gameRunning = false;
        this.stopTimer();
        
        const finalScoreEl = document.getElementById('final-score');
        const gameOverMessageEl = document.getElementById('game-over-message');
        const gameOverEl = document.getElementById('game-over');
        
        if (finalScoreEl) finalScoreEl.textContent = this.score;
        if (gameOverMessageEl) gameOverMessageEl.textContent = message;
        if (gameOverEl) gameOverEl.style.display = 'block';
        
        const startBtn = document.getElementById('start-game');
        const pauseBtn = document.getElementById('pause-game');
        
        if (startBtn) startBtn.disabled = false;
        if (pauseBtn) pauseBtn.disabled = true;
        
        this.saveScore();
    }
    
    saveScore() {
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value || 
                         document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
        
        fetch('/jeux/sauvegarder-score/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken || ''
            },
            body: JSON.stringify({
                joueur: 'Joueur Orbit',
                type_jeu: 'orbit',
                score: this.score,
                niveau: this.level,
                temps: 60 - this.timeLeft,
                data_collected: this.dataPoints.filter(p => p.collected).length
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Score sauvegardé:', data);
            }
        })
        .catch(error => console.error('Erreur sauvegarde:', error));
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            if (this.gameRunning && !this.gamePaused) {
                this.timeLeft--;
                if (this.timeLeft <= 0) {
                    this.gameOver('Temps écoulé !');
                    this.stopTimer();
                }
            }
            this.updateUI();
        }, 1000);
    }
    
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    updateUI() {
        const scoreEl = document.getElementById('score');
        const timerEl = document.getElementById('timer');
        const levelEl = document.getElementById('level');
        
        if (scoreEl) scoreEl.textContent = this.score;
        if (timerEl) timerEl.textContent = this.timeLeft;
        if (levelEl) levelEl.textContent = this.level;
    }
    
    render() {
        // Effacer le canvas
        this.ctx.fillStyle = '#0a0a2a';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Dessiner l'orbite idéale
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(this.idealOrbit.centerX, this.idealOrbit.centerY, this.idealOrbit.radius, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Dessiner la Terre
        this.ctx.fillStyle = this.earth.color;
        this.ctx.beginPath();
        this.ctx.arc(this.earth.x, this.earth.y, this.earth.radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Dessiner les données scientifiques
        this.dataPoints.forEach(point => {
            if (!point.collected) {
                point.pulse += 0.1;
                const pulseRadius = point.radius + Math.sin(point.pulse) * 1;
                
                this.ctx.fillStyle = point.color;
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, pulseRadius, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
        
        // Dessiner les débris
        this.debris.forEach(debris => {
            this.ctx.fillStyle = debris.color;
            this.ctx.beginPath();
            this.ctx.arc(debris.x, debris.y, debris.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Dessiner Terra
        this.ctx.fillStyle = this.terra.color;
        this.ctx.beginPath();
        this.ctx.arc(this.terra.x, this.terra.y, this.terra.radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Dessiner la trajectoire
        this.ctx.strokeStyle = 'rgba(78, 205, 196, 0.6)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(this.terra.x, this.terra.y);
        this.ctx.lineTo(this.terra.x + this.terra.vx * 15, this.terra.y + this.terra.vy * 15);
        this.ctx.stroke();
    }
    
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialiser le jeu quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé, initialisation du jeu...');
    try {
        new OrbitGame();
    } catch (error) {
        console.error('Erreur lors de l\'initialisation du jeu:', error);
    }
});