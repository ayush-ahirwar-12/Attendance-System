import express from "express";
import cookie from "cookie-parser";
import cors from "cors"
import AuthRoute from "./routes/auth.route.js";
import ClassRoute from "./routes/class.route.js"
import RoleRoute from "./routes/role.route.js"
import UserRoute from './routes/user.route.js'
import courseRoute from "./routes/course.route.js"
import morgan from "morgan";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import config from "./config/environment.js"
import enrollmentRoute from "./routes/enrollment.route.js";
import semesterRoute from "./routes/semester.route.js";
import holidatyRoute from "./routes/holiday.route.js";
import timeTableRoute from "./routes/timeTable.route.js";
import lectureRoute from "./routes/lecture.route.js";
import attendanceRoute from "./routes/attendance.route.js";
import sessionRoute from "./routes/session.route.js";





const {CLIENTID,CLIENTSECRET,FRONTEND_URL}= config;


const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(cookie());
app.use(cors({
    origin: FRONTEND_URL,
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
app.use("/api/course", courseRoute);
app.use("/api/enrollment", enrollmentRoute);
app.use("/api/semester", semesterRoute);
app.use("/api/holiday", holidatyRoute);
app.use("/api/timetable",timeTableRoute);
app.use("/api/lecture", lectureRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/session", sessionRoute);

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