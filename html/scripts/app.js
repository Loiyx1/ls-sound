const LSApp = {
    isReady: false,
    activeSound: null,
    currentVolume: 0.5,
    
    initialize: function() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupNUI();
            this.setupControls();
            
            if (LSSoundConfig.showVisualizer) {
                try {
                    LSSoundVisualizer.initialize();
                } catch (e) {
                    // Silent error handling
                }
            }
            
            this.isReady = true;
        });
        
        return this;
    },
    
    setupNUI: function() {
        window.addEventListener('message', (event) => {
            const data = event.data;
            
            if (data.status === 'init') {
                LSSoundConfig.debugMode = data.debug || false;
                
                if (LSSoundConfig.showVisualizer) {
                    document.getElementById('sound-visualizer').style.display = 'block';
                } else {
                    document.getElementById('sound-visualizer').style.display = 'none';
                }
                
                if (LSSoundConfig.showControls) {
                    document.getElementById('sound-controls').style.display = 'block';
                } else {
                    document.getElementById('sound-controls').style.display = 'none';
                }
            } 
            else if (data.status === 'playurl') {
                this.activeSound = LSSoundManager.playUrl(data.id, data.url, {
                    volume: data.volume,
                    loop: data.loop,
                    isDynamic: data.isDynamic,
                    position: data.position,
                    destroyOnFinish: data.destroyOnFinish
                });
                
                this.currentVolume = data.volume || LSSoundConfig.defaultVolume;
                
                if (LSSoundConfig.showVisualizer) {
                    setTimeout(() => {
                        LSSoundVisualizer.startVisualization(this.activeSound);
                    }, 50);
                }
            } 
            else if (data.status === 'playsound') {
                this.activeSound = LSSoundManager.playSound(data.id, data.soundName, {
                    volume: data.volume,
                    loop: data.loop,
                    isDynamic: data.isDynamic,
                    position: data.position,
                    destroyOnFinish: data.destroyOnFinish
                });
                
                this.currentVolume = data.volume || LSSoundConfig.defaultVolume;
                
                if (LSSoundConfig.showVisualizer) {
                    setTimeout(() => {
                        LSSoundVisualizer.startVisualization(this.activeSound);
                    }, 50);
                }
            } 
            else if (data.status === 'stop') {
                LSSoundManager.stop(data.id);
                
                if (this.activeSound && this.activeSound === LSSoundManager.sounds[data.id]) {
                    this.activeSound = null;
                    LSSoundVisualizer.stopVisualization();
                }
            } 
            else if (data.status === 'pause') {
                LSSoundManager.pause(data.id);
            } 
            else if (data.status === 'resume') {
                LSSoundManager.resume(data.id);
            } 
            else if (data.status === 'volume') {
                LSSoundManager.setVolume(data.id, data.volume);
                
                if (this.activeSound && this.activeSound === LSSoundManager.sounds[data.id]) {
                    this.currentVolume = data.volume;
                    if (LSSoundVisualizer.useFallbackMode && LSSoundVisualizer.isActive) {
                        // Automatic update in next animation frame
                    }
                }
            } 
            else if (data.status === 'position') {
                if (data.x !== undefined && data.y !== undefined && data.z !== undefined) {
                    LSSoundManager.updatePlayerPosition(data.x, data.y, data.z);
                } else {
                    LSSoundManager.setPosition(data.id, data.position);
                }
            } 
            else if (data.status === 'distance') {
                LSSoundManager.setDistance(data.id, data.distance);
            } 
            else if (data.status === 'loop') {
                LSSoundManager.setLoop(data.id, data.loop);
            }
            else if (data.status === 'fadeout') {
                LSSoundManager.fadeOut(data.id, data.time);
            }
            else if (data.status === 'fadein') {
                LSSoundManager.fadeIn(data.id, data.time, data.volume);
            }
        });
    },
    
    setupControls: function() {
        if (!LSSoundConfig.showControls) return;
    }
};

setInterval(() => {
    if (LSSoundVisualizer.useFallbackMode && LSSoundVisualizer.isActive) {
        LSSoundVisualizer.updateFallbackData(LSApp.currentVolume);
    }
}, 100);

LSApp.initialize(); 
