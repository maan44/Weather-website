const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('request')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Defines path for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlers engine and views locaion
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup static directory to sreve
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Alex',
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Alex',
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help center',
        helpText: 'This may be help you',
        name: 'Alex'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error,forecastData) => {
            if(error){
                return req.send({error})
            }

            res.send({
            forecast: forecastData,
            location,
            address: req.query.address,
        })
        })
    })

    // res.send({
    //     forecast: 'It is raining',
    //     location: 'Raipur',
    //     address: req.query.address,
    // })
})

app.get('/products', (req, res) => {
    if (!res.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: [],
    })
})

app.get('*', (req,res) => {
    res.render('404'
    )
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})