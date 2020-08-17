const BootcampModel = require('../models/Bootcamp');

//@desc         Get all bootcamps
//@route        GET /api/v1/bootcamps
//@access       Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' });
};

//@desc         Show bootcamp with id
//@route        GET /api/v1/bootcamps/:id
//@access       Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, task: `show  bootcamp with id  ${req.params.id}` });
};

//@desc         Create New bootcamp
//@route        POST /api/v1/bootcamps
//@access       Private
//First way
// exports.CreateBootcamp = (req, res, next) => {
//     console.log(req.body);
//     BootcampModel.create(req.body);
//     res.status(200).json({ success: true, task: "Create new bootcamps" });
// };
// Second Way
exports.CreateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await BootcampModel.create(req.body);

        res.status(201).json({
            success: true,
            data: bootcamp,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            data: err
        })
    }

 
};

//@desc         Update bootcamp
//@route        PUT /api/v1/bootcamps/:id
//@access       Private
exports.UpdateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, task: `Update  bootcamp ${req.params.id}` });
};

//@desc         Delete bootcamp
//@route        DELETE /api/v1/bootcamps/:id
//@access       Private
exports.DeleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, task: `Delete  bootcamp ${req.params.id}` });
};
