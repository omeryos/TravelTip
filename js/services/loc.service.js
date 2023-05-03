import {storageService}  from './async-storage.service.js'


export const locService = {
    getLocs,
    addLoc,
    // getLocsByStr
}

const LOCDB_KEY = 'locationsDB'
const API_KEY = 'AIzaSyA56bD6CA8dAO2OC1Auqwl2Fudf5sDG00Y'

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
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


