// post routerları buraya yazın
const express = require("express");

const PM = require("./posts-model");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  PM.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Gönderiler alınamadı" });
    });
});

router.get("/:id", (req, res) => {
  PM.findById(req.params.id)
    .then((posts) => {
      if (!posts) {
        res
          .status(404)
          .json({ message: "Belirtilen ID'li gönderi bulunamadı" });
      }
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({ message: "Gönderi bilgisi alınamadı" });
    });
});

router.post("/", (req, res) => {
  !req.body.title || !req.body.contents
    ? res
        .status(400)
        .json({ message: "Lütfen gönderi için bir title ve contents sağlayın" })
    : PM.insert(req.body)
        .then((createdPost) => {
          res.status(201).json(createdPost);
        })
        .catch((err) => {
          res.status(500).json({
            message: "Veritabanına kaydedilirken bir hata oluştu",
          });
        });
});

module.exports = router;
