const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`mongoose connected ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`mongoose server issue ${error}`.bgRed.white)
    }
}
mongoose.set('strictQuery', true)

module.exports = connectDB;