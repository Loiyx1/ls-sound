const LSSoundVisualizer = {
    // Değişkenler
    canvas: null,
    ctx: null,
    audioContext: null,
    analyser: null,
    source: null,
    dataArray: null,
    isInitialized: false,
    isActive: false,
    drawId: null,
    sourceNodeId: null, 
    useFallbackMode: true, 

    initialize: function() {
        this.canvas = document.getElementById('visualizer-canvas');
        if (!this.canvas) {
            return this;
        }
        
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
        
        if (!this.useFallbackMode) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.analyser = this.audioContext.createAnalyser();
                
                this.analyser.fftSize = LSSoundConfig.visualizer.fftSize;
                this.analyser.smoothingTimeConstant = LSSoundConfig.visualizer.smoothingTimeConstant;
                
                const bufferLength = this.analyser.frequencyBinCount;
                this.dataArray = new Uint8Array(bufferLength);
            } catch (error) {
                this.useFallbackMode = true;
            }
        }
        
        if (this.useFallbackMode) {
            const dataSize = 64;
            this.dataArray = new Uint8Array(dataSize);
            this.fillRandomData();
        }
        
        window.addEventListener('resize', this.resizeCanvas.bind(this));
        
        this.isInitialized = true;
        
        return this;
    },
    
    resizeCanvas: function() {
        if (!this.canvas) return;
        
        const container = document.getElementById('sound-visualizer');
        if (container) {
            this.canvas.width = container.offsetWidth;
            this.canvas.height = container.offsetHeight;
        }
    },
    
    fillRandomData: function() {
        if (!this.dataArray) return;
        
        for (let i = 0; i < this.dataArray.length; i++) {
            this.dataArray[i] = Math.floor(Math.random() * 100);
        }
    },
    
    updateFallbackData: function(volume) {
        if (!this.dataArray) return;
        
        volume = volume || 0.5; 
        
        for (let i = 0; i < this.dataArray.length; i++) {
            this.dataArray[i] = Math.floor(this.dataArray[i] * 0.7 + (Math.random() * 255 * volume * 0.3));
            
            if (this.dataArray[i] > 255) this.dataArray[i] = 255;
            if (this.dataArray[i] < 0) this.dataArray[i] = 0;
        }
    },
    
    startVisualization: function(sound) {
        if (!this.isInitialized) this.initialize();
        if (!sound) return false;
        
        this.stopVisualization();
        
        if (this.useFallbackMode) {
            this.isActive = true;
            this.draw();
            return true;
        }
        
        if (!sound._sounds || !sound._sounds[0] || !sound._sounds[0]._node) return false;
        
        if (this.isActive && this.sourceNodeId === sound._sounds[0]._id) {
            return true;
        }
        
        try {
            const node = sound._sounds[0]._node;
            this.sourceNodeId = sound._sounds[0]._id;
            
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume().then(() => {
                    this.completeVisualizationSetup(node);
                }).catch(error => {
                    this.useFallbackMode = true;
                    this.isActive = true;
                    this.draw();
                });
            } else {
                this.completeVisualizationSetup(node);
            }
            
            return true;
        } catch (error) {
            this.useFallbackMode = true;
            this.isActive = true;
            this.draw();
            return true;
        }
    },
    
    completeVisualizationSetup: function(node) {
        try {
            if (this.source) {
                try {
                    this.source.disconnect();
                } catch (e) {
                    // Silent error handling
                }
                this.source = null;
            }
            
            this.source = this.audioContext.createMediaElementSource(node);
            this.source.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);
            
            this.isActive = true;
            this.draw();
        } catch (error) {
            this.useFallbackMode = true;
            this.isActive = true;
            this.draw();
        }
    },
    
    stopVisualization: function() {
        if (!this.isActive) return false;
        
        this.isActive = false;
        if (this.drawId) {
            cancelAnimationFrame(this.drawId);
            this.drawId = null;
        }
        
        if (!this.useFallbackMode && this.source) {
            try {
                this.source.disconnect();
            } catch (e) {
                // Silent error handling
            }
            this.source = null;
        }
        
        this.sourceNodeId = null;
        
        return true;
    },
    
    draw: function() {
        if (!this.isActive) return;
        
        this.drawId = requestAnimationFrame(this.draw.bind(this));
        
        if (this.useFallbackMode) {
            this.updateFallbackData(0.5);
        } else {
            this.analyser.getByteFrequencyData(this.dataArray);
        }
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const barCount = this.dataArray ? this.dataArray.length : LSSoundConfig.visualizer.barCount;
        const barWidth = LSSoundConfig.visualizer.barWidth;
        const barSpacing = LSSoundConfig.visualizer.barSpacing;
        const barMinHeight = LSSoundConfig.visualizer.barMinHeight;
        
        const totalWidth = barCount * (barWidth + barSpacing);
        const startX = (this.canvas.width - totalWidth) / 2;
        
        const gradient = this.ctx.createLinearGradient(0, this.canvas.height, 0, 0);
        gradient.addColorStop(0, LSSoundConfig.visualizer.primaryColor);
        gradient.addColorStop(1, LSSoundConfig.visualizer.secondaryColor);
        this.ctx.fillStyle = gradient;
        
        for (let i = 0; i < barCount; i++) {
            const value = this.dataArray ? this.dataArray[i] : 0;
            
            const percent = value / 255;
            const height = Math.max(barMinHeight, percent * this.canvas.height);
            
            const x = startX + i * (barWidth + barSpacing);
            const y = this.canvas.height - height;
            
            this.ctx.fillRect(x, y, barWidth, height);
        }
    },
    
    setVisibility: function(visible) {
        const container = document.getElementById('sound-visualizer');
        if (container) {
            container.style.display = visible ? 'block' : 'none';
        }
    },
    
    cleanup: function() {
        this.stopVisualization();
        
        if (!this.useFallbackMode && this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        
        this.isInitialized = false;
    }
}; 
