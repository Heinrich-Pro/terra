// Memory Spatial - JavaScript
class SpatialMemory {
    constructor() {
        this.cards = [
            { id: 1, content: '🛰️', name: 'Terra', description: 'Satellite Terra' },
            { id: 2, content: '🌍', name: 'Terre', description: 'Planète Terre' },
            { id: 3, content: '📡', name: 'MODIS', description: 'Instrument MODIS' },
            { id: 4, content: '🌡️', name: 'CERES', description: 'Instrument CERES' },
            { id: 5, content: '🔬', name: 'MOPITT', description: 'Instrument MOPITT' },
            { id: 6, content: '📊', name: 'MISR', description: 'Instrument MISR' },
            { id: 7, content: '🗺️', name: 'ASTER', description: 'Instrument ASTER' },
            { id: 8, content: '🌪️', name: 'Ouragan', description: 'Ouragan observé' },
            { id: 9, content: '🌋', name: 'Volcan', description: 'Éruption volcanique' },
            { id: 10, content: '🔥', name: 'Feu', description: 'Feux de forêt' },
            { id: 11, content: '🌊', name: 'Océan', description: 'Température océan' },
            { id: 12, content: '🌫️', name: 'Pollution', description: 'Pollution atmosphérique' },
            { id: 13, content: '🌱', name: 'Végétation', description: 'Couverture végétale' },
            { id: 14, content: '❄️', name: 'Glace', description: 'Calottes polaires' },
            { id: 15, content: '☁️', name: 'Nuages', description: 'Formation nuageuse' },
            { id: 16, content: '🌡️', name: 'Climat', description: 'Changement climatique' }
        ];
        
        this.boardSize = 4;
        this.gameBoard = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.score = 0;
        this.timeLeft = 120;
        this.gameRunning = false;
        this.startTime = 0;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.createBoard();
        this.startTimer();
    }
    
    setupEventListeners() {
        // Sélecteur de difficulté
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.boardSize = parseInt(e.target.dataset.size);
                this.createBoard();
            });
        });
        
        // Boutons de contrôle
        document.getElementById('start-memory').addEventListener('click', () => this.startGame());
        document.getElementById('shuffle-memory').addEventListener('click', () => this.shuffleCards());
        document.getElementById('restart-memory').addEventListener('click', () => this.restartGame());
    }
    
    createBoard() {
        const board = document.getElementById('memory-board');
        board.innerHTML = '';
        board.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;
        
        // Sélectionner les cartes pour ce niveau
        const totalCards = this.boardSize * this.boardSize;
        const pairsNeeded = totalCards / 2;
        const selectedCards = this.cards.slice(0, pairsNeeded);
        
        // Créer les paires
        const gameCards = [];
        selectedCards.forEach(card => {
            gameCards.push({ ...card, pairId: card.id });
            gameCards.push({ ...card, pairId: card.id });
        });
        
        // Mélanger les cartes
        this.shuffleArray(gameCards);
        
        // Créer le plateau de jeu
        this.gameBoard = [];
        gameCards.forEach((card, index) => {
            const row = Math.floor(index / this.boardSize);
            const col = index % this.boardSize;
            
            if (!this.gameBoard[row]) this.gameBoard[row] = [];
            
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.dataset.row = row;
            cardElement.dataset.col = col;
            cardElement.dataset.pairId = card.pairId;
            
            cardElement.innerHTML = `
                <div class="card-content">
                    <div style="font-size: 2em;">${card.content}</div>
                    <div style="font-size: 0.8em; margin-top: 5px;">${card.name}</div>
                </div>
            `;
            
            cardElement.addEventListener('click', () => this.flipCard(row, col));
            board.appendChild(cardElement);
            
            this.gameBoard[row][col] = {
                element: cardElement,
                card: card,
                flipped: false,
                matched: false
            };
        });
        
        this.matchedPairs = 0;
        this.flippedCards = [];
        this.updateUI();
    }
    
    shuffleCards() {
        if (!this.gameRunning) return;
        
        // Retourner toutes les cartes
        this.gameBoard.forEach(row => {
            row.forEach(cell => {
                cell.flipped = false;
                cell.matched = false;
                cell.element.classList.remove('flipped', 'matched');
            });
        });
        
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.updateUI();
    }
    
    startGame() {
        this.gameRunning = true;
        this.startTime = Date.now();
        document.getElementById('start-memory').disabled = true;
    }
    
    restartGame() {
        this.gameRunning = false;
        this.score = 0;
        this.timeLeft = 120;
        this.matchedPairs = 0;
        this.flippedCards = [];
        
        document.getElementById('start-memory').disabled = false;
        document.getElementById('memory-complete').style.display = 'none';
        
        this.createBoard();
    }
    
    flipCard(row, col) {
        if (!this.gameRunning) return;
        
        const cell = this.gameBoard[row][col];
        
        if (cell.flipped || cell.matched || this.flippedCards.length >= 2) {
            return;
        }
        
        cell.flipped = true;
        cell.element.classList.add('flipped');
        this.flippedCards.push({ row, col });
        
        if (this.flippedCards.length === 2) {
            setTimeout(() => this.checkMatch(), 1000);
        }
    }
    
    checkMatch() {
        const [card1, card2] = this.flippedCards;
        const cell1 = this.gameBoard[card1.row][card1.col];
        const cell2 = this.gameBoard[card2.row][card2.col];
        
        if (cell1.card.pairId === cell2.card.pairId) {
            // Match trouvé !
            cell1.matched = true;
            cell2.matched = true;
            cell1.element.classList.add('matched');
            cell2.element.classList.add('matched');
            
            this.matchedPairs++;
            
            // Calculer le score
            const timeBonus = Math.max(0, this.timeLeft);
            const matchScore = 50 + timeBonus;
            this.score += matchScore;
            
            // Vérifier si le jeu est terminé
            const totalPairs = (this.boardSize * this.boardSize) / 2;
            if (this.matchedPairs === totalPairs) {
                this.gameComplete();
            }
        } else {
            // Pas de match, retourner les cartes
            cell1.flipped = false;
            cell2.flipped = false;
            cell1.element.classList.remove('flipped');
            cell2.element.classList.remove('flipped');
        }
        
        this.flippedCards = [];
        this.updateUI();
    }
    
    gameComplete() {
        this.gameRunning = false;
        const endTime = Date.now();
        const totalTime = Math.floor((endTime - this.startTime) / 1000);
        
        // Bonus de temps
        const timeBonus = this.timeLeft * 5;
        this.score += timeBonus;
        
        // Bonus de difficulté
        const difficultyBonus = this.boardSize * 100;
        this.score += difficultyBonus;
        
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('final-time').textContent = totalTime;
        document.getElementById('memory-complete').style.display = 'block';
        
        document.getElementById('start-memory').disabled = false;
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            if (this.gameRunning) {
                this.timeLeft--;
                if (this.timeLeft <= 0) {
                    this.gameRunning = false;
                    alert('Temps écoulé ! Jeu terminé.');
                    document.getElementById('start-memory').disabled = false;
                }
            }
            this.updateUI();
        }, 1000);
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('timer').textContent = this.timeLeft;
        document.getElementById('pairs-found').textContent = this.matchedPairs;
    }
}

// Initialiser le memory
document.addEventListener('DOMContentLoaded', () => {
    new SpatialMemory();
});
