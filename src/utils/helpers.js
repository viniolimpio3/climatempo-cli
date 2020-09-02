function replaceAll(string, search, replace){
    return string.split(search).join(replace)
}
function log(...data){
    console.log(...data)
}

module.exports = {
    replaceAll,
    log,
}