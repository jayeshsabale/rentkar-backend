import { Schema, model, Document, Types } from 'mongoose'

export interface IOrder extends Document {
  title: string
  pickupLocation: { lat: number; lng: number; address?: string }
  dropoffLocation: { lat: number; lng: number; address?: string }
  status: 'created' | 'assigned' | 'picked' | 'delivered'
  assignedTo?: Types.ObjectId
  createdBy: Types.ObjectId
}

const OrderSchema = new Schema<IOrder>(
  {
    title: { type: String, required: true },
    pickupLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String },
    },
    dropoffLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String },
    },
    status: {
      type: String,
      enum: ['created', 'assigned', 'picked', 'delivered'],
      default: 'created',
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

export default model<IOrder>('Order', OrderSchema)
