const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.route("/file").get(controllers.getAllFiles).post(controllers.createFile);
router
    .route("/file/:id")
    .get(controllers.getFileById)
    .put(controllers.updateFile)
    .delete(controllers.deleteFile);
module.exports = router;