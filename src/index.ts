import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth'
import orderRoutes from './routes/orderRoutes'
import partnerRoutes from './routes/partnerRoutes'

dotenv.config()

const app = express()

// Middleware
app.use(express.json())
// app.use(cors({ origin: 'https://rentkar.netlify.app', credentials: true }))
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/partners', partnerRoutes)

// Health check
app.get('/', (req, res) => res.send('Rentkar Delivery API Running'))

// Start server
const PORT = process.env.PORT || 4000
mongoose
  .connect(
    process.env.MONGO_URI || 'mongodb://localhost:27017/12-rentkar-delivery'
  )
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  })
  .catch((err) => console.error('DB error:', err))
