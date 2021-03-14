import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'local'}`,
})

function setupDatabase(): void {
  const username = process.env.DB_USERNAME
  const password = process.env.DB_PASSWORD
  if (username && password) {
    const uri = `mongodb+srv://${username}:${password}@cluster0.eignu.mongodb.net/tcore-dev?retryWrites=true&w=majority`
    mongoose.Promise = global.Promise
    mongoose
      .connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      })
      .then(() => console.log('Database connected'))
      .catch((e: Error) => {
        throw e.message
      })
  } else {
    throw Error('Cannot connect to database cause of have no data access.')
  }
}

export default setupDatabase
