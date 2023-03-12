import { verify } from 'jsonwebtoken'
import cookie from 'cookie'
import type prismaClient from '../context/prisma'
import { IncomingMessage } from 'http'

export const JWT_SECRET = process.env.JWT_SECRET

interface Token {
  userId: string
}

export const getUser = async (
  request: IncomingMessage,
  prisma: typeof prismaClient,
): Promise<{ id: string } | null> => {
  const userId = getUserId(request)

  if (!userId) {
    return null
  }

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } })

  if (!user) {
    return null
  }

  return { id: userId }
}

const getUserId = (request: IncomingMessage) => {
  const { token } = cookie.parse(request.headers.cookie ?? '')
  if (token && token !== 'null') {
    try {
      const verifiedToken = verify(token, process.env.JWT_SECRET as string) as unknown as Token
      return verifiedToken && verifiedToken.userId
    } catch (e) {
      console.log(e)
    }
  }

  const authorization = request.headers.authorization
  if (!authorization) {
    return null
  }

  const bearerToken = authorization.split('Bearer ')[1]

  if (!bearerToken) {
    return null
  }

  return bearerToken
}

export default getUser
