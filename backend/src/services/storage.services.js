import ImageKit from "@imagekit/nodejs";
import { Config } from "../config/Config.js";

const client = new ImageKit({
  publicKey: Config.IMAGE_KIT_PUBLIC_KEY,
  privateKey: Config.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: Config.IMAGE_KIT_URL_ENDPOINT,
});

export async function uploadFile({
  buffer,
  fileName,
  folder = "snitch",
}) {
  try {
    // console.log("Uploading:", fileName);

    const result = await client.files.upload({
      file: await ImageKit.toFile(buffer),
      fileName,
      folder,
    });

    // console.log("Uploaded:", result.url);

    return result;
  } catch (error) {
    console.error("ImageKit Error:", error);
    throw error;
  }
}