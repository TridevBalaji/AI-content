// server/server.js

const express = require('express');
const { streamText, convertToCoreMessages } = require('ai');
const { createGoogleGenerativeAI } = require('@ai-sdk/google');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = 'AIzaSyA6wQcWglcK3oZ-X4v_GUbVVZpmQnhZIKg'; 
const google = createGoogleGenerativeAI({
  apiKey: apiKey,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST route
app.post('/strmtxt', async (req, res) => {
  const { messages } = req.body;

  try {
    const result = await streamText({
      model: google('gemini-1.5-flash'),
      messages: convertToCoreMessages(messages),
    });
    console.log(result);
    

    // Respond with bot message(s)
    res.status(200).json(result.toDataStreamResponse());
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
