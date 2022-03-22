import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs'
import { geocode } from './utils/geocode.js';
import { forecast } from './utils/forecast.js';

const PORT = 3000
const app = express()

// Define paths for Express config
const __dirname = fileURLToPath(
    import.meta.url)
const publicDirPath = path.join(__dirname, '../../public')
const viewsPath = path.join(__dirname, '../../template/views')
const partialsPath = path.join(__dirname, '../../template/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather App',
        name: 'Pedro Hasler'
    })

})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About Me',
        name: 'Pedro Hasler'
    })

})

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help',
        message: 'This is a help message',
        name: 'Pedro Hasler'
    })

})

// We can use * to filter some urls
app.get('/help/*', (req, res) => {

    res.render('page_404', {
        title: '404',
        message: 'Help article not found',
        name: 'Pedro Hasler'
    })

})

app.get('/weather', (req, res) => {

    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'You must provide a address!'
        })
    }

    console.log(address)

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        console.log(longitude, latitude, location)

        forecast(latitude, longitude, (error, forecastData = "") => {
            console.log(forecastData)
            if (error) {
                return res.send({ error })
            }

            return res.send({
                location,
                forecastData,
                address
            })

        })
    })
})



//Get for any page that doesn't exist
app.get('*', (req, res) => {
    res.render('page_404', {
        title: '404',
        message: 'Page not found',
        name: 'Pedro Hasler'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`)
})