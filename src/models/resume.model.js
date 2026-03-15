import mongoose from "mongoose"

const resumeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,

    },
    fileName:{
        type: String,
        required:true
    },
    s3Key:{
        type : String,
        required:true
    },
    extractedText:{
        type: String
    },
    analysis:{
        score: Number,
        skills:[String],
        missingSkills:[String],
        suggestions:[String]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


export default mongoose.model("resume",resumeSchema);