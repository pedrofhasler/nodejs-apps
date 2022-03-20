import request from "postman-request";

const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=5f53f9d470ac4c9a0b2d742507d1cd0a&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: url, json: true }, (error, response) => {

        if (error) {

            callback('Unable to connect to weather services!', undefined)

        } else if (response.body.error) {

            callback('Unable to find location.', undefined)

        } else {

            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + ' degress out. It feels like ' + response.body.current.feelslike + ' degress out.')


        }

    })
}

export { forecast }