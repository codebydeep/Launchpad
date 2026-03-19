import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "UPDATE"],
    allowedHeaders: ["Content-type", "Authorization"],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())

export default app;