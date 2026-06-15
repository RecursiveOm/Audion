const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const musicController = require("../controllers/music.controller")
const multer = require("multer")

const upload = multer({
    storage:multer.memoryStorage()
})
const router = express.Router()


router.post("/upload",authMiddleware.authArtist,upload.single("music"),musicController.createMusic)
router.post("/album",authMiddleware.authArtist,musicController.createAlbum);
router.get("/get-songs",authMiddleware.authUser,musicController.getAllMusic)
router.get("/albums",authMiddleware.authUser,musicController.getAllAlbums)
router.get("/album/:albumId",authMiddleware.authUser,musicController.getAlbumById)
module.exports = router;