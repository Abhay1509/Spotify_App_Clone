const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, thumbnail, track } = req.body;

    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .json({ err: "Insufficient details to create song" });
    }
    const artist = req.user._id;
    const songDetails = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
  }
);

// GET route to get all songs i have published
router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    // We need to get all songs where artist id == currentUser._id
    const songs = await Song.find({ artist: req.user._id }).exec();
    return res.status(200).json({ data: songs });
  }
);

// Get route to get all songs any artist has published
// I will send an artist id and I want to see all songs that artist has published
router.get(
  "/get/artist",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.body;
    const artist = await User.find({ _id: artistId }); //We can check if the artist does not exist
    if (!artist) {
      return res.status(301).json({ err: "Artist does not exist" });
    }
    const songs = await Song.find({ artist: artistId }).exec();
    return res.status(200).json({ data: songs });
  }
);

// Get route to get a single song by name
router.get(
  "/get/songname",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songName } = req.body;
    const songs = await Song.find({ name: songName }).exec();
    return res.status(200).json({ data: songs });
  }
);

module.exports = router;
