import express from 'express'
import {
  createOrder,
  assignOrder,
  getPartnerOrders,
  updateOrderStatus,
} from '../controllers/orderController'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()

// Admin
router.post('/', authMiddleware(['admin']), createOrder)
router.post('/assign', authMiddleware(['admin']), assignOrder)

// Partner
router.get('/my-orders', authMiddleware(['partner']), getPartnerOrders)
router.patch('/:id/status', authMiddleware(['partner']), updateOrderStatus)

export default router
