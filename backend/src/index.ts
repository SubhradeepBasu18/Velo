import app from "./app.ts";
import { configDotenv } from "dotenv";
import connectDB from "./config/db.ts";

configDotenv({quiet: true});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});