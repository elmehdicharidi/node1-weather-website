const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Mehdi Charidi'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About me',
        src: 'img/IMG_0055 2.JPG',
        name: 'Elmehdi Charidi'

    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        message: 'All what you need for the help page.',
        title: 'Help',
        name: 'Mehdi Charidi'

    })
})



app.get('/weather',(req, res) => {
    if(!req.query.address){
        res.send({
            error: 'You must provide an address'
        })
        return
    }

    geocode(req.query.address,(error, {latitude, longtitude, location} = {} ) => {
        if(error){
            return res.send(
                {
                    error: error
                }
            )            
        }


        forecast(latitude, longtitude, (error1, forecastData) => {
    
            if(error1){
                return res.send(
                    {
                        error: error1
                    }
                )
            }

            res.send(
                {
                    forecast: forecastData,
                    location: location
                }
            )
        })
        
    
    })
    
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        res.send({
            message: 'You must provide a search query'
        })
        return
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help Article not found',
        name: 'Elmehdi Charidi'
    })
    
})


app.get('*',(req, res) => {
    res.render('404',{
        title: '404',
        message: 'Page not found',
        name: 'Elmehdi Charidi'
    })
})



app.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})