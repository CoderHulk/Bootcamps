const express = require("express");
const router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  CreateBootcamp,
  UpdateBootcamp,
  DeleteBootcamp,
  GetBootcampsWithInRadius,
} = require("../controllers/bootcamps");

router.route("/").get(getBootcamps).post(CreateBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(UpdateBootcamp)
  .delete(DeleteBootcamp);



router.route('/radius/:zipcode/:distance').get(GetBootcampsWithInRadius);


module.exports = router;
