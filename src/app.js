import express from "express";
import cookie from "cookie-parser";
import cors from "cors"
import AuthRoute from "./routes/auth.route.js";
import ClassRoute from "./routes/class.route.js"
import RoleRoute from "./routes/role.route.js"
import UserRoute from './routes/user.route.js'
import qrRoute  from "./routes/qr.route.js"

const app = express()
app.use(express.json())
app.use(cookie());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));

app.use("/api/auth",AuthRoute);
app.use("/api/class",ClassRoute);
app.use("/api/role",RoleRoute);
app.use("/api/auth",UserRoute);
app.use("/api/qr",qrRoute);



export default app;