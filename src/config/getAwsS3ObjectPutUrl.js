import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import config from "./environment.js"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AppError } from "../utils/errors.js";

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME } = config;

export const s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
})

export const putObjectS3 = async (fileName, fileType) => {
    try {
        const key = `resumes/${Date.now()}-${fileName}`;

        const command = new PutObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: key,
            ContentType:fileType
        })
        const url = await getSignedUrl(s3, command);
        return { url, key }
    } catch (error) {
        throw new AppError("Failed to generate aws url", 400);
    }
}

export const extractedTextFromS3 = async (key) => {
try {
        const command = new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: key,
    });

    const response = await s3.send(command);

    const streamToBuffer = (stream) =>
        new Promise((resolve, reject) => {
            const chunks = [];
            stream.on("data", (chunk) => chunks.push(chunk));
            stream.on("error", reject);
            stream.on("end", () => resolve(Buffer.concat(chunks)));
        });

    const buffer = await streamToBuffer(response.Body);

const pdfjs = pdfjsLib.default;

pdfjs.GlobalWorkerOptions.workerSrc = null;

const uint8Array = new Uint8Array(buffer);

const loadingTask = pdfjs.getDocument({ data: uint8Array });
const pdf = await loadingTask.promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map(item => item.str);
        fullText += strings.join(" ") + "\n";
    }

    return fullText;
} catch (error) {
    console.log(error);
    
}
};