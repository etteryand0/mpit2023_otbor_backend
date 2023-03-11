declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      JWT_SECRET: string
      STATIC_FOLDER: string
    }
  }
}

export {}
