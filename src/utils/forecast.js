const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5cecefa67da2752336ba26f68a11ba8a&query='+ latitude+','+longitude 

    request({url , json: true}, (error,{body}) => {
        if(error){
            callback('Unable to connect the weather service',undefined)
        }else if(body.error){
            callback('Unable to find location ,Please try again',undefined)
        }else{
            callback(undefined, body.current.temperature)
        }
    })
}

module.exports = forecast