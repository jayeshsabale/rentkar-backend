import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'

// Register
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body
    const hashed = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashed, role })
    await user.save()
    res.status(201).json({ message: 'User registered' })
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Error registering user' })
  }
}

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'SECRET_KEY',
      { expiresIn: '1d' }
    )

    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Login error' })
  }
}
