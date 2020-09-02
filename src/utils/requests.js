const fetch = require('node-fetch')
const { replaceAll } = require('./helpers')
const { getToken } = require('./apiToken')

const axios = require('axios')


const apiUrl = 'http://apiadvisor.climatempo.com.br/api/v1'

async function getCityID(cityName, state=false){
    try{
        const appToken = await getToken()
        let responseCity = false
        responseCity = await fetch(`${apiUrl}/locale/city?name=${encodeURI(cityName)}&token=${appToken}`)
        if(!responseCity) throw new Error()
        const cityJson = await responseCity.json()

        if(!cityJson.length){
            if(cityJson.detail) throw new Error(cityJson.detail)
            throw new Error(`Cidade ${cityName} não encontrada.`)
        }
        console.log(cityJson)
        return cityJson[0].id

    }catch(e){
        throw new Error(e)
    }
}
async function getCityForecast(cityID){
    try{
        const appToken = await getToken()
        console.log(cityID, 'cityID')
        const responseWeather = await fetch(`${apiUrl}/weather/locale/${cityID}/current?token=${appToken}`)

        console.log(responseWeather, 'response')
        const weatherJson = await responseWeather.json()

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


async function saveCity(cityName){
    if(typeof cityName === 'object'){
        const str = replaceAll(Object.values(cityName).toString(), ',' , ' ') 
        cityName = str
    }
    console.log(cityName)
    const appToken = await getToken()
    const cityID = await getCityID(cityName)
    console.log(cityID)
    const data = JSON.stringify({id:cityID}) 
    console.log(data)
    const configs = {
        method:'PUT',
        headers:'Content-Type: application/x-www-form-urlencoded',
        body: data
    }

    const a = await axios.put(`http://apiadvisor.climatempo.com.br/api-manager/user-token/${appToken}/locales` , configs)
    console.log(a, 'a')
    const responseCities = await fetch(`http://apiadvisor.climatempo.com.br/api-manager/user-token/${appToken}/locales`, configs)
    
    console.log(responseCities)

}

module.exports =  {
    getCityID,
    getCityForecast,
    saveCity
}