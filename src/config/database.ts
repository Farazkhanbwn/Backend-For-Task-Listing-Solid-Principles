import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const DB_URI = process.env.MONGO_URI ?? ''

class Mongodb {
  private static _db: mongoose.Connection | undefined = undefined

  static async init() {
    if (!Mongodb._db) {
      await mongoose.connect(DB_URI)
      Mongodb._db = mongoose.connection
    } else {
      console.warn('MongoDB connection already initialized.')
    }
  }
}

export default Mongodb
