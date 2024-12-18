import dotenv from "dotenv";

dotenv.config();

export const envData = {
  mongodbURI: process.env.MONGODB_URI,
  port: process.env.PORT,
  nodeENV: process.env.NODE_ENV,
  frontendURI: process.env.FRONTEND_URI,
};
