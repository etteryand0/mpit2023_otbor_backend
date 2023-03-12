declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      JWT_SECRET: string
      STATIC_FOLDER: string
      TEMP_FILE_DIR: string
      FILE_UPLOAD_DIR: string
    }
  }
}

export {}
