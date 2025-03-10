
LSSoundS = {}

LSSoundS.PlayOnPlayer = function(source, id, soundFile, options)
    if not source or not id or not soundFile then return false end
    
    options = options or {}
    TriggerClientEvent('ls-sound:playSound', source, id, soundFile, options)
    return true
end

LSSoundS.PlayUrlOnPlayer = function(source, id, url, options)
    if not source or not id or not url then return false end
    
    options = options or {}
    TriggerClientEvent('ls-sound:playUrl', source, id, url, options)
    return true
end

LSSoundS.PlayFromCoords = function(coords, maxDistance, id, soundFile, options)
    if not coords or not id or not soundFile then return false end
    
    options = options or {}
    options.position = coords
    options.maxDistance = maxDistance
    options.isDynamic = true
    
    TriggerClientEvent('ls-sound:checkDistancePlay', -1, id, soundFile, coords, maxDistance, options)
    
    return true
end

LSSoundS.PlayUrlFromCoords = function(coords, maxDistance, id, url, options)
    if not coords or not id or not url then return false end
    
    options = options or {}
    options.position = coords
    options.maxDistance = maxDistance
    options.isDynamic = true
    
    TriggerClientEvent('ls-sound:checkDistancePlayUrl', -1, id, url, coords, maxDistance, options)
    
    return true
end

LSSoundS.PlayForAll = function(id, soundFile, options)
    if not id or not soundFile then return false end
    
    options = options or {}
    TriggerClientEvent('ls-sound:playSound', -1, id, soundFile, options)
    return true
end

LSSoundS.PlayUrlForAll = function(id, url, options)
    if not id or not url then return false end
    
    options = options or {}
    TriggerClientEvent('ls-sound:playUrl', -1, id, url, options)
    return true
end

LSSoundS.StopOnPlayer = function(source, id)
    if not source or not id then return false end
    
    TriggerClientEvent('ls-sound:stop', source, id)
    return true
end

LSSoundS.StopFromCoords = function(coords, maxDistance, id)
    if not coords or not id then return false end
    
    TriggerClientEvent('ls-sound:checkDistanceStop', -1, id, coords, maxDistance)
    
    return true
end

LSSoundS.StopForAll = function(id)
    if not id then return false end
    
    TriggerClientEvent('ls-sound:stop', -1, id)
    return true
end

LSSoundS.PauseOnPlayer = function(source, id)
    if not source or not id then return false end
    
    TriggerClientEvent('ls-sound:pause', source, id)
    return true
end

LSSoundS.ResumeOnPlayer = function(source, id)
    if not source or not id then return false end
    
    TriggerClientEvent('ls-sound:resume', source, id)
    return true
end

LSSoundS.SetVolumeOnPlayer = function(source, id, volume)
    if not source or not id then return false end
    
    TriggerClientEvent('ls-sound:setVolume', source, id, volume)
    return true
end 
