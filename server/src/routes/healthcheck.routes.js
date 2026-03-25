import { Router } from "express";
import healthCheck from "../controllers/healthcheck.controllers.js";

const healthCheckRoutes = Router()

healthCheckRoutes.get("/", healthCheck)

export default healthCheckRoutes