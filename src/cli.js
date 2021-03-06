const { join } = require('path')
const s = require('chalk')
const program = require('commander')

const { version } = require('../package.json')
const { saveCity } = require('./utils/requests')
const { getForecast } = require('./main')
const { setToken } = require('./utils/apiToken')


function init(args){
    program
    .version(version, '-v, --version', 'Mostra a Versão da Ferramenta')
    .option('-t --token [token]', 'API Token from Advisor Climatempo')
    .option('-c --city [city...]','Save Cities to your api token')
    .arguments('cityName...')//parâmetro obrigatório '<>' | os '...' serve para concatenar espaços possíveis e torná-los em um único parâmetro
    .description('Mostra o clima de uma cidade em tempo real')
    .action(async (cityName) =>{//city name é um parâmetro do callback
        if(program.token) await setToken(program.token)
        if(program.city) await saveCity(program.city)
        
        // getForecast(cityName.join(' '))
    })
    .on('--help, -h', () =>{
        console.log('\nExemplos:\n$ clima porto alegre\n$ clima são paulo')
    })

    program.parse(args)

}   

module.exports = {
    init
}
