import express from 'express';
import { deleteUser, dislikeUser, getUser, likeUser, subscribeUser, unsubscribeUser, updateUser } from '../Controllers/user.js';
import { verfyToken } from '../verfyToken.js';

const router = express.Router();

// update User
router.put("/:id", verfyToken, updateUser)

// delete User
router.delete("/:id", verfyToken, deleteUser)

// get a User
router.get("/find/:id", getUser)

// subscribe a User
router.put("/sub/:id", verfyToken, subscribeUser)

// unsubscribe a User
router.put("/unsub/:id", verfyToken, unsubscribeUser)

// like a User
router.put("/like/:videoId", verfyToken, likeUser)

// dislike a User
router.put("/dislik/:videoId", verfyToken, dislikeUser)

export default router;
