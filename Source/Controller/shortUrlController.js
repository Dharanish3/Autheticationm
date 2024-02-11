import UrlModel from "../Models/url.js";
import shortid from "shortid";
import dotenv from "dotenv";
dotenv.config();

// get all user
const getUrl = async (req, res) => {
  try {
    const url = await UrlModel.find({});
    res.status(200).send({
      message: "Url Send",
      url,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// create Url
const createUrl = async (req, res) => {
  try {
    const shortUrl = shortid();
    const url = await UrlModel.create({ full: req.body.full, short: shortUrl });
    res.status(200).send({
      message: "Url Created",
      url,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// Geturl by Id
const shortUrlId = async (req, res, next) => {
  try {
    const url = await UrlModel.findOne({ short: req.params.short });
    if (url !== null) {
        url.clicks = (url.clicks || 0) + 1;
      await url.save();
      res.status(200).send({
        message: "Url selected",
        sucess: true,
        url
      });
    }
   
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message
    });
  }
};
//   app.get('/:shortUrl', async (req, res) => {
//     const shortUrl = await UrlModel.findOne({ short: req.params.short })
//     if (shortUrl == null) return res.sendStatus(404)

//     shortUrl.clicks++
//     shortUrl.save()

//     res.redirect(shortUrl.full)
//   })

export default {
  getUrl,
  createUrl,
  shortUrlId,
};
