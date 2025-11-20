import React, { useState, useEffect, useRef } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import Menu from './Menu';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOffset, setIsOffset] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const [data, setData] = useState({
    phoneNumber: '555-123-3456',
    logoUrl: '/images/logo.svg',
    menuLabel: 'Menu',
    introLabel: 'Wstęp',
    aboutLabel: 'O nas',
    galleryLabel: 'Galeria',
  });
  
  const { handleSmoothScroll } = useSmoothScroll();
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const triggerHeightRef = useRef(0);
  
  const sectionsRef = useRef([]);
  useEffect(() => {
    sectionsRef.current = Array.from(document.querySelectorAll('.target-section'));
    heroRef.current = document.querySelector('#intro');
    if (heroRef.current) {
        setTimeout(() => {
            triggerHeightRef.current = heroRef.current.offsetHeight - 240;
        }, 120);
    }
  }, []);

  useEffect(() => {
    const bodyEl = document.body;
    if (isMenuOpen) {
      bodyEl.classList.add('menu-is-open');
    } else {
      bodyEl.classList.remove('menu-is-open');
    }
    
    const handleResize = () => {
      if (window.matchMedia('(min-width: 901px)').matches) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      let loc = window.scrollY;
      
      const triggerHeight = triggerHeightRef.current;
      setIsSticky(loc > triggerHeight);
      setIsOffset(loc > triggerHeight + 20);
      setIsScrolling(loc > triggerHeight + 150);

      let currentSection = 'intro';
      sectionsRef.current.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;
        const sectionId = section.getAttribute('id');
        
        if (loc > sectionTop && loc <= sectionTop + sectionHeight) {
          currentSection = sectionId;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(prev => !prev);
  };
  
  const closeMenu = () => {
    if (window.matchMedia('(max-width: 900px)').matches) {
      setIsMenuOpen(false);
    }
  };

  const headerClasses = [
    's-header',
    isSticky ? 'sticky' : '',
    isOffset ? 'offset' : '',
    isScrolling ? 'scrolling' : '',
  ].filter(Boolean).join(' ');

  const navLinks = [
    { href: '#intro', label: data.introLabel },
    { href: '#about', label: data.aboutLabel },
    { href: '#menu', label: data.menuLabel },
    { href: '#gallery', label: data.galleryLabel },
  ];

  return (
    <header className={headerClasses} id='top' ref={headerRef}>
      <div className="container s-header__content">
        <div className="s-header__block">
          <div className="header-logo">
            <a className="logo" href="index.html">
              <img src={data.logoUrl} alt="Homepage" />
            </a>
          </div>
          <a 
            className={`header-menu-toggle ${isMenuOpen ? 'is-clicked' : ''}`} 
            href="#0" 
            onClick={toggleMenu}
          >
            <span>{data.menuLabel}</span>
          </a>
        </div>

        <nav className="header-nav">
          <ul className="header-nav__links">
            {navLinks.map(link => (
              <li key={link.href} className={activeSection === link.href.substring(1) ? 'current' : ''}>
                <a 
                  href={link.href} 
                  className="smoothscroll" 
                  onClick={(e) => {
                    handleSmoothScroll(e);
                    closeMenu();
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {data.phoneNumber && <div className="header-contact">
            <a href={`tel:${data.phoneNumber}`} className="header-contact__num btn">
              <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" width="24" height="24" color="#000000">
                <defs><style>{`.cls-6376396cc3a86d32eae6f0dc-1{fill:none;stroke:currentColor;stroke-miterlimit:10;}`}</style></defs>
                <path className="cls-6376396cc3a86d32eae6f0dc-1" d="M19.64,21.25c-2.54,2.55-8.38.83-13-3.84S.2,6.9,2.75,4.36L5.53,1.57,10.9,6.94l-2,2A2.18,2.18,0,0,0,8.9,12L12,15.1a2.18,2.18,0,0,0,3.07,0l2-2,5.37,5.37Z"></path>
              </svg>
              {data.phoneNumber}
            </a>
          </div>}
        </nav>
      </div>
    </header>
  );
};

export default Header;