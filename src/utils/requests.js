const fetch = require('node-fetch')

const { getToken } = require('./apiToken')

const apiUrl = 'http://apiadvisor.climatempo.com.br/api/v1'

async function getCityID(cityName){
    try{
        const appToken = await getToken();
        const responseCity = await fetch(`${apiUrl}/locale/city?name=${encodeURI(cityName)}&token=${appToken}`)
        const cityJson = await responseCity.json();
        console.log(cityJson,' json')
        
        if(!cityJson.length){
            if(cityJson.detail) throw new Error(cityJson.detail)

            throw new Error(`Cidade ${cityName} não encontrada.`)
        }
        return cityJson[0].id

    }catch(e){
        throw new Error(e)
    }
}

async function getCityForecast(cityID){
    try{
        const appToken = await getToken();
        const responseWeather = await fetch(`${apiUrl}/weather/locale/${cityID}/current?token=${appToken}`)

        console.log(responseWeather, 'response')
        const weatherJson = await responseWeather.json();

        return {
            name: weatherJson.name,
            state: weatherJson.state,
            country: weatherJson.country,
            ...weatherJson
        }
    }catch(e){
        throw new Error(e)
    }
}

module.exports =  {
    getCityID,
    getCityForecast
}