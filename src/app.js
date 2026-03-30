import express from "express";
import cookie from "cookie-parser";
import cors from "cors"
import AuthRoute from "./routes/auth.route.js";
import ClassRoute from "./routes/class.route.js"

const app = express()
app.use(express.json())
app.use(cookie());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));

app.use("/api/auth",AuthRoute);
app.use("/api/class",ClassRoute);



export default app;