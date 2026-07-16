export default function Home() {
  return (
    <>
      <main className="bio">
        <p className="updated">Last updated 07/16/26</p>
        <h1>Natasha Tran</h1>

        <div className="bio-copy">
          <p>
            I like building software. I am a recent graduate (CS @ UC San Diego '26).
          </p>
          <p>
            Currently, I am an LLM Evaluator @ Mercor where I evaluate AI models and contribute to RLHF pipelines for leading AI labs.
          </p>
          <p>
            Previously, I interned at Base86 and Owaves, where I worked on software QA and helped improve product reliability.
          </p>
          <p>
            My interests include side-questing, archive fashion, and going to hackathons (2x winner).
          </p>
        </div>

        <ul className="social-links" aria-label="Profile links">
          <li>
            <a href="https://www.linkedin.com/in/nattran/">LinkedIn</a>
          </li>
          <li>
            <a href="https://github.com/FaZeDrug">GitHub</a>
          </li>
          <li>
            <a href="/resume.pdf">Resume</a>
          </li>
        </ul>
      </main>

      <footer className="site-footer">&copy; 2026 Natasha Tran</footer>
    </>
  );
}
