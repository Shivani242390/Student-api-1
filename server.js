const express = require("express")
const studentRoute = require("./routes/studentRoutes")
const authRoute = require("./routes/authRoutes")
const mongoose = require("mongoose")
const dns = require("dns")
const dotenv = require("dotenv")

const app = express()

dotenv.config()

dns.setServers(["1.1.1.1", "8.8.8.8"])

app.use(express.json())

app.use(studentRoute)
app.use(authRoute)

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected successfully....")
    } catch (error) {
        console.log("MongoDB connection failed:")
        console.log(error.message)
    }
}

connectDB()

app.listen(4000, () => {
    console.log("Listening to Server....")
})