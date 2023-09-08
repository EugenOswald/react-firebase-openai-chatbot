import React, { useState } from 'react';

const Chat = ({ userData }) => {
	const [messages, setMessages] = useState([]);
	const [inputMessage, setInputMessages] = useState('');
	const [isFetchingResponse, setIsFetchingResponse] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsFetchingResponse(true);
		setInputMessages('');
		setMessages((preMessages) => [...preMessages, newUserMessage]);

		const newUserMessage = { role: 'user', content: inputMessage };

		const response = await fetch('http://localhost:3000/chat', {
			/* Wird in ein POST Format gewandelt und verschickt */
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userInfo: {
					level: userData.level,
					username: userData.username,
					interests: userData.interests,
					age: userData.age,
				},
				messages: [...messages, newUserMessage],
			}),
		});

		/* Nach dem POST müssen wir eine Antwort erhalten */

		if (response.ok) {
			const data = await response.json();
			/* Hier wird es wieder in ein JSON vormat zurück konventiert */
			setMessages((preMessages) => [...preMessages, { role: 'assistant', content: data.aiMessage }]);
		} else {
			console.error('Fehler beim Fetchen der Daten');
		}

		setIsFetchingResponse(false);
	};

	return (
		<div>
			<h2>Chat for {userData.username}</h2>
			{messages.map((message, index) => (
				<div key={index}>
					<strong>{message.role}:</strong>
					{message.content}
				</div>
			))}
			{isFetchingResponse && (
				<div>
					<strong>assistant:</strong> ... waiting
				</div>)}
			<form onSubmit={handleSubmit}>
				<input type='text' value={inputMessage} onChange={(e) => setInputMessages(e.target.value)} />
				<button type='submit'>Senden</button>
			</form>
		</div>
	);
};

export default Chat;
