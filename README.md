<<<<<<< HEAD
# Vivek Chauhan — Portfolio

A modern, premium portfolio website built with **React + Vite** (frontend) and **FastAPI** (backend).

## 🏗️ Architecture

```
my_portfolio/
├── frontend/          # React + Vite
│   ├── src/
│   │   ├── components/   # All React components
│   │   ├── assets/       # Images (avatar)
│   │   ├── api.js        # API client
│   │   ├── App.jsx       # Main app
│   │   └── index.css     # Global styles & design tokens
│   └── index.html
├── backend/           # FastAPI
│   ├── main.py          # API endpoints + portfolio data
│   └── requirements.txt
├── Resume3.0.pdf
└── me.jpg
```

## 🚀 Getting Started

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:8000`.

## 🎨 Design — "Cosmic Noir"

- **Theme**: Deep space blacks with electric violet/purple and cyan accents
- **Typography**: Inter (body) + Space Grotesk (headings)
- **Effects**: Floating orbs, glass morphism cards, animated avatar ring, typewriter text
- **Animations**: Framer Motion scroll reveals, hover micro-interactions

## 📡 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/all` | GET | All portfolio data in one request |
| `/api/profile` | GET | Profile info + taglines + stats |
| `/api/education` | GET | Education history |
| `/api/experience` | GET | Work experience |
| `/api/skills` | GET | Technical skills by category |
| `/api/research` | GET | Research work |
| `/api/projects` | GET | Featured projects |
| `/api/certifications` | GET | Certifications |
| `/api/achievements` | GET | Achievements & activities |
| `/api/contact` | POST | Submit contact form message |

## 📋 Sections

1. **Hero** — Name, typewriter taglines, stats, social links, animated avatar
2. **About** — Bio, education timeline, info cards
3. **Experience** — Work history with timeline
4. **Skills** — 6 categorized skill groups
5. **Research** — Academic research with highlights
6. **Projects** — Project cards with GitHub links
7. **Certifications** — AWS Cloud Practitioner badge
8. **Achievements** — Activities & competitions
9. **Contact** — Form (posts to backend) + contact info
=======
# Portfolio
This is my personal portfolio website built using HTML and CSS to present my technical journey, projects, and skills in a structured and professional format. It highlights my work in Data Structures, Machine Learning, AI systems, and software development, serving as a central hub for my academic and practical projects.
>>>>>>> 2751be8ed86473e46736d156d9690f4cf263cd91
