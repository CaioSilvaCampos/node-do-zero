// import { createServer } from 'node:http'

// const server = createServer((req, res) => {
//     res.write('hello world')
//     return res.end()
// })

// server.listen(3333, () => {
//     console.log('Servidor escutando na porta 3333')
// })


import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'
import { describe } from 'node:test'

const server = fastify()
const database = new DatabaseMemory()
server.post('/videos', (req,reply)=>{
    const { title, description, duration } = req.body
   
    database.create({
       title,
       description,
       duration,
    })

    

    return reply.status(201).send()
})

server.get('/videos', (req,reply)=>{
    const search = req.query.search
    const videos = database.list(search)

    console.log(search)


    return videos
})

server.put('/videos/:id', (req,reply)=>{
    const videoId = req.params.id
    const { title, description, duration } = req.body

     database.update(videoId, {
        title,
        description,
        duration, 
    })

    return reply.status(204).send()

})
server.delete('/videos/:id', (req,reply)=>{
    const videoId = req.params.id

    database.delete(videoId)
    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})