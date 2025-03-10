const LSSoundManager = {
    sounds: {},
    contexts: {},
    cache: {},
    playerPos: { x: 0, y: 0, z: 0 },
    
    extractTitleFromUrl: function(url) {
        if (!url) return "Unknown";
        
        try {
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/');
            const lastPart = pathParts[pathParts.length - 1];
            
            if (lastPart) {
                const fileNameWithoutExt = lastPart.split('.')[0];
                return decodeURIComponent(fileNameWithoutExt.replace(/-|_/g, ' '));
            }
            
            if (urlObj.hostname.includes('youtube') || urlObj.hostname.includes('youtu.be')) {
                const videoId = urlObj.searchParams.get('v') || urlObj.pathname.slice(1);
                return `YouTube Video (${videoId})`;
            }
            
            if (urlObj.hostname.includes('soundcloud')) {
                return `SoundCloud Track`;
            }
        } catch (e) {
            const parts = url.split('/');
            const lastPart = parts[parts.length - 1];
            if (lastPart) {
                return lastPart.split('.')[0].replace(/-|_/g, ' ');
            }
        }
        
        return "Unknown";
    },
    
    loadSound: function(id, url, options = {}) {
        this.destroySound(id);
        
        const defaultOptions = {
            src: [url],
            html5: LSSoundConfig.howler.html5,
            autoplay: options.autoplay || LSSoundConfig.howler.autoplay,
            loop: options.loop || LSSoundConfig.howler.loop,
            volume: options.volume || LSSoundConfig.howler.volume,
            rate: options.rate || LSSoundConfig.howler.rate,
            format: LSSoundConfig.howler.format,
            onload: function() {
                LSSoundManager.triggerEvent('onLoading', { id: id });
            },
            onplay: function() {
                LSSoundManager.triggerEvent('onPlayStart', { id: id });
            },
            onend: function() {
                LSSoundManager.triggerEvent('onPlayEnd', { id: id });
                if (options.destroyOnFinish) {
                    LSSoundManager.destroySound(id);
                }
            },
            onpause: function() {
                LSSoundManager.triggerEvent('onPlayPause', { id: id });
            },
            onresume: function() {
                LSSoundManager.triggerEvent('onPlayResume', { id: id });
            },
            onstop: function() {
                LSSoundManager.triggerEvent('onPlayEnd', { id: id });
            },
            onloaderror: function() {
                LSSoundManager.triggerEvent('onError', { id: id, error: 'Failed to load sound' });
            },
            onplayerror: function() {
                LSSoundManager.triggerEvent('onError', { id: id, error: 'Failed to play sound' });
            }
        };
        
        this.sounds[id] = new Howl(defaultOptions);
        
        if (options.isDynamic && options.position) {
            this.sounds[id].pos(
                options.position.x || 0,
                options.position.y || 0,
                options.position.z || 0
            );
        }
        
        this.sounds[id]._id = null;
        
        if (LSSoundConfig.cacheEnabled) {
            this.cache[id] = {
                url: url,
                options: options,
                timestamp: Date.now()
            };
        }
        
        return this.sounds[id];
    },
    
    playUrl: function(id, url, options = {}) {
        if (LSSoundConfig.cacheEnabled && this.cache[id] && this.cache[id].url === url) {
            if (this.sounds[id]) {
                this.sounds[id].volume(options.volume || LSSoundConfig.defaultVolume);
                this.sounds[id].loop(options.loop || false);
                
                if (options.isDynamic && options.position) {
                    this.sounds[id].pos(
                        options.position.x || 0,
                        options.position.y || 0,
                        options.position.z || 0
                    );
                }
                
                this.sounds[id]._id = this.sounds[id].play();
                return this.sounds[id];
            }
        }
        
        const sound = this.loadSound(id, url, options);
        sound._id = sound.play();
        
        return sound;
    },
    
    playSound: function(id, soundName, options = {}) {
        const soundPath = `./sounds/${soundName}`;
        return this.playUrl(id, soundPath, options);
    },
    
    stop: function(id) {
        if (!this.sounds[id]) return false;
        this.sounds[id].stop();
        return true;
    },
    
    pause: function(id) {
        if (!this.sounds[id]) return false;
        this.sounds[id].pause();
        return true;
    },
    
    resume: function(id) {
        if (!this.sounds[id]) return false;
        this.sounds[id].play();
        return true;
    },
    
    setVolume: function(id, volume) {
        if (!this.sounds[id]) return false;
        this.sounds[id].volume(volume);
        return true;
    },
    
    setPosition: function(id, position) {
        if (!this.sounds[id]) return false;
        this.sounds[id].pos(
            position.x || 0,
            position.y || 0,
            position.z || 0
        );
        return true;
    },
    
    setDistance: function(id, distance) {
        if (!this.sounds[id]) return false;
        this.updateVolume(id);
        return true;
    },
    
    setLoop: function(id, loop) {
        if (!this.sounds[id]) return false;
        this.sounds[id].loop(loop);
        return true;
    },
    
    fadeOut: function(id, time) {
        if (!this.sounds[id]) return false;
        const currentVolume = this.sounds[id].volume();
        this.sounds[id].fade(currentVolume, 0, time || LSSoundConfig.fadeOutDuration);
        return true;
    },
    
    fadeIn: function(id, time, volume) {
        if (!this.sounds[id]) return false;
        const targetVolume = volume || LSSoundConfig.defaultVolume;
        this.sounds[id].fade(0, targetVolume, time || LSSoundConfig.fadeInDuration);
        return true;
    },
    
    destroySound: function(id) {
        if (!this.sounds[id]) return false;
        this.sounds[id].stop();
        this.sounds[id].unload();
        delete this.sounds[id];
        return true;
    },
    
    updatePlayerPosition: function(x, y, z) {
        this.playerPos.x = x;
        this.playerPos.y = y;
        this.playerPos.z = z;
        
        Howler.pos(x, y, z);
        
        for (let id in this.sounds) {
            this.updateVolume(id);
        }
    },
    
    updateVolume: function(id) {
        if (!this.sounds[id]) return false;
        
        if (!this.sounds[id]._pos) return false;
        
        return true;
    },
    
    clearCache: function() {
        const now = Date.now();
        
        for (let id in this.cache) {
            if (now - this.cache[id].timestamp > LSSoundConfig.cacheTimeout) {
                delete this.cache[id];
            }
        }
    },
    
    stopAll: function() {
        Howler.stop();
    },
    
    triggerEvent: function(event, data) {
        if (window.invokeNative) {
            fetch(`https://${GetParentResourceName()}/${event}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(data)
            });
        }
    }
}; 
