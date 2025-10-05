// Puzzle d'Images Satellitaires - JavaScript
class SatellitePuzzle {
    constructor() {
        this.puzzles = [
            {
                title: "Ouragan Katrina",
                description: "Image satellite de l'ouragan Katrina capturée par MODIS en 2005",
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iY2xvdWRzIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzMzNjZmZiIvPjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjgiIGZpbGw9IiNjY2MiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMzMzIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iNzUiIHI9IjQwIiBmaWxsPSJ1cmwoI2Nsb3VkcykiLz48dGV4dCB4PSIxMDAiIHk9IjE0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1zaXplPSIxMiI+T3VyYWdhbiBLYXRyaW5hPC90ZXh0Pjwvc3ZnPg==",
                pattern: "hurricane"
            },
            {
                title: "Déforestation Amazonie",
                description: "Comparaison avant/après de la déforestation en Amazonie",
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzMzNjYzMyIvPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNjY5OTY2Ii8+PHJlY3QgeD0iMTAwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzg4NTU0NCIvPjx0ZXh0IHg9IjEwMCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjEyIj5BbWF6b25pZTwvdGV4dD48L3N2Zz4=",
                pattern: "deforestation"
            },
            {
                title: "Éruption Volcanique",
                description: "Éruption volcanique observée depuis l'espace par Terra",
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzMzMzMzMyIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEyMCIgcj0iMjAiIGZpbGw9IiNmZjY2NjYiLz48ZWxsaXBzZSBjeD0iMTAwIiBjeT0iMTAwIiByeD0iNDAiIHJ5PSI2MCIgZmlsbD0iI2ZmOTk2NiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjEyIj5Wb2xjYW48L3RleHQ+PC9zdmc+",
                pattern: "volcano"
            },
            {
                title: "Feux de Forêt",
                description: "Détection des feux de forêt par les capteurs infrarouges",
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzMzNjYzMyIvPjxjaXJjbGUgY3g9IjgwIiBjeT0iNjAiIHI9IjE1IiBmaWxsPSIjZmY2NjY2Ii8+PGNpcmNsZSBjeD0iMTIwIiBjeT0iOTAiIHI9IjEyIiBmaWxsPSIjZmY5OTY2Ii8+PGNpcmNsZSBjeD0iMTQwIiBjeT0iNDAiIHI9IjEwIiBmaWxsPSIjZmY0NDQ0Ii8+PHRleHQgeD0iMTAwIiB5PSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiIGZvbnQtc2l6ZT0iMTIiPkZldXggZGUgRm9yw6p0PC90ZXh0Pjwvc3ZnPg==",
                pattern: "fire"
            },
            {
                title: "Tempête de Sable",
                description: "Tempête de sable du Sahara observée depuis l'espace",
                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzMzMzMzMyIvPjxlbGxpcHNlIGN4PSIxMDAiIGN5PSI3NSIgcng9IjgwIiByeT0iNDAiIGZpbGw9IiNmZmNjNjYiIG9wYWNpdHk9IjAuNyIvPjx0ZXh0IHg9IjEwMCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjEyIj5TYWhhcmE8L3RleHQ+PC9zdmc+",
                pattern: "sandstorm"
            }
        ];
        
        this.currentPuzzle = 0;
        this.puzzleSize = 3;
        this.score = 0;
        this.timeLeft = 300;
        this.gameRunning = false;
        this.puzzleBoard = [];
        this.emptyPosition = { row: 0, col: 0 };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadPuzzle();
        this.startTimer();
    }
    
    setupEventListeners() {
        // Sélecteur de difficulté
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.puzzleSize = parseInt(e.target.dataset.size);
                this.loadPuzzle();
            });
        });
        
        // Boutons de contrôle
        document.getElementById('shuffle-puzzle').addEventListener('click', () => this.shufflePuzzle());
        document.getElementById('solve-puzzle').addEventListener('click', () => this.solvePuzzle());
        document.getElementById('next-puzzle').addEventListener('click', () => this.nextPuzzle());
    }
    
    loadPuzzle() {
        const puzzle = this.puzzles[this.currentPuzzle];
        
        document.getElementById('target-image').src = puzzle.image;
        document.getElementById('puzzle-title').textContent = puzzle.title;
        document.getElementById('puzzle-description').textContent = puzzle.description;
        
        this.createPuzzleBoard();
        this.shufflePuzzle();
    }
    
    createPuzzleBoard() {
        const board = document.getElementById('puzzle-board');
        board.innerHTML = '';
        board.style.gridTemplateColumns = `repeat(${this.puzzleSize}, 1fr)`;
        
        this.puzzleBoard = [];
        const totalPieces = this.puzzleSize * this.puzzleSize;
        
        for (let i = 0; i < this.puzzleSize; i++) {
            this.puzzleBoard[i] = [];
            for (let j = 0; j < this.puzzleSize; j++) {
                const piece = document.createElement('div');
                piece.className = 'puzzle-piece';
                piece.dataset.row = i;
                piece.dataset.col = j;
                
                if (i === this.puzzleSize - 1 && j === this.puzzleSize - 1) {
                    piece.classList.add('empty');
                    piece.textContent = '';
                    this.emptyPosition = { row: i, col: j };
                } else {
                    piece.textContent = i * this.puzzleSize + j + 1;
                }
                
                piece.addEventListener('click', () => this.movePiece(i, j));
                board.appendChild(piece);
                
                this.puzzleBoard[i][j] = {
                    element: piece,
                    value: i === this.puzzleSize - 1 && j === this.puzzleSize - 1 ? 0 : i * this.puzzleSize + j + 1
                };
            }
        }
    }
    
    movePiece(row, col) {
        if (!this.gameRunning) return;
        
        const emptyRow = this.emptyPosition.row;
        const emptyCol = this.emptyPosition.col;
        
        // Vérifier si la pièce est adjacente à la case vide
        const isAdjacent = (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
                          (Math.abs(col - emptyCol) === 1 && row === emptyRow);
        
        if (isAdjacent) {
            // Échanger les positions
            const piece = this.puzzleBoard[row][col];
            const emptyPiece = this.puzzleBoard[emptyRow][emptyCol];
            
            // Mettre à jour les éléments DOM
            piece.element.classList.add('empty');
            piece.element.textContent = '';
            emptyPiece.element.classList.remove('empty');
            emptyPiece.element.textContent = piece.value;
            
            // Mettre à jour le tableau
            emptyPiece.value = piece.value;
            piece.value = 0;
            
            // Mettre à jour la position vide
            this.emptyPosition = { row: row, col: col };
            
            // Vérifier si le puzzle est résolu
            if (this.isPuzzleSolved()) {
                this.puzzleSolved();
            }
        }
    }
    
    shufflePuzzle() {
        this.gameRunning = true;
        document.getElementById('next-puzzle').disabled = true;
        document.getElementById('puzzle-complete').style.display = 'none';
        
        // Effectuer des mouvements aléatoires
        for (let i = 0; i < 1000; i++) {
            const possibleMoves = this.getPossibleMoves();
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            this.movePiece(randomMove.row, randomMove.col);
        }
    }
    
    getPossibleMoves() {
        const moves = [];
        const emptyRow = this.emptyPosition.row;
        const emptyCol = this.emptyPosition.col;
        
        // Vérifier les 4 directions
        const directions = [
            { row: emptyRow - 1, col: emptyCol },
            { row: emptyRow + 1, col: emptyCol },
            { row: emptyRow, col: emptyCol - 1 },
            { row: emptyRow, col: emptyCol + 1 }
        ];
        
        directions.forEach(dir => {
            if (dir.row >= 0 && dir.row < this.puzzleSize &&
                dir.col >= 0 && dir.col < this.puzzleSize) {
                moves.push(dir);
            }
        });
        
        return moves;
    }
    
    solvePuzzle() {
        // Solution simple : remettre les pièces dans l'ordre
        for (let i = 0; i < this.puzzleSize; i++) {
            for (let j = 0; j < this.puzzleSize; j++) {
                if (i === this.puzzleSize - 1 && j === this.puzzleSize - 1) {
                    this.puzzleBoard[i][j].element.classList.add('empty');
                    this.puzzleBoard[i][j].element.textContent = '';
                    this.puzzleBoard[i][j].value = 0;
                } else {
                    const value = i * this.puzzleSize + j + 1;
                    this.puzzleBoard[i][j].element.classList.remove('empty');
                    this.puzzleBoard[i][j].element.textContent = value;
                    this.puzzleBoard[i][j].value = value;
                }
            }
        }
        
        this.emptyPosition = { row: this.puzzleSize - 1, col: this.puzzleSize - 1 };
        this.puzzleSolved();
    }
    
    isPuzzleSolved() {
        for (let i = 0; i < this.puzzleSize; i++) {
            for (let j = 0; j < this.puzzleSize; j++) {
                const expectedValue = i === this.puzzleSize - 1 && j === this.puzzleSize - 1 ? 0 : i * this.puzzleSize + j + 1;
                if (this.puzzleBoard[i][j].value !== expectedValue) {
                    return false;
                }
            }
        }
        return true;
    }
    
    puzzleSolved() {
        this.gameRunning = false;
        const timeBonus = Math.max(0, this.timeLeft * 2);
        const difficultyBonus = this.puzzleSize * 50;
        const puzzleScore = 100 + timeBonus + difficultyBonus;
        
        this.score += puzzleScore;
        
        document.getElementById('puzzle-score').textContent = puzzleScore;
        document.getElementById('puzzle-complete').style.display = 'block';
        document.getElementById('next-puzzle').disabled = false;
        
        this.updateUI();
    }
    
    nextPuzzle() {
        this.currentPuzzle = (this.currentPuzzle + 1) % this.puzzles.length;
        this.timeLeft = 300;
        this.loadPuzzle();
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            if (this.gameRunning) {
                this.timeLeft--;
                if (this.timeLeft <= 0) {
                    this.gameRunning = false;
                    alert('Temps écoulé ! Le puzzle sera automatiquement résolu.');
                    this.solvePuzzle();
                }
            }
            this.updateUI();
        }, 1000);
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('timer').textContent = this.timeLeft;
        document.getElementById('puzzle-number').textContent = this.currentPuzzle + 1;
    }
}

// Initialiser le puzzle
document.addEventListener('DOMContentLoaded', () => {
    new SatellitePuzzle();
});
