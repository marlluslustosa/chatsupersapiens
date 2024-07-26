const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const question = req.body.question;

    const config = {
        headers: {
            "x-api-key": process.env.CHATPDF_API_KEY,
            "Content-Type": "application/json",
        },
    };

    const data = {
        referenceSources: true,
        sourceId: process.env.CHATPDF_SOURCE_ID,
        messages: [
            {
                role: "user",
                content: question,
            },
        ],
    };

    try {
        const response = await axios.post("https://api.chatpdf.com/v1/chats/message", data, config);
        res.json({ content: response.data.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
