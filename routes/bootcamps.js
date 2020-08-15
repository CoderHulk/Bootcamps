const express = require("express");
const router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  CreateBootcamp,
  UpdateBootcamp,
  DeleteBootcamp,
} = require("../controllers/bootcamps");

router.route("/").get(getBootcamps).post(CreateBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(UpdateBootcamp)
  .delete(DeleteBootcamp);

module.exports = router;
