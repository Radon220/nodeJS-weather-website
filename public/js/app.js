document.addEventListener('DOMContentLoaded', (event) => {
   
// var address = "Singapore"

// fetch('/weather?address='+address).then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             return data.error;
//         }
//         console.log(data.location);
//         console.log(data.currentTemp);
//     })

// })


    const weatherForm = document.getElementById('form-location')

    weatherForm.addEventListener('submit',(e)=>{
        e.preventDefault();

        const address = document.getElementById('addressInput').value

        if(address){

            fetch('/weather?address='+address).then((response)=>{
                response.json().then((data)=>{
                    if(data.error){
                        document.getElementById('resTxt').innerHTML =  data.error;
                    }
                    else{
                        document.getElementById('location').innerHTML = "Location: "+ data.location
                        document.getElementById('currentTemp').innerHTML ="Current Temperature: "+  data.currentTemp
                        document.getElementById('feelsTemp').innerHTML ="Feels Like: "+  data.feelsLike
                    }
                })

            })
        }
        else{
            document.getElementById('resTxt').innerHTML = "Please input a location"
        }

        
    })

});
