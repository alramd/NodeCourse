const request = require('request')

const forecast = ({longitude, latitude}, callback) => {

    let url = 'http://api.weatherstack.com/current' +
        '?access_key=25d573e396f7b0a1a5fe480c8ccb9772&' +
        'query='
    url += longitude + ',' + latitude
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to weather service.', undefined)
        }
        else if(body.error){
            callback('Unable to find location.', undefined)
        }
        else {
            const {current} = body
            callback(undefined, {
                temperature: current.temperature,
                feelsLike: current.feelslike
            })
        }
    })
}
module.exports = forecast