const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const imageRepository = require("./core/imagesRepository");

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.get("/API", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  res.send(imageRepository.show());
  res.end();
});

app.post("/like/:id", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  id = req.params.id;
  id = parseInt(id);

  imageRepository.like(id);
});
app.post("/dislike/:id", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  id = req.params.id;
  id = parseInt(id);
  imageRepository.disLike(id);
});

app.listen(3000, "127.0.0.1");
