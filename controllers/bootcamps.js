//@desc         Get all bootcamps
//@route        GET /api/v1/bootcamps
//@access       Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Show all bootcamps'});
}

//@desc         Show bootcamp with id
//@route        GET /api/v1/bootcamps/:id
//@access       Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, task: `show  bootcamp with id  ${req.params.id}` });
}


//@desc         Create New bootcamp
//@route        POST /api/v1/bootcamps
//@access       Private
exports.CreateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, task: "Create new bootcamps" });
}


//@desc         Update bootcamp
//@route        PUT /api/v1/bootcamps/:id
//@access       Private
exports.UpdateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, task: `Update  bootcamp ${req.params.id}` });
}


//@desc         Delete bootcamp
//@route        DELETE /api/v1/bootcamps/:id
//@access       Private
exports.DeleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, task: `Delete  bootcamp ${req.params.id}` });
}