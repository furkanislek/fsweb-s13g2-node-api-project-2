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
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Lütfen gönderi için bir title ve contents sağlayın" });
  } else {
    // * PM.insert({title, contents})
    PM.insert(req.body)
      .then(({ id }) => {
        return PM.findById(id);
      })
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Veritabanına kaydedilirken bir hata oluştu",
        });
      });
  }
});

// router.post("/", (req, res) => {
//   !req.body.title || !req.body.contents
//     ? res
//         .status(400)
//         .json({ message: "Lütfen gönderi için bir title ve contents sağlayın" })
//     : PM.insert(req.body)
//         .then((createdPost) => {
//           res.status(201).json(createdPost);
//         })
//         .catch((err) => {
//           res.status(500).json({
//             message: "Veritabanına kaydedilirken bir hata oluştu",
//           });
//         });
// });

router.put("/:id", async (req, res) => {
  try {
    const possiblePost = await PM.findById(req.params.id);
    if (!possiblePost) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    } else {
      const { title, contents } = req.body;
      if (!title || !contents) {
        res.status(400).json({
          message: "Lütfen gönderi için title ve contents sağlayın",
        });
      } else {
        await PM.update(req.params.id, req.body);
        res.status(200).json(await PM.findById(req.params.id));
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "Gönderi bilgileri güncellenemedi",
    });
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     const possiblePost = await PM.findById(req.params.id);
//     !possiblePost
//       ? res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" })
//       : !req.body.title || !req.body.contents
//       ? res
//           .status(400)
//           .json({ message: "Lütfen gönderi için title ve contents sağlayın" })
//       : res.status(200).json(await PM.update(req.params.id, req.body));
//   } catch (err) {
//     res.status(500).json({
//       message: "Gönderi bilgileri güncellenemedi",
//     });
//   }
// });

router.delete("/:id", async (req, res) => {
  try {
    const noneDeleted = await PM.findById(req.params.id);
    if (!noneDeleted) {
      res.status(404).json({ message: "Belirtilen ID li gönderi bulunamadı" });
    } else {
      await PM.remove(req.params.id);
      res.status(200).json(noneDeleted);
    }
  } catch (err) {
    res.status(500).json({ message: "Gönderi silinemedi" });
  }
});

// router.delete("/:id", async (req, res) => {
//   const noneDeleted = await PM.findById(req.params.id);
//   try {
//     if (!noneDeleted) {
//       res.status(404).json({ message: "Belirtilen ID li gönderi bulunamadı" });
//     } else {
//       const unDeletedPost = await PM.findById(req.params.id);
//       const deletedPost = await PM.remove(req.params.id);
//       deletedPost && res.status(201).json(unDeletedPost);

//     }
//   } catch (err) {
//     res.status(500).json({ message: "Gönderi silinemedi" });
//   }
// });

router.get("/:id/comments", async (req, res) => {
  try {
    const postComment = await PM.findCommentById(req.params.id);

    if (!postComment) {
      res.status(404).json({ message: "Girilen ID'li gönderi bulunamadı." });
    } else {
      await PM.findPostComments(req.params.id).then((post) => {
        res.json(post);
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Yorumlar bilgisi getirilemedi" });
  }
});

module.exports = router;
