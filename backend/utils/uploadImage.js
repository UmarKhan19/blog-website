// import cloudinary from "cloudinary";

// cloudinary.config({
//   cloud_name: "dgrttjl8s",
//   api_key: "391611877572426",
//   api_secret: "KNKqkXrQoRIWy-IRVUDViRguifw",
// });

// const opts = {
//   overwrite: true,
//   invalidate: true,
//   resource_type: "auto",
// };

// export const uploadImage = (image) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(image, opts, (error, result) => {
//       if (result && result.secure_url) {
//         console.log(result.secure_url);
//         return resolve(result.secure_url);
//       }
//       console.log(error.message);
//       return reject({ message: error.message });
//     });
//   });
// };
