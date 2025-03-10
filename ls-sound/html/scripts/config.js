const LSSoundConfig = {
    debugMode: false,
    showVisualizer: false,
    showControls: false,
    
    defaultVolume: 0.3,
    fadeInDuration: 1000, 
    fadeOutDuration: 1000,
    
    visualizer: {
        barCount: 64,            
        barWidth: 2,             
        barSpacing: 1,           
        barMinHeight: 5,         
        smoothingTimeConstant: 0.85,
        primaryColor: '#3498db',  
        secondaryColor: '#9b59b6', 
        responsive: true,        
        fftSize: 256,            
        fallbackMode: true,      
        fallbackUpdateRate: 80,  
        fallbackAnimation: {
            smoothing: 0.7,       
            randomness: 0.3       
        }
    },
    
    cacheEnabled: true,
    cacheTimeout: 60000, 
    
    allowedExtensions: ['ogg', 'mp3', 'wav'],
    
    howler: {
        html5: true,
        preload: true,
        autoplay: false,
        loop: false,
        volume: 0.3,
        rate: 1.0,
        format: ['mp3', 'ogg']
    },
    
    overrides: {
    }
}; 
