const { getCityForecast, getCityID } = require('./utils/requests')

async function getForecast(cityName){
    try{
        const cityID = await getCityID(cityName)
        const cityForecast = await getCityForecast(cityID)

        console.log(`
            Clima em ${cityForecast.name}, ${cityForecast.state}:
                Temperatura: ${cityForecast.temperature}°
                Direção do Vento: ${cityForecast.wind_direction} 
                Velocidade do Vento: ${cityForecast.wind_velocity}km/h
                Humidade: ${cityForecast.humidity}%
                Condição: ${cityForecast.condition}
                Pressão atmosférica: ${cityForecast.pressure}
                Sensação: ${cityForecast.sensation}°
        `)
    }catch(e){
        console.log(e.message)
    }
}
module.exports = {
    getForecast
} ;