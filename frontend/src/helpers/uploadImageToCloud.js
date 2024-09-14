const cloudinaryURL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "shop_bag_products");

  const dataResponse = await fetch(cloudinaryURL, {
    method: "post",
    body: formData,
  });

  return dataResponse.json();
};

export default uploadImage;
