import {storageService}  from './async-storage.service.js'


export const locService = {
    getLocs,
    addLoc,
    removeLoc,
    saveLoc,
    // getLocsByStr
}

const LOCDB_KEY = 'locationsDB'
const API_KEY = 'AIzaSyA56bD6CA8dAO2OC1Auqwl2Fudf5sDG00Y'

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384, createdAt: Date.now() }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581, createdAt: Date.now() }
]

function addLoc(name, lat, lng){
    const location = {name, lat, lng}
    storageService.post('locationsDB', location)

}


function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function removeLoc(locId) {
    return storageService.remove(LOCDB_KEY, locId)
}


function saveLoc(loc) { //if it has id, it updates, if not it creates
    if (loc.id) {
        return storageService.put(LOCDB_KEY, loc)
    } else {
        return storageService.post(LOCDB_KEY, loc)
    }
}

