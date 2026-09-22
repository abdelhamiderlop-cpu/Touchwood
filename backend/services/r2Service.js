import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "node:crypto";
import path from "node:path";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME;
const publicUrl = process.env.R2_PUBLIC_URL;

if (
  !accountId ||
  !accessKeyId ||
  !secretAccessKey ||
  !bucketName ||
  !publicUrl
) {
  console.warn("Cloudflare R2 environment variables are not fully configured");
}

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const createStorageKey = ({
  folder = "products",
  fileName,
  contentType,
}) => {
  const extensionFromName = path.extname(fileName || "").toLowerCase();

  const extensionFromType =
    contentType === "image/jpeg"
      ? ".jpg"
      : contentType === "image/png"
      ? ".png"
      : contentType === "image/webp"
      ? ".webp"
      : contentType === "image/gif"
      ? ".gif"
      : contentType === "image/avif"
      ? ".avif"
      : "";

  const extension = extensionFromName || extensionFromType || ".bin";

  const id = crypto.randomUUID();

  return `${folder}/${id}${extension}`;
};

export const createPresignedUploadUrl = async ({
  folder,
  fileName,
  contentType,
}) => {
  if (!contentType?.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/avif",
  ];

  if (!allowedTypes.includes(contentType)) {
    throw new Error("Unsupported image type");
  }

  const key = createStorageKey({
    folder,
    fileName,
    contentType,
  });

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(r2, command, {
    expiresIn: 900,
  });

  const baseUrl = publicUrl.replace(/\/$/, "");

  return {
    uploadUrl,
    key,
    publicUrl: `${baseUrl}/${key}`,
    expiresIn: 900,
  };
};

export const deleteR2Object = async (key) => {
  if (!key) {
    return;
  }

  await r2.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  );
};

export default r2;