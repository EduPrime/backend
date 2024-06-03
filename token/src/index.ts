import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Carregar variáveis de ambiente do arquivo .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

if (!process.env.PGRST_JWT_SECRET) {
  throw new Error('PGRST_JWT_SECRET environment variable is missing')
}

const secret = process.env.PGRST_JWT_SECRET

const app = express()
app.use(bodyParser.json())

app.get('/generate-token', (req, res) => {
  // Create the JWT payload
  const payload = {
    aud: 'https://zitadel.cloud',
    exp: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
    iat: Math.floor(Date.now() / 1000), // Current timestamp
    api: 'https://teste.algumaapi.com.br',
    iss: 'clientId',
    sub: 'clientId',
    role: 'institution',
  }

  // Sign the JWT with the secret and create the token
  const token = jwt.sign(payload, secret, { algorithm: 'HS256' })

  res.json({ token })
})

app.post('/validate-token', (req, res) => {
  // Extract the JWT token from the request body
  const jwtToken = req.body.token

  if (!jwtToken) {
    return res.status(400).json({ error: 'No token provided' })
  }

  try {
    // Verify the JWT using your secret
    const decodedPayload = jwt.verify(jwtToken, secret)

    res.json({ valid: true, payload: decodedPayload })
  } catch (error) {
    res.status(401).json({ valid: false, error: 'Invalid token' })
  }
})

app.listen(4000, () => console.log('Server is running on port 4000'))
