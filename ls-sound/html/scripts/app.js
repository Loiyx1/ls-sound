const LSApp = {
    isReady: false,
    activeSound: null,
    currentVolume: 0.5,
    
    initialize: function() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupNUI();
            
            this.isReady = true;
        });
        
        return this;
    },
    
    setupNUI: function() {
        window.addEventListener('message', (event) => {
            const data = event.data;
            
            if (data.status === 'init') {
                LSSoundConfig.debugMode = data.debug || false;
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
            } 
            else if (data.status === 'stop') {
                LSSoundManager.stop(data.id);
                
                if (this.activeSound && this.activeSound === LSSoundManager.sounds[data.id]) {
                    this.activeSound = null;
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
            else if (data.status === 'getduration') {
                const sound = LSSoundManager.sounds[data.id];
                if (sound) {
                    const duration = sound.duration();
                    fetch(`https://${GetParentResourceName()}/updateDuration`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        },
                        body: JSON.stringify({
                            id: data.id,
                            duration: duration
                        })
                    });
                }
            }
            else if (data.status === 'getcurrenttime') {
                const sound = LSSoundManager.sounds[data.id];
                if (sound) {
                    const seek = sound.seek();
                    fetch(`https://${GetParentResourceName()}/updateCurrentTime`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        },
                        body: JSON.stringify({
                            id: data.id,
                            time: seek
                        })
                    });
                }
            }
            else if (data.status === 'getinfo') {
                const sound = LSSoundManager.sounds[data.id];
                if (sound) {
                    const sourceUrl = sound._src ? (Array.isArray(sound._src) ? sound._src[0] : sound._src) : "";
                    fetch(`https://${GetParentResourceName()}/updateInfo`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        },
                        body: JSON.stringify({
                            id: data.id,
                            info: {
                                title: LSSoundManager.extractTitleFromUrl(sourceUrl),
                                artist: "Unknown",
                                album: "Unknown",
                                url: sourceUrl
                            }
                        })
                    });
                }
            }
            else if (data.status === 'seek') {
                const sound = LSSoundManager.sounds[data.id];
                if (sound) {
                    sound.seek(data.position);
                }
            }
        });
    }
};

LSApp.initialize(); 
