import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'admin' | 'partner'
  availability?: boolean
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'partner'], required: true },
    availability: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default model<IUser>('User', UserSchema)
