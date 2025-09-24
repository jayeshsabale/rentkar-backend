import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: { id: string; role: string }
}

export const authMiddleware = (roles: string[] = []) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'No token provided' })

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'SECRET_KEY'
      ) as { id: string; role: string }
      req.user = decoded

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' })
      }

      next()
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  }
}
