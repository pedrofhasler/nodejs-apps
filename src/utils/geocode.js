import request from 'postman-request'


const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGVkcm9maGFzbGVyIiwiYSI6ImNsMHh4b2gwYjF2cTEzaXA0eW83OG15ZXUifQ.MaxEtXHD6nhbEylrl7VBmg&limit=1'

    request({ url, json: true }, (error, response) => {

        if (error) {

            callback('Unable to connect to location services!', undefined)

        } else if (response.body.features.length === 0) {

            callback('Unable to find location. Try another search.', undefined)

        } else {

            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })

        }

    })

}

export { geocode }