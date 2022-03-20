import request from 'postman-request'
import { geocode } from './utils/geocode.js'
import { forecast } from './utils/forecast.js'

const address = process.argv[2]

if (!address) {

    console.log('Please provide a address!')

} else {

    geocode(address, (error, { longitude, latitude, location } = {}) => {

        if (error) {
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return console.log(error)
            }

            console.log(location)
            console.log(forecastData)

        })
    })

}





