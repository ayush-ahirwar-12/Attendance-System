import express from "express";
import cookie from "cookie-parser";
import cors from "cors"
import AuthRoute from "./routes/auth.route.js";
import RoleRoute from "./routes/role.route.js";
import awsRoute from "./routes/aws.route.js";
import userRoute from "./routes/user.route.js";
import aiRoute from "./routes/ai.route.js"

const app = express()
app.use(express.json())
app.use(cookie());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));

app.use("/api/auth",AuthRoute);
app.use("/api/role",RoleRoute);
app.use("/api/aws",awsRoute);
app.use("/api/users",userRoute);
app.use("/api/ai",aiRoute)


export default app;