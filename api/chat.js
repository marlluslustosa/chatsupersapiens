const axios = require('axios');

module.exports = async (req, res) => {
    const { question } = req.body;

    const config = {
        headers: {
            "x-api-key": process.env.CHATPDF_API_KEY,
            "Content-Type": "application/json",
        },
    };

    const data = {
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
        res.status(200).json({ content: response.data.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

