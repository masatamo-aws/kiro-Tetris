class Tetris {
    constructor(mode = 'single', player = null) {
        this.mode = mode;
        this.player = player;
        
        // キャンバス要素の取得
        if (mode === 'single') {
            this.canvas = document.getElementById('gameCanvas');
            this.nextCanvas = document.getElementById('nextCanvas');
        } else {
            // VSモードでは player1 -> p1, player2 -> p2 に変換
            const playerId = player === 'player1' ? 'p1' : 'p2';
            this.canvas = document.getElementById(`gameCanvas-${playerId}`);
            this.nextCanvas = document.getElementById(`nextCanvas-${playerId}`);
        }
        
        // キャンバス要素が見つからない場合のエラーハンドリング
        if (!this.canvas || !this.nextCanvas) {
            console.error(`Canvas elements not found for mode: ${mode}, player: ${player}`);
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.nextCtx = this.nextCanvas.getContext('2d');
        
        this.BOARD_WIDTH = 10;
        this.BOARD_HEIGHT = 20;
        this.BLOCK_SIZE = mode === 'single' ? 40 : 35;
        
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
        
        this.themes = {
            dark: {
                colors: [
                    '#000000', // 空
                    '#FF0000', // I
                    '#00FF00', // O
                    '#0000FF', // T
                    '#FFFF00', // S
                    '#FF00FF', // Z
                    '#00FFFF', // J
                    '#FFA500'  // L
                ],
                canvasBackground: '#000000'
            },
            light: {
                colors: [
                    '#f8f8f8', // 空
                    '#dc143c', // I
                    '#228b22', // O
                    '#4169e1', // T
                    '#ffd700', // S
                    '#ff1493', // Z
                    '#00ced1', // J
                    '#ff8c00'  // L
                ],
                canvasBackground: '#f8f8f8'
            },
            gal: {
                colors: [
                    '#000000', // 空
                    '#ff69b4', // I
                    '#da70d6', // O
                    '#ff1493', // T
                    '#ffd700', // S
                    '#ff00ff', // Z
                    '#00ffff', // J
                    '#ffb6c1'  // L
                ],
                canvasBackground: '#000000'
            }
        };
        
        this.currentTheme = 'dark';
        this.colors = this.themes[this.currentTheme].colors;
        
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
    
    changeTheme(theme) {
        this.currentTheme = theme;
        this.colors = this.themes[theme].colors;
        document.body.setAttribute('data-theme', theme);
        
        // キャンバスの背景色を更新
        this.draw();
        this.drawNextPiece();
    }
    
    draw() {
        // ボードをクリア（テーマに応じた背景色）
        this.ctx.fillStyle = this.themes[this.currentTheme].canvasBackground;
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
        this.nextCtx.fillStyle = this.themes[this.currentTheme].canvasBackground;
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
        if (this.mode === 'single') {
            document.getElementById('score').textContent = this.score;
            document.getElementById('level').textContent = this.level;
            document.getElementById('lines').textContent = this.lines;
        } else {
            // VSモードでは player1 -> p1, player2 -> p2 に変換
            const playerId = this.player === 'player1' ? 'p1' : 'p2';
            document.getElementById(`score-${playerId}`).textContent = this.score;
            document.getElementById(`level-${playerId}`).textContent = this.level;
            document.getElementById(`lines-${playerId}`).textContent = this.lines;
        }
    }
    
    showGameOver() {
        if (this.mode === 'single') {
            document.getElementById('finalScore').textContent = this.score;
            document.getElementById('gameOverModal').style.display = 'flex';
        } else {
            // VSモードでは player1 -> p1, player2 -> p2 に変換
            const playerId = this.player === 'player1' ? 'p1' : 'p2';
            document.getElementById(`finalScore-${playerId}`).textContent = this.score;
            document.getElementById(`gameOverModal-${playerId}`).style.display = 'flex';
            
            // GameManagerに通知
            if (window.gameManager) {
                window.gameManager.onPlayerGameOver(this.player);
            }
        }
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
        
        if (this.mode === 'single') {
            document.getElementById('gameOverModal').style.display = 'none';
        } else {
            const playerId = this.player === 'player1' ? 'p1' : 'p2';
            document.getElementById(`gameOverModal-${playerId}`).style.display = 'none';
        }
        
        this.nextPiece = this.createPiece();
        this.spawnPiece();
        this.updateDisplay();
    }
    
    togglePause() {
        this.paused = !this.paused;
        
        // BGMの制御
        if (window.gameManager && window.gameManager.audioManager) {
            if (this.paused) {
                window.gameManager.audioManager.pauseBGM();
            } else {
                window.gameManager.audioManager.resumeBGM();
            }
        }
    }
    
    forceGameOver() {
        this.gameOver = true;
    }
    
    destroy() {
        this.gameOver = true;
        // イベントリスナーのクリーンアップは省略（簡単のため）
    }
    
    bindEvents() {
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;
            
            // 一人プレイモードまたはPlayer 2の操作
            if (this.mode === 'single' || this.player === 'player2') {
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
                        if (this.mode === 'single') {
                            this.togglePause();
                        }
                        break;
                }
            }
            
            // Player 1の操作（VSモード時のみ）
            if (this.mode === 'vs' && this.player === 'player1') {
                switch(e.code) {
                    case 'KeyA':
                        e.preventDefault();
                        if (!this.paused) this.move(-1, 0);
                        break;
                    case 'KeyD':
                        e.preventDefault();
                        if (!this.paused) this.move(1, 0);
                        break;
                    case 'KeyS':
                        e.preventDefault();
                        if (!this.paused) {
                            if (!this.move(0, 1)) {
                                this.placePiece();
                            }
                        }
                        break;
                    case 'KeyW':
                        e.preventDefault();
                        if (!this.paused) this.rotate();
                        break;
                    case 'KeyQ':
                        e.preventDefault();
                        if (!this.paused) this.hardDrop();
                        break;
                }
            }
        });
        
        // コントロールボタンのイベントリスナー
        this.bindControlButtons();
    }
    
    bindControlButtons() {
        // 一人プレイモード用のボタン
        if (this.mode === 'single') {
            const buttons = document.querySelectorAll('.control-btn');
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    if (this.gameOver || this.paused) return;
                    
                    const action = button.getAttribute('data-action');
                    switch(action) {
                        case 'left':
                            this.move(-1, 0);
                            break;
                        case 'right':
                            this.move(1, 0);
                            break;
                        case 'softDrop':
                            if (!this.move(0, 1)) {
                                this.placePiece();
                            }
                            break;
                        case 'rotate':
                            this.rotate();
                            break;
                        case 'hardDrop':
                            this.hardDrop();
                            break;
                        case 'pause':
                            this.togglePause();
                            break;
                    }
                });
            });
        } else {
            // VSモード用のボタン
            const playerId = this.player === 'player1' ? 'p1' : 'p2';
            const buttons = document.querySelectorAll(`[data-player="${playerId}"]`);
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    if (this.gameOver || this.paused) return;
                    
                    const action = button.getAttribute('data-action');
                    switch(action) {
                        case 'left':
                            this.move(-1, 0);
                            break;
                        case 'right':
                            this.move(1, 0);
                            break;
                        case 'softDrop':
                            if (!this.move(0, 1)) {
                                this.placePiece();
                            }
                            break;
                        case 'rotate':
                            this.rotate();
                            break;
                        case 'hardDrop':
                            this.hardDrop();
                            break;
                    }
                });
            });
        }
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

// オーディオ管理クラス
class AudioManager {
    constructor() {
        this.bgmEnabled = true;  // デフォルトでBGMを有効に
        this.volume = 0.5;
        
        this.init();
    }
    
    init() {
        // イベントリスナーの設定
        this.bindEvents();
        
        // ローカルストレージから設定を読み込み
        this.loadSettings();
    }
    
    bindEvents() {
        const bgmToggle = document.getElementById('bgmToggle');
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeDisplay = document.getElementById('volumeDisplay');
        
        // BGMトグルボタン
        bgmToggle.addEventListener('click', () => {
            this.toggleBGM();
        });
        
        // ボリュームスライダー
        volumeSlider.addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
            volumeDisplay.textContent = e.target.value + '%';
        });
    }
    
    async toggleBGM() {
        this.bgmEnabled = !this.bgmEnabled;
        const bgmToggle = document.getElementById('bgmToggle');
        
        if (this.bgmEnabled) {
            bgmToggle.textContent = '🎵 BGM: ON';
            bgmToggle.classList.add('active');
            
            // BGMを開始
            if (window.bgmGenerator) {
                window.bgmGenerator.setVolume(this.volume * 0.5);
                await window.bgmGenerator.start();
            }
        } else {
            bgmToggle.textContent = '🔇 BGM: OFF';
            bgmToggle.classList.remove('active');
            
            // BGMを停止
            if (window.bgmGenerator) {
                window.bgmGenerator.stop();
            }
        }
        
        this.saveSettings();
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        
        // BGMの音量も更新
        if (window.bgmGenerator) {
            window.bgmGenerator.setVolume(this.volume * 0.5);
        }
        
        this.saveSettings();
    }
    
    pauseBGM() {
        if (window.bgmGenerator && this.bgmEnabled) {
            window.bgmGenerator.pause();
        }
    }
    
    resumeBGM() {
        if (window.bgmGenerator && this.bgmEnabled) {
            window.bgmGenerator.resume();
        }
    }
    

    
    saveSettings() {
        const settings = {
            bgmEnabled: this.bgmEnabled,
            volume: this.volume
        };
        localStorage.setItem('tetris-audio-settings', JSON.stringify(settings));
    }
    
    loadSettings() {
        const saved = localStorage.getItem('tetris-audio-settings');
        if (saved) {
            const settings = JSON.parse(saved);
            this.bgmEnabled = settings.bgmEnabled !== undefined ? settings.bgmEnabled : true; // デフォルトをtrueに変更
            this.volume = settings.volume !== undefined ? settings.volume : 0.5;
        } else {
            // 初回起動時はBGMを有効にする
            this.bgmEnabled = true;
            this.volume = 0.5;
        }
        
        // 強制的にBGMを有効にする（デバッグ用）
        console.log('BGM enabled before force:', this.bgmEnabled);
        this.bgmEnabled = true;
        console.log('BGM enabled after force:', this.bgmEnabled);
        
        // UIを更新
        const bgmToggle = document.getElementById('bgmToggle');
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeDisplay = document.getElementById('volumeDisplay');
        
        if (this.bgmEnabled) {
            bgmToggle.textContent = '🎵 BGM: ON';
            bgmToggle.classList.add('active');
        } else {
            bgmToggle.textContent = '🔇 BGM: OFF';
            bgmToggle.classList.remove('active');
        }
        
        volumeSlider.value = this.volume * 100;
        volumeDisplay.textContent = Math.round(this.volume * 100) + '%';
        
        // 設定を保存して次回も確実にONになるようにする
        this.saveSettings();
    }
}

// ゲーム管理クラス
class GameManager {
    constructor() {
        this.currentMode = 'single';
        this.singleGame = null;
        this.vsGames = { player1: null, player2: null };
        this.currentTheme = 'dark';
        this.audioManager = null;
        
        this.init();
    }
    
    init() {
        this.bindModeEvents();
        this.bindThemeEvents();
        this.audioManager = new AudioManager();
        this.startSingleMode();
        
        // ゲーム開始時にBGMを自動開始
        this.setupAutoBGM();
        
        // 少し遅延してBGM開始を試行（フォールバック）
        setTimeout(() => {
            this.tryStartBGM();
        }, 1000);
    }
    
    async tryStartBGM() {
        console.log('Trying to start BGM automatically...');
        
        if (this.audioManager && this.audioManager.bgmEnabled && window.bgmGenerator) {
            try {
                window.bgmGenerator.setVolume(this.audioManager.volume * 0.5);
                const success = await window.bgmGenerator.start();
                
                if (success) {
                    console.log('BGM auto-started successfully!');
                } else {
                    console.log('BGM auto-start failed, waiting for user interaction');
                }
            } catch (error) {
                console.log('BGM auto-start failed:', error.message, '- waiting for user interaction');
            }
        }
    }
    
    setupAutoBGM() {
        console.log('Setting up auto-BGM...');
        
        // 最初のユーザーインタラクションでBGMを開始
        const startBGM = async () => {
            console.log('User interaction detected - starting BGM');
            
            if (this.audioManager && window.bgmGenerator) {
                try {
                    // BGMが無効の場合は有効にする
                    if (!this.audioManager.bgmEnabled) {
                        console.log('Enabling BGM...');
                        this.audioManager.bgmEnabled = true;
                        
                        // UIを更新
                        const bgmToggle = document.getElementById('bgmToggle');
                        bgmToggle.textContent = '🎵 BGM: ON';
                        bgmToggle.classList.add('active');
                        
                        // 設定を保存
                        this.audioManager.saveSettings();
                    }
                    
                    // BGMを開始
                    console.log('Starting BGM playback...');
                    window.bgmGenerator.setVolume(this.audioManager.volume * 0.5);
                    const success = await window.bgmGenerator.start();
                    
                    if (success) {
                        console.log('BGM started successfully!');
                    } else {
                        console.warn('Failed to start BGM');
                    }
                    
                    // イベントリスナーを削除
                    document.removeEventListener('click', startBGM);
                    document.removeEventListener('keydown', startBGM);
                    document.removeEventListener('touchstart', startBGM);
                    
                } catch (error) {
                    console.error('Error starting BGM:', error);
                }
            } else {
                console.warn('AudioManager or BGM generator not available');
            }
        };
        
        // イベントリスナーを追加
        document.addEventListener('click', startBGM);
        document.addEventListener('keydown', startBGM);
        document.addEventListener('touchstart', startBGM);
        
        console.log('Auto-BGM listeners added');
    }
    

    
    bindModeEvents() {
        document.getElementById('singlePlayerBtn').addEventListener('click', () => {
            this.switchMode('single');
        });
        
        document.getElementById('multiPlayerBtn').addEventListener('click', () => {
            this.switchMode('vs');
        });
    }
    
    bindThemeEvents() {
        document.getElementById('darkTheme').addEventListener('click', () => {
            this.changeTheme('dark');
        });
        
        document.getElementById('lightTheme').addEventListener('click', () => {
            this.changeTheme('light');
        });
        
        document.getElementById('galTheme').addEventListener('click', () => {
            this.changeTheme('gal');
        });
    }
    
    switchMode(mode) {
        // モードボタンの状態更新
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${mode === 'single' ? 'singlePlayer' : 'multiPlayer'}Btn`).classList.add('active');
        
        // ゲーム画面の切り替え
        document.getElementById('singlePlayerMode').style.display = mode === 'single' ? 'block' : 'none';
        document.getElementById('multiPlayerMode').style.display = mode === 'vs' ? 'block' : 'none';
        
        // 既存ゲームの停止
        if (this.singleGame) {
            this.singleGame.destroy();
            this.singleGame = null;
        }
        if (this.vsGames.player1) {
            this.vsGames.player1.destroy();
            this.vsGames.player1 = null;
        }
        if (this.vsGames.player2) {
            this.vsGames.player2.destroy();
            this.vsGames.player2 = null;
        }
        
        this.currentMode = mode;
        
        if (mode === 'single') {
            this.startSingleMode();
        } else {
            this.startVsMode();
        }
    }
    
    startSingleMode() {
        this.singleGame = new Tetris('single');
        
        // リスタートボタンのイベント
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.singleGame.restart();
        });
    }
    
    startVsMode() {
        this.vsGames.player1 = new Tetris('vs', 'player1');
        this.vsGames.player2 = new Tetris('vs', 'player2');
        
        // VSモード専用のイベントバインド
        this.bindVsEvents();
    }
    
    bindVsEvents() {
        document.getElementById('restartVsBtn').addEventListener('click', () => {
            this.restartVsMode();
        });
        
        document.getElementById('pauseVsBtn').addEventListener('click', () => {
            this.toggleVsPause();
        });
    }
    
    restartVsMode() {
        if (this.vsGames.player1) this.vsGames.player1.restart();
        if (this.vsGames.player2) this.vsGames.player2.restart();
        document.getElementById('winnerDisplay').style.display = 'none';
    }
    
    toggleVsPause() {
        if (this.vsGames.player1) this.vsGames.player1.togglePause();
        if (this.vsGames.player2) this.vsGames.player2.togglePause();
        
        // BGMの制御（どちらかのプレイヤーの状態を確認）
        if (this.audioManager && this.vsGames.player1) {
            if (this.vsGames.player1.paused) {
                this.audioManager.pauseBGM();
            } else {
                this.audioManager.resumeBGM();
            }
        }
    }
    
    changeTheme(theme) {
        this.currentTheme = theme;
        document.body.setAttribute('data-theme', theme);
        
        // テーマボタンの状態更新
        document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${theme}Theme`).classList.add('active');
        
        if (this.singleGame) {
            this.singleGame.changeTheme(theme);
        }
        if (this.vsGames.player1) {
            this.vsGames.player1.changeTheme(theme);
        }
        if (this.vsGames.player2) {
            this.vsGames.player2.changeTheme(theme);
        }
    }
    
    onPlayerGameOver(player) {
        if (this.currentMode === 'vs') {
            const winner = player === 'player1' ? 'Player 2' : 'Player 1';
            document.getElementById('winnerText').textContent = `${winner} Wins!`;
            document.getElementById('winnerDisplay').style.display = 'block';
            
            // 両方のゲームを停止
            if (this.vsGames.player1) this.vsGames.player1.forceGameOver();
            if (this.vsGames.player2) this.vsGames.player2.forceGameOver();
        }
    }
}

// ゲーム開始
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game...');
    
    const gameManager = new GameManager();
    window.gameManager = gameManager;
    
    console.log('Game manager initialized');
    
    // 即座にBGM開始を試行（ブラウザが許可する場合）
    setTimeout(async () => {
        if (window.gameManager && window.gameManager.audioManager && window.gameManager.audioManager.bgmEnabled) {
            console.log('Attempting immediate BGM start...');
            try {
                if (window.bgmGenerator) {
                    const success = await window.bgmGenerator.start();
                    if (success) {
                        console.log('Immediate BGM start successful!');
                    }
                }
            } catch (error) {
                console.log('Immediate BGM start failed - will wait for user interaction');
            }
        }
    }, 500);
});