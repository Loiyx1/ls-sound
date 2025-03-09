RegisterNUICallback('onPlayStart', function(data, cb)
    if not data.id then return end
    TriggerEvent('ls-sound:onPlayStart', data.id)
    cb('ok')
end)

RegisterNUICallback('onPlayEnd', function(data, cb)
    if not data.id then return end
    TriggerEvent('ls-sound:onPlayEnd', data.id)
    if LSSound.SoundInfo[data.id] and LSSound.SoundInfo[data.id].destroyOnFinish then
        LSSound.SoundInfo[data.id] = nil
    end
    cb('ok')
end)

RegisterNUICallback('onLoading', function(data, cb)
    if not data.id then return end
    TriggerEvent('ls-sound:onLoading', data.id)
    cb('ok')
end)

RegisterNUICallback('onPlayPause', function(data, cb)
    if not data.id then return end
    TriggerEvent('ls-sound:onPlayPause', data.id)
    cb('ok')
end)

RegisterNUICallback('onPlayResume', function(data, cb)
    if not data.id then return end
    TriggerEvent('ls-sound:onPlayResume', data.id)
    cb('ok')
end)

RegisterNUICallback('onError', function(data, cb)
    if not data.id then return end
    if Config.Debug then
        print("^1LS-Sound Error: " .. data.id .. " - " .. (data.error or "Bilinmeyen hata"))
    end
    TriggerEvent('ls-sound:onError', data.id, data.error)
    cb('ok')
end)

RegisterNetEvent('ls-sound:checkDistancePlay')
AddEventHandler('ls-sound:checkDistancePlay', function(id, soundFile, coords, maxDistance, options)
    -- Mesafeyi kontrol et
    local playerPos = GetEntityCoords(PlayerPedId())
    local distance = #(playerPos - vector3(coords.x, coords.y, coords.z))
    
    if distance <= maxDistance then
        LSSound.PlaySound(id, soundFile, options)
    end
end)

RegisterNetEvent('ls-sound:checkDistancePlayUrl')
AddEventHandler('ls-sound:checkDistancePlayUrl', function(id, url, coords, maxDistance, options)
    local playerPos = GetEntityCoords(PlayerPedId())
    local distance = #(playerPos - vector3(coords.x, coords.y, coords.z))
    
    -- Mesafe içindeyse sesi çal
    if distance <= maxDistance then
        LSSound.PlayUrl(id, url, options)
    end
end)

RegisterNetEvent('ls-sound:checkDistanceStop')
AddEventHandler('ls-sound:checkDistanceStop', function(id, coords, maxDistance)
    -- Mesafeyi kontrol et
    local playerPos = GetEntityCoords(PlayerPedId())
    local distance = #(playerPos - vector3(coords.x, coords.y, coords.z))
    
    if distance <= maxDistance then
        LSSound.Stop(id)
    end
end)

RegisterNetEvent('ls-sound:playSound')
AddEventHandler('ls-sound:playSound', function(id, soundFile, options)
    LSSound.PlaySound(id, soundFile, options)
end)

RegisterNetEvent('ls-sound:playUrl')
AddEventHandler('ls-sound:playUrl', function(id, url, options)
    LSSound.PlayUrl(id, url, options)
end)

RegisterNetEvent('ls-sound:stop')
AddEventHandler('ls-sound:stop', function(id)
    LSSound.Stop(id)
end)

RegisterNetEvent('ls-sound:pause')
AddEventHandler('ls-sound:pause', function(id)
    LSSound.Pause(id)
end)

RegisterNetEvent('ls-sound:resume')
AddEventHandler('ls-sound:resume', function(id)
    LSSound.Resume(id)
end)

RegisterNetEvent('ls-sound:setVolume')
AddEventHandler('ls-sound:setVolume', function(id, volume)
    LSSound.SetVolume(id, volume)
end)

RegisterNetEvent('ls-sound:setPosition')
AddEventHandler('ls-sound:setPosition', function(id, position)
    LSSound.SetPosition(id, position)
end)

RegisterNetEvent('ls-sound:setDistance')
AddEventHandler('ls-sound:setDistance', function(id, distance)
    LSSound.SetDistance(id, distance)
end)

RegisterNetEvent('ls-sound:setLoop')
AddEventHandler('ls-sound:setLoop', function(id, loop)
    LSSound.SetLoop(id, loop)
end)

RegisterNetEvent('ls-sound:fadeOut')
AddEventHandler('ls-sound:fadeOut', function(id, time)
    LSSound.FadeOut(id, time)
end)

RegisterNetEvent('ls-sound:fadeIn')
AddEventHandler('ls-sound:fadeIn', function(id, time, volume)
    LSSound.FadeIn(id, time, volume)
end) 
