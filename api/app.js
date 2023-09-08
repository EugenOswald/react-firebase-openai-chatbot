const express = require('express');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {
	try {
		/* Das es ChatGPT richtig verarbeiten: 
		System - Setzt Verhalten vom Bot fest - Am besten mit informationen von User
		Dann wird die User - Assistant History aufgebaut auf der sich später ChatGPT beziehen kann
		User - User Message
		Assistant - Assistant Message
		User - User Message
		Assistant - Assistant Message
		*/

		const messages = req.body.messages; /* Hier mit bekommen wir alle Nachrichten ruas */
		const userInfo = req.body.userInfo; /* User Infos die wir mit schicken */

		const systemMessage = `Seien Sie bei der Benutzerinteraktion immer sehr persönlich. Berücksichtigen Sie bei Ihrer Antwort immer den Benutzernamen, das Niveau, die Interessen und das Alter.
Hier sind die Informationen
Username: ${userInfo.username},
Level: ${userInfo.level},
Interests: ${userInfo.interests},
Age: ${userInfo.age}`;

		const conversationHistory = [{ role: 'system', content: systemMessage }, ...messages];

		console.log(messages);

		console.log('API-Aufruf startet...');
		const completion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: conversationHistory,
			temperature: 0,
			max_tokens: 512,
		});
		console.log('API-Aufruf abgeschlossen:', completion);

		const aiMessage = completion.choices[0].message.content;

		res.json({
			aiMessage: aiMessage /* Wir wollen nur die neue Nachricht und nicht die gesamte History deswegen das. */,
		});
	} catch (error) {
		console.error('API-Antwort:', error.response?.data);
		console.error('API-Statuscode:', error.response?.status);
		console.error('API-Headers:', error.response?.headers);
		res.status(500).json({ error: 'An error occurred while processing the request' });
	}
});

// 6. Server starten
app.listen(port, () => {
	console.log(`Server läuft auf Port ${port}`);
});
