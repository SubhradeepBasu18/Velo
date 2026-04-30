import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.ts";
import AppError from "./utils/AppError.ts";
import type { Request, Response, NextFunction } from "express";

const app = express();

app.get("/", (_req, res) => {
    res.json({ message: "Health check" });
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/user",userRouter);

// 404 handler
app.use((_req, _res, next) => {
    next(new AppError("Route not found", 404));
});

// Global error handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            errors: err.errors
        });
    }

    console.error(err);

    res.status(500).json({
        message: "Internal Server Error"
    });
});

export default app;