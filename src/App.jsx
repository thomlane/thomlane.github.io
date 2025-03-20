import "./css/style.css";
import "./css/home.css";
import "./css/about.css";
import "./css/projects.css";
import React from "react";
// import Markdown from "react-markdown";
import ReactMarkdown from "react-markdown"
import { useState, useEffect } from "react";
function App() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1';
    document.getElementsByTagName('head')[0].appendChild(meta);
  }, []);

  const [activeNav, setActiveNav] = React.useState("home");
  return (
    <div>
      <NavBar activeNav={activeNav} setActiveNav={setActiveNav} />
      {activeNav === "home" ? (
        <HomePage />
      ) : activeNav === "about" ? (
        <AboutMePage />
      ) : activeNav === "projects" ? (
        <ProjectPage />
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

function ProjectPage () {
  const [jsonArray, setJsonArray] = useState([]);

  useEffect(() => {
    fetch("./data/projects.json")
      .then((res) => res.json())
      .then((data) => setJsonArray(data));
  }, []);

  return (
    <div className="projects-container">
      {jsonArray.map((project, index) => (
        <ProjectEntry
          key={index}
          title={project.title}
          reason={project.reason}
          image={project.image}
          finishedOn={project.finished_on}
          description={project.description}
        />
      ))}
    </div>
  );
};

function ProjectEntry (props) {
  return (
    <div class="project-box"> {/* Sets each project in it's own project box inside the project container */}
        <div class="project-title">{props.title}</div>              {/* a catchy title */}
        <div class="project-reason">{props.reason}</div>            {/* a short reason I did the project (ie. school project, personal project...) */}
        <div class="project-finished-on">{props.finishedOn}</div>  {/* <!-- the approximate date the project was finished --> */}
        <img class="project-image" src={props.image}/>           {/*an image of the project*/}
        <div class="project-description">{props.description}</div>    {/* <!-- an in-depth description of the project that shows off what I did or learned --> */}
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
