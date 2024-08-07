import { Schema, model } from 'mongoose'

interface UserInterfaceSchema {
  name: string
  email: string
  password: string
  gender: string
}

const userSchema = new Schema<UserInterfaceSchema>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
})

const User = model('user', userSchema)
export default User
