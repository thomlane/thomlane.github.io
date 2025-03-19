import "./css/style.css";
import "./css/home.css";
import "./css/about.css";
import "./css/projects.css";
import React from "react";
// import Markdown from "react-markdown";
import ReactMarkdown from "react-markdown"
import { useState, useEffect } from "react";
function App() {
  const [activeNav, setActiveNav] = React.useState("home");
  return (
    <div>
      <NavBar activeNav={activeNav} setActiveNav={setActiveNav} />
      {activeNav === "home" ? (
        <HomePage />
      ) : activeNav === "about" ? (
        <AboutMePage />
      ) : null}
    </div>
  );
}

const MarkdownRenderer = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("./data/about.md")
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="markdown-content">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

function NavBar(props) {
  const { activeNav, setActiveNav } = props;
  return (
    <nav id="navbar">
      <div id="nav-container">
        <a
          className={`nav-link ${activeNav === "home" ? "active" : "unactive"}`}
          onClick={() => setActiveNav("home")}
        >
          Home
        </a>
        <a
          className={`nav-link ${
            activeNav === "projects" ? "active" : "unactive"
          }`}
          onClick={() => setActiveNav("projects")}
        >
          Projects
        </a>
        <a
          className={`nav-link ${
            activeNav === "about" ? "active" : "unactive"
          }`}
          onClick={() => setActiveNav("about")}
        >
          About
        </a>
      </div>
    </nav>
  );
}

function HomePage() {
  return (
    <div className="home-container">
      <div className="text-container">
        <div className="text-name">Lane Thompson</div>
        <div className="text-description">Real-Time Software Engineer</div>
        <div className="text-description">Master of Science: Computer Science</div>
      </div>
      <div className="footer">
        <a
          className="link-parent"
          href="https://linkedin.com/in/lane-thompson-2524881b0"
        >
          <img
            id="linkedin-icon"
            className="link"
            src="images/linkedin_icon.png"
            alt="LinkedIn link"
          />
        </a>
        <a className="link-parent" href="https://github.com/thomlane">
          <img
            id="github-icon"
            className="link"
            src="images/github_icon.png"
            alt="Github link"
            />
        </a>
      </div>
    </div>
  );
}

function AboutMePage() {
  return (
    <div className="about-container">
      <h1 className="about-name">Lane Thompson</h1>
      <img
        className="about-image"
        src="images\me.jpg"
        alt="Quill and I"
      />
      <p className="about-text">
        <MarkdownRenderer />
      </p>
    </div>
  );
}

export default App;
