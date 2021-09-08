//Para manejar errores
module.exports = (error, request, response, next) => {
    console.error(error)
    if(error.name === 'CastError')
    {
        response.status(400).send({ error: 'La Id usada no esta bien'})
    }
    else{
        response.status(500).end()
    }
}