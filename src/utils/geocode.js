const request = require('postman-request')

const geocode = (address, callback) => {
    // encodeURIComponent --> this will convert special characters like ? of empty space
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2ltb25lanVua2Fsb3BhIiwiYSI6ImNrZXU5Mm85ZjBtZTMzNGxocHJheXZ2a2gifQ.skLJwH61TZXEDta6RpdkTA&limit=1'
    request( 
        { url, json: true },
        (error, {body}) => {
            if (error) {
                callback('Unable to connect to weather service!', undefined )
            } else if (body.features.length === 0) {
                callback('Unable to find location. Try another search', undefined )
            } else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }

        }
    )
}

module.exports = geocode;