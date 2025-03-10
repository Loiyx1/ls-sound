if _G.LSSound then
    _G.LSSound = {}
else
    _G.LSSound = {}
end

if Config == nil then
    Config = {}
    Config.DefaultVolume = 0.3
    Config.DefaultDistance = 15.0
    Config.MaxDistance = 50.0
    Config.DefaultDynamic = false
    Config.Debug = false
end

LSSound = _G.LSSound
LSSound.SoundInfo = LSSound.SoundInfo or {}
LSSound.CachedSounds = LSSound.CachedSounds or {}

LSSound.Initialize = function()
    SendNUIMessage({
        status = "init",
        debug = Config.Debug
    })
end

LSSound.Default = {
    volume = Config.DefaultVolume,
    distance = Config.DefaultDistance,
    maxDistance = Config.MaxDistance,
    url = nil,
    id = nil,
    position = nil,
    loop = false,
    isDynamic = Config.DefaultDynamic,
    destroyOnFinish = true,
}

LSSound.PlayUrl = function(id, url, options)
    if not id or not url then return false end
    if LSSound.SoundInfo[id] then LSSound.Stop(id) end
    
    options = options or {}
    local soundOptions = {
        volume = options.volume or LSSound.Default.volume,
        url = url,
        id = id,
        loop = options.loop or LSSound.Default.loop,
        isDynamic = options.isDynamic or LSSound.Default.isDynamic,
        position = options.position or nil,
        distance = options.distance or LSSound.Default.distance,
        destroyOnFinish = options.destroyOnFinish or LSSound.Default.destroyOnFinish,
    }
    
    LSSound.SoundInfo[id] = soundOptions
    
    SendNUIMessage({
        status = "playurl",
        id = id,
        url = url,
        volume = soundOptions.volume,
        loop = soundOptions.loop,
        isDynamic = soundOptions.isDynamic,
        position = soundOptions.position,
        destroyOnFinish = soundOptions.destroyOnFinish
    })
    
    return true
end

LSSound.PlaySound = function(id, soundFile, options)
    if not id or not soundFile then return false end
    if LSSound.SoundInfo[id] then LSSound.Stop(id) end
    
    options = options or {}
    local soundOptions = {
        volume = options.volume or LSSound.Default.volume,
        soundName = soundFile,
        id = id,
        loop = options.loop or LSSound.Default.loop,
        isDynamic = options.isDynamic or LSSound.Default.isDynamic,
        position = options.position or nil,
        distance = options.distance or LSSound.Default.distance,
        destroyOnFinish = options.destroyOnFinish or LSSound.Default.destroyOnFinish,
    }
    
    LSSound.SoundInfo[id] = soundOptions
    
    SendNUIMessage({
        status = "playsound",
        id = id,
        soundName = soundFile,
        volume = soundOptions.volume,
        loop = soundOptions.loop,
        isDynamic = soundOptions.isDynamic,
        position = soundOptions.position,
        destroyOnFinish = soundOptions.destroyOnFinish
    })
    
    return true
end

LSSound.Stop = function(id)
    if not id or not LSSound.SoundInfo[id] then return false end
    
    SendNUIMessage({
        status = "stop",
        id = id
    })
    
    LSSound.SoundInfo[id] = nil
    return true
end

LSSound.Pause = function(id)
    if not id or not LSSound.SoundInfo[id] then return false end
    
    SendNUIMessage({
        status = "pause",
        id = id
    })
    
    return true
end

LSSound.Resume = function(id)
    if not id or not LSSound.SoundInfo[id] then return false end
    
    SendNUIMessage({
        status = "resume",
        id = id
    })
    
    return true
end

LSSound.SetVolume = function(id, volume)
    if not id or not LSSound.SoundInfo[id] then return false end
    if not volume or volume < 0 or volume > 1 then volume = LSSound.Default.volume end
    
    SendNUIMessage({
        status = "volume",
        id = id,
        volume = volume
    })
    
    LSSound.SoundInfo[id].volume = volume
    return true
end

LSSound.SetPosition = function(id, position)
    if not id or not LSSound.SoundInfo[id] then return false end
    if not position or not LSSound.SoundInfo[id].isDynamic then return false end
    
    SendNUIMessage({
        status = "position",
        id = id,
        position = position
    })
    
    LSSound.SoundInfo[id].position = position
    return true
end

LSSound.SetDistance = function(id, distance)
    if not id or not LSSound.SoundInfo[id] then return false end
    if not distance then distance = LSSound.Default.distance end
    
    SendNUIMessage({
        status = "distance",
        id = id,
        distance = distance
    })
    
    LSSound.SoundInfo[id].distance = distance
    return true
end

LSSound.SetLoop = function(id, loop)
    if not id or not LSSound.SoundInfo[id] then return false end
    
    SendNUIMessage({
        status = "loop",
        id = id,
        loop = loop
    })
    
    LSSound.SoundInfo[id].loop = loop
    return true
end

LSSound.FadeOut = function(id, time)
    if not id or not LSSound.SoundInfo[id] then return false end
    if not time then time = 1000 end
    
    SendNUIMessage({
        status = "fadeout",
        id = id,
        time = time
    })
    
    SetTimeout(time, function()
        LSSound.SoundInfo[id] = nil
    end)
    
    return true
end

LSSound.FadeIn = function(id, time, volume)
    if not id or not LSSound.SoundInfo[id] then return false end
    if not time then time = 1000 end
    if not volume then volume = LSSound.SoundInfo[id].volume end
    
    SendNUIMessage({
        status = "fadein",
        id = id,
        time = time,
        volume = volume
    })
    
    return true
end

LSSound.IsPlaying = function(id)
    if not id or not LSSound.SoundInfo[id] then return false end
    
    return true
end

LSSound.GetMaxDuration = function(id)
    if not id or not LSSound.SoundInfo[id] then return 0 end
    
    SendNUIMessage({
        status = "getduration",
        id = id
    })
    
    if not LSSound.SoundInfo[id].duration then
        LSSound.SoundInfo[id].duration = 0
    end
    
    return LSSound.SoundInfo[id].duration or 0
end

LSSound.GetCurrentTime = function(id)
    if not id or not LSSound.SoundInfo[id] then return 0 end
    
    SendNUIMessage({
        status = "getcurrenttime",
        id = id
    })
    
    if not LSSound.SoundInfo[id].currentTime then
        LSSound.SoundInfo[id].currentTime = 0
    end
    
    return LSSound.SoundInfo[id].currentTime or 0
end

LSSound.GetInfo = function(id)
    if not id or not LSSound.SoundInfo[id] then return {} end
    
    SendNUIMessage({
        status = "getinfo",
        id = id
    })
    
    if not LSSound.SoundInfo[id].info then
        LSSound.SoundInfo[id].info = {
            title = "Unknown",
            artist = "Unknown",
            album = "Unknown",
            url = LSSound.SoundInfo[id].url or "Unknown"
        }
    end
    
    return LSSound.SoundInfo[id].info
end

LSSound.Seek = function(id, position)
    if not id or not LSSound.SoundInfo[id] then return false end
    
    SendNUIMessage({
        status = "seek",
        id = id,
        position = position
    })
    
    return true
end

AddEventHandler('onClientResourceStart', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    
    LSSound.Initialize()
end)

CreateThread(function()
    while true do
        Wait(100)
        local playerPos = GetEntityCoords(PlayerPedId())
        
        SendNUIMessage({
            status = "position",
            x = playerPos.x,
            y = playerPos.y,
            z = playerPos.z
        })
        
        for id, soundInfo in pairs(LSSound.SoundInfo) do
            if soundInfo.isDynamic and soundInfo.position then
                local distance = #(playerPos - vector3(soundInfo.position.x, soundInfo.position.y, soundInfo.position.z))
                local volume = 0
                
                if distance <= soundInfo.distance then
                    volume = soundInfo.volume * (1 - (distance / soundInfo.distance))
                    SendNUIMessage({
                        status = "volume",
                        id = id,
                        volume = volume
                    })
                else
                    SendNUIMessage({
                        status = "volume",
                        id = id,
                        volume = 0
                    })
                end
            end
        end
    end
end) 
