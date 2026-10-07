import { useState, useEffect, useRef } from 'react';
import { fetchAllData } from './api';
import './index.css';

/* ─── Matrix Rain Canvas ─── */
function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = '01アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(245,248,245,0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#087f35';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 55);

    const onResize = () => {
      resize();
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };
    window.addEventListener('resize', onResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas id="matrix" ref={canvasRef} />;
}

/* ═══════════════════════════════════════
   MAIN APP
═══════════════════════════════════════ */
export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchAllData()
      .then(d => { setData(d); setTimeout(() => setLoading(false), 600); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="loader-screen">
      <div className="loader-text">&gt; loading_portfolio...</div>
      <div className="loader-bar" />
    </div>
  );

  if (error) return (
    <div className="error-screen">
      <h2>&gt; connection_failed</h2>
      <p>{error}</p>
      <p>Make sure the FastAPI server is running on port 8000</p>
      <code>python -m uvicorn main:app --reload</code>
    </div>
  );

  const { profile, education, experience, skills, research, projects, certifications, achievements } = data;

  const NAV = [
    { id: 'about', label: '01_about' },
    { id: 'experience', label: '02_experience' },
    { id: 'projects', label: '03_projects' },
    { id: 'skills', label: '04_skills' },
    { id: 'contact', label: '05_contact' },
  ];

  return (
    <>
      {/* Background */}
      <MatrixRain />
      <div className="grid-bg" />

      {/* ═══ NAVBAR ═══ */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">vivek.exe</div>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {NAV.map(n => (
              <li key={n.id}>
                <a href={`#${n.id}`} onClick={() => setMenuOpen(false)}>{n.label}</a>
              </li>
            ))}
          </ul>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <main>

        {/* ═══ HERO ═══ */}
        <section className="hero">
          <div className="hero-content">
            <div className="terminal-line">
              &gt; system.init()<span className="terminal-cursor" />
            </div>

            <h1>Vivek<br /><span className="accent">Chauhan.</span></h1>

            <h2 className="hero-subtitle">{profile.title}</h2>

            <p className="hero-description">
              I build intelligent systems using{' '}
              <strong>machine learning, NLP and LLMs</strong>,
              backed by hands-on experience in LLM evaluation,
              hallucination benchmarking, and data analytics.
            </p>

            <div className="buttons">
              <a href="#projects" className="btn btn-primary">&gt; VIEW PROJECTS</a>
              <a href="#contact" className="btn btn-secondary">&gt; CONTACT ME</a>
              <a href="/Resume3.0.pdf" download className="btn btn-download">↓ DOWNLOAD CV</a>
            </div>
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="about">
          <div className="section-header">
            <div className="section-number">// 01</div>
            <h2 className="section-title">About Me</h2>
            <p className="section-description">The person behind the systems.</p>
          </div>

          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm a Computer Science undergraduate specializing in AI/ML with hands-on
                experience evaluating Large Language Model outputs — blind manual annotation,
                hallucination benchmarking, and prompt-strategy comparison.
              </p>
              <p>
                My work spans from building GPT-style transformers from scratch to deploying
                ML dashboards with walk-forward validation. I believe in building strong
                fundamentals and understanding concepts deeply.
              </p>
              <p>
                {education[0]?.degree} at {education[0]?.institution} — CGPA: {education[0]?.cgpa}
              </p>
            </div>

            <div className="terminal">
              <div className="terminal-header">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
              <div className="terminal-row"><span className="key">name: </span><span className="value">{profile.name}</span></div>
              <div className="terminal-row"><span className="key">role: </span><span className="value">{profile.title}</span></div>
              <div className="terminal-row"><span className="key">location: </span><span className="value">{profile.location}</span></div>
              <div className="terminal-row"><span className="key">focus: </span><span className="value">Machine Learning, LLMs</span></div>
              <div className="terminal-row"><span className="key">interests: </span><span className="value">NLP, Deep Learning, Data Science</span></div>
              <div className="terminal-row"><span className="key">status: </span><span className="value">building...</span></div>
            </div>
          </div>
        </section>

        {/* ═══ EXPERIENCE ═══ */}
        <section id="experience">
          <div className="section-header">
            <div className="section-number">// 02</div>
            <h2 className="section-title">Experience</h2>
            <p className="section-description">Where I've applied my skills professionally.</p>
          </div>

          <div className="experience-list">
            {experience.map((exp, i) => (
              <div key={i} className="exp-card">
                <div className="exp-header">
                  <div>
                    <div className="exp-role">{exp.role}</div>
                    <div className="exp-company">{exp.company}</div>
                  </div>
                  <div className="exp-meta">
                    <div>{exp.period}</div>
                    <div>{exp.location}</div>
                  </div>
                </div>
                <ul className="exp-highlights">
                  {exp.highlights.map((h, j) => <li key={j}>{h}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ PROJECTS ═══ */}
        <section id="projects">
          <div className="section-header">
            <div className="section-number">// 03</div>
            <h2 className="section-title">Projects</h2>
            <p className="section-description">Selected work across AI, ML and software engineering.</p>
          </div>

          <div className="projects-grid">
            {projects.map((p, i) => (
              <article key={i} className="project">
                <div className="project-number">PROJECT_{String(i + 1).padStart(2, '0')}</div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="tags">
                  {p.tags.map((t, j) => <span key={j} className="tag">{t.toUpperCase()}</span>)}
                </div>
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    &gt; view_source
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ═══ SKILLS ═══ */}
        <section id="skills">
          <div className="section-header">
            <div className="section-number">// 04</div>
            <h2 className="section-title">Tech Stack</h2>
            <p className="section-description">Technologies and tools I work with.</p>
          </div>

          <div className="skills-container">
            {skills.map((group, i) => (
              <div key={i}>
                <div className="skill-category-title">// {group.category}</div>
                <div className="skills">
                  {group.items.map((item, j) => (
                    <span key={j} className="skill">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ RESEARCH ═══ */}
        <section id="research">
          <div className="section-header">
            <div className="section-number">// 05</div>
            <h2 className="section-title">Research</h2>
            <p className="section-description">Independent research and academic exploration.</p>
          </div>

          <div className="research-list">
            {research.map((item, i) => (
              <div key={i} className="research-card">
                <h3>{item.title}</h3>
                <div className="research-meta">
                  <span className="research-tag">{item.type}</span>
                  <span>{item.year}</span>
                </div>
                <ul className="research-highlights">
                  {item.highlights.map((h, j) => <li key={j}>{h}</li>)}
                </ul>
                {item.github && (
                  <a href={item.github} target="_blank" rel="noopener noreferrer" className="research-link">
                    &gt; view_on_github
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CERTIFICATIONS ═══ */}
        <section id="certifications">
          <div className="section-header">
            <div className="section-number">// 06</div>
            <h2 className="section-title">Certifications</h2>
          </div>

          <div className="certs-grid">
            {certifications.map((c, i) => (
              <div key={i} className="cert-card">
                <div className="cert-icon">🏆</div>
                <div className="cert-title">{c.title}</div>
                <div className="cert-issuer">{c.issuer}</div>
                <div className="cert-period">{c.period}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ ACHIEVEMENTS ═══ */}
        <section id="achievements">
          <div className="section-header">
            <div className="section-number">// 07</div>
            <h2 className="section-title">Achievements</h2>
          </div>

          <div className="achievements-list">
            {achievements.map((item, i) => (
              <div key={i} className="achievement-item">
                <span className="achievement-bullet">&gt;</span>
                <p className="achievement-text">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section id="contact" className="contact-section">
          <div className="section-number">// 08</div>
          <h2 className="section-title">Let's Connect</h2>
          <p>
            Interested in AI, machine learning, or building something interesting?
            Let's talk.
          </p>

          <a href={`mailto:${profile.email}`} className="email-link">
            {profile.email}
          </a>

          <div className="buttons" style={{ justifyContent: 'center' }}>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              GITHUB
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              LINKEDIN
            </a>
            <a href="/Resume3.0.pdf" download className="btn btn-download">
              ↓ RESUME
            </a>
          </div>
        </section>

      </main>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <span>© {new Date().getFullYear()} Vivek Chauhan</span>
        <span>SYSTEM_STATUS: ONLINE</span>
      </footer>
    </>
  );
}
