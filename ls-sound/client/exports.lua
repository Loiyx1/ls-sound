local function GetLSSound()
    return _G.LSSound or {}
end

exports('PlayUrl', function(id, url, options)
    local LSS = GetLSSound()
    if not LSS.PlayUrl then
        return false
    end
    return LSS.PlayUrl(id, url, options)
end)

exports('PlaySound', function(id, soundFile, options)
    local LSS = GetLSSound()
    if not LSS.PlaySound then
        return false
    end
    return LSS.PlaySound(id, soundFile, options)
end)

exports('Stop', function(id)
    local LSS = GetLSSound()
    if not LSS.Stop then
        return false
    end
    return LSS.Stop(id)
end)

exports('Pause', function(id)
    local LSS = GetLSSound()
    if not LSS.Pause then
        return false
    end
    return LSS.Pause(id)
end)

exports('Resume', function(id)
    local LSS = GetLSSound()
    if not LSS.Resume then
        return false
    end
    return LSS.Resume(id)
end)

exports('SetVolume', function(id, volume)
    local LSS = GetLSSound()
    if not LSS.SetVolume then
        return false
    end
    return LSS.SetVolume(id, volume)
end)

exports('SetPosition', function(id, position)
    local LSS = GetLSSound()
    if not LSS.SetPosition then
        return false
    end
    return LSS.SetPosition(id, position)
end)

exports('SetDistance', function(id, distance)
    local LSS = GetLSSound()
    if not LSS.SetDistance then
        return false
    end
    return LSS.SetDistance(id, distance)
end)

exports('SetLoop', function(id, loop)
    local LSS = GetLSSound()
    if not LSS.SetLoop then
        return false
    end
    return LSS.SetLoop(id, loop)
end)

exports('FadeOut', function(id, time)
    local LSS = GetLSSound()
    if not LSS.FadeOut then
        return false
    end
    return LSS.FadeOut(id, time)
end)

exports('FadeIn', function(id, time, volume)
    local LSS = GetLSSound()
    if not LSS.FadeIn then
        return false
    end
    return LSS.FadeIn(id, time, volume)
end)

exports('IsPlaying', function(id)
    local LSS = GetLSSound()
    if not LSS.IsPlaying then
        return false
    end
    return LSS.IsPlaying(id)
end)

exports('GetMaxDuration', function(id)
    local LSS = GetLSSound()
    if not LSS.GetMaxDuration then
        return 0
    end
    return LSS.GetMaxDuration(id)
end)

exports('GetCurrentTime', function(id)
    local LSS = GetLSSound()
    if not LSS.GetCurrentTime then
        return 0
    end
    return LSS.GetCurrentTime(id)
end)

exports('GetInfo', function(id)
    local LSS = GetLSSound()
    if not LSS.GetInfo then
        return {}
    end
    return LSS.GetInfo(id)
end)

exports('Seek', function(id, position)
    local LSS = GetLSSound()
    if not LSS.Seek then
        return false
    end
    return LSS.Seek(id, position)
end) 
