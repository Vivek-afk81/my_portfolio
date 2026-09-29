"""
Vivek Chauhan Portfolio — FastAPI Backend
Serves all portfolio data + contact form handler
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from datetime import datetime
import json
import os

app = FastAPI(title="Vivek Portfolio API", version="1.0.0")

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Contact form model ──────────────────────────────────────────────
class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str


# ── Portfolio Data ───────────────────────────────────────────────────

PROFILE = {
    "name": "Vivek Chauhan",
    "location": "Ghaziabad, India",
    "phone": "9453430797",
    "email": "vivekchauhan560999@gmail.com",
    "linkedin": "https://www.linkedin.com/in/vivek-chauhan-500396340",
    "github": "https://github.com/Vivek-afk81",
    "title": "AI/ML Engineer & Researcher",
    "summary": (
        "Computer Science undergraduate specializing in Artificial Intelligence "
        "and Machine Learning (AI/ML) with hands-on experience evaluating Large "
        "Language Model (LLM) outputs — blind manual annotation, hallucination "
        "benchmarking, and prompt-strategy comparison — backed by strong Python, "
        "SQL, and C++ programming skills."
    ),
    "taglines": [
        "AI/ML Engineer",
        "LLM Researcher",
        "Data Analyst",
        "Problem Solver",
    ],
    "stats": [
        {"value": "8.31", "label": "CGPA"},
        {"value": "6+", "label": "Projects"},
        {"value": "AWS", "label": "Certified"},
        {"value": "ML", "label": "Focus"},
    ],
}

EDUCATION = [
    {
        "institution": "KIET Group of Institutions, Ghaziabad",
        "degree": "B.Tech in Computer Science — AI/ML Specialization",
        "period": "2024 – 2028",
        "cgpa": "8.31/10",
        "coursework": [
            "Machine Learning",
            "Deep Learning",
            "NLP",
            "Data Structures & Algorithms",
            "DBMS",
            "OOPs",
        ],
    },
    {
        "institution": "Siddharth Public School",
        "degree": "Class XII (CBSE)",
        "period": "2022",
        "cgpa": "93.6%",
        "coursework": [],
    },
]

EXPERIENCE = [
    {
        "role": "Data Analyst",
        "company": "Airkrit India (Formerly Edulyt India)",
        "location": "Remote",
        "period": "Jun 2026 – Jul 2026",
        "highlights": [
            "Analyzed credit card transaction data across India, querying and transforming transaction-level records with SQL (joins, window functions, CTEs) to build clean, analysis-ready datasets.",
            "Used SAS and Python to uncover spending trends, growth patterns, and customer segmentation insights across regions and transaction categories.",
        ],
    },
]

SKILLS = [
    {
        "category": "Languages",
        "icon": "code",
        "items": ["Python (primary)", "C++", "SQL", "Dart"],
    },
    {
        "category": "ML / DL Frameworks",
        "icon": "brain",
        "items": [
            "PyTorch", "TensorFlow", "Keras", "Scikit-learn",
            "LightGBM", "Prophet", "NumPy", "Pandas",
            "Matplotlib", "Seaborn",
        ],
    },
    {
        "category": "LLM Evaluation & Annotation",
        "icon": "search",
        "items": [
            "LLM Output Evaluation", "Manual Annotation",
            "Prompt Engineering", "Hallucination Detection",
            "BLEU / ROUGE / BERTScore", "Benchmarking", "Fact-Checking",
        ],
    },
    {
        "category": "GenAI / NLP",
        "icon": "sparkles",
        "items": [
            "Transformers & Attention Mechanisms", "LangChain",
            "HuggingFace Transformers", "RAG Pipelines",
            "FAISS", "Groq / Mistral / HF Inference APIs",
        ],
    },
    {
        "category": "Data Analytics & BI",
        "icon": "chart",
        "items": [
            "SAS", "Tableau", "Microsoft Power BI",
            "Data Analysis & Visualization", "Statistical Analysis", "EDA",
        ],
    },
    {
        "category": "Tools, Platforms & Cloud",
        "icon": "cloud",
        "items": [
            "Git/GitHub", "Flask", "FastAPI", "Streamlit", "Gradio",
            "Docker", "Jupyter", "Google Colab", "AWS", "PyPortfolioOpt",
        ],
    },
]

RESEARCH = [
    {
        "title": "Step Order Sensitivity in Chain-of-Thought Reasoning",
        "year": "2026",
        "type": "Independent Research",
        "github": "https://github.com/Vivek-afk81",
        "highlights": [
            "Tested whether reversing or shuffling correct CoT steps hurts accuracy across 5 open-weight LLMs on a stratified 100-problem GSM8K subset, using McNemar's tests with Bonferroni correction.",
            "Blind-annotated responses against a rubric to classify failure modes; found aggregate 'robustness' scores masked a self-break mode in 50% of degraded responses.",
            "Wrote a full LaTeX manuscript and a 1,500+ line lab notebook for reproducibility.",
        ],
    },
]

PROJECTS = [
    {
        "title": "MiniGPT — Lightweight Transformer Framework",
        "tags": ["PyTorch", "NLP", "Deep Learning"],
        "category": "Deep Learning",
        "description": "Built a GPT-style transformer from scratch (causal multi-head attention, positional embeddings, autoregressive generation) with custom tokenization, trained on 1M+ tokens.",
        "github": "https://github.com/Vivek-afk81",
    },
    {
        "title": "#50DaysOfGenAI — Build-in-Public Challenge",
        "tags": ["LangChain", "HuggingFace", "RAG"],
        "category": "GenAI",
        "description": "Documented 40+ public builds, including a hallucination benchmark on flan-t5-base. Ran BLEU/ROUGE/BERTScore analysis exposing metric blind spots, plus a semantic-vs-keyword-vs-hybrid retrieval benchmark on FiQA.",
        "github": "https://github.com/Vivek-afk81",
    },
    {
        "title": "Stock ML Dashboard",
        "tags": ["LightGBM", "Prophet", "Streamlit", "PyPortfolioOpt"],
        "category": "ML · Finance",
        "description": "Trained per-ticker LightGBM classifiers with walk-forward cross-validation on 2020–2025 data (no leakage), using 14 technical indicators and 30-day Prophet forecasts. Deployed a Streamlit dashboard with equity curve, drawdown analysis, and SQLite backtest logging.",
        "github": "https://github.com/Vivek-afk81",
    },
    {
        "title": "Breast Cancer Classification",
        "tags": ["Python", "Scikit-learn", "XGBoost"],
        "category": "Machine Learning",
        "description": "End-to-end ML classification pipeline using kNN, Logistic Regression, Random Forest, and XGBoost with feature scaling, encoding, cross-validation, and ROC-AUC evaluation.",
        "github": "https://github.com/Vivek-afk81",
    },
]

CERTIFICATIONS = [
    {
        "title": "AWS Certified Cloud Practitioner",
        "issuer": "Amazon Web Services",
        "period": "Feb 2026 – Feb 2029",
        "icon": "aws",
    },
]

ACHIEVEMENTS = [
    "Active contributor, College AI/ML Club — delivered an 'Intro to NLP with Scikit-learn' session to 40+ junior students.",
    "Competed in Kaggle's 'Orbit Wars' 2D real-time-strategy competition ($50K prize pool); best agent reached an 85% local win rate with zero invalid moves using logarithmic fleet-speed modeling and angle-based threat detection.",
]


# ── API Routes ───────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"status": "ok", "message": "Vivek Portfolio API"}


@app.get("/api/profile")
def get_profile():
    return PROFILE


@app.get("/api/education")
def get_education():
    return EDUCATION


@app.get("/api/experience")
def get_experience():
    return EXPERIENCE


@app.get("/api/skills")
def get_skills():
    return SKILLS


@app.get("/api/research")
def get_research():
    return RESEARCH


@app.get("/api/projects")
def get_projects():
    return PROJECTS


@app.get("/api/certifications")
def get_certifications():
    return CERTIFICATIONS


@app.get("/api/achievements")
def get_achievements():
    return ACHIEVEMENTS


@app.get("/api/all")
def get_all():
    """Returns all portfolio data in a single request."""
    return {
        "profile": PROFILE,
        "education": EDUCATION,
        "experience": EXPERIENCE,
        "skills": SKILLS,
        "research": RESEARCH,
        "projects": PROJECTS,
        "certifications": CERTIFICATIONS,
        "achievements": ACHIEVEMENTS,
    }


@app.post("/api/contact")
def submit_contact(msg: ContactMessage):
    """Store contact form submission."""
    entry = {
        "name": msg.name,
        "email": msg.email,
        "subject": msg.subject,
        "message": msg.message,
        "timestamp": datetime.now().isoformat(),
    }

    messages_file = os.path.join(os.path.dirname(__file__), "messages.json")

    existing = []
    if os.path.exists(messages_file):
        with open(messages_file, "r") as f:
            existing = json.load(f)

    existing.append(entry)

    with open(messages_file, "w") as f:
        json.dump(existing, f, indent=2)

    return {"status": "ok", "message": "Message received! I'll get back to you soon."}
