class Tetris {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.nextCanvas = document.getElementById('next-canvas');
        this.nextCtx = this.nextCanvas.getContext('2d');
        
        this.BOARD_WIDTH = 10;
        this.BOARD_HEIGHT = 20;
        this.BLOCK_SIZE = 30;
        
        this.board = this.createBoard();
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.dropTime = 0;
        this.dropInterval = 1000;
        
        this.currentPiece = null;
        this.nextPiece = null;
        this.gameOver = false;
        this.paused = false;
        
        this.colors = [
            '#000000', // 空
            '#FF0000', // I
            '#00FF00', // O
            '#0000FF', // T
            '#FFFF00', // S
            '#FF00FF', // Z
            '#00FFFF', // J
            '#FFA500'  // L
        ];
        
        this.pieces = {
            I: [
                [0,0,0,0],
                [1,1,1,1],
                [0,0,0,0],
                [0,0,0,0]
            ],
            O: [
                [2,2],
                [2,2]
            ],
            T: [
                [0,3,0],
                [3,3,3],
                [0,0,0]
            ],
            S: [
                [0,4,4],
                [4,4,0],
                [0,0,0]
            ],
            Z: [
                [5,5,0],
                [0,5,5],
                [0,0,0]
            ],
            J: [
                [6,0,0],
                [6,6,6],
                [0,0,0]
            ],
            L: [
                [0,0,7],
                [7,7,7],
                [0,0,0]
            ]
        };
        
        this.init();
    }
    
    createBoard() {
        return Array(this.BOARD_HEIGHT).fill().map(() => Array(this.BOARD_WIDTH).fill(0));
    }
    
    init() {
        this.nextPiece = this.createPiece();
        this.spawnPiece();
        this.updateDisplay();
        this.bindEvents();
        this.gameLoop();
    }
    
    createPiece() {
        const pieces = Object.keys(this.pieces);
        const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
        return {
            shape: this.pieces[randomPiece],
            x: Math.floor(this.BOARD_WIDTH / 2) - Math.floor(this.pieces[randomPiece][0].length / 2),
            y: 0
        };
    }
    
    spawnPiece() {
        this.currentPiece = this.nextPiece;
        this.nextPiece = this.createPiece();
        
        if (this.collision()) {
            this.gameOver = true;
            this.showGameOver();
        }
        
        this.drawNextPiece();
    }  
  
    collision() {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x] !== 0) {
                    const newX = this.currentPiece.x + x;
                    const newY = this.currentPiece.y + y;
                    
                    if (newX < 0 || newX >= this.BOARD_WIDTH || 
                        newY >= this.BOARD_HEIGHT ||
                        (newY >= 0 && this.board[newY][newX] !== 0)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    rotate() {
        const rotated = this.currentPiece.shape[0].map((_, i) =>
            this.currentPiece.shape.map(row => row[i]).reverse()
        );
        
        const originalShape = this.currentPiece.shape;
        this.currentPiece.shape = rotated;
        
        if (this.collision()) {
            this.currentPiece.shape = originalShape;
        }
    }
    
    move(dx, dy) {
        this.currentPiece.x += dx;
        this.currentPiece.y += dy;
        
        if (this.collision()) {
            this.currentPiece.x -= dx;
            this.currentPiece.y -= dy;
            return false;
        }
        return true;
    }
    
    hardDrop() {
        while (this.move(0, 1)) {}
        this.placePiece();
    }
    
    placePiece() {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x] !== 0) {
                    const boardY = this.currentPiece.y + y;
                    const boardX = this.currentPiece.x + x;
                    
                    if (boardY >= 0) {
                        this.board[boardY][boardX] = this.currentPiece.shape[y][x];
                    }
                }
            }
        }
        
        this.clearLines();
        this.spawnPiece();
    }
    
    clearLines() {
        let linesCleared = 0;
        
        for (let y = this.BOARD_HEIGHT - 1; y >= 0; y--) {
            if (this.board[y].every(cell => cell !== 0)) {
                this.board.splice(y, 1);
                this.board.unshift(Array(this.BOARD_WIDTH).fill(0));
                linesCleared++;
                y++; // チェックし直す
            }
        }
        
        if (linesCleared > 0) {
            this.lines += linesCleared;
            this.score += linesCleared * 100 * this.level;
            this.level = Math.floor(this.lines / 10) + 1;
            this.dropInterval = Math.max(50, 1000 - (this.level - 1) * 50);
            this.updateDisplay();
        }
    }
    
    draw() {
        // ボードをクリア
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 配置済みのブロックを描画
        for (let y = 0; y < this.BOARD_HEIGHT; y++) {
            for (let x = 0; x < this.BOARD_WIDTH; x++) {
                if (this.board[y][x] !== 0) {
                    this.drawBlock(x, y, this.colors[this.board[y][x]]);
                }
            }
        }
        
        // 現在のピースを描画
        if (this.currentPiece) {
            for (let y = 0; y < this.currentPiece.shape.length; y++) {
                for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                    if (this.currentPiece.shape[y][x] !== 0) {
                        this.drawBlock(
                            this.currentPiece.x + x,
                            this.currentPiece.y + y,
                            this.colors[this.currentPiece.shape[y][x]]
                        );
                    }
                }
            }
        }
    }
    
    drawBlock(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
            x * this.BLOCK_SIZE,
            y * this.BLOCK_SIZE,
            this.BLOCK_SIZE,
            this.BLOCK_SIZE
        );
        
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(
            x * this.BLOCK_SIZE,
            y * this.BLOCK_SIZE,
            this.BLOCK_SIZE,
            this.BLOCK_SIZE
        );
    }
    
    drawNextPiece() {
        this.nextCtx.fillStyle = '#000';
        this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
        
        if (this.nextPiece) {
            const offsetX = (this.nextCanvas.width - this.nextPiece.shape[0].length * 20) / 2;
            const offsetY = (this.nextCanvas.height - this.nextPiece.shape.length * 20) / 2;
            
            for (let y = 0; y < this.nextPiece.shape.length; y++) {
                for (let x = 0; x < this.nextPiece.shape[y].length; x++) {
                    if (this.nextPiece.shape[y][x] !== 0) {
                        this.nextCtx.fillStyle = this.colors[this.nextPiece.shape[y][x]];
                        this.nextCtx.fillRect(
                            offsetX + x * 20,
                            offsetY + y * 20,
                            20,
                            20
                        );
                        
                        this.nextCtx.strokeStyle = '#333';
                        this.nextCtx.strokeRect(
                            offsetX + x * 20,
                            offsetY + y * 20,
                            20,
                            20
                        );
                    }
                }
            }
        }
    }  
  
    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('lines').textContent = this.lines;
    }
    
    showGameOver() {
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('game-over').classList.remove('hidden');
    }
    
    restart() {
        this.board = this.createBoard();
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.dropTime = 0;
        this.dropInterval = 1000;
        this.gameOver = false;
        this.paused = false;
        
        document.getElementById('game-over').classList.add('hidden');
        this.nextPiece = this.createPiece();
        this.spawnPiece();
        this.updateDisplay();
    }
    
    bindEvents() {
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;
            
            switch(e.code) {
                case 'ArrowLeft':
                    e.preventDefault();
                    if (!this.paused) this.move(-1, 0);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (!this.paused) this.move(1, 0);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (!this.paused) {
                        if (!this.move(0, 1)) {
                            this.placePiece();
                        }
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (!this.paused) this.rotate();
                    break;
                case 'Space':
                    e.preventDefault();
                    if (!this.paused) this.hardDrop();
                    break;
                case 'KeyP':
                    e.preventDefault();
                    this.paused = !this.paused;
                    break;
            }
        });
        
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restart();
        });
    }
    
    gameLoop(time = 0) {
        if (!this.gameOver) {
            if (!this.paused) {
                if (time - this.dropTime > this.dropInterval) {
                    if (!this.move(0, 1)) {
                        this.placePiece();
                    }
                    this.dropTime = time;
                }
            }
            
            this.draw();
            requestAnimationFrame((time) => this.gameLoop(time));
        }
    }
}

// ゲーム開始
const game = new Tetris();