import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import messagerouter from './routes/message.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './lib/db.js'
import {server,app} from './lib/socket.js'
import path from 'path'

dotenv.config()


// ✅ Increase payload size limits
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Cookie parser
app.use(cookieParser())

const __dirname = path.resolve()

// CORS config
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// Routes
app.use('/api/auth', authRouter)
app.use('/api/messages', messagerouter)


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Front-end/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../Front-end", "dist", "index.html"));
    });
  }

// Start server
const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log('Server is running on port', PORT)
    connectDB()
})
