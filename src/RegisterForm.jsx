import React, { useState } from 'react'; /* rafce -> shortkey für eine function Component erstellen */
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBLGwfW3ZyTMylF0VRyXWfgxXh_wK1hpD0',
	authDomain: 'ai-fitnesstrainer.firebaseapp.com',
	projectId: 'ai-fitnesstrainer',
	storageBucket: 'ai-fitnesstrainer.appspot.com',
	messagingSenderId: '1019798414726',
	appId: '1:1019798414726:web:b036b0ecc7b73e1885f807',
};

initializeApp(firebaseConfig);

const RegisterForm = ({ onRegistration }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [age, setAge] = useState('');
	const [interests, setInterests] = useState('');
	const [level, setLevel] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault(); /* mit e fangen wird das event ab und verhindern das neuladen */
		const auth = getAuth();

		try {
			/* Hiermit erstelle nwir den User */
			const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
			const db = getFirestore();
			setDoc(doc(db, 'users', userCredentials.user.uid), {
				username,
				age,
				interests,
				level,
			}); /* Wir setzen den setDoc um den doc weil wir noch weite informationen mit geben möchten  */
            console.log('Regestrieung erfolgreich');
            onRegistration();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor='email'>
				Email
				<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
			</label>
			{/* mit onChange prüfen wir änderungen im input. Das machen wir mit dem e für event und taget value  OHNE DAS KÖNNTEN WIR NICHT IM INPUT SCHREIBEN*/}
			<label>
				Password:
				<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
			</label>
			<label>
				Username:
				<input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
			</label>
			<label>
				Age:
				<input type='number' value={age} onChange={(e) => setAge(e.target.value)} />
			</label>
			<label>
				Interests:
				<input type='text' value={interests} onChange={(e) => setInterests(e.target.value)} />
			</label>
			<label>
				Level:
				<input type='text' value={level} onChange={(e) => setLevel(e.target.value)} />
			</label>
			<button type='submit'>Register</button>
		</form>
	);
};

export default RegisterForm;
