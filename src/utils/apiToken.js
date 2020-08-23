const fs = require('fs')
const { join, resolve } = require('path')

const tokenFilePath = join(__dirname, 'token')

function setToken(apiToken){
    return new Promise((resolve, reject) =>{
        try {
            fs.writeFile(tokenFilePath, apiToken, (err) =>{
                if(err) reject(err)
                resolve()
            })
        } catch (e) {
            reject(e)
        }

    })
}

function getToken(){
    return new Promise((resolve, reject) =>{
        try {
            fs.readFile(tokenFilePath, 'utf8', (err, token) =>{
                if(err || token === '') reject(`Você precisa fornecer um token. Gere um token aqui: https://advisor.climatempo.com.br`)
                resolve(token)
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getToken,
    setToken
}
