const request = require('superagent')
const urlweatherstack = 'http://api.weatherstack.com/current'
const accesstokenweatherstack = '7622ab8288f2dafbbfcbaa44ece51245'



const forecast = (lat, long, callback) => {

    request
        .get(urlweatherstack)
        .query({
            access_key: accesstokenweatherstack,
            query: lat + ',' + long
        })
        .end((err, {
            body
        }) => {

            if (err) {
                callback('Unable to connect to weather service', undefined)
            } else if (body.error) {
                callback('Unable to find location', undefined)
            } else {
                const {
                    weather_descriptions,
                    temperature,
                    precip,
                    feelslike
                } = body.current
                const result = weather_descriptions + ', It is ' + temperature + '. It feels like it is ' + feelslike + ' There is a ' + precip * 10 + ' % chance of rain:)'
                callback(undefined, result)
            }

        });

}

module.exports = forecast