"use client";

import { useState, useEffect, useRef } from 'react';

// Define the navigation sections
const navSections = [
  { id: 'home', label: 'Home' },
  { id: 'gallery', label: 'Collection' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  // Update indicator position based on active section
  const updateIndicator = () => {
    if (navRef.current && activeItemRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const activeItemRect = activeItemRef.current.getBoundingClientRect();
      
      setIndicatorStyle({
        width: `${activeItemRect.width}px`,
        transform: `translateX(${activeItemRect.left - navRect.left}px)`,
        opacity: 1
      });
    }
  };

  useEffect(() => {
    // Update indicator when active section changes
    updateIndicator();
    
    // Also update on window resize
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection, isScrolled]);

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background
      setIsScrolled(window.scrollY > 10);
    };
    
    const observeSections = () => {
      const sections = navSections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));
      
      // Use IntersectionObserver API for better performance
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId && navSections.some(section => section.id === sectionId)) {
              setActiveSection(sectionId);
            }
          }
        });
      }, { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' });
      
      // Observe all sections
      sections.forEach(section => {
        if (section.element) {
          observer.observe(section.element);
        }
      });
      
      return () => {
        sections.forEach(section => {
          if (section.element) {
            observer.unobserve(section.element);
          }
        });
      };
    };
    
    // Set up scroll listener for navbar background
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set up observers
    const cleanup = observeSections();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (cleanup) cleanup();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Add offset for fixed header
      const offset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-primary/95 backdrop-blur-md py-3 shadow-lg' 
          : 'bg-gradient-to-b from-black/50 to-transparent py-5'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="z-10 group"
        >
          <h1 
            className={`chromatic-aberration font-serif text-2xl font-bold transition-all duration-300 ${
              isScrolled 
                ? 'text-accent group-hover:text-accent-light' 
                : 'text-accent group-hover:text-accent-light'
            }`} 
            data-text="GlamHaven"
          >
            GlamHaven
          </h1>
        </a>

        {/* Desktop Menu */}
        <div 
          ref={navRef}
          className="hidden md:flex items-center relative"
        >
          {/* Animated indicator */}
          <div 
            className={`absolute h-[3px] bottom-[-8px] bg-accent rounded-full transition-all duration-300 ease-in-out ${
              isScrolled ? 'opacity-100' : 'opacity-80'
            }`}
            style={indicatorStyle}
          ></div>
          
          <div className="flex space-x-8 items-center">
            {navSections.map((item) => (
              <a 
                key={item.id} 
                ref={activeSection === item.id ? activeItemRef : null}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`font-medium transition-all duration-300 relative py-2 px-1 ${
                  isScrolled 
                    ? 'text-light/80 hover:text-accent' 
                    : 'text-light hover:text-accent'
                } ${
                  activeSection === item.id 
                    ? isScrolled ? 'text-accent font-semibold' : 'text-accent font-semibold' 
                    : ''
                }`}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className={`button-small transition-all duration-300 transform hover:scale-105 ${
                isScrolled 
                  ? 'bg-accent text-dark shadow-md hover:shadow-lg hover:bg-accent-light' 
                  : 'bg-accent text-dark hover:bg-accent-light'
              }`}
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-10 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <span className={`absolute top-0 left-0 w-6 h-0.5 rounded-full transition-all duration-300 ${
              isScrolled ? 'bg-accent' : 'bg-accent'
            } ${
              isMobileMenuOpen ? 'transform rotate-45 top-2' : ''
            }`}></span>
            <span className={`absolute top-2 left-0 w-6 h-0.5 rounded-full transition-all duration-300 ${
              isScrolled ? 'bg-accent' : 'bg-accent'
            } ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`absolute top-4 left-0 w-6 h-0.5 rounded-full transition-all duration-300 ${
              isScrolled ? 'bg-accent' : 'bg-accent'
            } ${
              isMobileMenuOpen ? 'transform -rotate-45 top-2' : ''
            }`}></span>
          </div>
        </button>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-gradient-to-b from-dark to-primary/90 flex flex-col items-center justify-center transition-all duration-500 ${
            isMobileMenuOpen 
              ? 'opacity-100 visible backdrop-blur-md' 
              : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-center space-y-8">
            {navSections.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                className={`text-light text-2xl font-medium transition-all duration-300 relative
                  ${activeSection === item.id 
                    ? 'text-accent font-semibold scale-110' 
                    : 'hover:text-accent/80'
                  }
                `}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full"></span>
                )}
              </a>
            ))}
            <a 
              href="#contact" 
              className="mt-6 button-primary px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 