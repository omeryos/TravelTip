import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { storageService } from './services/async-storage.service.js'

export const controller = {
    renderLocs,
}

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onAddLoc = onAddLoc


function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 31.0749831, lng: 42.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            onPanTo(pos.coords.latitude, pos.coords.longitude)


            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 42.6917)
}

function onAddLoc(ev) {
    const name = prompt('Place name?', 'Place 1')
    if (!name) return
    const lat = ev.latLng.lat()
    const lng = ev.latLng.lng()
    mapService.panTo(lat, lng)

    locService.addLoc(name, lat, lng)
    
}

function renderLocs(locs) {
    let strHtmls = locs.map(loc => {
        return `<article class="loc-preview" >
        <h3>${loc.name}</h3>
        <span>Saved at: ${new Date(loc.createdAt).toLocaleTimeString()}</span>
        <button onclick="onPanTo(${loc.lat}, ${loc.lng})">GO</button>
        <button onclick="onRemoveLoc('${loc.id}')">Delete</button>
        </article>`
    })
    document.querySelector('.locs-table').innerHTML = strHtmls.join("")
}

function onRemoveLoc(locId) {
    locService.removeLoc(locId).then(res => renderLocs(res))
}
