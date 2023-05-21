
import cloudinary from 'cloudinary';
import express from 'express';

const router = express.Router();


// image upload API
router.post("/photo", (request, response) => {
    // collected image from a user
    console.log(request.body)
    const data = {
      image: request.body.photo
    }
    
    // upload image here
    cloudinary.v2.uploader.upload(data.image)
    .then((result) => {
      response.status(200).send({
        message: "success",
        result,
      });
    }).catch((error) => {
      response.status(500).send({
        message: "failure",
        error,
      });
    });
});

export default router;
