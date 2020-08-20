const BootcampModel = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const ErrorResponse = require('../utils/errorResponse');

//@desc         Get all bootcamps
//@route        GET /api/v1/bootcamps
//@access       Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  // res.status(200).json({ success: true, msg: 'Show all bootcamps' });
//  try {
    let query;
    // copy req.query
    const reqQuery = {...req.query};

    // Fields to exclue
    const removeFields = ['select','sort','page','limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
   // console.log(reqQuery);

    // Create query String
    let queryStr = JSON.stringify(reqQuery);

    // Create operators for mongoo like($gt, $gte,  ect)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = BootcampModel.find(JSON.parse(queryStr));

    // Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        console.log(fields);
        query = query.select(fields);
    }

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await BootcampModel.countDocuments();
    // total no of pages
   // const totalPages = (total / limit)


    query = query.skip(startIndex).limit(limit);
    



    //Exscuting query
   // const bootcamps = await BootcampModel.find( );
   const bootcamps = await query;

   // Pagination result
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }    

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, pagination, data: bootcamps });
//   } catch (error) {
//     res.status(400).json({ success: false });
//   }
});

//@desc         Show bootcamp with id
//@route        GET /api/v1/bootcamps/:id
//@access       Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
 // try {
    const bootcamp = await BootcampModel.findById(req.params.id);

    if (!bootcamp) {
     // return res.status(400).json({ success: false });
      return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
     //next(error);

    }

    res.status(200).json({ success: true, data: bootcamp });
 // } catch (error) {
     //res.status(400).json({success:false});
     //next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
 //    next(error);
//  }
  //   res
  //     .status(200)
  //     .json({ success: true, task: `show  bootcamp with id  ${req.params.id}` });
});

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
exports.CreateBootcamp = asyncHandler(async (req, res, next) => {
 // try {
    const bootcamp = await BootcampModel.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
//   } catch (err) {
//     // res.status(404).json({
//     //   success: false,
//     //   data: err,
//     // });
//     next(err);
//   }
});

//@desc         Update bootcamp
//@route        PUT /api/v1/bootcamps/:id
//@access       Private
exports.UpdateBootcamp = asyncHandler(async (req, res, next) => {
  //   res
  //     .status(200)
  //     .json({ success: true, task: `Update  bootcamp ${req.params.id}` });

//  try {
        const bootcamp = await BootcampModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!bootcamp) {
        return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }
    res.status(200).json({ success: true, data: bootcampre });
//   } catch (error) {
//       next(error);
//   }
  
});

//@desc         Delete bootcamp
//@route        DELETE /api/v1/bootcamps/:id
//@access       Private
exports.DeleteBootcamp = asyncHandler(async (req, res, next) => {
  //   res
  //     .status(200)
  //     .json({ success: true, task: `Delete  bootcamp ${req.params.id}` });

 // try {
     const bootcamp = await BootcampModel.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
        return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }
    res.status(200).json({ success: true, data: {} });
//   } catch (error) {
//       next(error);
//   }
 
});


// @desc      Get bootcamps within a radius
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private
exports.GetBootcampsWithInRadius = asyncHandler(async(req, res, next) => {
    const {zipcode, distance} = req.params


    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide dist by radius of Earth
    //Earth Radius = 3,963 mi / 6,378 Km
    const radius = distance / 3963;

    const bootcamps = await BootcampModel.find({
        location: { $geoWithin: {$centerSphere: [[lng, lat], radius]}}
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });

});