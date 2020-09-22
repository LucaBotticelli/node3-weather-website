const path = require('path')
const express = require('express')

const hbs = require('hbs')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

/* Setup Handlebars with hbs */
app.set('view engine', 'hbs')
app.set('views', viewPath)
/* call partials that will be used everytime inside webpages [like snippets or shortcodes] */
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Luca Botticelli'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Luca Botticelli'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'If you have any question contact:',
        name: 'Luca Botticelli'
    })
})

/* Get method parameters 1) url 2) function */
// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
    // res.send({

    //     features: {
    //         temperature: 26
    //     },
    //     location: 'Rimini',
    //     address: req.query.address
    // })
})

/* you can request to server specific products in the URL isong the ?search=games or ?rating=5 */
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    // res.send('Help article not found')
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Luca Botticelli'
    })
})


/* Handle error 404 */
app.get('*', (req, res) => {
    // res.send('My 404 page')
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Luca Botticelli'
    })
})

/* Listen method will give a port to access the web */
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})