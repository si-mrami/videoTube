import express from 'express';
import { Addvideo, addView, getVideo, randemVideo, subVideo, trandeVideo } from '../Controllers/video.js';
import { verfyToken } from '../verfyToken.js';

const router = express.Router();

// create a Video

router.post("/", verfyToken, Addvideo);
router.put("/:id", verfyToken, Addvideo);
router.delete("/:id", verfyToken, Addvideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/trand", trandeVideo);
router.get("/randem", randemVideo);
router.get("/sub", verfyToken, subVideo);


export default router;
