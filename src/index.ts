import { ApolloServer } from "@apollo/server"
import {startStandaloneServer} from '@apollo/server/standalone'
import { createContext } from "./context"
import { schema } from './schema'

const server = new ApolloServer({
  schema: schema,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: createContext,
}).then(({url}) => {
  console.log(`🚀  Server ready at: ${url}`)
})