const axios = require('axios');

const OPENAI_API_KEY = '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'; 


async function textToSpeech(text) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/tts/stream',
      {
        text,
        voice: 'echo', 
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        responseType: 'stream', 
      }
    );

   
    return response.data; 
  } catch (error) {
    console.error('Error in textToSpeech:', error);
    throw error;
  }
}

async function speechToText(audioData) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/speech/transcribe',
      {
        audio: audioData, 
        model: 'your-preferred-model', 
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

  
    return response.data.transcription; 
  } catch (error) {
    console.error('Error in speechToText:', error);
    throw error;
  }
}

module.exports = { textToSpeech, speechToText };
