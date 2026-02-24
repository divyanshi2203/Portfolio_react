import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Section from "./components/Section";
import ProjectCard from "./components/ProjectCard";

import { getPortfolio, sendContact, type Project } from "./api";
import ChatWidget from "./components/ChatWidget";

export default function App() {
  const NAME = "Divyanshi";
  const ROLE = "Software Engineer (Python / JS)";
  const TAGLINE =
    "I build clean, reliable web apps - and this portfolio has an AI chat backed by a Python API.";
  const EMAIL = "divynashisaini22@gmail.com";
  const GITHUB = "https://github.com/divyanshi2203";
  const LINKEDIN = "https://www.linkedin.com/in/divyanshi-saini-577108259";

  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState("");

  // Contact form UI only for now (we'll connect backend next)
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoadingProjects(true);
        setProjectsError("");
        const data = await getPortfolio();
        if (!cancelled) setProjects(data.projects);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to load projects";
        if (!cancelled) setProjectsError(msg);
      } finally {
        if (!cancelled) setLoadingProjects(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  function scrollToContact() {
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleContactSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
    setContactStatus("");
    await sendContact({
      name: contactName,
      email: contactEmail,
      message: contactMessage,
    });

    setContactStatus("Message sent ✅ I’ll get back to you soon.");
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to send message";
    setContactStatus(`Error: ${msg}`);
  }
}

  return (
    <div id="top">
      <Navbar name={NAME} />
      <div className="navSpacer" />

      <div className="container">
        {/* HERO */}
        <div className="heroWrap">
          <div className="card">
            <div className="cardInner">
              <span className="kicker">
                <span className="badgeDot" />
                Available for opportunities • {ROLE}
              </span>

              <h1 className="h1">
                Hi, I’m <span style={{ color: "var(--accent)" }}>{NAME}</span>.
                <br />
                I ship fast, clean products.
              </h1>

              <p className="subtitle">{TAGLINE}</p>

              <div className="row">
                <button className="btn btnPrimary" onClick={scrollToContact}>
                  Contact me
                </button>
                <a className="btn" href={GITHUB} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
                <a className="btn" href={LINKEDIN} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
              </div>

              <p className="small" style={{ marginTop: 14 }}>
                <span className="mono">Stack:</span> Python • FastAPI • SQLAlchemy • React • TypeScript
              </p>
            </div>
          </div>

          <div className="card">
            <div className="cardInner">
              {/* Put your photo: frontend/public/profile.jpg then update src */}
              <div className="heroPhoto" title="Profile photo placeholder">
                {
                <img src="/profile.jpg" alt="Profile" />
                }
                <div style={{ padding: 18, textAlign: "center" }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>Add your photo</div>
                  <div className="small">
                    Put <span className="mono">profile.jpg</span> in{" "}
                    <span className="mono">frontend/public/</span>
                  </div>
                </div>
              </div>

              <hr className="hr" />

              <div className="small" style={{ lineHeight: 1.7 }}>
                <div style={{ fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>Quick facts</div>
                <div>• Location: India</div>
                <div>• Email: {EMAIL}</div>
                <div>• Building: Portfolio + AI assistant</div>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <Section
          id="about"
          title="About"
          subtitle="A short intro about me."
        >
          <div className="split">
            <div className="card col7">
              <div className="cardInner">
                <p style={{ marginTop: 0, color: "rgba(255,255,255,0.80)", lineHeight: 1.7 }}>
                  I’m a software engineer focused on building backend-heavy products with clean APIs
                  and strong fundamentals. I like writing code that is simple to read, easy to test,
                  and easy to deploy.
                </p>
                <p style={{ marginBottom: 0, color: "rgba(255,255,255,0.76)", lineHeight: 1.7 }}>
                  Currently, I’m building this portfolio with a Python backend and an AI assistant
                  that can answer questions about my work.
                </p>
              </div>
            </div>

            <div className="card col5">
              <div className="cardInner">
                <div style={{ fontWeight: 700, marginBottom: 10 }}>Skills</div>
                <div className="small" style={{ lineHeight: 1.9 }}>
                  • Python, FastAPI, Flask, Django<br />
                  • SQLAlchemy, Postgres, SQLite<br />
                  • JS, TypeScript<br />
                  • REST APIs, Auth, Deployments
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* PROJECTS */}
        <Section
          id="projects"
          title="Projects"
          subtitle="Real work - clean code, clear impact."
        >
          {loadingProjects ? (
            <p className="small">Loading projects…</p>
          ) : projectsError ? (
            <div className="card">
              <div className="cardInner">
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Could not load projects</div>
                <div className="small">{projectsError}</div>
                <div className="small" style={{ marginTop: 8 }}>
                  Ensure backend is running and <span className="mono">VITE_API_BASE_URL</span> is set.
                </div>
              </div>
            </div>
          ) : (
            <div className="grid">
              {projects.map((p) => (
                <div key={p.id} style={{ gridColumn: "span 6" }}>
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* EXPERIENCE */}
        <Section
          id="experience"
          title="Experience & Education"
          subtitle="Quick Peak"
        >
          <div className="split">
            <div className="card col6">
              <div className="cardInner">
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Work Experience</div>
                <div className="small" style={{ lineHeight: 1.9 }}>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ color: "rgba(255,255,255,0.9)" }}>
                      Java Full Stack Training -  Ducat IT Training School
                    </div>
                    <div>• Successfully completed certification in Java Full Stack Development</div>
                    <div>• Gained hands-on experience in front-end, back-end, and database technologies</div>
                  </div>

                  <div>
                    <div style={{ color: "rgba(255,255,255,0.9)" }}>Intern - ANV Tech Solution</div>
                    <div>• Built REST APIs and backend services</div>
                    <div>• Improved reliability and performance</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card col6">
              <div className="cardInner">
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Education</div>
                <div className="small" style={{ lineHeight: 1.9 }}>
                  <div style={{ color: "rgba(255,255,255,0.9)" }}>B. Tech - MIT Moradabad</div>
                  <div>• Year: 2022 – 2026</div>
                  <div>• Focus: Computer Science AI/ML</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* CONTACT */}
        <Section
          id="contact"
          title="Contact"
          subtitle="Send a message."
        >
          <div className="split">
            <div className="card col7">
              <div className="cardInner">
                <form onSubmit={handleContactSubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <input
                      className="input"
                      placeholder="Your name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                    />
                    <input
                      className="input"
                      placeholder="Your email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      type="email"
                      required
                    />
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <textarea
                      className="textarea"
                      placeholder="Your message"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      required
                    />
                  </div>

                  <div className="row">
                    <button className="btn btnPrimary" type="submit">
                      Send message
                    </button>
                    <a className="btn" href={`mailto:${EMAIL}`}>
                      Email directly
                    </a>
                  </div>

                  {contactStatus ? (
                    <p className="small" style={{ marginTop: 10 }}>
                      {contactStatus}
                    </p>
                  ) : null}
                </form>
              </div>
            </div>

            <div className="card col5">
              <div className="cardInner">
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Socials</div>
                <div className="small" style={{ lineHeight: 2 }}>
                  <div>
                    <a href={GITHUB} target="_blank" rel="noreferrer">
                      GitHub ↗
                    </a>
                  </div>
                  <div>
                    <a href={LINKEDIN} target="_blank" rel="noreferrer">
                      LinkedIn ↗
                    </a>
                  </div>
                  <div>
                    <a href={`mailto:${EMAIL}`}>Email</a>
                  </div>
                </div>

                <hr className="hr" />

                <div className="small">
                  If you want to know something about me, you can have a conversasion with AI chat widget (bottom-right).
                </div>
              </div>
            </div>
          </div>
        </Section>

        <div className="small" style={{ marginTop: 18, opacity: 0.75 }}>
          © {new Date().getFullYear()} {NAME}. Built with React + TypeScript + FastAPI.
        </div>
      </div>
      <ChatWidget />
    </div>
  );
}