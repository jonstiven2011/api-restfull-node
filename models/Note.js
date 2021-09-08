const mongoose = require('mongoose')
const {model, Schema} = mongoose

//Contrato o esquema
const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: ( document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//Modelo o clase -> nombre debe ser en singular //tiene dos parametros, nameModel and Schema //Ej model('Note', noteSchema)
const Note = model('Note', noteSchema)
module.exports = Note

//---->Contrato o esquema
// const noteSchema = new Schema({
//     content: String,
//     date: Date,
//     important: Boolean
// })
//--->Modelo o clase -> nombre debe ser en singular //tiene dos parametros, nameModel and Schema //Ej model('Note', noteSchema)
//const Note = model('Note', noteSchema)

//Instanciar
// const note = new Note({
//     content: 'MongoDB es muy bueno',
//     date: new Date(),
//     important: true
// })

// note.save()
//     .then(result =>{
//         console.log(result)
//         mongosse.connection.close()
//     }).catch(err =>{
//         console.log(err)
//     })