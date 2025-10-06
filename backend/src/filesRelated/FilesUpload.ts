import { v2 as cloudinary } from "cloudinary";
import Multer from "multer";
import { Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = Multer.memoryStorage();
export const upload = Multer({ storage });

// Stream upload helper
const streamUpload = (buffer: Buffer, folderName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folderName, resource_type: "auto" },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );
    stream.end(buffer);
  });
};

export const handleUpload = async (req: Request, res: Response) => {
    if(!req.file) return;

  try {
    const secureUrl = await streamUpload(req.file.buffer, "txpress");
     const responseData = {name: req.file.originalname, size: req.file.size, url: secureUrl };
     res.json(responseData)
  } catch (error:any) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
};
