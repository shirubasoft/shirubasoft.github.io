import { Github, Linkedin, Twitter, Mail, Feather } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    isDropdown: true,
    items: [
      { name: 'shirubasoft', url: 'https://github.com/shirubasoft' },
      { name: 'danspark', url: 'https://github.com/danspark' },
    ]
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/reisdan',
    icon: Linkedin,
  },
  {
    name: 'X / Twitter',
    url: 'https://x.com/dddanielreis',
    icon: Twitter,
  },
  {
    name: 'Blog',
    url: 'https://blog.danielreis.dev',
    icon: Feather,
  },
  {
    name: 'Email',
    url: 'mailto:contact@danielreis.dev', 
    icon: Mail,
  },
];

function App() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-white p-4 animate-fade-in selection:bg-accent selection:text-white">
      
      <div className="absolute top-8 left-1/2 -translate-x-1/2 md:top-12 opacity-80 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-1">
        <h1 className="font-mono text-sm tracking-[0.2em] text-gray-400 uppercase">shirubasoft</h1>
        <p className="text-[10px] text-gray-500 tracking-[0.15em] font-light">シルバソフト</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12" ref={dropdownRef}>
        {socialLinks.map((link) => {
          const Icon = link.icon;
          
          if (link.isDropdown) {
            const isOpen = openDropdown === link.name;
            return (
              <div key={link.name} className="relative group flex flex-col items-center gap-3">
                <button
                  onClick={() => toggleDropdown(link.name)}
                  className="group flex flex-col items-center gap-3 relative focus:outline-none"
                  aria-label={link.name}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                >
                  <div className={`p-3 rounded-2xl bg-surface/50 border transition-all duration-300 ease-out group-hover:scale-110 group-hover:border-accent/30 group-hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.2)] ${isOpen ? 'border-accent/30 shadow-[0_0_15px_-3px_rgba(255,255,255,0.2)]' : 'border-white/5'}`}>
                    <Icon 
                      size={28} 
                      strokeWidth={1.5}
                      className={`transition-colors duration-300 group-hover:text-accent ${isOpen ? 'text-accent' : 'text-gray-300'}`}
                    />
                  </div>
                  
                  <span className={`absolute -bottom-8 transform transition-all duration-300 text-xs font-mono text-gray-400 tracking-wide whitespace-nowrap ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                    {link.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute top-full mt-4 w-40 bg-surface border border-white/10 rounded-lg shadow-xl overflow-hidden z-20 animate-fade-in">
                    <div className="py-1">
                      {link.items.map((item) => (
                        <a
                          key={item.name}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white font-mono transition-colors"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <a
              key={link.name}
              href={link.url}
              target={link.name === 'Email' ? undefined : '_blank'}
              rel={link.name === 'Email' ? undefined : 'noopener noreferrer'}
              className="group flex flex-col items-center gap-3 relative"
              aria-label={link.name}
            >
              <div className="p-3 rounded-2xl bg-surface/50 border border-white/5 transition-all duration-300 ease-out group-hover:scale-110 group-hover:border-accent/30 group-hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.2)]">
                <Icon 
                  size={28} 
                  strokeWidth={1.5}
                  className="text-gray-300 transition-colors duration-300 group-hover:text-accent"
                />
              </div>
              
              <span className="absolute -bottom-8 opacity-0 transform -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 text-xs font-mono text-gray-400 tracking-wide whitespace-nowrap">
                {link.name}
              </span>
            </a>
          );
        })}
      </div>

      <footer className="absolute bottom-6 text-[10px] text-gray-600 font-mono">
        © {new Date().getFullYear()} Daniel Reis
      </footer>
    </main>
  );
}

export default App;
