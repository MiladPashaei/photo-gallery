const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const imageRepository = require("./core/imagesRepository");

app.get("/API", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  res.send(imageRepository.show());
  res.end();
});

app.post("/like/:id", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  let { id } = req.params;
  imageRepository.like(+id);
});

app.post("/dislike/:id", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  let { id } = req.params;
  imageRepository.disLike(+id);
});

app.listen(3000, "127.0.0.1");
