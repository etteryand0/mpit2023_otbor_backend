const {Generator} = require('@paljs/generator')

new Generator({ name: 'nexus', schemaPath: './prisma/schema.prisma' }, {
  output: './src/generated/'
}).run();