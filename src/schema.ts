import { makeSchema } from 'nexus'
import * as types from './graphql'
import { paljs } from '@paljs/nexus'
import { join } from 'path'

export const schema = makeSchema({
  types,
  plugins: [
    paljs({
      includeAdmin: false,
    }),
  ],
  outputs: {
    schema: join(process.cwd(), 'src', 'generated', 'schema.graphql'),
    typegen: join(process.cwd(), 'src', 'generated', 'nexus-typegen.ts'),
  },
  contextType: {
    module: join(process.cwd(), 'src', 'context', 'index.ts'),
    export: 'Context',
  },
})
