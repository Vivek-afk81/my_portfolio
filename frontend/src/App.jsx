import { useState, useEffect, useRef } from 'react';
import { fetchAllData, submitContact } from './api';
import meImg from './assets/me.jpg';
import './index.css';

/* ─── Boxicons CDN (injected once) ─── */
if (!document.querySelector('link[href*="boxicons"]')) {
  const link = document.createElement('link');
  link.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

/* ─── Typewriter Hook ─── */
function useTypewriter(words) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words?.length) return;
    const current = words[wordIdx];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1600);
          return;
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setWordIdx((wordIdx + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 90);
    return () => clearTimeout(timer);
  }, [text, wordIdx, isDeleting, words]);

  return text;
}

/* ─── Custom Cursor ─── */
function useCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    };

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    const frameId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frameId);
    };
  }, []);
}

/* ─── Particles ─── */
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() > 0.6 ? '3px' : '2px';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}; height: ${size};
        animation-duration: ${8 + Math.random() * 16}s;
        animation-delay: ${Math.random() * -20}s;
        opacity: 0;
      `;
      container.appendChild(p);
    }
    return () => { container.innerHTML = ''; };
  }, []);
  return <div className="particles" ref={ref} />;
}

/* ─── Scroll hooks ─── */
function useScrollEffects() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Progress bar
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      const bar = document.getElementById('progressBar');
      if (bar) bar.style.width = progress + '%';

      // Navbar shrink
      setScrolled(window.scrollY > 60);

      // Active section
      const sections = document.querySelectorAll('section[id]');
      let current = 'home';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id;
      });
      setActiveSection(current);

      // Reveal sections
      document.querySelectorAll('.section').forEach(s => {
        const rect = s.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) s.classList.add('visible');
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // trigger once
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { activeSection, scrolled };
}

/* ═══════════════════════════════════════
   MAIN APP
═══════════════════════════════════════ */
export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeSection, scrolled } = useScrollEffects();
  const typedText = useTypewriter(data?.profile?.taglines);
  useCursor();

  useEffect(() => {
    fetchAllData()
      .then(d => { setData(d); setTimeout(() => setLoading(false), 800); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="loader-screen">
      <div className="loader-ring" />
      <div className="loader-text">Vivek.dev</div>
    </div>
  );

  if (error) return (
    <div className="error-screen">
      <h2>Couldn't connect to backend</h2>
      <p>{error}</p>
      <p style={{ color: 'var(--text-dim)' }}>Make sure the FastAPI server is running on port 8000</p>
      <code>python -m uvicorn main:app --reload</code>
    </div>
  );

  const { profile, education, experience, skills, research, projects, certifications, achievements } = data;
  const NAV = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'research', label: 'Research' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Cursor */}
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />

      {/* Scroll Progress */}
      <div className="progress-bar" id="progressBar" />

      {/* Background */}
      <div className="bg-mesh" />
      <Particles />

      {/* Side Nav Dots */}
      <nav className="nav-dot">
        {NAV.map(n => (
          <a key={n.id} href={`#${n.id}`} data-label={n.label}
             className={activeSection === n.id ? 'active' : ''} />
        ))}
      </nav>

      {/* ═══ NAVBAR ═══ */}
      <header>
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <a href="#" className="logo">Vivek.dev</a>
          <ul className={menuOpen ? 'open' : ''}>
            {NAV.map(n => (
              <li key={n.id} className={activeSection === n.id ? 'active' : ''}>
                <a href={`#${n.id}`} onClick={() => setMenuOpen(false)}>{n.label}</a>
              </li>
            ))}
          </ul>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </nav>

        {/* ═══ HERO ═══ */}
        <section id="home">
          <div className="home-info">
            <div className="greeting">Hello, World</div>
            <h1>Vivek<br />Chauhan</h1>
            <div className="role-line">
              I'm a <span className="typed-text">{typedText}</span>
              <span className="cursor-blink" />
            </div>
            <p>{profile.summary}</p>

            <div className="stats-row">
              {profile.stats.map((s, i) => (
                <span key={i} style={{ display: 'contents' }}>
                  {i > 0 && <div className="stat-divider" />}
                  <div className="stat">
                    <div className="num">{s.value}</div>
                    <div className="lbl">{s.label}</div>
                  </div>
                </span>
              ))}
            </div>

            <div className="butn-soci">
              <a href="#contact" className="butn">Get in Touch</a>
              <a href="#projects" className="butn-outline">View Work</a>
              <div className="soci">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                  <i className="bx bxl-github" />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <i className="bx bxl-linkedin" />
                </a>
              </div>
            </div>
          </div>

          <div className="home-imag">
            <div className="imag-glow" />
            <div className="imag-box">
              <div className="imag-item">
                <img src={meImg} alt="Vivek Chauhan" />
              </div>
            </div>
          </div>

          <div className="scroll-hint">
            <span>Scroll</span>
            <i className="bx bx-chevron-down" />
          </div>
        </section>
      </header>

      {/* ═══ MAIN CONTENT ═══ */}
      <main>

        {/* ── ABOUT ── */}
        <section id="about" className="section">
          <div className="section-label">Who I am</div>
          <h2>About <span className="accent">Me</span></h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I am a Computer Science undergraduate specializing in AI/ML with hands-on
                experience evaluating Large Language Model outputs — blind manual annotation,
                hallucination benchmarking, and prompt-strategy comparison.
              </p>
              <p>
                My work spans from building GPT-style transformers from scratch to deploying
                ML dashboards with walk-forward validation. I believe in building strong
                fundamentals and understanding concepts deeply, with the long-term goal of
                developing reliable AI/ML systems that have real-world impact.
              </p>
            </div>
            <div className="about-cards">
              <div className="info-card">
                <div className="ic-icon"><i className="bx bx-graduation" /></div>
                <div className="ic-content">
                  <div className="ic-title">Education</div>
                  <div className="ic-sub">{education[0]?.degree}</div>
                </div>
              </div>
              <div className="info-card">
                <div className="ic-icon"><i className="bx bx-brain" /></div>
                <div className="ic-content">
                  <div className="ic-title">Focus Area</div>
                  <div className="ic-sub">AI/ML & LLM Research</div>
                </div>
              </div>
              <div className="info-card">
                <div className="ic-icon"><i className="bx bx-location-plus" /></div>
                <div className="ic-content">
                  <div className="ic-title">Location</div>
                  <div className="ic-sub">{profile.location}</div>
                </div>
              </div>
              <div className="info-card">
                <div className="ic-icon"><i className="bx bx-code-alt" /></div>
                <div className="ic-content">
                  <div className="ic-title">Interests</div>
                  <div className="ic-sub">ML Systems, NLP, Data Science</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="section">
          <div className="section-label">Where I've worked</div>
          <h2>Work <span className="accent">Experience</span></h2>
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

        {/* ── SKILLS ── */}
        <section id="skills" className="section">
          <div className="section-label">What I know</div>
          <h2>My <span className="accent">Skills</span></h2>
          <div className="skills-grid">
            {skills.map((group, i) => (
              <div key={i} className="skill-group">
                <div className="sg-icon">
                  <i className={`bx bx-${
                    group.icon === 'brain' ? 'brain' :
                    group.icon === 'search' ? 'search-alt' :
                    group.icon === 'sparkles' ? 'bolt' :
                    group.icon === 'chart' ? 'bar-chart-alt-2' :
                    group.icon === 'cloud' ? 'cloud' : 'code'
                  }`} />
                </div>
                <div className="sg-title">{group.category}</div>
                <div className="skill-tags">
                  {group.items.map((item, j) => (
                    <span key={j} className="skill-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── RESEARCH ── */}
        <section id="research" className="section">
          <div className="section-label">What I've explored</div>
          <h2>Research <span className="accent">Work</span></h2>
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
                    <i className="bx bx-link-external" /> View on GitHub
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="section">
          <div className="section-label">What I've built</div>
          <h2>My <span className="accent">Projects</span></h2>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div key={i} className="project">
                <span className="project-tag">{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="project-footer">
                  <div className="project-tech">
                    {p.tags.map((t, j) => <span key={j} className="tech-pill">{t}</span>)}
                  </div>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      <i className="bx bx-link-external" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section id="certifications" className="section">
          <div className="section-label">Credentials</div>
          <h2>Certifications <span className="accent">& Awards</span></h2>
          <div className="certs-grid">
            {certifications.map((c, i) => (
              <div key={i} className="cert-card">
                <div className="cert-icon"><i className="bx bx-award" /></div>
                <div className="cert-title">{c.title}</div>
                <div className="cert-issuer">{c.issuer}</div>
                <div className="cert-period">{c.period}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ACHIEVEMENTS ── */}
        <section id="achievements" className="section">
          <div className="section-label">Milestones</div>
          <h2>Achievements <span className="accent">& Activities</span></h2>
          <div className="achievements-list">
            {achievements.map((item, i) => (
              <div key={i} className="achievement-item">
                <div className="achievement-icon"><i className="bx bx-star" /></div>
                <p className="achievement-text">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="section">
          <div className="section-label">Get in touch</div>
          <h2>Contact <span className="accent">Me</span></h2>
          <div className="contact-wrapper">
            <div className="contact-info">
              <p>
                I'm open to collaborations, internship opportunities, AI trainer roles,
                and interesting conversations about AI & ML. Feel free to reach out!
              </p>
              <div className="contact-links">
                <a href={`mailto:${profile.email}`} className="contact-link">
                  <div className="cl-icon"><i className="bx bx-envelope" /></div>
                  <div className="cl-text">
                    <div className="cl-label">Email</div>
                    <div className="cl-val">{profile.email}</div>
                  </div>
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <div className="cl-icon"><i className="bx bxl-github" /></div>
                  <div className="cl-text">
                    <div className="cl-label">GitHub</div>
                    <div className="cl-val">github.com/Vivek-afk81</div>
                  </div>
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <div className="cl-icon"><i className="bx bxl-linkedin" /></div>
                  <div className="cl-text">
                    <div className="cl-label">LinkedIn</div>
                    <div className="cl-val">linkedin.com/in/vivek-chauhan</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="contact-card">
              <span className="cc-emoji"></span>
              <div className="cc-title">Open to Opportunities</div>
              <p>Looking for internships, collaborations, AI trainer roles, and exciting ML projects.</p>
              <a href={`mailto:${profile.email}`} className="butn">Say Hello</a>
            </div>
          </div>
        </section>

      </main>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <div className="footer-logo">Vivek.dev</div>
        <p>&copy; {new Date().getFullYear()} Vivek Chauhan · Built with passion 🌊</p>
      </footer>
    </>
  );
}
