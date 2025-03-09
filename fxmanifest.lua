fx_version 'cerulean'
game 'gta5'

name 'ls-sound'
author 'LS Store'
description 'Advanced Sound Library for FiveM'
version '1.0.0'

shared_script 'config.lua'

ui_page 'html/index.html'

client_scripts {
    'client/main.lua',
    'client/events.lua',
    'client/exports.lua'
}

server_scripts {
    'server/main.lua',
    'server/exports.lua'
}

files {
    'html/index.html',
    'html/css/*.css',
    'html/scripts/*.js',
    'html/sounds/*.ogg',
    'html/sounds/*.mp3'
}

dependency 'chat'

lua54 'yes' 