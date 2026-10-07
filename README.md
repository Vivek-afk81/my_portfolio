# Vivek Chauhan — Portfolio

A modern, terminal-themed portfolio website built with **React + Vite** (frontend) and **FastAPI** (backend).

## Quick Start (Development)

You need **two terminals** running simultaneously:

### Terminal 1 — Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

### Terminal 2 — Frontend
```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Production Deployment (Single Server)

In production, FastAPI serves both the API and the built React frontend from a single server.

### 1. Build the frontend
```bash
cd frontend
npm install
npm run build
```

### 2. Start the server
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

Open **http://localhost:8000** — everything runs from one URL.

---

## Deploy to Render (Free)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → **Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: `cd backend && pip install -r requirements.txt && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Root Directory**: (leave empty)
5. Deploy!

### Or deploy to Railway

1. Push to GitHub
2. [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Add a `Procfile` in the root:
   ```
   web: cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
4. Set build command: `cd frontend && npm install && npm run build`

---

## Project Structure

```
my_portfolio/
├── frontend/              # React + Vite
│   ├── src/
│   │   ├── App.jsx          # Main app (all sections)
│   │   ├── api.js           # API client
│   │   └── index.css        # Green terminal theme
│   ├── public/
│   │   └── Resume3.0.pdf    # Downloadable resume
│   └── index.html
├── backend/               # FastAPI
│   ├── main.py              # API + serves built frontend
│   └── requirements.txt
├── .gitignore
└── README.md
```

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/all` | GET | All portfolio data |
| `/api/profile` | GET | Profile info |
| `/api/experience` | GET | Work experience |
| `/api/skills` | GET | Technical skills |
| `/api/research` | GET | Research work |
| `/api/projects` | GET | Projects |
| `/api/certifications` | GET | Certifications |
| `/api/achievements` | GET | Achievements |
| `/api/contact` | POST | Submit contact form |

## Features

- 🖥️ **Green Terminal Theme** — matrix rain, JetBrains Mono, terminal cards
- 📄 **Resume Download** — one-click CV download
- 📱 **Fully Responsive** — works on all devices
- ⚡ **Single Server Deploy** — FastAPI serves everything
- 🔌 **CMS-Ready** — all data served from backend API
