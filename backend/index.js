const { YoutubeTranscript } =  require('youtube-transcript')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

app.post("/video",async (req,res)=>{
    const videoId = req.body.videoId;
    if(!videoId){
        return res.json({
            "success":false,
            "message":"undefined string"
        })
    }
    try{

        const tt = await YoutubeTranscript.fetchTranscript(videoId);

        let transcript_text = ""
        for(let i = 0; i < tt.length; i++){
            transcript_text+=tt[i].text+" ";
        }
        const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
        const intial_prompt = "You are my Video Transcipter.I will give you transcript text of that video from that text you have to generate a detailed output in points.The output string such that it can display on webpage beauityfully and have indentation.The transcript text is:"
        const prompt = intial_prompt+transcript_text;
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return res.json({
            "success":true,
            "message":response.text()
        })
    }
    catch(e){
        return res.json({
            "success":false,
            "message":e.message
        })
    }
    

})
app.listen(process.env.PORT,()=>{
    console.log("Server is hosted on:",process.env.PORT)
});