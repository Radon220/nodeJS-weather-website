const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express();

//paths for express config
const pubDir = path.join(__dirname,'../public/');
const viewsDir = path.join(__dirname,'../templates/views')
const partialsDir = path.join(__dirname,'../templates/partials')

//hbs engine and location of views
app.set('view engine','hbs');
app.set('views',viewsDir);
hbs.registerPartials(partialsDir);

//static serve directory
app.use(express.static(pubDir));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:"Li Hung"
    })
})


app.get('/about',( req, res )=>{
    res.render('about',{
        title: "About page",
        name: "Li Hung"
    })
});
app.get('/help',( req, res )=>{
    res.render('help',{
        title: "Help page",
        name: "Li Hung"
    })
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"location needed"
        })
    }
    address = req.query.address;

    geocode(address, (error,{lat,long,location} = {}) =>{
        if(error){
            return res.send({
                error
            });
        }

        forecast(lat,long, (forecastError, {currentTemp,feelCurrTempt} = {}) => {

            if(forecastError){
                return res.send({
                    error:forecastError
                });
            }

            res.send({
                location,
                lat,
                long,
                currentTemp: currentTemp+'C',
                feelsLike: feelCurrTempt + 'C'
            })        
        })
    })

  
})


app.get('/help/*',(req,res)=>{ 
    res.render('errorPage',{
        title: "Error 404",
        name: "Li Hung",
        errorMsg:"Help Article"
    })
})


app.get('*',(req,res)=>{ //404 has to be last
    res.render('errorPage',{
        title: "Error 404",
        name: "Li Hung",
        errorMsg:"Page"
    })
})




app.listen(3000, () =>{
    console.log('server running on port 3000');
});