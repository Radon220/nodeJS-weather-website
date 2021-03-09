const request = require('postman-request');

const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibGlodW5nIiwiYSI6ImNrbTA5NjJpZTBqcGgybnFzanF0a2k0ZnYifQ.6sLorZFjndcoeji1BDW2uA"

    request({url,json:true}, (error,response)=>{

        const {features} = response.body

        if (error){
            callback("Connection to http failed",undefined);
        }
        else if(features.length === 0){
            callback('no results found',undefined);
        }
        else{
            const lat = features[0].center[1]; 
            const long = features[0].center[0];
            const location = features[0].place_name;
            callback(undefined,{
                lat,
                long,
                location
            })
        }

    })
}

module.exports = geocode

/* default node way
const http = require('http')
const url = "" //insert url

const request = http.request(urlm (response)=>{
    let data = ''

    response.on('data', (chunk)=>{
        data = data+chunk.toString()
    })

    response.on('end',()=>{
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error',(error)=>{
    console.log(error)
})

request.end()
*/