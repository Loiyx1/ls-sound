
exports('PlayOnPlayer', function(source, id, soundFile, options)
    return LSSoundS.PlayOnPlayer(source, id, soundFile, options)
end)

exports('PlayUrlOnPlayer', function(source, id, url, options)
    return LSSoundS.PlayUrlOnPlayer(source, id, url, options)
end)

exports('PlayFromCoords', function(coords, maxDistance, id, soundFile, options)
    return LSSoundS.PlayFromCoords(coords, maxDistance, id, soundFile, options)
end)

exports('PlayUrlFromCoords', function(coords, maxDistance, id, url, options)
    return LSSoundS.PlayUrlFromCoords(coords, maxDistance, id, url, options)
end)

exports('PlayForAll', function(id, soundFile, options)
    return LSSoundS.PlayForAll(id, soundFile, options)
end)

exports('PlayUrlForAll', function(id, url, options)
    return LSSoundS.PlayUrlForAll(id, url, options)
end)

exports('StopOnPlayer', function(source, id)
    return LSSoundS.StopOnPlayer(source, id)
end)

exports('StopFromCoords', function(coords, maxDistance, id)
    return LSSoundS.StopFromCoords(coords, maxDistance, id)
end)

exports('StopForAll', function(id)
    return LSSoundS.StopForAll(id)
end)

exports('PauseOnPlayer', function(source, id)
    return LSSoundS.PauseOnPlayer(source, id)
end)

exports('ResumeOnPlayer', function(source, id)
    return LSSoundS.ResumeOnPlayer(source, id)
end)

exports('SetVolumeOnPlayer', function(source, id, volume)
    return LSSoundS.SetVolumeOnPlayer(source, id, volume)
end) 
