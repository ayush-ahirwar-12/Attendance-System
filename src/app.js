import express from "express";
import cookie from "cookie-parser";
import cors from "cors"
import AuthRoute from "./routes/auth.route.js";
import ClassRoute from "./routes/class.route.js"
import RoleRoute from "./routes/role.route.js"
import UserRoute from './routes/user.route.js'
import qrRoute from "./routes/qr.route.js"
import courseRoute from "./routes/course.route.js"
import morgan from "morgan";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import config from "./config/environment.js"
const {CLIENTID,CLIENTSECRET}= config;


const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(cookie());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID:CLIENTID,
    clientSecret:CLIENTSECRET,
    callbackURL: "/auth/google/callback"
}, (_, __, profile, done) => {
    return done(null, profile);
}))

app.use("/api/auth", AuthRoute);
app.use("/api/class", ClassRoute);
app.use("/api/role", RoleRoute);
app.use("/api/auth", UserRoute);
app.use("/api/qr", qrRoute);
app.use("/api/course", courseRoute);

app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.get("/auth/google", 
    passport.authenticate('google', { scope: ['profile', 'email'] })
)

app.get("/auth/google/callback", passport.authenticate('google',{ session: false }), (req, res) => {
    console.log(req.user);
    res.send("Google authenticaiton successful");
})


export default app;