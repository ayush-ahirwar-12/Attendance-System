import { extractedTextFromS3, putObjectS3 } from "../config/getAwsS3ObjectPutUrl.js";
import resumeModel from "../models/resume.model.js";
import { AppError } from "../utils/errors.js";

class resumeController {
    getUploadUrl = async (req, res) => {
        try {
            const { fileName, fileType } = req.body;
            if (!fileName || !fileType) {
                return res.status(400).json({ message: "Missing file info" });
            }
            const { url, key } = await putObjectS3(fileName, fileType);

            res.status(200).json({
                success: true,
                url,
                key,
            });
        } catch (error) {
            console.log(error);
            
            throw new AppError("Failed to generate upload url", 500,error)
        }
    }

    saveResumeMetaData = async (req, res) => {
        try {
            const { fileName, key } = req.body;

            const resume = await resumeModel.create({
                userId: req.userId,
                fileName,
                s3Key: key,
            });

            res.status(201).json({
                success: true,
                resume,
            });
        } catch (error) {
            console.log(error);
            
            throw new AppError("Failed to save resume meta data", 500, error);
        }
    }

    extractResumeText = async (req, res) => {
        try {
            const { resumeId } = req.params;

            const resume = await resumeModel.findById(resumeId);

            if (!resume) {
                return res.status(404).json({ message: "Resume not found" });
            }

            const extractedText = await extractedTextFromS3(resume.s3Key);

            resume.extractedText = extractedText;
            await resume.save();

            res.status(200).json({
                success: true,
                extractedText,
            });
        } catch (error) {
            console.log(error);
            
            throw new AppError("Failed to extract text from resume",500,error);
        }
    }
}

export default new resumeController();