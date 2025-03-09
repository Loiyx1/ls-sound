# LS-Sound

FiveM için gelişmiş ses kütüphanesi. Herhangi bir framework bağımlılığı olmadan çalışır.

## Özellikler

- URL veya yerel ses dosyalarından ses çalma
- 3D ses desteği (konuma bağlı ses)
- Ses kontrolü (durdurma, duraklatma, devam ettirme, ses seviyesi ayarlama)
- Mesafeye bağlı ses seviyesi kontrolü
- Sönümlendirme efektleri (fadein/fadeout)
- Döngü özelliği
- Görsel ses efekti
- Performans optimizasyonu için önbellek (cache) sistemi
- İsteğe bağlı görsel kontrol paneli

## Kurulum

1. `ls-sound` klasörünü sunucunuzun `resources` dizinine kopyalayın
2. `server.cfg` dosyanıza `ensure ls-sound` satırını ekleyin
3. Sunucunuzu yeniden başlatın

## Kullanım

### İstemci Tarafı Kullanımı

```lua
-- URL'den ses çalma
exports['ls-sound']:PlayUrl("mySound", "https://example.com/song.mp3", {
    volume = 0.5,
    loop = false,
    isDynamic = false
})

-- Yerel ses dosyası çalma (html/sounds/ klasöründeki dosyalar)
exports['ls-sound']:PlaySound("mySound", "song.mp3", {
    volume = 0.3,
    loop = true,
    isDynamic = false
})

-- 3D ses çalma (konuma bağlı)
exports['ls-sound']:PlayUrl("my3DSound", "https://example.com/effect.mp3", {
    volume = 0.7,
    loop = false,
    isDynamic = true,
    position = { x = 1234.5, y = 123.4, z = 30.0 },
    distance = 15.0
})

-- Sesi durdurma
exports['ls-sound']:Stop("mySound")

-- Sesi duraklatma
exports['ls-sound']:Pause("mySound")

-- Sesi devam ettirme
exports['ls-sound']:Resume("mySound")

-- Ses seviyesini ayarlama
exports['ls-sound']:SetVolume("mySound", 0.8)

-- Ses konumunu değiştirme (3D ses için)
exports['ls-sound']:SetPosition("my3DSound", { x = 1240.0, y = 120.0, z = 30.0 })

-- Ses mesafesini ayarlama (3D ses için)
exports['ls-sound']:SetDistance("my3DSound", 20.0)

-- Sesin döngü durumunu değiştirme
exports['ls-sound']:SetLoop("mySound", true)

-- Sesi yavaşça kısma (süre milisaniye cinsinden)
exports['ls-sound']:FadeOut("mySound", 2000)

-- Sesi yavaşça açma (süre milisaniye cinsinden)
exports['ls-sound']:FadeIn("mySound", 1000, 0.5)

-- Ses çalınıyor mu kontrolü
local isPlaying = exports['ls-sound']:IsPlaying("mySound")
```

### Sunucu Tarafı Kullanımı

```lua
-- Belirli bir oyuncuya ses çalma
exports['ls-sound']:PlayOnPlayer(source, "serverSound", "song.mp3", {
    volume = 0.5,
    loop = false
})

-- Belirli bir oyuncuya URL'den ses çalma
exports['ls-sound']:PlayUrlOnPlayer(source, "serverUrlSound", "https://example.com/song.mp3", {
    volume = 0.5,
    loop = false
})

-- Belirli bir konumdaki tüm oyunculara ses çalma
exports['ls-sound']:PlayFromCoords({ x = 1234.5, y = 123.4, z = 30.0 }, 50.0, "areaSound", "alarm.mp3", {
    volume = 0.8
})

-- Tüm oyunculara ses çalma
exports['ls-sound']:PlayForAll("globalSound", "announcement.mp3", {
    volume = 0.5
})

-- Belirli bir oyuncunun sesini durdurma
exports['ls-sound']:StopOnPlayer(source, "serverSound")

-- Tüm oyuncuların sesini durdurma
exports['ls-sound']:StopForAll("globalSound")
```

## Olaylar (Events)

İstemci tarafında dinlenebilecek olaylar:

```lua
-- Ses çalmaya başladığında
AddEventHandler('ls-sound:onPlayStart', function(soundId)
    print("Ses başladı: " .. soundId)
end)

-- Ses bittiğinde
AddEventHandler('ls-sound:onPlayEnd', function(soundId)
    print("Ses bitti: " .. soundId)
end)

-- Ses yüklenirken
AddEventHandler('ls-sound:onLoading', function(soundId)
    print("Ses yükleniyor: " .. soundId)
end)

-- Ses duraklatıldığında
AddEventHandler('ls-sound:onPlayPause', function(soundId)
    print("Ses duraklatıldı: " .. soundId)
end)

-- Ses devam ettirildiğinde
AddEventHandler('ls-sound:onPlayResume', function(soundId)
    print("Ses devam ediyor: " .. soundId)
end)

-- Hata oluştuğunda
AddEventHandler('ls-sound:onError', function(soundId, error)
    print("Ses hatası: " .. soundId .. " - " .. error)
end)
```

## Yapılandırma

`config.lua` dosyasını düzenleyerek ses kütüphanesinin davranışını özelleştirebilirsiniz.

## Lisans

MIT License 