require('dotenv').config()

//CONEXION A LA BASE DE DATOS
const mongoose = require('mongoose')

//const connectionString = process.env.MONGO_DB_URI
//conexion a mongodb

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

mongoose.connect(connectionString)
    .then(() => {
        console.log('Base de datos conectada!')
    }).catch(err => {
        console.error(err)
        console.log('Error al conectar la base de datos!')
    })

process.on('uncaughtException', () => {
    mongoose.connection.disconnect()
})

// mongoose.connect(connectionString)
// .then(() =>{
//     console.log('Base de datos Conectada')
// }).catch(err =>{
//     console.log('Error al conectar la base de datos, verifique conexión')
//     console.log(err)
// })



