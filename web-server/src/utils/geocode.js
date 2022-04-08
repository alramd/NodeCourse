const request = require("request");

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(address) +'.json?' +
        'access_token=pk.eyJ1IjoiYWxyYW1kIiwiYSI6ImNsMWxkN2tlMTA5b3kza2w2M3BrMml5b3kifQ.fxsK6dE5QnytBQaAqRfOFQ&' +
        'postcode=2290&' +
        'limit=1&'

    request({url, json : true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to location services.', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            const {features} = body
            callback(undefined, {
                latitude: features[0].center[0],
                longitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode