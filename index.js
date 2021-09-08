require('dotenv').config()
//Conexion BD
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/Note')
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')

app.use(cors())
app.use(express.json())
app.use('/images', express.static('images'))

// const generateId = () => {
//     const notesIds = notes.map(n => n.id)
//     const maxId = notesIds.length ? Math.max(...notesIds): 0
//     const newId = maxId + 1
//     return newId
// }

//Routes
app.get('/', function (req, res) {
  res.send('Hello World')
})

// GET
app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes);
    })
})

// GET/:id
app.get('/api/notes/:id', (request, response, next) => {
    const {id} = request.params

    Note.findById(id).then(note => {
        return note 
        ? response.json(note) 
        : response.status(404).end()  
    })
    .catch(err => next(err) )
})

//PUT
app.put('/api/notes/:id', (req, res, next) => {
    const {id} = req.params
    const note = req.body

    const newNoteInfo = {
        content: note.content,
        important: note.important
    }

    Note.findByIdAndUpdate(id, newNoteInfo, { new: true})
    .then(result => {
        res.json(result)
    })
    .catch(error => next(error) )

})

// DELETE
app.delete('/api/notes/:id', (req, res, next) => {
    const {id} = req.params

    Note.findByIdAndDelete(id).then(() => {
        res.status(204).end()
    })
    .catch(error =>  next(error))
    res.status(204).end()
})

// POST 
app.post('/api/notes', (request, response) => {
   const note = request.boby

   if(!note.content){
       return response.status(400).json({
           error: 'requiere field is missing'
       })
   }

   const newNote = new Note({
        content: note.content,
        date: new Date(),
        important: note.important || false
   })

   newNote.save().then(savedNote => {
       response.json(savedNote)
   })
   .catch(error => next(error))
})


//Middleware->Si no entra a ningun endpoint
app.use(notFound)
//Middleware->  Para manejar errores
app.use(handleErrors)

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto  ${PORT}`)
})
