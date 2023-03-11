import { booleanArg, extendType, nonNull, stringArg, objectType, queryField, mutationField, inputObjectType } from 'nexus'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'
import { ApolloServerErrorCode } from '@apollo/server/errors'
import { GraphQLError } from 'graphql'
import { User } from '@prisma/client'

const JWT_SECRET = process.env.JWT_SECRET

export const GQLToken = objectType({
  name: 'Token',
  definition(t) {
    t.string('token')
  },
})

export const MeQuery = queryField('me', {
  type: nonNull('User'),
  resolve(_parent, _args, { prisma, user }) {
    if (!user) {
      throw new GraphQLError("Unauthorized", { extensions: { code: 401 } })
    }

    return prisma.user.findUnique({ 
      where: {
        id: user.id
      }
    })
  }
})

export const SignUpInput = inputObjectType({
  nonNullDefaults: {
    input: false,
  },
  name: 'SignUpInput',
  definition(t) {
    t.nonNull.field('email', { type: 'String' })
    t.nonNull.field('password', { type: 'String' })
    t.nonNull.string('name')
  },
})

export const SignInInput = inputObjectType({
  nonNullDefaults: {
    input: false,
  },
  name: 'SignInInput',
  definition(t) {
    t.nonNull.field('email', { type: 'String' })
    t.nonNull.field('password', { type: 'String' })
  },
})


export const SignUpMutation = mutationField('signup', {
  type: nonNull('Token'),
  args: {
    data: nonNull('SignUpInput'),
  },
  async resolve(_parent, { data }, { prisma, user }) {
    if (user) {
      throw new GraphQLError("Already signed in", { extensions: { code: 400 } })
    }

    data.password = await hash(data.password, 10)

    const userId = (await prisma.user.create({
      data,
      select: { id: true },
    })).id

    const token = sign({ userId }, JWT_SECRET)

    return { token }
  }
})

export const SignIn = mutationField('login', {
  type: 'Token',
  args: {
    data: 'SignInInput',
  },
  async resolve(_parent, { data }, { prisma, user }) {
    if (user) {
      throw new GraphQLError("Already signed in", { extensions: { code: 400 } })
    }

    const userfound = await prisma.user.findUnique({
      where: { email: data.email },
      select: { password: true, id: true }
    })

    if (!userfound) {
      throw new GraphQLError('Incorrect password or email', { extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT } })
    }

    const passwordValid = await compare(data.password, userfound.password)
    if (!passwordValid) {
      throw new GraphQLError('Incorrect password or email', { extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT } })
    }

    const token = sign({ userId: userfound.id }, JWT_SECRET)

    return { token }
  }
})