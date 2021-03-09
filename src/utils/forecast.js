 const request = require('postman-request');

const forecast = (lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=681457c8716888c2ff46f376bd54e33b&query='+lat+','+long

    request({url,json:true}, (error,response)=>{
        const {current} = response.body
        if (error){
            callback("Connection to http failed",undefined);
        }
        else if(current.error){
            callback(error, undefined)
        }
        else{
            const currentTemp = current.temperature;
            const feelCurrTempt = current.feelslike;
            

            callback(undefined,{
                currentTemp,
                feelCurrTempt
            })
        }

    })
}

module.exports = forecast


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