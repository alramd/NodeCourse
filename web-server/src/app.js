const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//Goal: Create a partial for the footer
//
//1. Setup the template for the footer partial "Created by Some Name"
//2. Render the partial at the bottom of all three pages
//3. Test your work by visiting all three pages

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and templates location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jordan Coates'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 666,
        title: 'Help',
        name: 'Jordan Coates'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jordan Coates'
    })
})

app.get('/weather', (req, res) => {
    const {address} = req.query
    if(!address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(address, (error, data) => {
       if(error){
           return res.send({
               error
           })
       }
       forecast(data, (error, data2) => {
            if(error){
                return console.log
            }
            let forecast = 'The current temperature is ' + data2.temperature +
                ' degrees celsius. It feels like ' + data2.feelsLike + ' degrees celsius.'
           res.send({
               forecast,
               location: data.location,
               address
           })
       })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
          error: "You must provide a search term"
        })
    }
    res.send({
        products: [req.query.search]
    })
})

// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help article not found',
        name: 'Jordan Coates'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Page not found',
        name: 'Jordan Coates'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})