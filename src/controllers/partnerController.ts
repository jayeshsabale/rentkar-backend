import { Response } from 'express'
import User from '../models/User'
import { AuthRequest } from '../middleware/auth'

// Admin: Get all partners
export const getPartners = async (req: AuthRequest, res: Response) => {
  try {
    const partners = await User.find({ role: 'partner' }).select('-password')
    res.json(partners)
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Error fetching partners' })
  }
}

// Partner: Update availability
export const updateAvailability = async (req: AuthRequest, res: Response) => {
  try {
    const { availability } = req.body
    const partner = await User.findByIdAndUpdate(
      req.user?.id,
      { availability },
      { new: true }
    )
    res.json(partner)
  } catch (err: any) {
    res
      .status(500)
      .json({ message: err.message || 'Error updating availability' })
  }
}
