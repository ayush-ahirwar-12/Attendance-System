import resumeModel from "../models/resume.model.js";
import { analyzeResume } from "../services/ai.service.js";

class AIController {

  analyzeResumeAI = async (req, res) => {
    try {

      const { resumeId } = req.params;

      const resume = await resumeModel.findById(resumeId);

      if (!resume) {
        return res.status(404).json({
          message: "Resume not found"
        });
      }

      if (!resume.extractedText) {
        return res.status(400).json({
          message: "Resume text not extracted"
        });
      }

      let analysis = await analyzeResume(resume.extractedText);

      // 🔥 CLEAN AI RESPONSE
      if (typeof analysis === "string") {
        analysis = analysis.replace(/```json|```/g, "").trim();
        analysis = JSON.parse(analysis);
      }

      resume.analysis = analysis;

      await resume.save();

      res.status(200).json({
        success: true,
        analysis
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "AI analysis failed"
      });
    }
  }

}

export default new AIController();