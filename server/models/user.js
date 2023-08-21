import mongoose from "mongoose";

const userShema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	img: {
		type: String,
	},
	subscribers: {
		type: Number,
		default: 0,
	},
	subscribeUsers: {
	type: [String],
}
}, {timestamps: true});

export default mongoose.model("User", userShema);
