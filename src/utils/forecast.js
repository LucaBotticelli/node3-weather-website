const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=602b474bc9ac5d446affdc7d322bed83&query=' + latitude + ',' + longitude + ''

    request( 
        { url, json: true },
        (error, {body}) => {

            if (error) {
                callback('Unable to connect to weather service!', undefined )
            } else if (body.error) {
                callback('Unable to find location. Try another search', undefined )
            } else {
                callback(undefined, "It's " + body.current.weather_descriptions + ". There are " + body.current.temperature + " degrees (" +body.current.humidity + "% Humidity) with a " + body.current.precip + "% chance of rain."
                )
            }

        }
    )
   

}
module.exports = forecast;