import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: Number(process.env.PORT || 4000),
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'replace_me',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  useMockDb: process.env.USE_MOCK_DB !== 'false',
}
