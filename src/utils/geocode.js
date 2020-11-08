const request = require('superagent')
const accesstokenmapbox = 'pk.eyJ1IjoiZWxtZWhkaWNoYXJpZGkiLCJhIjoiY2tnd21xeDg3MGJtbjJycGY3cmVwb2FwdiJ9.GJH3JPen97-fXr23GAzipw'


const geocode = (address, callback) => {
    const urlmapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json'
    request
        .get(urlmapbox)
        .query({
            access_token: accesstokenmapbox
        })
        .end((err, {
            body
        }) => {

            //If there is no internet
            if (err) {
                callback('Unable to connect to location services!', undefined)
                return
            }

            // If the location is not found
            if (body.features.length <= 0) {

                debugger
                console.log('Running')
                callback('Location not found. Try another search', undefined)
                return
            }

            // If everything is ok
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        });
}

module.exports = geocode