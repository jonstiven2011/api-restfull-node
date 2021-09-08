//Middleware->Si no entra a ningun endpoint
module.exports = (error, request, response, next) => {
    res.status(404).end()
}
