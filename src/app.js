import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs'

const PORT = 3000
const app = express()

// Define paths for Express config
const __dirname = fileURLToPath(
    import.meta.url)
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

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

    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Pedro Hasler'
    })

})



//Get for any page that doesn't exist
app.get('*', (req, res) => {
    res.send('My 404 page')
})

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`)
})