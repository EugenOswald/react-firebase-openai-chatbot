# AI-Fitness-Trainer

## Einleitung

AI-Fitness-Trainer ist eine React-App, die in Verbindung mit einer API läuft, um personalisierte Fitness-Trainingsempfehlungen zu bieten. Die App verwendet Firebase für Authentifizierung und Datenmanagement, sowie OpenAI für intelligente Trainingspläne.

---

## Voraussetzungen

- Node.js
- npm
- Firebase Account
- OpenAI API Schlüssel

---

## Installation und Konfiguration

### 1. Projekt klonen

```
git clone 
```

### 2. Abhängigkeiten installieren

#### API

Wechseln Sie in das `api`-Verzeichnis und installieren Sie die Abhängigkeiten:

```bash
cd ai-fitnesstrainer/api
npm install
```

#### React App

Wechseln Sie in das Hauptverzeichnis der React App und installieren Sie die Abhängigkeiten:

```bash
cd ai-fitnesstrainer
npm install
```

### 3. Umgebungsvariablen konfigurieren

#### Firebase Konfiguration in der React App

Kopieren Sie die Datei `ai-fitnesstrainer/src/.env.example` und benennen Sie sie in `.env`. Füllen Sie die Firebase-Daten wie folgt aus:

```env
REACT_APP_FIREBASE_API_KEY=IhrFirebaseApiKey
REACT_APP_FIREBASE_AUTH_DOMAIN=IhrFirebaseAuthDomain
REACT_APP_FIREBASE_DATABASE_URL=IhrFirebaseDatabaseUrl
REACT_APP_FIREBASE_PROJECT_ID=IhrFirebaseProjectId
REACT_APP_FIREBASE_STORAGE_BUCKET=IhrFirebaseStorageBucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=IhrFirebaseMessagingSenderId
REACT_APP_FIREBASE_APP_ID=IhrFirebaseAppId
```

#### OpenAI Konfiguration in der API

Kopieren Sie die Datei `ai-fitnesstrainer/api/.env.example` und benennen Sie sie in `.env`. Füllen Sie die OpenAI Daten wie folgt aus:

```env
OPENAI_API_KEY=IhrOpenAiApiKey
```

---

## Anwendung starten

### API starten

Wechseln Sie in das `api`-Verzeichnis und führen Sie den Befehl aus:

```bash
node app.js
```

### React App starten

Wechseln Sie in das Hauptverzeichnis der React App und führen Sie den Befehl aus:

```bash
npm run dev
```

---

Sie sollten nun in der Lage sein, die AI-Fitness-Trainer App in Ihrem bevorzugten Webbrowser unter `http://localhost:3000` zu öffnen.

Viel Spaß beim Trainieren!
