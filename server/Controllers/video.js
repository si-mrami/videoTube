import Video from '../models/video.js';
import User from '../models/user.js';
import { createError } from '../Error.js';

// add Video
export const Addvideo = async (req, res, next) => {
	const newVideo = new Video({ userId: req.user.id, ...req.body });
	try {
		const savedVideo = await newVideo.save();
		res.status(200).json(savedVideo);
	} catch (err) {
		next(err);
	}
}

// update a video

export const updateVideo = async (req, res, next) => {
	try {
		const video = await Video.findById(req.params.id);
		if (!video) return (next(createError(404, "Video Not Found!")));
		if (req.user.id === video.userId) {
			const updateVideo = await Video.findByIdAndUpdate(req.params.id, {
				$set: req.body
			}, { new: true });
			res.status(200).json(updateVideo);
		}
		else {
			return (next(createError(403, "You Can Update Only Your Video!")));
		}
	} catch (err) {
		next(err);
	}
}

// delete a video
export const deleteVideo = async (req, res, next) => {
	try {
		const video = await Video.findById(req.params.id);
		if (!video) return (next(createError(404, "Video Not Found!")));
		if (req.user.id === video.userId) {
			await Video.findByIdAndDelete(req.params.id);
			res.status(200).json("Video Has Been Deleted!");
		}
		else {
			return (next(createError(403, "You Can Delete Only Your Video!")));
		}
	} catch (err) {
		next(err);
	}
}

// get video
export const getVideo = async (req, res, next) => {
	try {
		const video = await Video.findById(req.params.id);
		res.status(200).json(video);
	} catch (err) {
		next(err);
	}
}

// Video View

export const addView = async (req, res, next) => {
	try {
		await Video.findByIdAndUpdate(req.params.id, {
			$inc: { views: 1 }
		});
		res.status(200).json("Views Has Been Inc!");
	} catch (err) {
		next(err);
	}
}

// randem Video

export const randemVideo = async (req, res, next) => {
	try {
		const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
		res.status(200).json(videos);
	} catch (err) {
		next(err);
	}
}

// trande Video

export const trandeVideo = async (req, res, next) => {
	try {
		const videos = await Video.find().sort({ views: -1 });
		res.status(200).json(videos);
	} catch (err) {
		next(err);
	}
}

// sub Video

export const subVideo = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);
		const subscribedChannels = user.subscribeUsers;

		const list = await Promise.all(
			subscribedChannels.map(async (channelId) => {
				return await Video.find({ userId: channelId });
			})
		);

		res.status(200).json(list.flat().sort((a, b)=> b.createAt - a.createAt));
	} catch (err) {
		next(err);
	}
}
