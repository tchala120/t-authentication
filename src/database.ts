import mongoose from 'mongoose'
import { PASSWORD, USERNAME } from './constants/environment'

function setupDatabase(): void {
  const username = USERNAME
  const password = PASSWORD
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
