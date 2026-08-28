import { ChevronDown, Feather, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const githubProfiles = [
  { name: 'shirubasoft', url: 'https://github.com/shirubasoft' },
  { name: 'danspark', url: 'https://github.com/danspark' },
];

const socialLinks = [
  { name: 'LinkedIn', url: 'https://linkedin.com/in/reisdan', icon: Linkedin, accent: 'violet' },
  { name: 'X / Twitter', url: 'https://x.com/dddanielreis', icon: Twitter, accent: 'coral' },
  { name: 'Blog', url: 'https://blog.danielreis.dev', icon: Feather, accent: 'acid' },
  { name: 'Email', url: 'mailto:contact@danielreis.dev', icon: Mail, accent: 'coral' },
];

function App() {
  const [githubOpen, setGithubOpen] = useState(false);
  const githubMenu = useRef(null);

  useEffect(() => {
    function closeMenu(event) {
      if (event.type === 'keydown' && event.key === 'Escape') {
        setGithubOpen(false);
        return;
      }

      if (event.type === 'pointerdown' && githubMenu.current && !githubMenu.current.contains(event.target)) {
        setGithubOpen(false);
      }
    }

    document.addEventListener('pointerdown', closeMenu);
    document.addEventListener('keydown', closeMenu);
    return () => {
      document.removeEventListener('pointerdown', closeMenu);
      document.removeEventListener('keydown', closeMenu);
    };
  }, []);

  return (
    <main className="site-shell">
      <section className="landing" aria-labelledby="site-title">
        <div className="identity">
          <div className="mark-frame">
            <img className="brand-mark" src="/favicon.svg?v=2" alt="" width="220" height="220" />
          </div>

          <div className="wordmark">
            <p className="kana" lang="ja">シルバソフト</p>
            <h1 id="site-title">shirubasoft</h1>
          </div>
        </div>

        <nav className="social-nav" aria-label="Find ShirubaSoft online">
          <div className="github-control" ref={githubMenu}>
            <button
              className="social-link social-link-acid"
              type="button"
              aria-expanded={githubOpen}
              aria-controls="github-profiles"
              onClick={() => setGithubOpen((open) => !open)}
            >
              <span className="social-icon">
                <Github aria-hidden="true" size={21} strokeWidth={1.8} />
              </span>
              <span>GitHub</span>
              <ChevronDown className={githubOpen ? 'chevron chevron-open' : 'chevron'} aria-hidden="true" size={15} />
            </button>

            {githubOpen && (
              <div className="github-menu" id="github-profiles">
                {githubProfiles.map((profile) => (
                  <a key={profile.url} href={profile.url} target="_blank" rel="noopener noreferrer">
                    <span>{profile.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {socialLinks.map(({ name, url, icon: Icon, accent }) => (
            <a
              className={`social-link social-link-${accent}`}
              href={url}
              key={name}
              target={name === 'Email' ? undefined : '_blank'}
              rel={name === 'Email' ? undefined : 'noopener noreferrer'}
            >
              <span className="social-icon">
                <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
              </span>
              <span>{name}</span>
            </a>
          ))}
        </nav>
      </section>

      <footer>© {new Date().getFullYear()} Daniel Reis</footer>
    </main>
  );
}

export default App;
