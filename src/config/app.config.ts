export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: process.env.PORT ? +process.env.PORT : 5000,

  jwt_secret: process.env.JWT_SECRET,

  jwt_expire_time:
    (process.env.JWT_EXPIRE_TIME ? process.env.JWT_EXPIRE_TIME : 0) || 7200000,

  jwt_refresh_expire_time:
    (process.env.JWT_REFRESH_EXPIRE_TIME
      ? process.env.JWT_REFRESH_EXPIRE_TIME
      : 0) || 259200000,

  mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost/nest',

  // host_api: process.env.host_api,

  // db_username: process.env.DB_USERNAME,
  // db_password: process.env.DB_PASSWORD,
  // db_name: process.env.DB_NAME,
  // db_host: process.env.DB_HOST,
  // db_port: process.env.DB_PORT,

  // sender_email: process.env.SENDER_EMAIL,
  // sender_email_password: process.env.SENDER_EMAIL_PASSWORD,

  // cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  // cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,

  // max_image_size_kib: +process.env.MAX_IMAGE_SIZE_KIB || 100,
  // max_image_size_bytes: (+process.env.MAX_IMAGE_SIZE_KIB || 100) * 1000,
});
