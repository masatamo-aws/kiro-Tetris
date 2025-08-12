// BGM用のHTML5 Audioを使用したBGM再生
class BGMPlayer {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.volume = 0.3;
        this.isPaused = false;
        
        this.initAudio();
    }
    
    initAudio() {
        try {
            console.log('Initializing BGM audio...');
            this.audio = new Audio('assets/audio/bgm.wav');
            this.audio.loop = true;
            this.audio.volume = this.volume;
            this.audio.preload = 'auto';
            
            // エラーハンドリング
            this.audio.addEventListener('error', (e) => {
                console.error('BGM loading error:', e);
                console.error('Audio error details:', e.target.error);
            });
            
            this.audio.addEventListener('canplaythrough', () => {
                console.log('BGM loaded and ready to play');
            });
            
            this.audio.addEventListener('loadstart', () => {
                console.log('BGM loading started');
            });
            
            this.audio.addEventListener('loadeddata', () => {
                console.log('BGM data loaded');
            });
            
            this.audio.addEventListener('ended', () => {
                if (this.isPlaying) {
                    console.log('BGM ended, restarting...');
                    this.audio.play().catch(error => {
                        console.warn('Failed to loop BGM:', error);
                    });
                }
            });
            
            console.log('BGM audio initialized successfully');
            return true;
        } catch (error) {
            console.error('Audio not supported:', error);
            return false;
        }
    }
    
    async start() {
        if (!this.audio) {
            console.warn('Audio not initialized');
            return false;
        }
        
        try {
            console.log('Attempting to start BGM playback...');
            this.audio.currentTime = 0;
            await this.audio.play();
            this.isPlaying = true;
            this.isPaused = false;
            console.log('BGM started successfully');
            return true;
        } catch (error) {
            console.warn('Failed to start BGM:', error);
            console.warn('Error details:', error.message);
            return false;
        }
    }
    
    stop() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.isPlaying = false;
            this.isPaused = false;
        }
    }
    
    pause() {
        if (this.audio && this.isPlaying) {
            this.audio.pause();
            this.isPaused = true;
        }
    }
    
    resume() {
        if (this.audio && this.isPaused) {
            this.audio.play().catch(error => {
                console.warn('Failed to resume BGM:', error);
            });
            this.isPaused = false;
        }
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.audio) {
            this.audio.volume = this.volume;
        }
    }
    

}

// BGMファイルの存在確認
async function testBGMFile() {
    try {
        const response = await fetch('assets/audio/bgm.wav', { method: 'HEAD' });
        if (response.ok) {
            console.log('BGM file exists and is accessible');
            return true;
        } else {
            console.error('BGM file not found or not accessible:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Failed to check BGM file:', error);
        return false;
    }
}

// グローバルBGMインスタンス
console.log('Creating BGM player instance...');
window.bgmGenerator = new BGMPlayer();

// BGMファイルの存在確認を実行
testBGMFile().then(exists => {
    if (!exists) {
        console.warn('BGM file may not be available');
    }
});