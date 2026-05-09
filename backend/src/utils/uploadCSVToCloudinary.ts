import cloudinary from "../config/cloudinary.ts";
import streamifier from "streamifier";

export const uploadCSVToCloudinary = async (
    buffer: Buffer,
    fileName: string
): Promise<string> => {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: "raw",
                folder: "velo-campaigns",
                public_id: `${fileName}.csv`,
            },

            (error, result) => {

                if (error || !result) {
                    return reject(error);
                }

                resolve(result.secure_url);
            }
        );

        streamifier
            .createReadStream(buffer)
            .pipe(stream);
    });
};