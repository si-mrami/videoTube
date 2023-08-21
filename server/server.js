import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoute from './Routes/Users.js';
import VideosRoute from './Routes/Videos.js';
import CommentsRoute from './Routes/Comments.js';
import authRoute from './Routes/auth.js';
import cookieParser from "cookie-parser";




const app = express();

dotenv.config()

const connect = () => {
	mongoose.connect(process.env.MONGO).then(() => {
		console.log("Db Connected!");
	}).catch((err) => {
		throw err;
	})
}

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", UserRoute);
app.use("/api/videos", VideosRoute);
app.use("/api/commets", CommentsRoute);


app.use((err, rea, res, next) => {
	const status = err.status || 500;
	const message = err.message || "Somthing Worng!";
	return res.status(status).json({
		success: false,
		status,
		message,
	})
});

app.listen(8800, () => {
	connect();
	console.log("Server Started!");
})
