import { Response } from 'express'
import Order from '../models/Order'
import { AuthRequest } from '../middleware/auth'

// Admin: Create order
export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { title, pickupLocation, dropoffLocation } = req.body
    const order = await Order.create({
      title,
      pickupLocation,
      dropoffLocation,
      createdBy: req.user?.id,
    })
    res.json(order)
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Error creating order' })
  }
}

// Admin: Assign order
export const assignOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId, partnerId } = req.body
    const order = await Order.findByIdAndUpdate(
      orderId,
      { assignedTo: partnerId, status: 'assigned' },
      { new: true }
    )
    res.json(order)
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Error assigning order' })
  }
}

// Partner: Get assigned orders
export const getPartnerOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ assignedTo: req.user?.id })
    res.json(orders)
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Error fetching orders' })
  }
}

// Partner: Update order status
export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    res.json(order)
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Error updating status' })
  }
}
