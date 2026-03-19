import app from "./app.js";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`Server running on PORT: ${PORT}`);
    console.log(`Database Connected`);
  } catch (error) {
    console.error(`Database Connection Failed`, error);
  }
});
