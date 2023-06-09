import { ApolloServer } from "@apollo/server"
import {expressMiddleware} from '@apollo/server/express4'
import { createContext } from "./context"
import { schema } from './schema'
import express from 'express'
import cors from 'cors'
import {json} from 'body-parser'
import fileUpload from 'express-fileupload'
import { join, extname } from "path"
import { nanoid } from "nanoid"

const FILE_UPLOAD_DIR = process.env.FILE_UPLOAD_DIR

const app = express()

const server = new ApolloServer({
  schema: schema,
  introspection: true
})

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : process.env.TEMP_FILE_DIR 
}))

app.post('/upload', function(req: any, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.media
  const filename = `${nanoid()}.${extname(file.name)}`
  const uploadPath = join(FILE_UPLOAD_DIR, filename)

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err)
    }

    return res.status(200).send(filename)
  })
});


const run = async () => {
  await server.start()
  
  app.use('/graphql', cors(), json(), expressMiddleware(server, {
    context: createContext
  }))

  app.listen(4000, () => {
    console.log(`🚀  Server ready at: localhost:4000`)
  })
}

run()