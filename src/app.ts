import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./configurations/database";
import dotenv from "dotenv";
import cors from "./configurations/cors";
import router from "./routers/main";
import { envData } from "./constants/env-data";

dotenv.config();
const app = express();
// const PORT = envData.port || 5000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors);

connectDB();

app.use("/api", router);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default app;