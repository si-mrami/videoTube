import { createError } from "../Error.js";
import User from "../models/user.js";


// update User
export const updateUser = async (req, res, next) => {
	if (req.params.id === req.user.id) {
		try {
			const updatUser = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body
			},
				{ new: true }
			)
			res.status(200).json(updatUser);
		} catch (err) {
			next(err)
		}
	} else {
		return next(createError(403, "You Can update only you account!"))
	}
}
// delet User
export const deleteUser = async (req, res, next) => {
	if (req.params.id === req.user.id) {
		try {
			await User.findByIdAndDelete(req.params.id,
			)
			res.status(200).json("User Has Been Deleted!");
		} catch (err) {
			next(err)
		}
	} else {
		return next(createError(403, "You Can delete only you account!"))
	}
}

// get User
export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id)
		res.status(200).json(user)
	} catch (err) {
		next(err)
	}
}

// Subscriber User
export const subscribeUser = async (req, res, next) => {
	try {
		await User.findByIdAndUpdate(req.user.id, {
			$push: { subscribeUser: req.params.id }
		})
		await User.findByIdAndUpdate(req.params.id, {
			$inc: { subscribers: 1 },
		})
		res.status(200).json("Subscribtion succssefull!")
	} catch (err) {
		next(err)
	}
}

// Unsubscribe User
export const unsubscribeUser = async (req, res, next) => {
	try {
		try {
			await User.findByIdAndUpdate(req.user.id, {
				$pull: { subscribedUsers: req.params.id },
			});
			await User.findByIdAndUpdate(req.params.id, {
				$inc: { subscribers: -1 },
			});
			res.status(200).json("Unsubscription successfull!")
		} catch (err) {
			next(err);
		}
	} catch (err) {
		next(err);
	}
}

// Like User
export const likeUser = async (req, res, next) => {
	try {

	} catch (err) {
		next(err)
	}
}

// DisLike User
export const dislikeUser = (req, res, next) => {
	try {

	} catch (err) {
		next(err)
	}
}



