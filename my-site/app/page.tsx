import { SocialLinks } from "./components/social-links";

export default function Home() {
  return (
    <>
      <main className="bio">
        <p className="updated">Last updated 08/28/26</p>
        <h1>Natasha Tran</h1>

        <div className="bio-copy">
          <p>
            I like building software. I am a recent graduate (CS @ UC San Diego '26).
          </p>
          <p>
            Currently, I am an LLM Evaluator @ <a href="https://www.mercor.com/" target="_blank" rel="noopener noreferrer">Mercor</a> where I evaluate AI models and contribute to RLHF pipelines for leading AI labs.
          </p>
          <p>
            Previously, I interned at <a href="https://www.base86.com/" target="_blank" rel="noopener noreferrer">Base86</a> and <a href="https://owaves.com/" target="_blank" rel="noopener noreferrer">Owaves</a>, where I worked on software QA and helped improve product reliability.
          </p>
          <p>
            My interests include side-questing, archive fashion, and going to hackathons (2x winner).
          </p>
        </div>

        <SocialLinks />
      </main>

      <footer className="site-footer">&copy; 2026 Natasha Tran</footer>
    </>
  );
}
