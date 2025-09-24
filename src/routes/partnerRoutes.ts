import express from 'express'
import {
  getPartners,
  updateAvailability,
} from '../controllers/partnerController'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()

router.get('/', authMiddleware(['admin']), getPartners)
router.patch('/availability', authMiddleware(['partner']), updateAvailability)

export default router
