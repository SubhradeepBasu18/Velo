export default class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly errors: Record<string, string> | undefined;

    constructor(message: string, statusCode: number, errors?: Record<string, string>) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.isOperational = true; // Mark as a known, handled error

        Error.captureStackTrace(this, this.constructor);
    }
}