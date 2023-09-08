import { useState } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Chat from './Chat';

function App() {
	const [showLoginForm, setShowLoginForm] = useState(false); //Dient dazu zuprüfen ob man angemeldet ist oder nicht
	const [user, setUser] = useState(null); // Hiermit wollen wollen wir die Infos eMail/ PW vom User von firebase abgreifen
	const [userData, setUserData] = useState(null); // Hier griefen wir alle weiteren infos vom User ab

	const handleRegistration = () => {
		setShowLoginForm(true);
	};

	const handelLogin = (user, userData) => {
		setUser(user);
		setUserData(userData);
	};

	return (
		<>
			<h1>AI Training</h1>
			{user ? (
				<>
					<p>Welcome, {userData.username}</p>
					<Chat userData={userData}></Chat>
				</>
			) : (
				<>
					<button className='toggleLogin' onClick={() => setShowLoginForm(!showLoginForm)}>
						{showLoginForm ? 'Register' : ' Login'}
						{/* Das ist ein ternary operator */}
					</button>
					{/* Mit der onClick erstellen wir eine Anonymefunktion mit der wird mithilfe von useState von showLoginForm den zustand von false auf true setzen */}
					{!showLoginForm ? <RegisterForm onRegistration={handleRegistration} /> : <LoginForm onLoding={handelLogin} />}
				</>
			)}
		</>
	);
}

export default App;
