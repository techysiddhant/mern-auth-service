import "reflect-metadata";
import express from "express";
import authRoutes from "./routes/auth";
import tenantRouter from "./routes/tenant";
import userRouter from "./routes/user";
import cookieParse from "cookie-parser";
import cors from "cors";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
const app = express();
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    }),
);
app.use(express.static("public"));
app.use(cookieParse());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Welcome to auth service");
});
app.use("/auth", authRoutes);
app.use("/tenants", tenantRouter);
app.use("/users", userRouter);
app.use(globalErrorHandler);

export default app;
