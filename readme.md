# What my mvp will do:


1. User Authentication (JWT)

2. Upload Resume (PDF)

3. Upload Job Description

4. Extract text from both

5. AI-based Resume vs JD Matching Score

6. Generate Interview Questions

7. Analyze User Answers

8. Dashboard with Analytics

9. Admin Panel (optional but powerful)

# Tech Stack:

- Frontend : next.js , TailwindCSS , axios , chart.js
- Backend : Node.js , express.js , mongoDB , JWT , Multer , pdf-parse , openAI API
- Deployment : Backend-render , frontend-vercel

# Database Design:
**User:**
- name
- email
- password
- role
- phone Number
- isVerified
- createdAt

**Resume**
- UserId
- originalfilename
- extractedText
- createdAt

**JobDescription**
- userId
- title
- company
- descriptionText
- createdAt

**Analysis**
- userId
- resumeId
- jobId
- matchScore
- missingSkills
- strengths
- weaknesses
- createdAt

**InterviewSession**
- userId
- questions[]
- answers[]
- feedback[]
- overallScore




