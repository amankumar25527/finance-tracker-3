import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "../backend/config/db.js"
import errorMiddleware from "./middleware/errorMiddleware.js";
import authRouter from "./routes/authRoutes.js";
import expenseRouter from "./routes/expenseRoutes.js";

dotenv.config();
const app=express();
const PORT=process.env.PORT || 4000;
// middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api/auth",authRouter);
app.use("/api/expenses",expenseRouter);


// global error middleware
app.use(errorMiddleware)
app.listen(PORT,()=>console.log(`server is live on port ${PORT}`));