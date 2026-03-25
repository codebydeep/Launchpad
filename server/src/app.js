import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import healthCheckRoutes from "./routes/healthcheck.routes.js"
import authRoutes from "./routes/auth.routes.js"

const app = express()

app.set("trust proxy", 1)

const allowedOrigins = (process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }
        return callback(new Error("Not allowed by CORS"))
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())

app.use("/api/v1/healthcheck", healthCheckRoutes)
app.use("/api/v1/auth", authRoutes)

export default app;