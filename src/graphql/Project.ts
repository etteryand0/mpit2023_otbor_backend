import { mutationField, nonNull } from "nexus";
import { GraphQLError } from 'graphql'

export const AddProjectMutation = mutationField('addProject', {
  type: nonNull('Project'),
  args: {
    data: nonNull('ProjectCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select, user }) {
    if (!user) {
      throw new GraphQLError("Unauthorized")
    }
    
    data.owner = { connect: { id: user.id } }

    return prisma.project.create({
      data,
      ...select,
    })
  },
})