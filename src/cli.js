const { join } = require('path')
const program = require('commander')

const { version } = require('../package.json')

const { getForecast } = require('./main')
const { setToken } = require('./utils/apiToken')

function init(args){
    program
    .version(version, '-v, --version', 'Mostra a Versão da Ferramenta')
    .option('-t --token [token]', 'API Token from Advisor Climatempo')
    .arguments('<cityName...>')//parâmetro obrigatório
    .description('Mostra o clima de uma cidade em tempo real')
    .action(async (cityName) =>{
        if(program.token) await setToken(program.token)
        getForecast(cityName.join(' '))
    })
    .on('--help, -h', () =>{
        console.log('\nExemplos:\n$ clima porto alegre\n$ clima são paulo')
    })

    program.parse(args)

}   

module.exports = {
    init
}
